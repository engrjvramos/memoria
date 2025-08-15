import { useNotesContext } from '@/components/notes-context';
import { Mode } from '@/lib/types';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { use, useMemo } from 'react';

export function useNotes() {
  const { notesPromise, noteCountsPromise } = useNotesContext();
  const userNotes = use(notesPromise);
  const noteCounts = use(noteCountsPromise);

  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();

  const activeNotes = params.category as 'all' | 'archived';
  const activeNoteId = params.id;
  const searchParam = searchParams.get('search')?.toLowerCase().trim() || '';
  const tagParam = searchParams.get('tag');
  const modeParam = searchParams.get('mode');

  const filteredNotes = useMemo(() => {
    if (!userNotes) return [];

    const lowerSearch = searchParam?.toLowerCase() || '';
    const lowerTag = tagParam?.toLowerCase() || '';

    return userNotes.filter((note) => {
      const tagMatch = lowerTag ? note.tags.some((t) => t.name.toLowerCase() === lowerTag) : true;

      const searchMatch = lowerSearch
        ? note.title.toLowerCase().includes(lowerSearch) ||
          note.description.toLowerCase().includes(lowerSearch) ||
          note.tags.some((t) => t.name.toLowerCase().includes(lowerSearch))
        : true;

      return tagMatch && searchMatch;
    });
  }, [userNotes, searchParam, tagParam]);

  const tagCounts: { [key: string]: number } = {};
  userNotes.forEach((note) => {
    note.tags.forEach((tag) => {
      const tagNameLower = tag.name.toLowerCase();
      tagCounts[tagNameLower] = (tagCounts[tagNameLower] || 0) + 1;
    });
  });

  const allTagsWithCounts = Object.keys(tagCounts)
    .map((tagName) => ({
      name: tagName,
      count: tagCounts[tagName],
    }))
    .sort((a, b) => a.name.localeCompare(b.name));

  const handleModeSelect = (mode: Mode) => {
    const params = new URLSearchParams(searchParams.toString());
    if (modeParam === mode) {
      params.delete('mode');
    } else {
      params.set('mode', mode);
    }

    const url = mode === 'create' ? `/dashboard/${activeNotes}?${params.toString()}` : `?${params.toString()}`;

    params.delete('search');
    params.delete('tag');

    router.push(url, { scroll: false });
  };

  return {
    notes: filteredNotes,
    noteCounts,
    tags: allTagsWithCounts,
    activeNotes,
    tagParam,
    searchParam,
    modeParam,
    handleModeSelect,
    activeNoteId,
  };
}
