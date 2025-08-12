'use client';

import { Button } from '@/components/ui/button';
import { signOut } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push('/auth/login');
        },
        onError: () => {
          toast.error('Logout failed');
        },
      },
    });
  }

  return (
    <Button onClick={handleLogout} className="dark:text-white">
      Logout
    </Button>
  );
}
