import ArchiveNote from '@/app/dashboard/_components/archive-note';
import DeleteNote from '@/app/dashboard/_components/delete-note';
import { Button } from '@/components/ui/button';
import { useNotes } from '@/hooks/useNotes';
import { tryCatch } from '@/hooks/useTryCatch';
import { archiveNote, deleteNote, UserNotesType } from '@/server/actions';
import { EditIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { toast } from 'sonner';

type Props = {
  data: UserNotesType;
};

export default function NoteActions({ data: activeNote }: Props) {
  const router = useRouter();
  const { activeNotes, handleModeSelect } = useNotes();

  const [pendingDelete, startTransitionDelete] = useTransition();
  const [pendingArchive, startTransitionArchive] = useTransition();
  async function handleDelete() {
    startTransitionDelete(async () => {
      if (!activeNote) return;
      const { data: result, error } = await tryCatch(deleteNote(activeNote.id));
      if (error) {
        toast.error('An unexpected error occurred. Please try again.');
        return;
      }

      if (result.success) {
        toast.success(result.message);
        router.push(`/dashboard/${activeNotes}`);
      } else if (!result.success) {
        toast.error(result.message);
      }
    });
  }

  async function handleArchive() {
    startTransitionArchive(async () => {
      if (!activeNote) return;
      const { data: result, error } = await tryCatch(archiveNote(activeNote.id, !activeNote.isArchived));
      if (error) {
        toast.error('An unexpected error occurred. Please try again.');
        return;
      }

      if (result.success) {
        toast.success(result.message);
        router.refresh();
      } else if (!result.success) {
        toast.error(result.message);
      }
    });
  }
  return (
    <>
      <section className="h-full w-full max-w-xs border-l">
        <div className="flex flex-col gap-3 px-4 py-6">
          <Button variant={'outline'} className="h-12 w-full justify-start" onClick={() => handleModeSelect('edit')}>
            <EditIcon className="size-4" />
            Update Note
          </Button>
          <ArchiveNote
            onArchive={handleArchive}
            pending={pendingArchive}
            isArchived={activeNote?.isArchived || false}
          />
          <DeleteNote onDelete={handleDelete} pending={pendingDelete} />
        </div>
      </section>
    </>
  );
}
