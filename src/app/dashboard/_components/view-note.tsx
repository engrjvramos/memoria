import { UserNotesType } from '@/server/actions';
import TextAlign from '@tiptap/extension-text-align';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Clock4Icon, TagIcon } from 'lucide-react';
import { useEffect } from 'react';
import ArchiveNote from './archive-note';
import DeleteNote from './delete-note';

type Props = {
  data: UserNotesType;
  onDelete: () => Promise<void>;
  onArchive: () => Promise<void>;
  pendingDelete: boolean;
  pendingArchive: boolean;
};

export default function ViewNote({ data, onArchive, onDelete, pendingArchive, pendingDelete }: Props) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
    ],
    content: JSON.parse(data?.description || ''),
    editable: false,
    immediatelyRender: false,
  });

  useEffect(() => {
    if (editor && data?.description) {
      editor.commands.setContent(JSON.parse(data.description));
    }
  }, [editor, data]);

  return (
    <article className="flex h-full w-full">
      <div className="flex flex-1 flex-col gap-8 px-4 py-6 lg:p-10">
        <h1 className="text-2xl">{data.title}</h1>
        <section className="flex flex-col gap-2 border-b pb-6">
          <div className="flex items-center gap-2 text-sm">
            <div className="flex w-28 items-center gap-2 py-1">
              <TagIcon className="size-4" /> Tags
            </div>
            <div className="">Tags Here</div>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <div className="flex w-28 items-center gap-2 py-1">
              <Clock4Icon className="size-4" /> Last edited
            </div>
            <p className="text-muted-foreground">{data.updatedAt.toLocaleString()}</p>
          </div>
        </section>
        <div>
          <EditorContent editor={editor} />
        </div>
      </div>

      <section className="h-full w-full max-w-xs border-l">
        <div className="flex flex-col gap-3 px-4 py-6">
          <ArchiveNote onArchive={onArchive} pending={pendingArchive} isArchived={data.isArchived} />
          <DeleteNote onDelete={onDelete} pending={pendingDelete} />
        </div>
      </section>
    </article>
  );
}
