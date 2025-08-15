'use client';

import { NoData } from '@/components/svg';
import { Button } from '@/components/ui/button';
import { useNotes } from '@/hooks/useNotes';
import CreateNote from '../_components/create-note';

export default function CategoryPage() {
  const { modeParam, notes, handleModeSelect, searchParam } = useNotes();

  const isCreateMode = modeParam === 'create';

  return (
    <div className="flex w-full items-center justify-center">
      {isCreateMode && <CreateNote />}

      {!isCreateMode && notes.length === 0 && !searchParam && (
        <div className="flex flex-col items-center justify-center p-8 text-center">
          <div className="mb-4 flex items-center justify-center">
            <NoData className="text-primary size-40" />
          </div>
          <h2 className="text-xl font-semibold">No notes yet!</h2>
          <p className="text-muted-foreground mt-2 mb-4 text-balance">
            It looks a little empty here. Start by creating your first note.
          </p>
          <Button className="h-10 text-white capitalize" onClick={() => handleModeSelect('create')}>
            Create Note
          </Button>
        </div>
      )}
    </div>
  );
}
