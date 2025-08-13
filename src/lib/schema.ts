import z from 'zod';

export const noteStatus = ['Draft', 'Published', 'Archived'] as const;

export const LoginFormSchema = z.object({
  email: z.email().min(1, {
    message: 'Email is required',
  }),
  password: z.string().min(8, {
    message: 'Password must be at least 8 characters.',
  }),
});

export const RegisterFormSchema = z
  .object({
    name: z.string().min(1, {
      message: 'Name is required',
    }),
    email: z.email().min(1, {
      message: 'Email is required',
    }),
    password: z.string().min(8, {
      message: 'Password must be at least 8 characters',
    }),
    confirmPassword: z.string().min(1, {
      message: 'Confirm password is required',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match',
  });

export const ForgotPasswordFormSchema = z.object({
  email: z.email().min(1, {
    message: 'Email is required',
  }),
});

export const ResetPasswordFormSchema = z
  .object({
    password: z.string().min(8, {
      message: 'Password must be at least 8 characters',
    }),
    confirmPassword: z.string().min(1, {
      message: 'Confirm password is required',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match',
  });

export const CreateNoteSchema = z.object({
  title: z
    .string()
    .min(3, {
      message: 'Title must be at least 3 characters long',
    })
    .max(100, {
      message: 'Title must be at most 100 characters long',
    }),
  description: z.string().min(3, {
    message: 'Description must be at least 3 characters long',
  }),
  status: z.enum(noteStatus, {
    message: 'Status is required',
  }),
  tags: z
    .array(
      z.object({
        id: z.string().min(1, { message: 'ID is required' }),
        text: z
          .string()
          .min(1, { message: 'Tag cannot be empty' })
          .max(30, { message: 'Tag must be at most 30 characters long' }),
      }),
    )
    .max(10, { message: 'You can add at most 10 tags' }),
});

export type TCreateNoteSchema = z.infer<typeof CreateNoteSchema>;
