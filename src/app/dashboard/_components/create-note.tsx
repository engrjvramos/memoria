import RichTextEditor from '@/components/rich-text-editor/rich-text-editor';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { tryCatch } from '@/hooks/useTryCatch';
import { CreateNoteSchema, noteStatus, TCreateNoteSchema } from '@/lib/schema';
import { createNote } from '@/server/actions';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

export default function CreateNote() {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const form = useForm<TCreateNoteSchema>({
    resolver: zodResolver(CreateNoteSchema),
    defaultValues: {
      title: '',
      description: '',
      status: 'Draft',
      tags: [],
    },
  });

  async function onSubmit(values: TCreateNoteSchema) {
    startTransition(async () => {
      const { data: result, error } = await tryCatch(createNote(values));
      if (error) {
        toast.error('An unexpected error occurred. Please try again.');
        return;
      }

      if (result.success) {
        toast.success(result.message);
        form.reset();
        router.push('/dashboard');
      } else if (!result.success) {
        toast.error(result.message);
      }
    });
  }

  return (
    <div className="flex flex-col gap-0 overflow-y-visible p-0 lg:mx-auto lg:w-full lg:max-w-[80rem] [&>button:last-child]:top-5">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 p-6">
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
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>

                <FormControl>
                  <RichTextEditor field={field} />
                  {/* <Textarea
                    placeholder="Start typing your note here..."
                    className="min-h-32"
                    {...field}
                    aria-invalid={!!form.formState.errors.description}
                  /> */}
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>

                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {noteStatus.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="h-11 text-white" disabled={pending}>
            {pending ? (
              <>
                <Loader2 className="size-5 animate-spin" />
                Loading...
              </>
            ) : (
              'Create Note'
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
