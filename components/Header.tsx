'use client';
import Link from 'next/link';import {usePathname} from 'next/navigation';import {useEffect,useState} from 'react';
const L:[string,string][]=[['Work','/work'],['Services','/services'],['About','/about'],['Reviews','/reviews'],['Blog','/blog']];
export default function Header(){const p=usePathname(),[o,setO]=useState(false);
useEffect(()=>{setO(false)},[p]);useEffect(()=>{document.body.style.overflow=o?'hidden':''},[o]);
const cur=(h:string)=>(p===h||p.startsWith(h+'/'))?'page':undefined;
return(<><header><div className="w nv"><Link className="wm" href="/" aria-label="Webcrestio home"><b>Web</b>crestio<i/></Link>
<nav className="nl" aria-label="Main">{L.map(([t,h])=><Link key={h} href={h} aria-current={cur(h)}>{t}</Link>)}<Link className="btn" href="/contact">Start a project <span>→</span></Link></nav>
<button className="mb" aria-label={o?'Close menu':'Open menu'} aria-expanded={o} aria-controls="mn" onClick={()=>setO(!o)}><i/><i/></button></div></header>
<nav className={'mn'+(o?' on':'')} id="mn" aria-label="Mobile">{L.map(([t,h])=><Link key={h} href={h}>{t}</Link>)}<Link href="/contact" style={{color:'#C4B5FD'}}>Start a project →</Link></nav></>)}
