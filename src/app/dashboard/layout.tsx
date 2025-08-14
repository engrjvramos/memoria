import { ReactNode } from 'react';
import Header from './_components/header';
import Sidebar from './_components/sidebar';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-dvh flex-col overflow-hidden">
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex flex-1 flex-col">
          <Header />
          <main className="flex flex-1">{children}</main>
        </div>
      </div>
    </div>
  );
}
