import type { TutorialPreview } from '@/types/tutorial-preview';
import { getTutorialMedia } from '@/mocks/content-media';

// Development-only examples; these are not associated with a real account.
export const profileTutorials = [
  {
    id: 'profile-crochet-leaf-border',
    title: 'Crochet Leaf Border',
    difficulty: 2,
    thumbnail: getTutorialMedia('profile-crochet-leaf-border'),
  },
  {
    id: 'profile-woven-wall-hanging',
    title: 'Woven Wall Hanging',
    difficulty: 3,
    thumbnail: 'placeholder',
  },
  {
    id: 'profile-embroidered-wildflowers',
    title: 'Embroidered Wildflowers',
    difficulty: 2,
    thumbnail: 'placeholder',
  },
  {
    id: 'profile-colorwork-pouch',
    title: 'Colorwork Pouch',
    difficulty: 3,
    thumbnail: 'placeholder',
  },
  {
    id: 'profile-mini-macrame-planter',
    title: 'Mini Macrame Planter',
    difficulty: 1,
    thumbnail: 'placeholder',
  },
] satisfies readonly TutorialPreview[];
