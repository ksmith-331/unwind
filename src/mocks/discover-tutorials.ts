import type { ContinueTutorialPreview, TutorialPreview } from '@/types/tutorial-preview';

// Development-only examples; these are not associated with a real account.
export const continueTutorials = [
  {
    id: 'continue-tapestry-basics',
    title: 'Tapestry Basics',
    difficulty: 2,
    thumbnail: 'placeholder',
    progress: 35,
  },
  {
    id: 'continue-amigurumi-shaping',
    title: 'Amigurumi Shaping',
    difficulty: 3,
    thumbnail: 'placeholder',
    progress: 68,
  },
  {
    id: 'continue-colorwork-motifs',
    title: 'Colorwork Motifs',
    difficulty: 4,
    thumbnail: 'placeholder',
    progress: 12,
  },
] satisfies readonly ContinueTutorialPreview[];

export const myTutorials = [
  {
    id: 'mine-textured-stitches',
    title: 'Textured Stitches',
    difficulty: 2,
    thumbnail: 'placeholder',
  },
  {
    id: 'mine-mini-baskets',
    title: 'Mini Baskets',
    difficulty: 3,
    thumbnail: 'placeholder',
  },
  {
    id: 'mine-flower-granny-square',
    title: 'Flower Granny Square',
    difficulty: 2,
    thumbnail: 'placeholder',
  },
] satisfies readonly TutorialPreview[];

export const communityTutorials = [
  {
    id: 'community-guide-alpha-patterns',
    title: 'Guide to Alpha Patterns',
    difficulty: 2,
    thumbnail: 'placeholder',
  },
  {
    id: 'community-start-ending-loops',
    title: 'Start + Ending Loops',
    difficulty: 2,
    thumbnail: 'placeholder',
  },
  {
    id: 'community-crochet-crop-top',
    title: 'Crochet Crop Top',
    difficulty: 3,
    thumbnail: 'placeholder',
  },
  {
    id: 'community-mushroom-plush',
    title: 'Mushroom Plush',
    difficulty: 2,
    thumbnail: 'placeholder',
  },
] satisfies readonly TutorialPreview[];
