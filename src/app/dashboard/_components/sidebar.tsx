'use client';
import { Feather } from '@/components/svg';
import { Button } from '@/components/ui/button';
import { SIDEBAR_CATEGORIES } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { TagIcon } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { toast } from 'sonner';

export default function Sidebar() {
  const params = useParams();
  const activeNotes = params.category as string;

  return (
    <aside className="border-r">
      <div className="w-68 divide-y px-4 py-6">
        <div className="mb-2 flex flex-col gap-6 border-b pb-2">
          <div className="font-pacifico flex items-center gap-2 text-2xl">
            <Feather className="text-primary size-7" /> Memoria
          </div>
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
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h4 className="text-muted-foreground mb-2 px-2 text-xl">Tags</h4>
          <ul className="flex flex-col gap-1">
            {['Cooking', 'Dev'].map((tag) => (
              <li key={tag}>
                <Button
                  variant={'ghost'}
                  className="h-auto w-full justify-start p-3"
                  onClick={() => toast.success('Hello')}
                >
                  <TagIcon className="size-5" /> {tag}
                </Button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </aside>
  );
}
