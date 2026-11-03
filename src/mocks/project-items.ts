import type { InProgressProjectItem } from '@/types/project-item';

// Development-only examples; these are not fetched or persisted.
export const projectItems = [
  {
    id: 'pattern-harbor-chevron',
    kind: 'pattern',
    status: 'inProgress',
    title: 'Harbor Chevron',
    progress: 12,
  },
  {
    id: 'tutorial-double-diamond',
    kind: 'tutorial',
    status: 'inProgress',
    title: 'Double Diamond',
    progress: 91,
  },
  {
    id: 'pattern-meadow-mosaic',
    kind: 'pattern',
    status: 'inProgress',
    title: 'Meadow Mosaic',
    progress: 27,
  },
  {
    id: 'tutorial-woodland-friends',
    kind: 'tutorial',
    status: 'inProgress',
    title: 'Woodland Friends',
    progress: 4,
  },
  {
    id: 'pattern-twisted-cord',
    kind: 'pattern',
    status: 'inProgress',
    title: 'Twisted Cord',
    progress: 85,
  },
  {
    id: 'tutorial-sunrise-chain',
    kind: 'tutorial',
    status: 'inProgress',
    title: 'Sunrise Chain',
    progress: 53,
  },
] satisfies readonly InProgressProjectItem[];
