import { site } from '@/lib/config';

export default function Legal({ title, sections }: { title: string; sections: [string, string][] }) {
  return (
    <section className="ph">
      <div className="w lg">
        <h1 style={{ fontSize: 'clamp(2.6rem,6vw,4.6rem)', marginBottom: 12 }}>{title}</h1>
        <p className="sm">{site.legal.entity}, trading as Webcrestio · {site.legal.address} · <a href={`mailto:${site.email}`}>{site.email}</a></p>
        {sections.map(([heading, copy]) => (
          <div key={heading}><h2>{heading}</h2><p>{copy}</p></div>
        ))}
      </div>
    </section>
  );
}
