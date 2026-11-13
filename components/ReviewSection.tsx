'use client';
import {FormEvent,useEffect,useRef,useState} from 'react';
type R={name:string;store?:string;rating:number;text:string};
const Stars=({n}:{n:number})=><span className="rs" role="img" aria-label={`Rated ${n} out of 5`}>{'★'.repeat(n)}<i>{'★'.repeat(5-n)}</i></span>;
function ReviewForm(){const init={name:'',store:'',email:'',rating:0,text:'',consent:false,website:''};const [f,setF]=useState(init),[m,setM]=useState<{k:string;t:string}|null>(null),t0=useRef(Date.now());
async function submit(e:FormEvent){e.preventDefault();let er='';
if(f.name.trim().length<2)er='Please enter your name.';else if(!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email.trim()))er='Please enter a valid email address.';else if(!f.rating)er='Please choose a rating from 1 to 5.';else if(f.text.trim().length<20)er='Please write at least 20 characters.';else if(!f.consent)er='Please confirm consent to publish.';
if(er){setM({k:'e',t:er});return}if(f.website||Date.now()-t0.current<3000)return;
setM({k:'l',t:'Submitting…'});
try{const r=await fetch('/api/review',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({name:f.name.trim(),business:f.store.trim(),email:f.email.trim(),rating:f.rating,text:f.text.trim(),consent:true})});if(!r.ok)throw 0;setM({k:'s',t:'Thank you for sharing your experience. Your review has been submitted for review.'});setF(init)}catch{setM({k:'e',t:'We couldn’t submit your review. Please try again later.'})}}
const set=(k:string,v:string|number|boolean)=>setF(p=>({...p,[k]:v}));
return(<form noValidate onSubmit={submit}>
<div><label htmlFor="rn">Name <span aria-hidden="true">*</span></label><input type="text" id="rn" maxLength={80} autoComplete="name" value={f.name} onChange={e=>set('name',e.target.value)}/></div>
<div><label htmlFor="rb">Store name</label><input type="text" id="rb" maxLength={100} value={f.store} onChange={e=>set('store',e.target.value)}/></div>
<div><label htmlFor="re">Email <span aria-hidden="true">*</span></label><input type="email" id="re" maxLength={150} autoComplete="email" aria-describedby="reh" value={f.email} onChange={e=>set('email',e.target.value)}/><div className="ht" id="reh">Private. Never displayed publicly.</div></div>
<fieldset><legend>Rating <span aria-hidden="true">*</span></legend><div className="stars">{[5,4,3,2,1].map(n=><span key={n} style={{display:'contents'}}><input type="radio" name="rt" id={`st${n}`} value={n} checked={f.rating===n} onChange={()=>set('rating',n)}/><label htmlFor={`st${n}`} title={`${n} star${n>1?'s':''}`}><span aria-hidden="true">★</span><span style={{position:'absolute',left:-9999}}>{n} star{n>1?'s':''}</span></label></span>)}</div></fieldset>
<div><label htmlFor="rt">Your review <span aria-hidden="true">*</span></label><textarea id="rt" rows={4} maxLength={1500} value={f.text} onChange={e=>set('text',e.target.value)}/></div>
<label className="ck"><input type="checkbox" checked={f.consent} onChange={e=>set('consent',e.target.checked)}/><span>I agree that my review and the name above may be published after moderation.</span></label>
<div className="hp" aria-hidden="true"><label>Website<input type="text" tabIndex={-1} autoComplete="off" value={f.website} onChange={e=>set('website',e.target.value)}/></label></div>
<div aria-live="polite">{m&&<div className={'al '+(m.k==='s'?'s':m.k==='e'?'e':'')} role={m.k==='e'?'alert':'status'}>{m.t}</div>}</div>
<div><button className="btn" type="submit">Submit your review</button></div></form>)}
export default function ReviewSection({reviews}:{reviews:R[]}){
const dlg=useRef<HTMLDialogElement>(null),car=useRef<HTMLDivElement>(null),[paused,setPaused]=useState(false),[reduced,setReduced]=useState(false),pr=useRef(false),hold=useRef(false),vis=useRef(true);pr.current=paused;
useEffect(()=>{const c=car.current;if(!c||!reviews.length)return;if(matchMedia('(prefers-reduced-motion:reduce)').matches){setReduced(true);setPaused(true);return}
let acc=0,back=false,id=0;const io=new IntersectionObserver(e=>{vis.current=e[0].isIntersecting});io.observe(c);
const tick=()=>{if(!pr.current&&!hold.current&&vis.current&&!back){acc+=.4;if(acc>=1){c.scrollLeft+=Math.floor(acc);acc%=1}if(c.scrollLeft+c.clientWidth>=c.scrollWidth-2){back=true;setTimeout(()=>{c.scrollTo({left:0,behavior:'smooth'});setTimeout(()=>{back=false},1600)},1200)}}id=requestAnimationFrame(tick)};id=requestAnimationFrame(tick);
return()=>{cancelAnimationFrame(id);io.disconnect()}},[reviews.length]);
const by=(d:number)=>car.current?.scrollBy({left:d,behavior:reduced?'auto':'smooth'});
const open=<button className="btn" type="button" onClick={()=>dlg.current?.showModal()}>{reviews.length?'Leave a review':'Leave the first review'}</button>;
return(<section className="sec st rvs"><div className="w">
{reviews.length?<><div className="rh"><div><div className="eb">Reviews</div><h2 style={{marginTop:10}}>Client feedback matters.</h2></div><div className="rc"><button type="button" aria-label="Previous reviews" onClick={()=>by(-340)}>←</button>{!reduced&&<button type="button" aria-pressed={paused} aria-label={paused?'Play carousel':'Pause carousel'} onClick={()=>setPaused(!paused)}>{paused?'▶':'❚❚'}</button>}<button type="button" aria-label="Next reviews" onClick={()=>by(340)}>→</button>{open}</div></div>
<div className="car" ref={car} tabIndex={0} role="region" aria-roledescription="carousel" aria-label="Client reviews" onMouseEnter={()=>{hold.current=true}} onMouseLeave={()=>{hold.current=false}} onFocus={()=>{hold.current=true}} onBlur={()=>{hold.current=false}} onTouchStart={()=>{hold.current=true}} onTouchEnd={()=>{setTimeout(()=>{hold.current=false},2500)}}><div className="trk">{reviews.map((r,i)=><article className="rcd" key={i}><Stars n={r.rating}/><p>{r.text}</p><div><b>{r.name}</b><small>{r.store||''}</small></div></article>)}</div></div></>
:<div className="inv"><p>Client reviews will appear here as they are shared.</p>{open}</div>}</div>
<dialog id="rmd" ref={dlg} aria-labelledby="rmt"><button className="x" type="button" aria-label="Close" onClick={()=>dlg.current?.close()}>✕</button><h2 id="rmt">Leave a review</h2><ReviewForm/></dialog></section>)}
