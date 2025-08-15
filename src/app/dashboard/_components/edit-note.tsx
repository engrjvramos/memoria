import RichTextEditor from '@/components/rich-text-editor/rich-text-editor';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useNotes } from '@/hooks/useNotes';
import { tryCatch } from '@/hooks/useTryCatch';
import { CreateNoteSchema, TCreateNoteSchema } from '@/lib/schema';
import { updateNote, UserNotesType } from '@/server/actions';
import { zodResolver } from '@hookform/resolvers/zod';
import { InfoIcon, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import TagInput from './tag-input';

export default function EditNote({ initialValues }: { initialValues: UserNotesType }) {
  const router = useRouter();
  const { activeNotes } = useNotes();
  const [pending, startTransition] = useTransition();

  const form = useForm<TCreateNoteSchema>({
    resolver: zodResolver(CreateNoteSchema),
    defaultValues: {
      title: initialValues.title,
      description: initialValues.description,
      tags: initialValues.tags,
    },
  });

  async function onSubmit(values: TCreateNoteSchema) {
    startTransition(async () => {
      const action = updateNote(initialValues.id, values);

      const { data: result, error } = await tryCatch(action);
      if (error) {
        toast.error('An unexpected error occurred. Please try again.');
        return;
      }

      if (result.success) {
        toast.success(result.message);
        router.push(`/dashboard/${activeNotes}/${initialValues.id}`);
      } else if (!result.success) {
        toast.error(result.message);
      }
    });
  }

  return (
    <div className="flex h-full flex-col overflow-y-visible px-6 py-16 lg:mx-auto lg:w-full lg:max-w-[80rem]">
      <h1 className="mb-10 text-2xl">Edit Note</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your title..." className="h-11" maxLength={100} autoFocus {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tags</FormLabel>
                <FormControl>
                  <TagInput value={field.value} onChange={field.onChange} />
                </FormControl>
                <FormDescription className="flex items-center gap-2">
                  <InfoIcon className="size-4" />
                  Max 10 tags. No duplicates allowed.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>

                <FormControl>
                  <RichTextEditor field={field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex items-center justify-end gap-2">
            <Button
              type="button"
              variant={'outline'}
              className="h-11"
              disabled={pending}
              onClick={() => router.push(`/dashboard/${activeNotes}`)}
            >
              Cancel
            </Button>
            <Button type="submit" className="h-11 text-white" disabled={pending}>
              {pending ? (
                <>
                  <Loader2 className="size-5 animate-spin" />
                  Loading...
                </>
              ) : (
                'Edit Note'
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
