'use client';
import { Feather } from '@/components/svg';
import { Button } from '@/components/ui/button';
import { useNotes } from '@/hooks/useNotes';
import { SIDEBAR_CATEGORIES } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { TagIcon } from 'lucide-react';
import Link from 'next/link';

export default function Sidebar() {
  const { noteCounts, activeNotes, tags, tagParam } = useNotes();

  return (
    <aside className="border-r">
      <div className="w-68 divide-y px-4 py-6">
        <div className="mb-2 flex flex-col gap-6 border-b pb-2">
          <Link
            href={'/dashboard/all'}
            className="font-pacifico mb-2 inline-flex items-center justify-center gap-2 text-2xl"
          >
            <Feather className="text-primary size-7" /> Memoria
          </Link>
          <div className="space-y-1">
            {SIDEBAR_CATEGORIES.map(({ icon: Icon, id, label }) => (
              <Link
                key={id}
                href={`/dashboard/${id}`}
                className={cn(
                  'hover:bg-accent dark:hover:bg-accent/50 flex h-10 w-full items-center justify-start gap-2 rounded px-3',
                  activeNotes === id &&
                    '[&>svg]:text-primary bg-neutral-100 transition-none hover:bg-neutral-100 dark:bg-neutral-800 dark:hover:bg-neutral-800',
                )}
              >
                <Icon className="size-5" /> {label}
                <span className="text-muted-foreground ml-auto inline-block font-mono text-sm">
                  {id === 'all' ? noteCounts.all : noteCounts.archived}
                </span>
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h4 className="text-muted-foreground mb-2 px-2 text-xl">Tags</h4>
          {tags.length === 0 ? (
            <p className="text-muted-foreground px-2 text-sm">No tags available</p>
          ) : (
            <ul className="flex list-none flex-col gap-1">
              {tags.map(({ count, name }) => (
                <li key={name}>
                  <Link href={`/dashboard/${activeNotes}?tag=${encodeURIComponent(name.toLowerCase())}`}>
                    <Button
                      variant="ghost"
                      className={cn('h-auto w-full justify-start p-3', name.toLowerCase() === tagParam && 'bg-accent')}
                    >
                      <TagIcon className="size-5" />
                      {name}
                      <span className="text-muted-foreground ml-auto inline-block font-mono text-sm">{count}</span>
                    </Button>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </aside>
  );
}
