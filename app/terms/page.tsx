import type { Metadata } from 'next';
import Legal from '@/components/Legal';
import { site } from '@/lib/config';

export const metadata: Metadata = { title: 'Terms of Use', robots: { index: false } };

export default function Terms() {
  return <Legal title="Terms of Use" sections={[
    ['Website and enquiries', `${site.legal.entity}, trading as Webcrestio in ${site.legal.address}, provides information about services and portfolio work on this website. You can use the contact form to request a quote.`],
    ['Project agreements', 'We agree the scope, fees, and delivery schedule with you in writing before starting work. The terms agreed for your project apply to that engagement, including any arrangements for revisions, payment, cancellation, or refunds.'],
    ['Payment', 'For direct fixed-price work, our usual arrangement is 50% upfront and 50% after approval and before final handover. Larger projects may use milestones set out in the quote. For work booked through Fiverr or Upwork, the platform’s payment rules apply.'],
    ['Cancellation and refunds', 'For direct projects, we refund the advance if you cancel before work starts. Once work has started, we charge for work completed and agreed third-party costs already incurred, then refund any unused balance. The written quote explains how charges are calculated. Applicable consumer rights continue to apply.'],
    ['Portfolio', 'Work labelled as a concept is a design exploration or creative sample. Concept visuals illustrate design direction and do not represent measured sales or performance.'],
    ['Website content', 'The text, designs, and imagery on this site may be owned by Webcrestio or other rights holders. Ask the relevant rights holder before reusing material that requires permission.'],
    ['Contact', `For questions about these terms or a project agreement, email ${site.email}.`],
  ]} />;
}
