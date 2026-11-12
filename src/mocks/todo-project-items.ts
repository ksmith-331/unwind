import type { TodoProjectItem } from '@/types/project-item';
import { getContentMedia } from '@/mocks/content-media';

// Development-only examples; these are not fetched or persisted.
export const todoProjectItems = [
  {
    id: 'pattern-hearts',
    kind: 'pattern',
    status: 'todo',
    title: 'Hearts',
    thumbnail: getContentMedia('pattern', 'pattern-hearts'),
  },
  {
    id: 'tutorial-macrame-ending',
    kind: 'tutorial',
    status: 'todo',
    title: 'Macrame Ending Tutorial',
    thumbnail: getContentMedia('tutorial', 'tutorial-macrame-ending'),
  },
  {
    id: 'pattern-patchwork',
    kind: 'pattern',
    status: 'todo',
    title: 'Patchwork',
    thumbnail: getContentMedia('pattern', 'pattern-patchwork'),
  },
  {
    id: 'pattern-killer-whale',
    kind: 'pattern',
    status: 'todo',
    title: 'Killer Whale',
    thumbnail: getContentMedia('pattern', 'pattern-killer-whale'),
  },
] satisfies readonly TodoProjectItem[];
