'use server';

import { auth } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { CreateNoteSchema, TCreateNoteSchema } from '@/lib/schema';
import { ApiResponse, TNoteCounts } from '@/lib/types';
import { headers } from 'next/headers';

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

    // Extract tags from validated form data
    const { title, description, tags } = validation.data;

    await prisma.note.create({
      data: {
        title,
        description,
        userId,
        isArchived,
        noteTags: {
          create: tags.map(({ name }) => ({
            tag: {
              connectOrCreate: {
                where: { name },
                create: { name },
              },
            },
          })),
        },
      },
      include: { noteTags: { include: { tag: true } } },
    });

    return {
      success: true,
      message: 'Note created successfully',
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: 'Failed to create note',
    };
  }
}

export async function getUserNotes({ isArchived = false, userId }: { isArchived?: boolean; userId: string }) {
  const data = await prisma.note.findMany({
    where: {
      userId,
      isArchived,
    },
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      title: true,
      description: true,
      updatedAt: true,
      isArchived: true,
      noteTags: {
        select: {
          tag: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
    },
  });

  const transformedNotes = data.map((note) => {
    return {
      ...note,
      tags: note.noteTags.map((noteTag) => noteTag.tag),
    };
  });

  return transformedNotes;
}

export type UserNotesType = Awaited<ReturnType<typeof getUserNotes>>[0];

export async function getNoteById(noteId: string, userId: string) {
  // await new Promise((resolve) => setTimeout(resolve, 5000));

  const note = await prisma.note.findUnique({
    where: {
      id: noteId,
      userId: userId,
    },
    select: {
      id: true,
      title: true,
      description: true,
      updatedAt: true,
      isArchived: true,
      noteTags: {
        select: {
          tag: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
    },
  });

  if (!note) {
    return null;
  }

  const transformedNote = {
    ...note,
    tags: note.noteTags.map((nt) => nt.tag),
  };

  return transformedNote;
}

export async function deleteNote(id: string): Promise<ApiResponse> {
  try {
    const note = await prisma.note.findUnique({
      where: { id },
      include: {
        noteTags: {
          include: { tag: true },
        },
      },
    });

    if (!note) {
      return {
        success: false,
        message: 'Note not found',
      };
    }

    await prisma.note.delete({
      where: { id },
    });

    for (const noteTag of note.noteTags) {
      const tagId = noteTag.tag.id;

      const tagStillUsed = await prisma.noteTag.findFirst({
        where: { tagId },
      });

      if (!tagStillUsed) {
        await prisma.tag.delete({
          where: { id: tagId },
        });
      }
    }

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

export async function updateNote(noteId: string, values: TCreateNoteSchema): Promise<ApiResponse> {
  try {
    const validation = CreateNoteSchema.safeParse(values);
    if (!validation.success) {
      return { success: false, message: 'Invalid form data' };
    }

    const { title, description, tags } = validation.data;

    await prisma.noteTag.deleteMany({
      where: { noteId },
    });

    await prisma.note.update({
      where: { id: noteId },
      data: {
        title,
        description,
        noteTags: {
          create: tags.map((tagInput) => ({
            tag: {
              connectOrCreate: {
                where: { name: tagInput.name.toLowerCase() },
                create: { name: tagInput.name.toLowerCase() },
              },
            },
          })),
        },
      },
    });

    return { success: true, message: 'Note updated successfully' };
  } catch (error) {
    console.error('Error updating note:', error);
    return { success: false, message: error instanceof Error ? error.message : 'Failed to update note' };
  }
}

export async function getNoteCounts(userId: string): Promise<TNoteCounts> {
  const [allNotesCount, archivedNotesCount] = await prisma.$transaction([
    prisma.note.count({
      where: {
        userId,
        isArchived: false,
      },
    }),
    prisma.note.count({
      where: {
        userId,
        isArchived: true,
      },
    }),
  ]);

  return {
    all: allNotesCount,
    archived: archivedNotesCount,
  };
}
