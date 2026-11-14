'use client';
import Image from 'next/image';import {useRef,useState} from 'react';
type G={src:string;alt:string;caption:string};
export default function Gallery({items}:{items:G[]}){const d=useRef<HTMLDialogElement>(null);const [i,setI]=useState(0);
const go=(n:number)=>setI((i+n+items.length)%items.length);const g=items[i];
return(<><div className="gl">{items.map((x,j)=>(<figure key={j} className="rv"><button type="button" aria-label={'Enlarge: '+x.caption} onClick={()=>{setI(j);d.current?.showModal()}}><Image src={x.src} alt={x.alt} unoptimized={x.src.startsWith('https://cdn.sanity.io/')} width={1536} height={1024} sizes="(max-width:1240px) 100vw,1240px"/></button><figcaption>{x.caption}</figcaption></figure>))}</div>
<dialog ref={d} aria-label="Image viewer" onClick={e=>{const t=e.target as HTMLElement;if(t===d.current||t.closest('.x'))d.current?.close();else if(t.closest('.pv'))go(-1);else if(t.closest('.nx'))go(1)}} onKeyDown={e=>{if(e.key==='ArrowLeft')go(-1);if(e.key==='ArrowRight')go(1)}}>
<button className="x" aria-label="Close">✕</button><button className="n pv" aria-label="Previous image">←</button>
{/* eslint-disable-next-line @next/next/no-img-element */}<img src={g.src} alt={g.alt}/><p>{g.caption} ({i+1} / {items.length})</p><button className="n nx" aria-label="Next image">→</button></dialog></>)}
