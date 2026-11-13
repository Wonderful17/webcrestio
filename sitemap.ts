import {projects} from '@/lib/projects';
export default function sitemap(){const b=process.env.NEXT_PUBLIC_SITE_URL||'https://webcrestio.com';return['','/work','/services','/about','/reviews','/contact','/blog','/privacy','/terms',...projects.map(p=>`/work/${p.slug}`)].map(u=>({url:b+u}))}
