import type { DetailAction } from '@/types/detail-action';

export const INVENTORY_DETAIL_ACTIONS = [
  { id: 'duplicate', label: 'Duplicate' },
  { id: 'edit', label: 'Edit' },
  { id: 'delete', label: 'Delete' },
] as const satisfies readonly DetailAction[];
