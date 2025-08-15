import { UserNotesType } from '@/server/actions';
import TextAlign from '@tiptap/extension-text-align';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useEffect } from 'react';

export function useTextEditor(data: UserNotesType) {
  const parsedContent = (() => {
    try {
      return data?.description ? JSON.parse(data.description) : null;
    } catch {
      return null;
    }
  })();

  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
    ],
    editorProps: {
      attributes: {
        class:
          'min-h-[300px] outline-none p-4 prose prose-sm sm:prose lg:prose-lg xl:prose-xl w-full dark:prose-invert !w-full !max-w-none',
      },
    },
    content: parsedContent || '',
    editable: false,
    immediatelyRender: false,
  });

  useEffect(() => {
    if (editor && data?.description) {
      editor.commands.setContent(JSON.parse(data.description));
    }
  }, [editor, data]);

  return { editor };
}
