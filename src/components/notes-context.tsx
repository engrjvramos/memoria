'use client';

import { TNoteCounts } from '@/lib/types';
import { UserNotesType } from '@/server/actions';
import { createContext, useContext } from 'react';

interface NotesContextType {
  notesPromise: Promise<UserNotesType[]>;
  noteCountsPromise: Promise<TNoteCounts>;
  category: 'all' | 'archived';
}

const NotesContext = createContext<NotesContextType | undefined>(undefined);

type NotesProviderProps = {
  children: React.ReactNode;
  value: NotesContextType;
};

export function NotesProvider({ children, value }: NotesProviderProps) {
  return <NotesContext.Provider value={value}>{children}</NotesContext.Provider>;
}

export function useNotesContext() {
  const context = useContext(NotesContext);
  if (context === undefined) {
    throw new Error('useNotesContext must be used within a NotesProvider');
  }
  return context;
}
