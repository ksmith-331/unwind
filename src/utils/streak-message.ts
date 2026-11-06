export function getStreakMessage(streak: number): string {
  if (streak <= 0) {
    return 'Start a streak today!';
  }
  if (streak < 7) {
    return 'Nice start!';
  }
  if (streak < 30) {
    return 'Keep it up!';
  }
  if (streak < 100) {
    return "You're on a roll!";
  }
  return 'Incredible streak!';
}
