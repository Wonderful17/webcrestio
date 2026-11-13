import type {Metadata} from 'next';import {notFound} from 'next/navigation';import Link from 'next/link';import {PortableText} from '@portabletext/react';
import {getPost,getPosts} from '@/lib/sanity';import {urlFor} from '@/lib/image';
export async function generateStaticParams(){return (await getPosts()).map(p=>({slug:p.slug}))}
export async function generateMetadata({params}:{params:{slug:string}}):Promise<Metadata>{const p=await getPost(params.slug);return p?{title:p.title,description:p.seoDescription||p.excerpt}:{}}
export default async function Post({params}:{params:{slug:string}}){const p=await getPost(params.slug);if(!p)notFound();
return(<><section className="ph"><div className="w lg"><Link className="ln" style={{margin:'0 0 30px'}} href="/blog">← All posts</Link><h1 style={{fontSize:'clamp(2.4rem,5vw,4rem)',maxWidth:'none'}}>{p.title}</h1>{p.publishedAt&&<p className="sm" style={{marginTop:16}}>{new Date(p.publishedAt).toLocaleDateString('en-GB',{day:'numeric',month:'long',year:'numeric'})}</p>}</div></section>
<section style={{paddingBottom:120}}><div className="w lg">{p.coverImage&&/* eslint-disable-next-line @next/next/no-img-element */<img src={urlFor(p.coverImage).width(1200).url()} alt={p.coverImage.alt||''} style={{maxWidth:'100%',height:'auto'}}/>}
<PortableText value={p.body||[]} components={{types:{image:({value}:any)=>/* eslint-disable-next-line @next/next/no-img-element */<img src={urlFor(value).width(1200).url()} alt={value.alt||''} loading="lazy" style={{maxWidth:'100%',height:'auto'}}/>}}}/></div></section></>)}
