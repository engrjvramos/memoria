import { createAuthClient } from 'better-auth/react';

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL as string,
});

export const { signIn, signOut, signUp, useSession } = authClient;
