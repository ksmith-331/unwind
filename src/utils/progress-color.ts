import type { SemanticColor } from '@/theme';

export function getProgressColor(progress: number): SemanticColor {
  if (progress <= 25) {
    return 'primaryAction';
  }
  if (progress <= 75) {
    return 'highlight';
  }
  return 'secondaryAction';
}
