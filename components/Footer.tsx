import Link from 'next/link';
const L:[string,string][]=[['Work','/work'],['Services','/services'],['About','/about'],['Reviews','/reviews'],['Blog','/blog'],['Contact','/contact'],['Privacy','/privacy'],['Terms','/terms']];
export default function Footer(){return(<footer><div className="w"><div className="fg"><div><Link className="wm" href="/"><b>Web</b>crestio<i/></Link><p>Shopify stores, thoughtful improvements, and product creative.</p></div>
<nav aria-label="Footer"><ul>{L.map(([t,h])=><li key={h}><Link href={h}>{t}</Link></li>)}</ul></nav>
<div><div className="eb">Email</div><p style={{marginTop:8}}><a href="mailto:wonderful@webcrestio.com">wonderful@webcrestio.com</a></p></div></div>
<div className="cp">© {new Date().getFullYear()} Webcrestio. All rights reserved.</div></div></footer>)}
