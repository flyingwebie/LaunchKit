'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import { createClient } from '@/libs/supabase/client';
import toast from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2, ArrowLeft, Mail } from 'lucide-react';
import config from '@/config';

export default function MagicLink() {
  const supabase = createClient();
  const [email, setEmail] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  const handleMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      toast.error('Please enter your email address');
      return;
    }

    setIsLoading(true);

    try {
      const redirectURL = window.location.origin + '/api/auth/callback';

      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: redirectURL,
        },
      });

      if (error) {
        toast.error(error.message);
      } else {
        toast.success('Check your email for the magic link!');
        setIsDisabled(true);
      }
    } catch (error) {
      console.error('Magic link error:', error);
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
            Sign in with Magic Link
          </h1>
          <p className="text-muted-foreground">
            Enter your email and we&apos;ll send you a secure link to sign in
            instantly.
          </p>
        </div>

        <form onSubmit={handleMagicLink} className="space-y-4">
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
            Send Magic Link
          </Button>
        </form>

        {isDisabled && (
          <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-start">
              <Mail className="h-5 w-5 text-green-600 mt-0.5 mr-3" />
              <div>
                <h3 className="text-sm font-medium text-green-800">
                  Magic link sent!
                </h3>
                <p className="text-sm text-green-700 mt-1">
                  Check your email and click the link to sign in. The link will
                  expire in 1 hour.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="text-center mt-6">
          <p className="text-sm text-muted-foreground">
            Prefer a different method?{' '}
            <Link
              href="/signin"
              className="text-primary hover:underline font-medium"
            >
              Sign in with password
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
