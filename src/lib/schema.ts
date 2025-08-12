import z from 'zod';

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
