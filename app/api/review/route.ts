import {NextResponse} from 'next/server';import {z} from 'zod';import {writeClient} from '@/lib/sanity';
const S=z.object({name:z.string().trim().min(2).max(80),business:z.string().trim().max(100).optional().default(''),email:z.string().trim().email().max(150),rating:z.number().int().min(1).max(5),text:z.string().trim().min(20).max(1500),consent:z.literal(true)});
const hits=new Map<string,number[]>(); // basic limiter; for stronger limits use Vercel/Netlify firewall or Upstash
export async function POST(req:Request){
const ip=req.headers.get('x-forwarded-for')?.split(',')[0]??'x',now=Date.now(),h=(hits.get(ip)??[]).filter(t=>now-t<36e5);
if(h.length>=5)return NextResponse.json({error:'rate_limited'},{status:429});hits.set(ip,[...h,now]);
let b;try{b=S.parse(await req.json())}catch{return NextResponse.json({error:'invalid'},{status:400})}
try{await writeClient.create({_type:'review',approved:false,name:b.name,store:b.business,email:b.email,rating:b.rating,text:b.text,submittedAt:new Date().toISOString()});return NextResponse.json({ok:true})}
catch{return NextResponse.json({error:'server'},{status:500})}}
