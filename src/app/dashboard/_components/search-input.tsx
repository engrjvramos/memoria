'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { SearchIcon } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useId, useRef, useState } from 'react';

export default function SearchInput() {
  const id = useId();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');

  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const timeout = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());

      if (searchTerm.trim()) {
        params.set('search', searchTerm.trim().toLowerCase());
      } else {
        params.delete('search');
      }

      params.delete('page');

      router.push(`?${params.toString()}`, { scroll: false });
    }, 300);

    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm]);

  return (
    <div className="w-full lg:max-w-lg lg:min-w-xs">
      <Label htmlFor={id} className="sr-only">
        Search
      </Label>
      <div className="relative">
        <SearchIcon className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
        <Input
          id={id}
          placeholder="Search by title, content or tags..."
          type="text"
          maxLength={64}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="h-10 bg-white pl-10 text-sm"
        />
      </div>
    </div>
  );
}
