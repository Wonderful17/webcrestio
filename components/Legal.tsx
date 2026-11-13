import {site} from '@/lib/config';
export default function Legal({title,sections}:{title:string;sections:[string,string][]}){
return(<section className="ph"><div className="w lg"><div className="dr"><b>Draft for owner review.</b> This is general placeholder text and is not legal advice or jurisdiction-specific. Have it reviewed before launch.</div><h1 style={{fontSize:'clamp(2.6rem,6vw,4.6rem)',marginBottom:12}}>{title}</h1>
<p className="sm">Operator: {site.legal.entity} · {site.legal.address} · Contact: {site.email} · Last updated: {site.legal.updated}</p>{sections.map(([h,p])=><div key={h}><h2>{h}</h2><p>{p}</p></div>)}</div></section>)}
