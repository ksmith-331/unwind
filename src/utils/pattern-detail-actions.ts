import type {
  PatternActionResolution,
  PatternDetail,
  PatternDetailAction,
} from '@/types/pattern-detail';

const IN_PROGRESS_ACTIONS = [
  { id: 'continue', label: 'Continue' },
  { id: 'edit', label: 'Edit' },
  { id: 'complete', label: 'Complete' },
  { id: 'remove', label: 'Remove' },
] as const satisfies readonly PatternDetailAction[];

const NOT_STARTED_IN_TODO_ACTIONS = [
  { id: 'start', label: 'Start' },
  { id: 'edit', label: 'Edit' },
  { id: 'remove', label: 'Remove' },
] as const satisfies readonly PatternDetailAction[];

const NOT_STARTED_ACTIONS = [
  { id: 'start', label: 'Start' },
  { id: 'edit', label: 'Edit' },
  { id: 'add-to-do', label: 'Add To-Do' },
] as const satisfies readonly PatternDetailAction[];

export function resolvePatternDetailActions(
  pattern: Pick<PatternDetail, 'status' | 'isInToDo'>,
): PatternActionResolution {
  switch (pattern.status) {
    case 'in-progress':
      return { supported: true, actions: IN_PROGRESS_ACTIONS };
    case 'not-started':
      return {
        supported: true,
        actions: pattern.isInToDo
          ? NOT_STARTED_IN_TODO_ACTIONS
          : NOT_STARTED_ACTIONS,
      };
    case 'completed':
      return {
        supported: false,
        reason: 'Completed Pattern actions have not been defined.',
      };
  }
}
