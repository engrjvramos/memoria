import { NotesProvider } from '@/components/notes-context';
import { auth } from '@/lib/auth';
import { VALID_CATEGORIES } from '@/lib/constants';
import { getNoteCounts, getUserNotes } from '@/server/actions';
import { headers } from 'next/headers';
import { notFound, redirect } from 'next/navigation';
import { ReactNode } from 'react';
import Header from '../_components/header';
import Sidebar from '../_components/sidebar';
import NoteListSection from './_components/note-list-section';

type Props = {
  children: ReactNode;
  params: Promise<{ category: string }>;
};

export default async function DashboardLayout({ children, params }: Props) {
  const { category } = await params;

  if (!VALID_CATEGORIES.includes(category)) {
    notFound();
  }

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user?.id) redirect('/auth/login');
  const userId = session.user.id;

  const isArchived = category === 'archived';

  const notesPromise = getUserNotes({
    isArchived,
    userId,
  });

  const noteCountsPromise = getNoteCounts(userId);

  const contextValue = {
    notesPromise,
    noteCountsPromise,
    category: category as 'all' | 'archived',
  };

  return (
    <NotesProvider value={contextValue}>
      <div className="flex h-dvh flex-col overflow-hidden">
        <div className="flex flex-1">
          <Sidebar />

          <div className="flex flex-1 flex-col">
            <Header />
            <main className="flex flex-1">
              <NoteListSection />
              {children}
            </main>
          </div>
        </div>
      </div>
    </NotesProvider>
  );
}
