import type { InventoryPreview } from '@/types/inventory-preview';

// Development-only examples; these are not fetched or persisted.
export const inventoryItems = [
  {
    id: 'sunset-cotton-yarn',
    name: 'Sunset cotton yarn',
    thumbnail: { state: 'placeholder', color: '#C94824', strandColor: '#F5A05A' },
  },
  {
    id: 'orchid-acrylic-yarn',
    name: 'Orchid acrylic yarn',
    thumbnail: { state: 'placeholder', color: '#A64C9C', strandColor: '#E4A8D9' },
  },
  {
    id: 'forest-wool-yarn',
    name: 'Forest wool yarn',
    thumbnail: { state: 'placeholder', color: '#245A35', strandColor: '#78A36D' },
  },
  {
    id: 'natural-linen-thread',
    name: 'Natural linen thread',
    thumbnail: { state: 'placeholder', color: '#C3B995', strandColor: '#F0E7C8' },
  },
  {
    id: 'charcoal-wool-yarn',
    name: 'Charcoal wool yarn',
    thumbnail: { state: 'placeholder', color: '#39342D', strandColor: '#8B8174' },
  },
  {
    id: 'slate-cotton-yarn',
    name: 'Slate cotton yarn',
    thumbnail: { state: 'placeholder', color: '#55546C', strandColor: '#AAA8C1' },
  },
  {
    id: 'seafoam-cotton-yarn',
    name: 'Seafoam cotton yarn',
    thumbnail: { state: 'placeholder', color: '#168C7E', strandColor: '#7BD1BC' },
  },
  {
    id: 'berry-wool-yarn',
    name: 'Berry wool yarn',
    thumbnail: { state: 'placeholder', color: '#762E38', strandColor: '#C76D68' },
  },
  {
    id: 'peach-embroidery-thread',
    name: 'Terracotta Floss - DMC 922',
    thumbnail: {
      state: 'image',
      source: require('../../assets/images/terracotta-floss-dmc-922.png'),
    },
  },
  {
    id: 'cherry-cotton-yarn',
    name: 'Cherry cotton yarn',
    thumbnail: { state: 'placeholder', color: '#C81722', strandColor: '#F16A62' },
  },
  {
    id: 'marigold-acrylic-yarn',
    name: 'Marigold acrylic yarn',
    thumbnail: { state: 'placeholder', color: '#D98212', strandColor: '#F7C75D' },
  },
  {
    id: 'deep-teal-wool-yarn',
    name: 'Deep teal wool yarn',
    thumbnail: { state: 'placeholder', color: '#075D69', strandColor: '#55A9AE' },
  },
] satisfies readonly InventoryPreview[];
