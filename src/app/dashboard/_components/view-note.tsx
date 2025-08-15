import { Badge } from '@/components/ui/badge';
import { useTextEditor } from '@/hooks/useTextEditor';
import { UserNotesType } from '@/server/actions';

import { EditorContent } from '@tiptap/react';
import { Clock4Icon, TagIcon } from 'lucide-react';

type Props = {
  data: UserNotesType;
};

export default function ViewNote({ data }: Props) {
  const { editor } = useTextEditor(data);

  return (
    <article className="mx-auto h-full w-full lg:max-w-[80rem]">
      <div className="flex flex-1 flex-col gap-8 px-4 py-6 lg:p-10">
        <h1 className="text-2xl">{data.title}</h1>
        <section className="flex flex-col gap-2 border-b pb-6">
          <div className="flex items-center gap-2 text-sm">
            <div className="line flex w-28 items-center gap-2 py-1">
              <TagIcon className="size-4" /> Tags
            </div>
            <div className="flex items-center gap-2">
              {data.tags.map(({ id, name }) => (
                <Badge
                  key={id}
                  variant={'outline'}
                  className="flex h-7 items-center justify-between gap-1 rounded-md border bg-neutral-300 px-3 dark:bg-neutral-600"
                >
                  {name}
                </Badge>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <div className="flex w-28 items-center gap-2 py-1">
              <Clock4Icon className="size-4" /> Last edited
            </div>
            <p className="text-muted-foreground">{data.updatedAt.toLocaleString()}</p>
          </div>
        </section>

        <EditorContent editor={editor} />
      </div>
    </article>
  );
}
