import type { Metadata } from 'next';
import Cta from '@/components/Cta';
import WorkSection from '@/components/WorkSection';
import { getProjects } from '@/lib/portfolio';

export const metadata: Metadata = {
  title: 'Work',
  description: 'Explore storefront design and product creative from Webcrestio.',
};

export default async function Work() {
  const projects = await getProjects();

  return (
    <>
      <section className="ph">
        <WorkSection projects={projects} intro={<>
          <div className="eb">Work</div>
          <h1>Thoughtful work. <em>Different possibilities.</em></h1>
          <p className="lead">Explore storefront design, shopping experiences, and product creative.</p>
        </>} />
      </section>
      <Cta />
    </>
  );
}
