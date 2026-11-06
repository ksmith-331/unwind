import { SymbolView } from 'expo-symbols';
import type { Href } from 'expo-router';

import { ContentPreviewCard } from '@/components/content-preview-card';
import type { HistoryItemPreview } from '@/types/history-item-preview';
import { theme } from '@/theme';

type HistoryPreviewCardProps = {
  item: HistoryItemPreview;
};

const COMPLETION_ICON = {
  ios: 'checkmark.circle',
  android: 'check_circle',
  web: 'check_circle',
} as const;

export function HistoryPreviewCard({ item }: HistoryPreviewCardProps) {
  const href: Href =
    item.kind === 'pattern'
      ? {
          pathname: '/pattern/[patternId]',
          params: { patternId: item.contentId },
        }
      : {
          pathname: '/tutorial/[tutorialId]',
          params: { tutorialId: item.contentId },
        };

  return (
    <ContentPreviewCard
      accessibilityLabel={`${item.title}, difficulty ${item.difficulty} out of 4${item.isComplete ? ', completed' : ''}`}
      accent={item.accent}
      accessory={
        item.isComplete ? (
          <SymbolView
            accessibilityElementsHidden
            importantForAccessibility="no-hide-descendants"
            name={COMPLETION_ICON}
            size={18}
            tintColor={theme.colors.textOnDark}
          />
        ) : undefined
      }
      difficulty={item.difficulty}
      href={href}
      title={item.title}
    />
  );
}
