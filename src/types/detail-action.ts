export type DetailActionId =
  | 'start'
  | 'continue'
  | 'edit'
  | 'complete'
  | 'remove'
  | 'add-to-do'
  | 'remove-to-do'
  | 'restart'
  | 'delete'
  | 'duplicate';

export type DetailAction = {
  id: DetailActionId;
  label: string;
};
