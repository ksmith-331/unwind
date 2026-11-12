import { ScrollView, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/app-text';
import { StatRow } from '@/components/stat-row';
import { StreakCard } from '@/components/streak-card';
import { userStatsPreview } from '@/mocks/user-stats-preview';
import { theme } from '@/theme';
import { getStreakMessage } from '@/utils/streak-message';

function getDayLabel(days: number) {
  return `${days} ${days === 1 ? 'day' : 'days'}`;
}

export default function ProfileStatsRoute() {
  const streakMessage = getStreakMessage(userStatsPreview.dailyStreak);
  const statsRows = [
    { label: 'Projects Completed', value: userStatsPreview.projectsCompleted },
    { label: 'Projects Created', value: userStatsPreview.projectsCreated },
    { label: 'Reviews Created', value: userStatsPreview.reviewsCreated },
    { label: 'Tutorials Created', value: userStatsPreview.tutorialsCreated },
    { label: 'Tutorials Completed', value: userStatsPreview.tutorialsCompleted },
    { label: 'Project Types Made', value: userStatsPreview.projectTypesMade },
    { label: 'Materials Logged', value: userStatsPreview.materialsLogged },
  ] as const;

  return (
    <View style={styles.page}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}>
        <StreakCard
          accessibilityLabel={`Daily streak: ${userStatsPreview.dailyStreak} days. ${streakMessage}`}
          message={streakMessage}
          streakCount={userStatsPreview.dailyStreak}
          style={styles.streakCard}
        />
        <View
          accessible
          accessibilityLabel={`Longest streak: ${getDayLabel(userStatsPreview.longestStreak)}`}
          style={styles.longestStreak}>
          <AppText variant="bodySmall">
            Longest Streak: {getDayLabel(userStatsPreview.longestStreak)}
          </AppText>
        </View>
        <View style={styles.sectionHeading}>
          <AppText variant="bodySmall">Your Stats:</AppText>
        </View>
        <View style={styles.statsList}>
          {statsRows.map(({ label, value }) => (
            <StatRow key={label} label={label} value={value} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    position: 'relative',
  },
  content: {
    alignItems: 'center',
    flexGrow: 1,
    paddingBottom: theme.spacing[5],
    paddingHorizontal: theme.spacing[5],
    paddingTop: theme.spacing[6],
  },
  streakCard: {
    alignItems: 'center',
    marginBottom: theme.spacing[2],
    width: '82%',
  },
  longestStreak: {
    ...theme.shadows.neutral,
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radii.medium,
    marginBottom: theme.spacing[6],
    paddingHorizontal: theme.spacing[2],
    paddingVertical: theme.spacing[2],
  },
  sectionHeading: {
    ...theme.shadows.neutral,
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    borderBottomColor: theme.colors.navigation,
    borderBottomWidth: 2,
    borderRadius: theme.radii.medium,
    marginBottom: theme.spacing[4],
    paddingHorizontal: theme.spacing[6],
    paddingVertical: theme.spacing[2],
    width: '56%',
  },
  statsList: {
    alignSelf: 'center',
    gap: theme.spacing[5],
    width: '82%',
  },
});
