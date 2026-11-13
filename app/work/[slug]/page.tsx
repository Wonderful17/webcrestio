import type {Metadata} from 'next';import Image from 'next/image';import Link from 'next/link';import {notFound} from 'next/navigation';
import Gallery from '@/components/Gallery';import {projects} from '@/lib/projects';
export const dynamicParams=false;
export function generateStaticParams(){return projects.map(p=>({slug:p.slug}))}
export function generateMetadata({params}:{params:{slug:string}}):Metadata{const p=projects.find(x=>x.slug===params.slug);return p?{title:`${p.name} — ${p.type}`,description:p.summary,openGraph:{title:`${p.name} — ${p.type}`,description:p.summary}}:{}}
export default function Project({params}:{params:{slug:string}}){const i=projects.findIndex(x=>x.slug===params.slug);if(i<0)notFound();const p=projects[i],nx=projects[(i+1)%projects.length],v=p.slug==='video';
return(<><section className="ph" style={{paddingBottom:36}}><div className="w"><Link className="ln" style={{margin:'0 0 30px'}} href="/work">← All work</Link><div className="eb">{p.cat}</div><h1 style={{maxWidth:'none'}}>{p.name}<br/><em style={{fontSize:'.5em'}}>{p.type}</em></h1></div></section>
<div className="w"><div className="pj"><span className="tg" style={{margin:0}}>{p.label}</span><span>Design exploration and creative sample · not a live client store</span></div>
{v?<div className="vd rv"><video controls preload="metadata" playsInline poster="/work/poster.jpg" src="/work/aurelle-commercial.mp4" aria-label="AURELLE AI product commercial concept"/></div>
:<div className="rv" style={{border:'1px solid var(--st)'}}><Image src={p.hero} alt={`${p.name} hero visual`} width={1536} height={1024} priority sizes="(max-width:1240px) 100vw,1240px"/></div>}
<div className="ph3"><div><h2>Summary</h2><p className="lead">{p.summary}</p></div><div><h2>{v?'Creative approach':'Design approach'}</h2><p>{p.approach}</p><h2 style={{marginTop:28}}>Brief</h2><p>{p.brief}</p></div><div><h2>Highlights</h2><ul>{p.highlights.map(h=><li key={h}>{h}</li>)}</ul></div></div>
{p.gallery.length>0&&<Gallery items={p.gallery}/>}
<p style={{marginTop:36,fontSize:14}}>These visuals demonstrate design and creative direction. They do not show measured performance, working integrations, or sales outcomes.</p></div>
<section className="dk" style={{marginTop:96}}><div className="w"><div style={{padding:'80px 0 56px'}}><h2>Create something like this <em>for your brand.</em></h2><Link className="btn" style={{marginTop:30}} href={`/contact?service=${encodeURIComponent(v?'AI product video or video ad':'Store redesign')}`}>Start a project <span>→</span></Link></div>
<Link className="nx2" href={`/work/${nx.slug}`}><div className="eb">Next project</div><h2>{nx.name} <em>— {nx.type}</em></h2></Link></div></section></>)}
