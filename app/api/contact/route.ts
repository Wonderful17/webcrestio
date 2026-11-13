import {NextResponse} from 'next/server';import {z} from 'zod';import {Resend} from 'resend';
const S=z.object({svc:z.string().min(1).max(80),desc:z.string().trim().min(10).max(2000),url:z.string().trim().max(300).optional().default(''),budget:z.string().max(40).optional().default(''),time:z.string().max(40).optional().default(''),name:z.string().trim().min(2).max(100),email:z.string().trim().email().max(150),biz:z.string().trim().max(120).optional().default(''),consent:z.literal(true)});
const hits=new Map<string,number[]>();
export async function POST(req:Request){
const ip=req.headers.get('x-forwarded-for')?.split(',')[0]??'x',now=Date.now(),h=(hits.get(ip)??[]).filter(t=>now-t<36e5);
if(h.length>=5)return NextResponse.json({error:'rate_limited'},{status:429});hits.set(ip,[...h,now]);
let b;try{const raw=await req.json();if(raw&&raw.website)throw 0;b=S.parse(raw)}catch{return NextResponse.json({error:'invalid'},{status:400})}
const {error}=await new Resend(process.env.RESEND_API_KEY).emails.send({from:process.env.CONTACT_FROM!,to:process.env.CONTACT_TO_EMAIL!,replyTo:b.email,subject:`Project enquiry: ${b.svc} (${b.name})`,text:`Service: ${b.svc}\nBudget: ${b.budget}\nTimeline: ${b.time}\nStore: ${b.url}\nName: ${b.name}\nEmail: ${b.email}\nBusiness: ${b.biz}\n\n${b.desc}`});
if(error)return NextResponse.json({error:'send_failed'},{status:502});return NextResponse.json({ok:true})}
