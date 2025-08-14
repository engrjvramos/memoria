import { auth } from '@/lib/auth';
import { getUserNotes } from '@/server/actions';
import { headers } from 'next/headers';
import { notFound, redirect } from 'next/navigation';
import DashboardContent from '../_components/dashboard-content';

const VALID_CATEGORIES = ['all', 'archive'];

type Props = {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ search?: string }>;
};

export default async function CategoryPage({ params, searchParams }: Props) {
  const { category } = await params;
  const { search } = await searchParams;

  if (!VALID_CATEGORIES.includes(category)) {
    notFound();
  }

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) redirect('/auth/login');

  const isArchived = category === 'archive';

  const userNotes = await getUserNotes({ isArchived, searchTerm: search || '' });

  return <DashboardContent userNotes={userNotes} category={category} search={search} />;
}
