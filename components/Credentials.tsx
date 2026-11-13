import {site} from '@/lib/config';
// Shows only verified credentials supplied in lib/config.ts. Renders nothing otherwise.
export default function Credentials(){if(!site.credentials.length)return null;
return(<div className="w" style={{marginTop:72}}><div className="eb">Expertise &amp; credentials</div><div className="cr">{site.credentials.map(c=>(<article key={c.name}>{/* eslint-disable-next-line @next/next/no-img-element */}{c.image&&<img src={c.image} alt={`${c.name} certificate`} width={400} height={300} loading="lazy"/>}<h3>{c.name}</h3><p>{c.issuer}</p>{c.url&&<a className="ln" href={c.url} rel="noopener" target="_blank">Verify credential</a>}</article>))}</div></div>)}
