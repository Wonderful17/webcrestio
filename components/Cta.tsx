import Link from 'next/link';
export default function Cta({text='Tell us about your project',service=''}:{text?:string;service?:string}){
return(<section className="dk"><div className="w cc"><h2 className="rv">Let’s make your next move <em>a good one.</em></h2><p className="lead rv">Tell us what you’re building, what needs improving, or where you’d like to take your brand.</p>
<Link className="btn rv" href={service?`/contact?service=${encodeURIComponent(service)}`:'/contact'}>{text} <span>→</span></Link></div></section>)}
