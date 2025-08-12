'use client';

import { Button } from '@/components/ui/button';
import { useQueryToast } from '@/hooks/useQueryToast';
import { toast } from 'sonner';

export default function DashboardContent() {
  useQueryToast({
    param: 'login',
    title: 'Successfully logged in!',
  });
  const handleClick = () => {
    toast.success('Test', {
      position: 'top-center',
    });
  };
  return (
    <div>
      <Button onClick={handleClick}>Show Toast</Button>
    </div>
  );
}
