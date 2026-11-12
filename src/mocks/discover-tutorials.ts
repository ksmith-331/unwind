import type { ContinueTutorialPreview, TutorialPreview } from '@/types/tutorial-preview';
import { getTutorialMedia } from '@/mocks/content-media';
import {
  guideToAlphaPatterns,
  tutorialDetails,
} from '@/mocks/tutorial-details';

// Development-only examples; these are not associated with a real account.
export const continueTutorials = Object.values(tutorialDetails).flatMap(
  (tutorial) =>
    tutorial.status === 'in-progress' && tutorial.percentProgress !== undefined
      ? [
          {
            id: tutorial.tutorialId,
            title: tutorial.title,
            difficulty: tutorial.difficulty,
            thumbnail: tutorial.media,
            progress: tutorial.percentProgress,
          },
        ]
      : [],
) satisfies readonly ContinueTutorialPreview[];

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
  {
    id: 'profile-crochet-leaf-border',
    title: 'Crochet Leaf Border',
    difficulty: 2,
    thumbnail: getTutorialMedia('profile-crochet-leaf-border'),
  },
] satisfies readonly TutorialPreview[];

export const communityTutorials = [
  {
    id: guideToAlphaPatterns.tutorialId,
    title: guideToAlphaPatterns.title,
    difficulty: guideToAlphaPatterns.difficulty,
    thumbnail: guideToAlphaPatterns.media,
  },
  {
    id: 'community-start-ending-loops',
    title: 'Start + Ending Loops',
    difficulty: 2,
    thumbnail: getTutorialMedia('community-start-ending-loops'),
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
