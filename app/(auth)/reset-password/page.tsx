'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import { createClient } from '@/libs/supabase/client';
import toast from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2, ArrowLeft, Mail } from 'lucide-react';
import config from '@/config';
import { getBaseUrl } from '@/libs/utils';

export default function ResetPassword() {
  const supabase = createClient();
  const [email, setEmail] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      toast.error('Please enter your email address');
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: getBaseUrl() + '/update-password',
      });

      if (error) {
        toast.error(error.message);
      } else {
        toast.success('Check your email for password reset instructions!');
        setIsDisabled(true);
      }
    } catch (error) {
      console.error('Password reset error:', error);
      toast.error('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="p-8 md:p-24" data-theme={config.colors.theme}>
      <div className="text-center mb-4">
        <Button asChild variant="ghost" size="sm">
          <Link href="/signin">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Sign In
          </Link>
        </Button>
      </div>

      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
            <Mail className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-2">
            Reset Your Password
          </h1>
          <p className="text-muted-foreground">
            Enter your email address and we&apos;ll send you a link to reset
            your password.
          </p>
        </div>

        <form onSubmit={handlePasswordReset} className="space-y-4">
          <Input
            required
            type="email"
            value={email}
            autoComplete="email"
            placeholder="Enter your email address"
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading || isDisabled}
          />

          <Button
            className="w-full"
            disabled={isLoading || isDisabled}
            type="submit"
          >
            {isLoading && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
            Send Reset Instructions
          </Button>
        </form>

        <div className="text-center mt-6">
          <p className="text-sm text-muted-foreground">
            Remember your password?{' '}
            <Link
              href="/signin"
              className="text-primary hover:underline font-medium"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
