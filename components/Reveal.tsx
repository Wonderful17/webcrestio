'use client';
import {useEffect} from 'react';import {usePathname} from 'next/navigation';
export default function Reveal(){const p=usePathname();useEffect(()=>{const els=[...document.querySelectorAll('.rv:not(.in)')];
if(!('IntersectionObserver' in window)){els.forEach(e=>e.classList.add('in'));return}
const o=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');o.unobserve(e.target)}}),{rootMargin:'0px 0px -8% 0px'});els.forEach(e=>o.observe(e));return()=>o.disconnect()},[p]);return null}
