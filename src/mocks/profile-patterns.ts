import type { PatternPreview } from '@/types/pattern-preview';

// Development-only examples; these are not fetched or persisted.
export const profilePatterns = [
  {
    id: 'profile-simple-poinsettia',
    title: 'Simple Poinsettia',
    difficulty: 3,
    thumbnail: 'placeholder',
  },
  {
    id: 'profile-wave-diagonal',
    title: 'Wave Diagonal',
    difficulty: 1,
    thumbnail: 'placeholder',
  },
  {
    id: 'profile-rainbow-crossover',
    title: 'Rainbow Crossover',
    difficulty: 3,
    thumbnail: 'placeholder',
  },
  {
    id: 'profile-bird-alpha',
    title: 'Bird Alpha',
    difficulty: 3,
    thumbnail: 'placeholder',
  },
  {
    id: 'profile-winter-house',
    title: 'Winter House',
    difficulty: 2,
    thumbnail: 'placeholder',
  },
] satisfies readonly PatternPreview[];
