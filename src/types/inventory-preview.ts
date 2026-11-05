import type { ImageSourcePropType } from 'react-native';

export type InventoryThumbnail =
  | {
      state: 'placeholder';
      color: string;
      strandColor: string;
    }
  | {
      state: 'image';
      source: ImageSourcePropType;
    };

export type InventoryPreview = {
  id: string;
  name: string;
  thumbnail: InventoryThumbnail;
};
