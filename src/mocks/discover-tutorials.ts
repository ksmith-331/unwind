import type { ContinueTutorialPreview, TutorialPreview } from '@/types/tutorial-preview';

// Development-only examples; these are not associated with a real account.
export const continueTutorials = [
  {
    id: 'continue-tapestry-basics',
    title: 'Tapestry Basics',
    difficulty: 2,
    thumbnail: 'placeholder',
    accent: 'primaryAction',
    progress: 35,
  },
  {
    id: 'continue-amigurumi-shaping',
    title: 'Amigurumi Shaping',
    difficulty: 3,
    thumbnail: 'placeholder',
    accent: 'secondaryAction',
    progress: 68,
  },
  {
    id: 'continue-colorwork-motifs',
    title: 'Colorwork Motifs',
    difficulty: 4,
    thumbnail: 'placeholder',
    accent: 'highlight',
    progress: 12,
  },
] satisfies readonly ContinueTutorialPreview[];

export const myTutorials = [
  {
    id: 'mine-textured-stitches',
    title: 'Textured Stitches',
    difficulty: 2,
    thumbnail: 'placeholder',
    accent: 'secondaryAction',
  },
  {
    id: 'mine-mini-baskets',
    title: 'Mini Baskets',
    difficulty: 3,
    thumbnail: 'placeholder',
    accent: 'highlight',
  },
  {
    id: 'mine-flower-granny-square',
    title: 'Flower Granny Square',
    difficulty: 2,
    thumbnail: 'placeholder',
    accent: 'primaryAction',
  },
] satisfies readonly TutorialPreview[];

export const communityTutorials = [
  {
    id: 'community-guide-alpha-patterns',
    title: 'Guide to Alpha Patterns',
    difficulty: 2,
    thumbnail: 'placeholder',
    accent: 'primaryAction',
  },
  {
    id: 'community-start-ending-loops',
    title: 'Start + Ending Loops',
    difficulty: 2,
    thumbnail: 'placeholder',
    accent: 'secondaryAction',
  },
  {
    id: 'community-crochet-crop-top',
    title: 'Crochet Crop Top',
    difficulty: 3,
    thumbnail: 'placeholder',
    accent: 'highlight',
  },
  {
    id: 'community-mushroom-plush',
    title: 'Mushroom Plush',
    difficulty: 2,
    thumbnail: 'placeholder',
    accent: 'primaryAction',
  },
] satisfies readonly TutorialPreview[];
