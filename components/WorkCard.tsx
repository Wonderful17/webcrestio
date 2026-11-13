import Image from 'next/image';import Link from 'next/link';import type {Project} from '@/lib/projects';
export default function WorkCard({p}:{p:Project}){const v=p.slug==='video';
return(<Link className="wc rv" href={`/work/${p.slug}`}><div className="wi"><Image src={p.card} alt={`${p.name} ${p.type}`} width={1536} height={1024} sizes="(max-width:960px) 100vw,55vw"/>{v&&<span className="pl" aria-hidden="true">▶</span>}</div>
<h3>{p.name} — {p.cat}</h3><p>{v?'Concept product advertisement · AI product commercial':p.type}</p><span className="tg">Concept project</span></Link>)}
