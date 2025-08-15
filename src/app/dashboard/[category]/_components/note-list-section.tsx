'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useNotes } from '@/hooks/useNotes';
import { cn } from '@/lib/utils';
import { Clock3Icon, PlusIcon } from 'lucide-react';
import Link from 'next/link';

export default function NoteListSection() {
  const { handleModeSelect, modeParam, notes, activeNotes, searchParam, activeNoteId } = useNotes();

  const emptyStateDescription =
    activeNotes === 'all'
      ? "You don't have any notes yet. Start a new note to capture your thoughts and ideas."
      : 'No notes have been archived yet. Move notes here for safekeeping.';

  return (
    <section className="flex h-full w-full max-w-md min-w-[18rem] flex-col border-r">
      <div className="p-4">
        <div className="flex h-23 items-center justify-center px-4">
          <Button
            variant={modeParam ? 'outline' : 'default'}
            className="h-12 w-full text-white capitalize"
            onClick={() => handleModeSelect('create')}
          >
            {modeParam ? (
              'Cancel'
            ) : (
              <>
                <PlusIcon /> Create New Note
              </>
            )}
          </Button>
        </div>

        <ul className="no-scrollbar max-h-[calc(100vh-10.75rem)] overflow-y-auto border-t py-6">
          {modeParam === 'create' && (
            <li>
              <Button
                variant={'ghost'}
                className="bg-accent dark:bg-accent/50 h-auto w-full flex-col items-start gap-3 truncate p-4"
              >
                <h1 className="text-left text-base font-semibold text-wrap">Untitled Note</h1>
              </Button>
            </li>
          )}
          {notes.length === 0 ? (
            <li className="text-muted-foreground px-4 py-6 text-center text-balance">
              {searchParam ? (
                <p className="text-muted-foreground">
                  No notes matched <span className="font-semibold">&quot;{searchParam}&quot;</span>. Try adjusting your
                  keywords.
                </p>
              ) : (
                emptyStateDescription
              )}
            </li>
          ) : (
            notes.map(({ id, title, updatedAt, tags }) => (
              <li key={id} className="border-b py-2 last:border-b-0">
                <Link
                  href={`/dashboard/${activeNotes}/${id}`}
                  prefetch
                  className={cn(
                    'hover:bg-accent/50 inline-flex h-auto w-full flex-col items-start gap-3 truncate rounded-md p-4',
                    activeNoteId === id && 'bg-accent hover:bg-accent',
                  )}
                >
                  <h1 className="line-clamp-2 max-w-full truncate text-left text-base font-semibold text-wrap">
                    {title}
                  </h1>
                  <div className="flex items-center gap-2">
                    {tags.map(({ id, name }) => (
                      <Badge
                        key={id}
                        variant={'outline'}
                        className="flex h-7 items-center justify-between gap-1 rounded-md border bg-neutral-300 px-3 dark:bg-neutral-600"
                      >
                        {name}
                      </Badge>
                    ))}
                  </div>

                  <div className="text-muted-foreground flex items-center gap-2 text-xs">
                    <Clock3Icon className="size-3" />
                    {updatedAt.toLocaleString()}
                  </div>
                </Link>
              </li>
            ))
          )}
        </ul>
      </div>
    </section>
  );
}
