import type {
  ContentMediaImageSource,
  ContentMediaSource,
} from '@/types/content-media';

export const patternMediaById: Readonly<Record<string, ContentMediaImageSource>> = {
  'pattern-hearts': require('../../assets/images/pattern-hearts.jpg'),
  'pattern-harbor-chevron': require('../../assets/images/chevron-pattern-preview.png'),
  'community-stuffed-bunny': require('../../assets/images/stuffed-bunny.jpeg'),
  'profile-simple-poinsettia': require('../../assets/images/simple-poinsettia-pattern-preview.jpg'),
};

export const tutorialMediaById: Readonly<Record<string, ContentMediaImageSource>> = {
  'community-guide-alpha-patterns': require('../../assets/images/tutorial-alpha-pattern.jpeg'),
  'tutorial-macrame-ending': require('../../assets/images/tutorial-macrame-ending-preview.jpg'),
  'community-start-ending-loops': require('../../assets/images/tutorial-start-ending-loops.jpg'),
  'profile-crochet-leaf-border': require('../../assets/images/tutorial-leaf-border.png'),
};

export const inventoryMediaById: Readonly<
  Record<
    string,
    {
      thumbnail: ContentMediaImageSource;
      primary: ContentMediaImageSource;
      secondary: ContentMediaImageSource;
    }
  >
> = {
  'peach-embroidery-thread': {
    thumbnail: require('../../assets/images/terracotta-floss-dmc-922-detail.jpg'),
    primary: require('../../assets/images/terracotta-floss-dmc-922.png'),
    secondary: require('../../assets/images/terracotta-floss-dmc-922-detail.jpg'),
  },
};

export function getPatternMedia(id: string): ContentMediaSource {
  return patternMediaById[id] ?? 'placeholder';
}

export function getTutorialMedia(id: string): ContentMediaSource {
  return tutorialMediaById[id] ?? 'placeholder';
}

export function getContentMedia(
  kind: 'pattern' | 'tutorial',
  id: string,
): ContentMediaSource {
  return kind === 'pattern' ? getPatternMedia(id) : getTutorialMedia(id);
}
