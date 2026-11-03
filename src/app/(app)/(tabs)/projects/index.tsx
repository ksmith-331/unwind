import { ProjectItemGrid } from '@/components/project-item-grid';
import { projectItems } from '@/mocks/project-items';

export default function ProjectsInProgressRoute() {
  return <ProjectItemGrid items={projectItems} />;
}