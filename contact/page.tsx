import type {Metadata} from 'next';import ContactForm from '@/components/ContactForm';
export const metadata:Metadata={title:'Contact',description:'Tell us about your Shopify or ecommerce project.'};
export default function Contact({searchParams}:{searchParams:{service?:string}}){
return(<><section className="ph"><div className="w"><div className="eb">Contact</div><h1>Tell us what you have <em>in mind.</em></h1><p className="lead">Whether you’re launching a store, improving an existing one, or planning product creative, we’d like to hear about it.</p></div></section>
<section style={{paddingBottom:120}}><div className="w cf"><div><p className="eb">Prefer email?</p><p style={{marginTop:10,font:'2rem/1.2 var(--ser)'}}><a href="mailto:wonderful@webcrestio.com">wonderful@webcrestio.com</a></p></div><ContactForm initial={searchParams.service||''}/></div></section></>)}
