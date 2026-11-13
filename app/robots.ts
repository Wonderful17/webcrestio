export default function robots(){return{rules:{userAgent:'*',allow:'/',disallow:['/studio','/api']},sitemap:`${process.env.NEXT_PUBLIC_SITE_URL||'https://webcrestio.com'}/sitemap.xml`}}
