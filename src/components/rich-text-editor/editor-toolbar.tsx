import { useEditorState, type Editor } from '@tiptap/react';
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Heading1,
  Heading2,
  Heading3,
  Italic,
  List,
  ListOrdered,
  Redo,
  Strikethrough,
  Undo,
} from 'lucide-react';
import { Button } from '../ui/button';
import { Toggle } from '../ui/toggle';

type TEditorToolbar = {
  editor: Editor | null;
};

export default function EditorToolbar({ editor }: TEditorToolbar) {
  const editorState = useEditorState({
    editor,
    selector: (ctx) => {
      if (!ctx.editor) return {};
      return {
        isBold: ctx.editor?.isActive('bold'),
        isItalic: ctx.editor?.isActive('italic'),
        isStrike: ctx.editor?.isActive('strike'),
        isParagraph: ctx.editor?.isActive('paragraph'),
        isHeading1: ctx.editor?.isActive('heading', { level: 1 }),
        isHeading2: ctx.editor?.isActive('heading', { level: 2 }),
        isHeading3: ctx.editor?.isActive('heading', { level: 3 }),
        isBulletList: ctx.editor?.isActive('bulletList'),
        isOrderedList: ctx.editor?.isActive('orderedList'),
        isAlignLeft: ctx.editor?.isActive({ textAlign: 'left' }),
        isAlignCenter: ctx.editor?.isActive({ textAlign: 'center' }),
        isAlignRight: ctx.editor?.isActive({ textAlign: 'right' }),
        canUndo: ctx.editor?.can().chain().focus().undo().run(),
        canRedo: ctx.editor?.can().chain().focus().redo().run(),
      };
    },
  });

  if (!editor || !editorState) return null;

  return (
    <div className="bg-card flex flex-wrap items-center gap-1 rounded-t-md border border-x-0 border-t-0 p-2">
      <div className="flex flex-wrap gap-1">
        <Toggle
          title="Bold"
          size={'sm'}
          pressed={editor.isActive('bold')}
          onPressedChange={() => editor.chain().focus().toggleBold().run()}
        >
          <Bold />
        </Toggle>

        <Toggle
          title="Italic"
          size={'sm'}
          pressed={editor.isActive('italic')}
          onPressedChange={() => {
            editor.chain().focus().toggleItalic().run();
          }}
        >
          <Italic />
        </Toggle>
        <Toggle
          title="Strike"
          size={'sm'}
          pressed={editor.isActive('strike')}
          onPressedChange={() => {
            editor.chain().focus().toggleStrike().run();
          }}
        >
          <Strikethrough />
        </Toggle>
        <Toggle
          title="Heading 1"
          size={'sm'}
          pressed={editor.isActive('heading', { level: 1 })}
          onPressedChange={() => {
            editor.chain().focus().toggleHeading({ level: 1 }).run();
          }}
        >
          <Heading1 />
        </Toggle>
        <Toggle
          title="Heading 2"
          size={'sm'}
          pressed={editor.isActive('heading', { level: 2 })}
          onPressedChange={() => {
            editor.chain().focus().toggleHeading({ level: 2 }).run();
          }}
        >
          <Heading2 />
        </Toggle>
        <Toggle
          title="Heading 3"
          size={'sm'}
          pressed={editor.isActive('heading', { level: 3 })}
          onPressedChange={() => {
            editor.chain().focus().toggleHeading({ level: 3 }).run();
          }}
        >
          <Heading3 />
        </Toggle>

        <Toggle
          title="Bullet List"
          size={'sm'}
          pressed={editor.isActive('bulletList')}
          onPressedChange={() => {
            editor.chain().focus().toggleBulletList().run();
          }}
        >
          <List />
        </Toggle>
        <Toggle
          type="button"
          title="Ordered List"
          size={'sm'}
          pressed={editor.isActive('orderedList')}
          onPressedChange={() => {
            editor.chain().focus().toggleOrderedList().run();
          }}
        >
          <ListOrdered />
        </Toggle>
      </div>
      <div className="bg-border mx-2 h-6 w-px"></div>
      <div className="flex flex-wrap gap-1">
        <Toggle
          title="Align Left"
          size={'sm'}
          pressed={editor.isActive({ textAlign: 'left' })}
          onPressedChange={() => {
            editor.chain().focus().setTextAlign('left').run();
          }}
        >
          <AlignLeft />
        </Toggle>
        <Toggle
          title="Align Center"
          size={'sm'}
          pressed={editor.isActive({ textAlign: 'center' })}
          onPressedChange={() => {
            if (editor.isActive({ textAlign: 'center' })) {
              editor.chain().focus().setTextAlign('left').run();
            } else {
              editor.chain().focus().setTextAlign('center').run();
            }
          }}
        >
          <AlignCenter />
        </Toggle>
        <Toggle
          title="Align Right"
          size={'sm'}
          pressed={editor.isActive({ textAlign: 'right' })}
          onPressedChange={() => {
            if (editor.isActive({ textAlign: 'right' })) {
              editor.chain().focus().setTextAlign('left').run();
            } else {
              editor.chain().focus().setTextAlign('right').run();
            }
          }}
        >
          <AlignRight />
        </Toggle>
      </div>

      <div className="bg-border mx-2 h-6 w-px"></div>

      <div className="flex flex-wrap gap-1">
        <Button
          title="Undo"
          size={'sm'}
          variant={'ghost'}
          type="button"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
        >
          <Undo />
        </Button>
        <Button
          title="Redo"
          size={'sm'}
          variant={'ghost'}
          type="button"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
        >
          <Redo />
        </Button>
      </div>
    </div>
  );
}
