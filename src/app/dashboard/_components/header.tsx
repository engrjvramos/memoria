import ThemeToggler from '@/components/theme-toggler';
import LogoutButton from './logout-button';
import SearchInput from './search-input';

export default function Header() {
  return (
    <header className="">
      <div className="flex h-18 items-center justify-between px-8 lg:h-20">
        <h1>All Notes</h1>
        <div className="flex items-center gap-4">
          <SearchInput />
          <ThemeToggler />
          <LogoutButton />
        </div>
      </div>
    </header>
  );
}
