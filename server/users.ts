'use server';

import { auth } from '@/lib/auth';

export const signInUser = async (email: string, password: string) => {
  try {
    await auth.api.signInEmail({
      body: {
        email,
        password,
      },
    });

    return {
      success: true,
      message: {
        title: 'Login successful!',
        description: '',
      },
    };
  } catch (error) {
    const e = error as Error;
    return {
      success: false,
      message: {
        title: 'Failed to login',
        description: e.message,
      },
    };
  }
};

export const signUpUser = async (email: string, password: string, name: string) => {
  try {
    await auth.api.signUpEmail({
      body: {
        email,
        password,
        name,
      },
    });

    return {
      success: true,
      message: {
        title: 'Registration successful!',
        description: 'Please check your email for verification',
      },
    };
  } catch (error) {
    const e = error as Error;
    return {
      success: false,
      message: {
        title: 'Failed to register',
        description: e.message,
      },
    };
  }
};
