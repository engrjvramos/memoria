import { ReactNode } from 'react';

export default function AuthLayout({ children }: { children: ReactNode }) {
  return <div className="flex min-h-dvh flex-col items-center justify-center overflow-hidden">{children}</div>;
}
