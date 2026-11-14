import Image from 'next/image';
import Link from 'next/link';
import type { Project } from '@/lib/projects';

export default function WorkCard({ p }: { p: Project }) {
  return (
    <Link className="wc" href={`/work/${p.slug}`}>
      {p.card && (
        <div className="wi">
          <Image
            src={p.card}
            alt={p.heroAlt || `${p.name} ${p.type}`}
            width={1536}
            height={1024}
            sizes="(max-width:960px) 100vw,55vw"
            unoptimized={p.card.startsWith('https://cdn.sanity.io/')}
          />
          {p.videoUrl && <span className="pl" aria-hidden="true">▶</span>}
        </div>
      )}
      <h3>{p.name}</h3>
      <p>{p.summary || p.type}</p>
      <span className="tg">{p.label}</span>
    </Link>
  );
}
