'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArchiveIcon, ArrowLeftIcon, PlusIcon, Trash2Icon } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import CreateNote from './create-note';

const MOCK_DATA = [
  {
    id: '1',
    title: 'My first note',
    textContent: 'This is the note content',
    archived: false,
    tags: ['Dev', 'React'],
    updatedAt: '29 Oct 2024 11:46 AM',
  },
  {
    id: '2',
    title: 'My second note',
    textContent: 'This is the note content',
    archived: false,
    tags: ['Travel', 'Personal'],
    updatedAt: '28 Oct 2024 5:52 PM',
  },
  {
    id: '3',
    title: 'My third note',
    textContent: 'This is the note content',
    archived: false,
    tags: ['Cooking', 'Recipes'],
    updatedAt: '27 Oct 2024 3:15 AM',
  },
];

export default function DashboardContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const isEditorOpen = searchParams.get('editor') === 'true';

  const toggleEditor = () => {
    const params = new URLSearchParams(searchParams);
    if (isEditorOpen) {
      params.delete('editor');
    } else {
      params.set('editor', 'true');
    }
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="flex w-full divide-x">
      <section className="w-full max-w-md min-w-[18rem]">
        <div className="space-y-8 px-4 py-6">
          <Button className="h-12 w-full text-white capitalize" onClick={toggleEditor}>
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

          <ul className="flex flex-col gap-1">
            {MOCK_DATA.map(({ id, tags, title, updatedAt }) => (
              <li key={id}>
                <Button variant={'ghost'} className="h-auto w-full flex-col items-start gap-3 p-4">
                  <h1 className="text-left text-base font-semibold text-wrap">{title}</h1>
                  <div className="flex items-center gap-2">
                    {tags.map((tag) => (
                      <Badge key={tag} variant={'secondary'} className="rounded bg-neutral-200 dark:bg-neutral-700">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="text-muted-foreground text-xs">{updatedAt}</div>
                </Button>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section className="flex-1">
        <div className="flex flex-col gap-3 px-4 py-6">{isEditorOpen ? <CreateNote /> : 'Hello'}</div>
      </section>
      {!isEditorOpen && (
        <section className="w-full max-w-xs">
          <div className="flex flex-col gap-3 px-4 py-6">
            <Button variant={'outline'} className="h-12 w-full justify-start">
              <ArchiveIcon className="size-4" /> Archive Note
            </Button>
            <Button variant={'destructive'} className="h-12 w-full justify-start">
              <Trash2Icon className="size-4" /> Delete Note
            </Button>
          </div>
        </section>
      )}
    </div>
  );
}
