import type { InventoryDetail } from '@/types/inventory-detail';
import { inventoryMediaById } from '@/mocks/content-media';

export const inventoryDetails: Readonly<Record<string, InventoryDetail>> = {
  'peach-embroidery-thread': {
    inventoryItemId: 'peach-embroidery-thread',
    title: 'Terracotta Floss - DMC 922',
    brand: 'DMC',
    color: 'Terracotta - DMC 922',
    type: 'Six-Strand Embroidery Floss',
    size: '8.7 yard/8 meter',
    sku: '117MC-E_922',
    stockedAt: ['Michaels', 'Amazon', 'JOANN Fabrics', 'Walmart'],
    notes: [
      'Use for color in orange cat pattern',
      'Bought 3/11 at Michaels for $0.79',
      'Goes well with DMC 938',
    ],
    restockPreview: 'Find a store near me . . .',
    restockDetails:
      'This restock reminder will help you find stores that may carry this item. Store search is not available yet.',
    primaryMedia: inventoryMediaById['peach-embroidery-thread'].primary,
    secondaryMedia: inventoryMediaById['peach-embroidery-thread'].secondary,
  },
};
