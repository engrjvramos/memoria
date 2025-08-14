import ThemeToggler from '@/components/theme-toggler';
import { Suspense } from 'react';
import HeaderTitle from './header-title';
import LogoutButton from './logout-button';
import SearchInput from './search-input';

export default async function Header() {
  return (
    <header className="border-b">
      <div className="flex h-18 items-center justify-between px-8 lg:h-20">
        <HeaderTitle />
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
