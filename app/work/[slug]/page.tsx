import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Gallery from '@/components/Gallery';
import { getProjects } from '@/lib/portfolio';
import { projects as builtInProjects } from '@/lib/projects';

type Props = { params: { slug: string } };

export const revalidate = 300;

export function generateStaticParams() {
  return builtInProjects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = (await getProjects()).find(({ slug }) => slug === params.slug);
  if (!project) return {};

  const title = `${project.name} — ${project.type}`;
  return { title, description: project.summary, openGraph: { title, description: project.summary } };
}

export default async function ProjectPage({ params }: Props) {
  const projects = await getProjects();
  const index = projects.findIndex(({ slug }) => slug === params.slug);
  if (index < 0) notFound();

  const project = projects[index];
  const next = projects[(index + 1) % projects.length];
  const isConcept = /^concept\b/i.test(project.label);
  const service = project.videoUrl ? 'AI product video or video ad' : 'Store redesign';

  return (
    <>
      <section className="ph" style={{ paddingBottom: 36 }}>
        <div className="w">
          <Link className="ln" style={{ margin: '0 0 30px' }} href="/work">← All work</Link>
          <div className="eb">{project.cat}</div>
          <h1>{project.name}</h1>
          {project.type !== project.cat && <p className="lead">{project.type}</p>}
        </div>
      </section>
      <div className="w">
        <div className="pj"><span className="tg" style={{ margin: 0 }}>{project.label}</span></div>
        {project.videoUrl ? (
          <div className="vd">
            <video controls preload="metadata" playsInline poster={project.videoPoster || project.hero || undefined}
              src={project.videoUrl} aria-label={`${project.name} project video`} />
          </div>
        ) : project.hero && (
          <Image src={project.hero} alt={project.heroAlt || `${project.name} project visual`}
            width={1536} height={1024} priority sizes="(max-width:1240px) 100vw,1240px"
            unoptimized={project.hero.startsWith('https://cdn.sanity.io/')} />
        )}
        {(project.summary || project.approach || project.brief || project.highlights.length > 0) && (
          <div className="ph3">
            {project.summary && <div><h2>Summary</h2><p className="lead">{project.summary}</p></div>}
            {(project.approach || project.brief) && <div>
              {project.approach && <><h2>{project.videoUrl ? 'Creative approach' : 'Design approach'}</h2><p>{project.approach}</p></>}
              {project.brief && <><h2>Brief</h2><p>{project.brief}</p></>}
            </div>}
            {project.highlights.length > 0 && <div>
              <h2>Highlights</h2>
              <ul>{project.highlights.map((highlight, i) => <li key={i}>{highlight}</li>)}</ul>
            </div>}
          </div>
        )}
        {project.gallery.length > 0 && <Gallery items={project.gallery} />}
        {isConcept && <p style={{ marginTop: 36, fontSize: 14 }}>This concept demonstrates design and creative direction.</p>}
      </div>
      <section className="dk" style={{ marginTop: 96 }}>
        <div className="w">
          <div style={{ padding: '80px 0 56px' }}>
            <h2>Create something like this <em>for your brand.</em></h2>
            <Link className="btn" style={{ marginTop: 30 }} href={`/contact?service=${encodeURIComponent(service)}`}>
              Start a project <span>→</span>
            </Link>
          </div>
          {next.slug !== project.slug && <Link className="nx2" href={`/work/${next.slug}`}>
            <div className="eb">Next project</div><h2>{next.name} <em>— {next.type}</em></h2>
          </Link>}
        </div>
      </section>
    </>
  );
}
