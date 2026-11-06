import type { UserStatsPreview } from '@/types/user-stats-preview';

// Development-only user progress preview.
export const userStatsPreview = {
  dailyStreak: 15,
  longestStreak: 30,
  projectsCompleted: 123,
  projectsCreated: 15,
  reviewsCreated: 89,
  tutorialsCreated: 7,
  tutorialsCompleted: 18,
  projectTypesMade: 4,
  materialsLogged: 212,
} satisfies UserStatsPreview;
