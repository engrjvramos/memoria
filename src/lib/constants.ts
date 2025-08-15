import { ArchiveIcon, HomeIcon } from 'lucide-react';

export const VALID_CATEGORIES = ['all', 'archived'];

export const SIDEBAR_CATEGORIES = [
  {
    id: 'all',
    label: 'All Notes',
    icon: HomeIcon,
  },
  {
    id: 'archived',
    label: 'Archived Notes',
    icon: ArchiveIcon,
  },
];
