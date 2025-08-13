'use server';

import { auth } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { CreateNoteSchema, TCreateNoteSchema } from '@/lib/schema';
import { ApiResponse } from '@/lib/types';
import { headers } from 'next/headers';

export async function createNote(values: TCreateNoteSchema): Promise<ApiResponse> {
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
