'use client';

import { Button } from '@/components/ui/button';
import { tryCatch } from '@/hooks/useTryCatch';
import { cn } from '@/lib/utils';
import { archiveNote, deleteNote, UserNotesType } from '@/server/actions';
import { ArrowLeftIcon, Clock3Icon, PlusIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useTransition } from 'react';
import { toast } from 'sonner';
import CreateNote from './create-note';
import ViewNote from './view-note';

type Props = {
  userNotes: UserNotesType[];
  category: string;
  search?: string;
};

export default function DashboardContent({ userNotes, category, search }: Props) {
  const router = useRouter();
  const [pendingDelete, startTransitionDelete] = useTransition();
  const [pendingArchive, startTransitionArchive] = useTransition();
  const [activeNote, setActiveNote] = useState<UserNotesType | null>(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);

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
        router.refresh();
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

  useEffect(() => {
    if (userNotes.length > 0) {
      setActiveNote(userNotes[0]);
    } else {
      setActiveNote(null);
    }
  }, [userNotes]);

  useEffect(() => {
    if (isEditorOpen) {
      setActiveNote(null);
    }
  }, [isEditorOpen]);

  const handleViewNote = (id: string) => {
    const note = userNotes.find((n) => n.id === id) || null;
    if (isEditorOpen) {
      setIsEditorOpen(false);
    }

    setActiveNote(note);
  };

  const emptyStateDescription =
    category === 'all'
      ? "You don't have any notes yet. Start a new note to capture your thoughts and ideas."
      : 'No notes have been archived yet. Move notes here for safekeeping.';

  return (
    <div className="flex w-full divide-x">
      <section className="flex h-full w-full max-w-md min-w-[18rem] flex-col">
        <div className="p-4">
          <div className="flex h-23 items-center justify-center px-4">
            <Button className="h-12 w-full text-white capitalize" onClick={() => setIsEditorOpen((prev) => !prev)}>
              {isEditorOpen ? (
                <>
                  <ArrowLeftIcon /> Back
                </>
              ) : (
                <>
                  <PlusIcon /> Create New Note
                </>
              )}
            </Button>
          </div>

          <ul className="no-scrollbar max-h-[calc(100vh-10.75rem)] overflow-y-auto border-t py-6">
            {isEditorOpen && (
              <li>
                <Button
                  variant={'ghost'}
                  className="bg-accent dark:bg-accent/50 h-auto w-full flex-col items-start gap-3 truncate p-4"
                >
                  <h1 className="text-left text-base font-semibold text-wrap">Untitled Note</h1>
                </Button>
              </li>
            )}
            {userNotes.length === 0 ? (
              <li className="text-muted-foreground px-4 py-6 text-center text-balance">
                {search ? (
                  <p className="text-muted-foreground">
                    No notes matched <span className="font-semibold">&quot;{search}&quot;</span>. Try adjusting your
                    keywords.
                  </p>
                ) : (
                  emptyStateDescription
                )}
              </li>
            ) : (
              userNotes.map(({ id, title, updatedAt, description }) => (
                <li key={id} className="border-b py-2 last:border-b-0">
                  <Button
                    variant={'ghost'}
                    className={cn(
                      'h-auto w-full flex-col items-start gap-3 truncate p-4',
                      activeNote?.id === id && 'bg-accent dark:bg-accent/50',
                    )}
                    onClick={() => handleViewNote(id)}
                  >
                    <h1 className="line-clamp-2 max-w-full truncate text-left text-base font-semibold text-wrap">
                      {title}
                    </h1>
                    <p className="text-muted-foreground line-clamp-2 w-full truncate text-left text-wrap">
                      {description}
                    </p>

                    <div className="text-muted-foreground flex items-center gap-2 text-xs">
                      <Clock3Icon />
                      {updatedAt.toLocaleString()}
                    </div>
                  </Button>
                </li>
              ))
            )}
          </ul>
        </div>
      </section>
      <section className="max-h-[calc(100vh-5rem)] flex-1 overflow-y-auto">
        <div className="flex h-full flex-col gap-3">
          {isEditorOpen && <CreateNote setIsEditorOpen={setIsEditorOpen} category={category} />}
          {!isEditorOpen && activeNote && (
            <ViewNote
              data={activeNote}
              onArchive={handleArchive}
              onDelete={handleDelete}
              pendingArchive={pendingArchive}
              pendingDelete={pendingDelete}
            />
          )}
        </div>
      </section>
    </div>
  );
}
