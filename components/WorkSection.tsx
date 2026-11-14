import type { ReactNode } from 'react';
import type { Project } from '@/lib/projects';
import WorkCard from './WorkCard';

export default function WorkSection({
  intro,
  projects,
}: {
  intro: ReactNode;
  projects: Project[];
}) {
  return (
    <div className="w work-scroll">
      <div className="work-intro">{intro}</div>
      <div className="work-cards">
        {projects.map((project) => <WorkCard key={project.slug} p={project} />)}
      </div>
    </div>
  );
}
