'use client';

import EditNote from '@/app/dashboard/_components/edit-note';
import ViewNote from '@/app/dashboard/_components/view-note';
import { useNotes } from '@/hooks/useNotes';
import { UserNotesType } from '@/server/actions';
import { use } from 'react';
import NoteActions from './note-actions';

type NoteContentProps = {
  noteContentPromise: Promise<UserNotesType | null>;
};

export default function NoteContent({ noteContentPromise }: NoteContentProps) {
  const noteContent = use(noteContentPromise);
  const { modeParam } = useNotes();

  const isEditMode = modeParam === 'edit';

  return (
    <section className="flex h-full max-h-[calc(100vh-5rem)] w-full flex-1 items-center justify-center overflow-y-auto">
      {noteContent && (
        <>
          {isEditMode ? <EditNote initialValues={noteContent} /> : <ViewNote data={noteContent} />}
          <NoteActions data={noteContent} />
        </>
      )}
    </section>
  );
}
