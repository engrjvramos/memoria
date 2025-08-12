import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { toast } from 'sonner';

type ToastType = 'success' | 'error' | 'info';

interface UseQueryToastOptions {
  param: string;
  variant?: ToastType;
  title?: string;
  description?: string;
}

export function useQueryToast({ param, variant = 'success', title, description }: UseQueryToastOptions) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const hasShownToast = useRef(false);

  useEffect(() => {
    const value = searchParams.get(param);
    if (value && !hasShownToast.current) {
      hasShownToast.current = true;

      toast[variant](title || 'Success', {
        description: description || '',
        position: 'top-center',
      });

      const params = new URLSearchParams(searchParams.toString());
      params.delete(param);
      router.replace(`?${params.toString()}`, { scroll: false });
    }
  }, [searchParams, param, variant, title, description, router]);
}
