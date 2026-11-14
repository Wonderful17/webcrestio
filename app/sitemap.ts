import {getProjects} from '@/lib/portfolio';
export default async function sitemap(){const projects=await getProjects();const b=process.env.NEXT_PUBLIC_SITE_URL||'https://webcrestio.com';return['','/work','/services','/about','/reviews','/contact','/blog','/privacy','/terms',...projects.map(p=>`/work/${p.slug}`)].map(u=>({url:b+u}))}
