'use client';
import {FormEvent,useEffect,useRef,useState} from 'react';import {options} from '@/lib/content';
const BUD=['Under $500','$500–$1,500','$1,500–$3,000','$3,000–$5,000','$5,000+','Let’s discuss'],TIM=['As soon as possible','Within one month','Within 1–3 months','Flexible'];
const EM='wonderful@webcrestio.com',NAMES=['What','Project','You'];
export default function ContactForm({initial=''}:{initial?:string}){
const [step,setStep]=useState(0),[f,setF]=useState({svc:options.includes(initial)?initial:'',desc:'',url:'',budget:'',time:'',name:'',email:'',biz:'',consent:false,website:''}),[er,setEr]=useState<Record<string,string>>({}),[st,setSt]=useState<'idle'|'load'|'ok'|'err'>('idle'),t0=useRef(Date.now());
const set=(k:string,v:string|boolean)=>setF(p=>({...p,[k]:v}));
useEffect(()=>{(document.querySelector('#cf [aria-invalid=true]') as HTMLElement|null)?.focus()},[er]);
const mail=()=>`mailto:${EM}?subject=${encodeURIComponent('Project enquiry')}&body=${encodeURIComponent(`Service: ${f.svc}\nBudget: ${f.budget}\nTimeline: ${f.time}\nStore: ${f.url}\nName: ${f.name} (${f.email}) ${f.biz}\n\n${f.desc}`.slice(0,1500))}`;
function check(){const e:Record<string,string>={};
if(step===0&&!f.svc)e.svc='Please choose what we can help with.';
if(step===1){if(f.desc.trim().length<10)e.desc='Please tell us a little about your project (at least 10 characters).';if(f.url&&!/^https?:\/\/[^\s.]+\.\S+$/.test(f.url.trim()))e.url='Enter a full URL starting with https://'}
if(step===2){if(f.name.trim().length<2)e.name='Please enter your name.';if(!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email.trim()))e.email='Please enter a valid email address.';if(!f.consent)e.consent='Please confirm consent so we can respond.'}
setEr(e);return !Object.keys(e).length}
async function submit(ev:FormEvent){ev.preventDefault();if(!check())return;if(step<2){setStep(step+1);return}
if(f.website||Date.now()-t0.current<3000){setSt('err');return}
setSt('load');try{const r=await fetch('/api/contact',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({svc:f.svc,desc:f.desc.trim(),url:f.url.trim(),budget:f.budget,time:f.time,name:f.name.trim(),email:f.email.trim(),biz:f.biz.trim(),consent:true})});if(!r.ok)throw 0;setSt('ok')}catch{setSt('err')}}
if(st==='ok')return <div id="cf"><div className="al s" role="status"><h3 style={{marginBottom:8}}>Your enquiry is on its way.</h3>Thank you for telling us about your project.</div></div>;
const bad=(k:string)=>er[k]?{'aria-invalid':true,'aria-describedby':k+'e'} as const:{};const msg=(k:string)=>er[k]?<div className="er" id={k+'e'} role="alert">{er[k]}</div>:null;
return(<div id="cf"><ol className="sp" aria-label={`Progress, step ${step+1} of 3`} style={{padding:0}}>{NAMES.map((n,i)=><li key={n} data-n={`0${i+1}`} className={i===step?'on':i<step?'dn':''}>0{i+1} {n}</li>)}</ol>
<form noValidate onSubmit={submit}><div className="stp" key={step}>
{step===0&&<fieldset><legend style={{font:'2rem/1.1 var(--ser)',marginBottom:20}}>What can we help with?</legend><div className="ops">{options.map(o=><label key={o}><input type="radio" name="svc" value={o} checked={f.svc===o} onChange={()=>set('svc',o)}/>{o}</label>)}</div>{er.svc&&<div className="er" role="alert">{er.svc}</div>}</fieldset>}
{step===1&&<><h2 style={{fontSize:'2rem',marginBottom:6}}>A little about your project</h2>
<div><label htmlFor="desc">Project description <span aria-hidden="true">*</span></label><textarea id="desc" rows={5} maxLength={2000} required aria-required="true" value={f.desc} onChange={e=>set('desc',e.target.value)} {...bad('desc')}/>{msg('desc')}</div>
<div><label htmlFor="url">Current store URL (optional)</label><input type="url" id="url" maxLength={300} placeholder="https://" value={f.url} onChange={e=>set('url',e.target.value)} {...bad('url')}/>{msg('url')}</div>
<div><label htmlFor="budget">Budget range</label><select id="budget" value={f.budget} onChange={e=>set('budget',e.target.value)}><option value="">Select…</option>{BUD.map(o=><option key={o}>{o}</option>)}</select></div>
<div><label htmlFor="time">Preferred timeline</label><select id="time" value={f.time} onChange={e=>set('time',e.target.value)}><option value="">Select…</option>{TIM.map(o=><option key={o}>{o}</option>)}</select></div></>}
{step===2&&<><h2 style={{fontSize:'2rem',marginBottom:6}}>How can we reach you?</h2>
<div><label htmlFor="name">Full name <span aria-hidden="true">*</span></label><input type="text" id="name" maxLength={100} autoComplete="name" value={f.name} onChange={e=>set('name',e.target.value)} {...bad('name')}/>{msg('name')}</div>
<div><label htmlFor="email">Email address <span aria-hidden="true">*</span></label><input type="email" id="email" maxLength={150} autoComplete="email" value={f.email} onChange={e=>set('email',e.target.value)} {...bad('email')}/>{msg('email')}</div>
<div><label htmlFor="biz">Business name (optional)</label><input type="text" id="biz" maxLength={120} autoComplete="organization" value={f.biz} onChange={e=>set('biz',e.target.value)}/></div>
<div><label className="ck"><input type="checkbox" checked={f.consent} onChange={e=>set('consent',e.target.checked)} {...(er.consent?{'aria-invalid':true}:{})}/><span>I agree that Webcrestio may use this information to respond to my enquiry. <a href="/privacy">Privacy</a></span></label>{er.consent&&<div className="er" role="alert">{er.consent}</div>}</div>
<div className="hp" aria-hidden="true"><label>Website<input type="text" tabIndex={-1} autoComplete="off" value={f.website} onChange={e=>set('website',e.target.value)}/></label></div></>}
</div>
{st==='err'&&<div className="al e" role="alert" style={{marginTop:16}}>We couldn’t send your enquiry. Please try again or email us directly at <a href={mail()}>{EM}</a>.</div>}
<div className="ra">{step>0?<button type="button" className="btn o" onClick={()=>{setEr({});setStep(step-1)}}>Back</button>:<span/>}<button type="submit" className="btn" disabled={st==='load'}>{st==='load'?<><span className="spn"/> Sending…</>:step<2?<>Continue <span>→</span></>:'Send project enquiry'}</button></div></form></div>)}
