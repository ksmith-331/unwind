import type { TodoProjectItem } from '@/types/project-item';

// Development-only examples; these are not fetched or persisted.
export const todoProjectItems = [
  {
    id: 'pattern-hearts',
    kind: 'pattern',
    status: 'todo',
    title: 'Hearts',
  },
  {
    id: 'tutorial-macrame-ending',
    kind: 'tutorial',
    status: 'todo',
    title: 'Macrame Ending Tutorial',
  },
  {
    id: 'pattern-patchwork',
    kind: 'pattern',
    status: 'todo',
    title: 'Patchwork',
  },
  {
    id: 'pattern-killer-whale',
    kind: 'pattern',
    status: 'todo',
    title: 'Killer Whale',
  },
] satisfies readonly TodoProjectItem[];
