import type { TutorialPreview } from '@/types/tutorial-preview';

// Development-only examples; these are not associated with a real account.
export const profileTutorials = [
  {
    id: 'profile-crochet-leaf-border',
    title: 'Crochet Leaf Border',
    difficulty: 2,
    thumbnail: 'placeholder',
    accent: 'secondaryAction',
  },
  {
    id: 'profile-woven-wall-hanging',
    title: 'Woven Wall Hanging',
    difficulty: 3,
    thumbnail: 'placeholder',
    accent: 'highlight',
  },
  {
    id: 'profile-embroidered-wildflowers',
    title: 'Embroidered Wildflowers',
    difficulty: 2,
    thumbnail: 'placeholder',
    accent: 'primaryAction',
  },
  {
    id: 'profile-colorwork-pouch',
    title: 'Colorwork Pouch',
    difficulty: 3,
    thumbnail: 'placeholder',
    accent: 'secondaryAction',
  },
  {
    id: 'profile-mini-macrame-planter',
    title: 'Mini Macrame Planter',
    difficulty: 1,
    thumbnail: 'placeholder',
    accent: 'highlight',
  },
] satisfies readonly TutorialPreview[];
