import { ArchiveIcon, ArchiveRestoreIcon, CircleAlertIcon, LoaderIcon } from 'lucide-react';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';

type Props = {
  onArchive: () => Promise<void>;
  pending: boolean;
  isArchived: boolean;
};

export default function ArchiveNote({ onArchive, pending, isArchived }: Props) {
  const description = isArchived
    ? 'Are you sure you want to restore this note? It will be moved back to your notes list.'
    : ' Are you sure you want to archive this note? You can find it in the Archived Notes section and restore it anytime.';
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant={'outline'} className="h-12 w-full justify-start">
          {isArchived ? (
            <>
              <ArchiveRestoreIcon className="size-4" /> Restore Note
            </>
          ) : (
            <>
              <ArchiveIcon className="size-4" /> Archive Note
            </>
          )}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <div className="flex flex-col gap-2 max-sm:items-center sm:flex-row sm:gap-4">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-full border" aria-hidden="true">
            <CircleAlertIcon className="opacity-80" size={16} />
          </div>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>{description}</AlertDialogDescription>
          </AlertDialogHeader>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={pending}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-primary hover:bg-primary/90 min-w-28 text-white shadow-xs"
            disabled={pending}
            onClick={onArchive}
          >
            {pending ? <LoaderIcon className="size-5 animate-spin" /> : isArchived ? 'Restore Note' : 'Archive Note'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
