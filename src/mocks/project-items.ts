import type { InProgressProjectItem } from '@/types/project-item';
import { getContentMedia } from '@/mocks/content-media';
import { guideToAlphaPatterns } from '@/mocks/tutorial-details';

// Development-only examples; these are not fetched or persisted.
export const projectItems = [
  {
    id: 'pattern-harbor-chevron',
    kind: 'pattern',
    status: 'inProgress',
    title: 'Chevron',
    progress: 12,
    thumbnail: getContentMedia('pattern', 'pattern-harbor-chevron'),
  },
  {
    id: guideToAlphaPatterns.tutorialId,
    kind: 'tutorial',
    status: 'inProgress',
    title: guideToAlphaPatterns.title,
    progress: guideToAlphaPatterns.percentProgress,
    thumbnail: guideToAlphaPatterns.media,
  },
  {
    id: 'tutorial-double-diamond',
    kind: 'tutorial',
    status: 'inProgress',
    title: 'Double Diamond',
    progress: 91,
    thumbnail: getContentMedia('tutorial', 'tutorial-double-diamond'),
  },
  {
    id: 'pattern-meadow-mosaic',
    kind: 'pattern',
    status: 'inProgress',
    title: 'Meadow Mosaic',
    progress: 27,
    thumbnail: getContentMedia('pattern', 'pattern-meadow-mosaic'),
  },
  {
    id: 'tutorial-woodland-friends',
    kind: 'tutorial',
    status: 'inProgress',
    title: 'Woodland Friends',
    progress: 4,
    thumbnail: getContentMedia('tutorial', 'tutorial-woodland-friends'),
  },
  {
    id: 'pattern-twisted-cord',
    kind: 'pattern',
    status: 'inProgress',
    title: 'Twisted Cord',
    progress: 85,
    thumbnail: getContentMedia('pattern', 'pattern-twisted-cord'),
  },
  {
    id: 'tutorial-sunrise-chain',
    kind: 'tutorial',
    status: 'inProgress',
    title: 'Sunrise Chain',
    progress: 53,
    thumbnail: getContentMedia('tutorial', 'tutorial-sunrise-chain'),
  },
] satisfies readonly InProgressProjectItem[];
