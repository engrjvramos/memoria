import { ArticleSkeleton } from '@/components/skeleton-loader';
import { auth } from '@/lib/auth';
import { getNoteById } from '@/server/actions';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';
import NoteContent from './_components/note-content';

export default async function NoteDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user?.id) redirect('/auth/login');
  const userId = session.user.id;

  const { id } = await params;
  const noteContentPromise = getNoteById(id, userId);

  return (
    <div className="h-full w-full">
      <Suspense fallback={<ArticleSkeleton />}>
        <NoteContent noteContentPromise={noteContentPromise} />
      </Suspense>
    </div>
  );
}
