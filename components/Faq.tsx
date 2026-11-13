'use client';
import {useState} from 'react';import {faq} from '@/lib/content';
export default function Faq(){const [o,setO]=useState<number|null>(null);
return(<div className="fq">{faq.map(([q,a],i)=>(<div className="fi" key={q}><h3><button type="button" aria-expanded={o===i} aria-controls={`fa${i}`} onClick={()=>setO(o===i?null:i)}><span>{q}</span><span className="ic" aria-hidden="true">+</span></button></h3><div className={'ac'+(o===i?' on':'')} id={`fa${i}`} role="region"><div><p>{a}</p></div></div></div>))}</div>)}
