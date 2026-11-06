import type { SemanticColor } from '@/theme';

export type PreviewAccent = Extract<
  SemanticColor,
  'primaryAction' | 'secondaryAction' | 'highlight'
>;

const PREVIEW_ACCENTS: readonly PreviewAccent[] = [
  'primaryAction',
  'secondaryAction',
  'highlight',
];

export function getPreviewAccent(index: number): PreviewAccent {
  return PREVIEW_ACCENTS[index % PREVIEW_ACCENTS.length];
}
