'use client';

import { TCreateNoteSchema } from '@/lib/schema';
import TextAlign from '@tiptap/extension-text-align';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { ControllerRenderProps } from 'react-hook-form';
import EditorToolbar from './editor-toolbar';

type RichTextEditorProps = {
  field: ControllerRenderProps<TCreateNoteSchema, 'description'>;
};

export default function RichTextEditor({ field }: RichTextEditorProps) {
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
    onUpdate: ({ editor }) => {
      field.onChange(JSON.stringify(editor.getJSON()));
    },
    content: field.value ? JSON.parse(field.value) : '<p>Hello world!</p>',

    immediatelyRender: false,
  });

  return (
    <div className="w-full overflow-hidden rounded-md border">
      <EditorToolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}
