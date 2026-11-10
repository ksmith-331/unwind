import type { ImageSourcePropType } from 'react-native';

export type InventoryDetail = {
  inventoryItemId: string;
  title: string;
  brand: string;
  color: string;
  type: string;
  size: string;
  sku: string;
  stockedAt: readonly string[];
  notes: readonly string[];
  restockPreview: string;
  restockDetails: string;
  primaryMedia: ImageSourcePropType;
  secondaryMedia: ImageSourcePropType;
};
