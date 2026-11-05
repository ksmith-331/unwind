import type { PatternPreview } from '@/types/pattern-preview';

// Development-only examples; these are not fetched or persisted.
export const profilePatterns = [
  {
    id: 'profile-simple-poinsettia',
    title: 'Simple Poinsettia',
    difficulty: 2,
    thumbnail: 'placeholder',
    accent: 'primaryAction',
  },
  {
    id: 'profile-wave-diagonal',
    title: 'Wave Diagonal',
    difficulty: 1,
    thumbnail: 'placeholder',
    accent: 'secondaryAction',
  },
  {
    id: 'profile-rainbow-crossover',
    title: 'Rainbow Crossover',
    difficulty: 3,
    thumbnail: 'placeholder',
    accent: 'highlight',
  },
  {
    id: 'profile-bird-alpha',
    title: 'Bird Alpha',
    difficulty: 3,
    thumbnail: 'placeholder',
    accent: 'primaryAction',
  },
  {
    id: 'profile-winter-house',
    title: 'Winter House',
    difficulty: 2,
    thumbnail: 'placeholder',
    accent: 'secondaryAction',
  },
] satisfies readonly PatternPreview[];
