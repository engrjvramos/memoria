import ThemeToggler from '@/components/theme-toggler';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { Suspense } from 'react';
import LogoutButton from './logout-button';
import SearchInput from './search-input';

export default async function Header() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';

  return (
    <header className="border-b">
      <div className="flex h-18 items-center justify-between px-8 lg:h-20">
        <h1 className="text-xl">
          {greeting}
          {session?.user?.name ? `, ${session.user.name.split(' ')[0]}!` : ''}
        </h1>
        <div className="flex items-center gap-4">
          <Suspense>
            <SearchInput />
          </Suspense>
          <ThemeToggler />
          <LogoutButton />
        </div>
      </div>
    </header>
  );
}
