import type { PatternPreview } from '@/types/pattern-preview';

// Development-only examples; these are not fetched or persisted.
export const communityPatterns = [
  {
    id: 'community-stuffed-bunny',
    title: 'Stuffed Bunny',
    difficulty: 4,
    thumbnail: 'placeholder',
    accent: 'primaryAction',
  },
  {
    id: 'community-interlocking-diamonds',
    title: 'Interlocking Diamonds',
    difficulty: 3,
    thumbnail: 'placeholder',
    accent: 'secondaryAction',
  },
  {
    id: 'community-crochet-coasters',
    title: 'Crochet Coasters',
    difficulty: 2,
    thumbnail: 'placeholder',
    accent: 'highlight',
  },
  {
    id: 'community-simple-hearts',
    title: 'Simple Hearts',
    difficulty: 3,
    thumbnail: 'placeholder',
    accent: 'primaryAction',
  },
] satisfies readonly PatternPreview[];

export const myPatterns = [
  {
    id: 'mine-seaside-stripes',
    title: 'Seaside Stripes',
    difficulty: 2,
    thumbnail: 'placeholder',
    accent: 'secondaryAction',
  },
  {
    id: 'mine-woven-sunrise',
    title: 'Woven Sunrise',
    difficulty: 3,
    thumbnail: 'placeholder',
    accent: 'highlight',
  },
  {
    id: 'mine-cedar-braid',
    title: 'Cedar Braid',
    difficulty: 1,
    thumbnail: 'placeholder',
    accent: 'primaryAction',
  },
  {
    id: 'mine-petal-medallion',
    title: 'Petal Medallion',
    difficulty: 4,
    thumbnail: 'placeholder',
    accent: 'secondaryAction',
  },
  {
    id: 'mine-tidal-weave',
    title: 'Tidal Weave',
    difficulty: 2,
    thumbnail: 'placeholder',
    accent: 'highlight',
  },
] satisfies readonly PatternPreview[];
