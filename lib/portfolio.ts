import { projects, type Project } from './projects';
import { readClient } from './sanity';

type StudioImage = { src?: string; alt?: string; caption?: string };
type StudioProject = {
  slug: string;
  title: string;
  category?: string;
  label?: string;
  summary?: string;
  brief?: string;
  approach?: string;
  highlights?: string[];
  heroImage?: StudioImage;
  gallery?: StudioImage[];
  videoUrl?: string;
};

export async function getProjects(): Promise<Project[]> {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) return projects;

  let entries: StudioProject[];
  try {
    entries = await readClient.withConfig({ useCdn: false, perspective: 'published' }).fetch(
      `*[_type == "project" && defined(slug.current) && defined(title)]
        | order(coalesce(order, 999999) asc, title asc, _id asc) {
          "slug": slug.current, title, category, label, summary, brief, approach, highlights,
          heroImage { "src": asset->url, alt },
          gallery[] { "src": asset->url, alt, caption }, videoUrl
        }`,
      {},
      { next: { tags: ['project'], revalidate: 300 } }
    );
  } catch (error) {
    console.error('Could not load portfolio projects from Sanity', error);
    return projects;
  }

  const studioProjects = new Map<string, Project>();
  for (const entry of entries) {
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/i.test(entry.slug) || studioProjects.has(entry.slug)) continue;

    const gallery = (entry.gallery ?? []).flatMap(({ src, alt, caption }) =>
      src ? [{ src, alt: alt || entry.title, caption: caption || '' }] : []
    );
    const hero = entry.heroImage?.src || gallery[0]?.src || '';
    const cat = entry.category || 'Portfolio';
    studioProjects.set(entry.slug, {
      slug: entry.slug,
      name: entry.title,
      type: cat,
      cat,
      label: entry.label || 'Concept project',
      summary: entry.summary || '',
      brief: entry.brief || '',
      approach: entry.approach || '',
      highlights: entry.highlights ?? [],
      hero,
      heroAlt: entry.heroImage?.src ? entry.heroImage.alt : gallery[0]?.alt,
      card: hero,
      gallery,
      videoUrl: entry.videoUrl?.startsWith('https://') ? entry.videoUrl : undefined,
    });
  }

  return [...studioProjects.values(), ...projects.filter(({ slug }) => !studioProjects.has(slug))];
}
