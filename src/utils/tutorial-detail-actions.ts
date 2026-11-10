import type { DetailAction } from '@/types/detail-action';
import type {
  TutorialActionResolution,
  TutorialDetail,
} from '@/types/tutorial-detail';

const IN_PROGRESS_ACTIONS = [
  { id: 'continue', label: 'Continue' },
  { id: 'restart', label: 'Restart' },
  { id: 'complete', label: 'Complete' },
  { id: 'remove', label: 'Remove' },
] as const satisfies readonly DetailAction[];

export function resolveTutorialDetailActions(
  tutorial: Pick<
    TutorialDetail,
    'status' | 'isInToDo' | 'isOwnedByCurrentUser'
  >,
): TutorialActionResolution {
  switch (tutorial.status) {
    case 'in-progress':
      return { supported: true, actions: IN_PROGRESS_ACTIONS };
    case 'not-started':
      return {
        supported: true,
        actions: [
          { id: 'start', label: 'Start' },
          ...(tutorial.isOwnedByCurrentUser
            ? [{ id: 'edit', label: 'Edit' } satisfies DetailAction]
            : []),
          tutorial.isInToDo
            ? { id: 'remove-to-do', label: 'Remove' }
            : { id: 'add-to-do', label: 'Add To-Do' },
        ],
      };
    case 'completed':
      return {
        supported: false,
        reason: 'Completed Tutorial actions have not been defined.',
      };
  }
}
