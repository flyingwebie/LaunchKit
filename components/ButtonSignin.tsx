/* eslint-disable @next/next/no-img-element */
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { User } from '@supabase/supabase-js';
import { createClient } from '@/libs/supabase/client';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import config from '@/config';

// A simple button to sign in with our providers (Google & Magic Links).
// It automatically redirects user to callbackUrl (config.auth.callbackUrl) after login, which is normally a private page for users to manage their accounts.
// If the user is already logged in, it will show their profile picture & redirect them to callbackUrl immediately.
const ButtonSignin = ({
  text = 'Get started',
  variant = 'default',
  size = 'default',
}: {
  text?: string;
  variant?:
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon' | 'wide';
}) => {
  const supabase = createClient();
  const [user, setUser] = useState<User>(null);

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setUser(user);
    };

    getUser();
  }, [supabase]);

  if (user) {
    return (
      <Button asChild variant={variant} size="lg">
        <Link href={config.auth.callbackUrl} className="gap-2">
          <Avatar className="w-6 h-6">
            <AvatarImage
              src={user?.user_metadata?.avatar_url}
              alt={user?.user_metadata?.name || 'Account'}
            />
            <AvatarFallback className="text-xs">
              {user?.user_metadata?.name?.charAt(0) || user?.email?.charAt(0)}
            </AvatarFallback>
          </Avatar>
          {user?.user_metadata?.name ?? user?.email ?? 'Account'}
        </Link>
      </Button>
    );
  }

  return (
    <Button asChild variant={variant} size="lg">
      <Link href={config.auth.loginUrl}>{text}</Link>
    </Button>
  );
};

export default ButtonSignin;
