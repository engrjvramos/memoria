'use client';

import { Feather } from '@/components/svg';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { CloseToast } from '@/components/ui/sonner';
import { authClient } from '@/lib/auth-client';
import { ForgotPasswordFormSchema } from '@/lib/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

export default function ForgotPasswordForm() {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof ForgotPasswordFormSchema>>({
    resolver: zodResolver(ForgotPasswordFormSchema),
    defaultValues: {
      email: '',
    },
  });

  async function onSubmit(values: z.infer<typeof ForgotPasswordFormSchema>) {
    try {
      setIsLoading(true);
      const { error } = await authClient.forgetPassword({
        email: values.email,
        redirectTo: '/auth/reset-password',
      });
      if (!error) {
        toast.success('Reset Link Sent!', {
          description: 'Please check your email for a password reset link.',
          action: CloseToast,
        });
        form.reset();
      } else {
        toast.error('Failed to Send Reset Link', {
          description: error.message,
          action: CloseToast,
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className="w-full max-w-[540px] gap-12 p-8 sm:p-12">
      <CardHeader className="justify-center px-0 text-center">
        <div className="mb-4 flex items-center justify-center gap-2 text-2xl">
          <Feather className="text-primary" /> <span className="font-pacifico">Memoria</span>
        </div>
        <CardTitle className="text-2xl">Forgotten your password?</CardTitle>
        <CardDescription className="">
          Enter your email below, and we&apos;ll send you a link to reset it
        </CardDescription>
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
                      maxLength={100}
                      autoFocus
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="h-11 w-full text-white" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="size-5 animate-spin" />
                  Loading...
                </>
              ) : (
                'Send Reset Link'
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
