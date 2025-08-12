import { ReactNode } from 'react';

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="dark:bg-background flex min-h-dvh flex-col items-center justify-center overflow-hidden bg-neutral-200">
      {children}
    </div>
  );
}
