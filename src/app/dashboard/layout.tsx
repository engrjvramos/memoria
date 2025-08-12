import { ReactNode } from 'react';
import Header from './_components/header';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col overflow-hidden">
      <div className="flex flex-1">
        <aside className="w-68 p-4">Sidebar</aside>
        <div className="flex flex-1 flex-col">
          <Header />
          <main className="flex flex-1">{children}</main>
        </div>
      </div>
    </div>
  );
}
