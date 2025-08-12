'use client';

import { Feather, GitHub, Google } from '@/components/svg';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { signIn } from '@/lib/auth-client';
import { signInUser } from '@/server/users';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const FormSchema = z.object({
  email: z.email().min(1, {
    message: 'Email is required',
  }),
  password: z.string().min(5, {
    message: 'Password must be at least 5 characters.',
  }),
});

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [isGooglePending, startGoogleTransition] = useTransition();
  const [isGithubPending, startGithubTransition] = useTransition();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(values: z.infer<typeof FormSchema>) {
    try {
      setIsLoading(true);
      const response = await signInUser(values.email, values.password);
      if (response.success) {
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  const handleGoogleLogin = async () => {
    startGoogleTransition(async () => {
      await signIn.social({
        provider: 'google',
        callbackURL: '/dashboard?login=success',
        fetchOptions: {
          onError: () => {
            toast.error('Oops! Something went wrong.');
          },
        },
      });
    });
  };

  const handleGithubLogin = async () => {
    startGithubTransition(async () => {
      await signIn.social({
        provider: 'github',
        callbackURL: '/dashboard?login=success',
        fetchOptions: {
          onError: () => {
            toast.error('Oops! Something went wrong.');
          },
        },
      });
    });
  };

  return (
    <Card className="w-full max-w-lg p-8 sm:p-12">
      <CardHeader className="justify-center text-center">
        <div className="mb-4 flex items-center justify-center gap-2 text-2xl">
          <Feather /> <span className="font-pacifico">Memoria</span>
        </div>
        <CardTitle className="text-2xl">Welcome to Memoria</CardTitle>
        <CardDescription className="">Please login to continue</CardDescription>
      </CardHeader>
      <CardContent className="px-0">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="email@example.com"
                      className="h-11"
                      {...field}
                      value={field.value ?? ''}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center">
                    <FormLabel>Password</FormLabel>
                    <Link
                      href="/auth/forgot-password"
                      className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                    >
                      Forgot your password?
                    </Link>
                  </div>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Password"
                      className="h-11"
                      {...field}
                      value={field.value ?? ''}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="h-11 w-full text-white" disabled={isLoading}>
              {isLoading ? <Loader2 className="size-4 animate-spin" /> : 'Login'}
            </Button>
          </form>
        </Form>
        <div className="after:border-border relative my-6 text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
          <span className="bg-card text-muted-foreground relative z-10 px-2">Or</span>
        </div>
        <div className="flex flex-col gap-3">
          <Button className="h-11 w-full" variant={'outline'} disabled={isGooglePending} onClick={handleGoogleLogin}>
            {isGooglePending ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <>
                <Google className="size-5" />
                Sign in with Google
              </>
            )}
          </Button>
          <Button className="h-11 w-full" variant={'outline'} disabled={isGithubPending} onClick={handleGithubLogin}>
            {isGithubPending ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <>
                <GitHub className="size-5" />
                Sign in with Github
              </>
            )}
          </Button>
        </div>
      </CardContent>
      <CardFooter className="justify-center border-t pt-0">
        <p className="text-muted-foreground text-sm">
          No account yet?{' '}
          <Link href={'/auth/register'} className="hover:underline">
            Register
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
