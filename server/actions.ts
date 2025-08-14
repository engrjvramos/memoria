'use server';

import { auth } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { CreateNoteSchema, TCreateNoteSchema } from '@/lib/schema';
import { ApiResponse } from '@/lib/types';
import { headers } from 'next/headers';
import { notFound } from 'next/navigation';

export async function createNote(values: TCreateNoteSchema, isArchived: boolean): Promise<ApiResponse> {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    const userId = session?.user.id || '';
    const validation = CreateNoteSchema.safeParse(values);

    if (!validation.success) {
      return {
        success: false,
        message: 'Invalid Form Data',
      };
    }

    await prisma.note.create({
      data: {
        ...validation.data,
        userId: userId,
        isArchived,
        tags: {
          connect: validation.data.tags.map((tag) => ({ id: tag.id })),
        },
      },
    });

    return {
      success: true,
      message: 'Note created successfully',
    };
  } catch (error) {
    const e = error as Error;

    return {
      success: false,
      message: e.message || 'Failed to create note',
    };
  }
}

export async function getUserNotes({ isArchived = false, searchTerm }: { isArchived: boolean; searchTerm: string }) {
  const data = await prisma.note.findMany({
    where: {
      isArchived: isArchived,
      OR: [
        { title: { contains: searchTerm, mode: 'insensitive' } },
        { description: { contains: searchTerm, mode: 'insensitive' } },
        { tags: { some: { name: searchTerm } } },
      ],
    },
    orderBy: {
      createdAt: 'desc',
    },
    select: {
      id: true,
      title: true,
      description: true,
      updatedAt: true,
      isArchived: true,
    },
  });

  return data;
}

export type UserNotesType = Awaited<ReturnType<typeof getUserNotes>>[0];

export async function getNoteById(id: string) {
  const data = await prisma.note.findUnique({
    where: {
      id: id,
    },
    select: {
      id: true,
      title: true,
      description: true,
      isArchived: true,
      updatedAt: true,
    },
  });

  if (!data) return notFound();

  return data;
}

export async function deleteNote(id: string): Promise<ApiResponse> {
  try {
    await prisma.note.delete({
      where: { id },
    });

    return {
      success: true,
      message: 'Note deleted successfully',
    };
  } catch (error) {
    const e = error as Error;
    return {
      success: false,
      message: e.message || 'Failed to delete note',
    };
  }
}

export async function archiveNote(id: string, archive: boolean): Promise<ApiResponse> {
  try {
    await prisma.note.update({
      where: { id },
      data: {
        isArchived: archive,
      },
    });

    return {
      success: true,
      message: archive ? 'Note archived successfully' : 'Note unarchived successfully',
    };
  } catch (error) {
    const e = error as Error;
    return {
      success: false,
      message: e.message || 'Failed to update note archive status',
    };
  }
}
