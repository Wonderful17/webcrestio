import {createClient} from 'next-sanity';
const pid=process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const base={projectId:pid||'missing',dataset:process.env.NEXT_PUBLIC_SANITY_DATASET||'production',apiVersion:'2024-10-01'};
export const readClient=createClient({...base,useCdn:true});
export const writeClient=createClient({...base,useCdn:false,token:process.env.SANITY_WRITE_TOKEN});
async function q(query:string,params:Record<string,unknown>,tag:string,fallback:any){if(!pid)return fallback;try{return await readClient.fetch(query,params,{next:{tags:[tag]}})}catch{return fallback}}
// Reviews: approved only; the private email field is never selected.
export const getApprovedReviews=():Promise<{name:string;store?:string;rating:number;text:string}[]>=>q(`*[_type=="review"&&approved==true]|order(submittedAt desc){name,store,rating,text}`,{},'review',[]);
export const getPosts=():Promise<any[]>=>q(`*[_type=="post"&&defined(slug.current)]|order(publishedAt desc){title,"slug":slug.current,publishedAt,excerpt,coverImage}`,{},'post',[]);
export const getPost=(slug:string):Promise<any>=>q(`*[_type=="post"&&slug.current==$slug][0]{title,publishedAt,body,coverImage,seoDescription}`,{slug},'post',null);
