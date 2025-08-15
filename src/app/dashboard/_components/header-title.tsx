'use client';

import { usePathname } from 'next/navigation';

export default function HeaderTitle() {
  const pathname = usePathname();
  const activeNotes = pathname.split('/')[2] || 'all';

  return (
    <div className="flex flex-col">
      <h1 className="text-xl font-bold">{activeNotes === 'archived' ? 'Archived Notes' : 'All Notes'}</h1>
    </div>
  );
}
