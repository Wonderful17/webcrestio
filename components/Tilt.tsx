'use client';
import {useEffect,useRef} from 'react';
export default function Tilt({children}:{children:React.ReactNode}){const r=useRef<HTMLDivElement>(null);
useEffect(()=>{const s=r.current;if(!s||!matchMedia('(hover:hover) and (pointer:fine)').matches||matchMedia('(prefers-reduced-motion:reduce)').matches)return;let q=0;
const f=(e:PointerEvent)=>{if(q)return;q=requestAnimationFrame(()=>{q=0;const b=s.getBoundingClientRect(),i=e.clientX>b.left-60&&e.clientX<b.right+60&&e.clientY>b.top-60&&e.clientY<b.bottom+60;
s.style.setProperty('--rx',i?((.5-(e.clientY-b.top)/b.height)*6).toFixed(2)+'deg':'0deg');s.style.setProperty('--ry',i?(((e.clientX-b.left)/b.width-.5)*8).toFixed(2)+'deg':'0deg')})};
document.addEventListener('pointermove',f,{passive:true});return()=>document.removeEventListener('pointermove',f)},[]);
return <div ref={r} className="st3" aria-label="Selected concept designs">{children}</div>}
