import Faq from '@/components/Faq';import ReviewSection from '@/components/ReviewSection';import Credentials from '@/components/Credentials';import {getApprovedReviews} from '@/lib/sanity';import {site} from '@/lib/config';
import Image from 'next/image';import Link from 'next/link';import type {CSSProperties} from 'react';
import Tilt from '@/components/Tilt';import WorkSection from '@/components/WorkSection';import Cta from '@/components/Cta';import {getProjects} from '@/lib/portfolio';
const st=(o:Record<string,string|number>)=>o as CSSProperties;
const W=({k,c}:{k:number;c:string})=><><span className="wd" style={st({'--k':k})}>{c}</span>{' '}</>;
const mq=['Shopify stores','Store improvements','Product creative','Beauty','Fashion','Home'];
export default async function Home(){const [reviews, projects] = await Promise.all([getApprovedReviews(), getProjects()]);return(<>
<section className="hero"><div className="w hg"><div className="hi">
<div className="eb" style={st({'--i':0})}>Shopify development &amp; ecommerce creative</div>
<h1 style={st({'--i':1})} aria-label="Let’s build your next 7-figure ecommerce website."><span className="l1" aria-hidden="true"><W k={0} c="Let’s"/><W k={1} c="build"/><W k={2} c="your"/><W k={3} c="next"/></span><em aria-hidden="true"><W k={4} c="7-figure"/><W k={5} c="ecommerce"/><W k={6} c="website."/></em></h1>
<p className="lead" style={st({'--i':2})}>Premium Shopify store design and redesign, tailored Shopify marketing strategies, and AI product videos that help your brand stand out and turn more visitors into customers.</p>
<div className="bt" style={st({'--i':3})}><Link className="btn" href="/contact">Start your project <span>→</span></Link><Link className="btn o" href="/work">Explore our work</Link></div>
<p className="sm" style={st({'--i':4})}>Store design. Technical expertise. Product creative.</p></div>
<Tilt>{['g1','g2','g3','g4'].map(g=><span key={g} className={`gd ${g}`} aria-hidden="true">$</span>)}
<div className="c c1"><Image src="/work/aurelle-home.jpg" alt="AURELLE skincare store concept" width={1536} height={1024} priority sizes="(max-width:960px) 90vw,45vw"/></div>
<div className="c c2"><Image src="/work/haven-home.jpg" alt="HAVEN & FORM home store concept" width={1536} height={1024} priority sizes="(max-width:960px) 70vw,35vw"/></div>
<div className="c c3"><Image src="/work/forma-home.jpg" alt="FORMA fashion store concept" width={1536} height={1024} priority sizes="(max-width:960px) 70vw,35vw"/></div></Tilt></div></section>
<div className="mq" aria-hidden="true"><div>{[...mq,...mq].map((s,i)=><span key={i}>{s}</span>)}</div></div>
<section className="sec st"><div className="w"><div className="hd"><h2 className="rv">More than a <em>beautiful</em> storefront.</h2><p className="lead rv">Your store needs to look right, work smoothly, and help customers take the next step. We bring design, development, and product creative together to create a shopping experience that feels considered from the first visit to the final click.</p></div>
<div className="ig">{[['Designed around your brand','A distinctive storefront that reflects your products, audience, and business.'],['Built for everyday shopping','Clear navigation, useful product information, and a purchase journey that feels straightforward.'],['Ready for what comes next','A flexible foundation for new products, campaigns, integrations, and ongoing improvements.']].map(([t,d],i)=>(<div className="rv" key={t} style={st({'--d':`${i*0.1}s`})}><b>0{i+1}</b><h3>{t}</h3><p>{d}</p></div>))}</div></div></section>
<section className="sec">
  <WorkSection projects={projects} intro={<>
    <h2>Thoughtful work. <em>Different possibilities.</em></h2>
    <p className="lead">Explore storefront design, shopping experiences, and product creative.</p>
    <Link className="ln" href="/work">View all work →</Link>
  </>} />
</section>
<section className="sec dk"><div className="w"><h2 className="rv" style={{maxWidth:'16ch'}}>Everything your Shopify store needs to <em>move forward.</em></h2>
<div className="sv3">{[['Shopify stores','From a first launch to a complete redesign, we create stores that bring your brand and products together.'],['Store improvements','Improve the details that shape the shopping experience, from product pages and navigation to integrations and ongoing support.'],['Product creative','Turn product imagery into polished AI videos and advertising creative for your store and marketing campaigns.']].map(([t,d],i)=>(<div className="rv" key={t} style={st({'--d':`${i*0.1}s`})}><h3>{t}</h3><p>{d}</p></div>))}</div>
<Link className="btn" href="/services">Explore all services <span>→</span></Link></div></section>
<section className="sec"><div className="w qg"><div><h2 className="rv">Care in the details. <em>Clarity throughout.</em></h2>{site.experienceYears&&<p className="eb" style={{marginTop:24}}>{site.experienceYears} years of ecommerce experience</p>}</div><div><p className="lead rv" style={{marginBottom:24}}>We combine practical ecommerce experience with a thoughtful approach to design and development. You get clear communication, a defined scope, and careful attention to how your store looks and works.</p><ul className="rv">{['Clear project scope and deliverables.','Regular communication.','Desktop and mobile review.','Careful testing before handover.','Guidance for managing the finished store.','Revisions within the agreed project scope.'].map(x=><li key={x}>{x}</li>)}</ul></div></div><Credentials/></section>
<section className="sec dk"><div className="w"><h2 className="rv" style={{maxWidth:'14ch'}}>A clear path from <em>idea to launch.</em></h2><div className="pg">{[['Discover','We learn about your products, customers, goals, and what your store needs to achieve.'],['Plan & design','We define the structure and create a visual direction that fits your brand.'],['Build & refine','We develop the agreed experience, connect the required features, and refine the details.'],['Review & handover','We test the experience, complete the agreed revisions, and help you take ownership of your store.']].map(([t,d],i)=>(<div className="rv" key={t} style={st({'--d':`${i*0.08}s`})}><b>Step 0{i+1}</b><h3>{t}</h3><p>{d}</p></div>))}</div></div></section>
<section className="sec"><div className="w cm"><h2 className="rv">We want you to feel <em>confident</em> in the result.</h2><p className="lead rv" style={{marginTop:28}}>We agree on the scope before work begins, keep you informed throughout, and review the finished work with you before handover. If something does not match the agreed requirements, we work with you to put it right.</p><p className="eb rv">Thoughtful service. Clear expectations. A result reviewed together.</p></div></section>
<ReviewSection reviews={reviews}/>
<section className="sec"><div className="w rf"><h2 className="rv">Questions, <em>answered.</em></h2><Faq/></div></section>
<Cta/></>)}
