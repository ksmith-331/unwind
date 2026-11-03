import { ProjectItemGrid } from '@/components/project-item-grid';
import { todoProjectItems } from '@/mocks/todo-project-items';

export default function ProjectsTodoRoute() {
  return <ProjectItemGrid items={todoProjectItems} />;
}