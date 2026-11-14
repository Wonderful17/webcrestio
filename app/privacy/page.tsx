import type { Metadata } from 'next';
import Legal from '@/components/Legal';
import { site } from '@/lib/config';

export const metadata: Metadata = { title: 'Privacy Policy', robots: { index: false } };

export default function Privacy() {
  return <Legal title="Privacy Policy" sections={[
    ['Who we are', `${site.legal.entity}, trading as Webcrestio in ${site.legal.address}, operates this website. For questions about how we handle personal information, email ${site.email}.`],
    ['Project enquiries', 'If you use our contact form, we receive your name, email address, the service you are interested in, and the details you provide about your project. You can also provide your business name, store URL, budget range, and preferred timeline. We use these details to respond, discuss your requirements, and prepare a quote where appropriate.'],
    ['Reviews', 'When you submit a review, we collect your name, email address, rating, review text, and any business name you provide. We use this information to moderate your submission. If approved, your name, rating, review text, and any business name you provided may appear on the Reviews page. Your email address is excluded from that page.'],
    ['Website providers', 'Netlify hosts the website and handles requests to it. Resend delivers contact form submissions to our business inbox. Sanity stores website content and review submissions. Your browser connects to Google Fonts to load the typefaces used on the site. The contact and review forms use the request IP address to limit repeated submissions.'],
    ['How long we keep information', 'We keep enquiries that do not become projects for 12 months after the last contact. We keep project agreements and invoices separately for as long as needed for the project and applicable recordkeeping obligations. We delete rejected reviews within 90 days of the moderation decision. We review published reviews annually and remove submitters’ email addresses when they are no longer needed for moderation or follow-up.'],
    ['Your information', `To ask how we use your information or request access, correction, or deletion, contact ${site.email}. You can also raise a concern with the Nigeria Data Protection Commission.`],
  ]} />;
}
