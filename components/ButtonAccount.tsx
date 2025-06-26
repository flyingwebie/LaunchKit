/* eslint-disable @next/next/no-img-element */
'use client';

import { useState, useEffect } from 'react';
import { Popover, Transition } from '@headlessui/react';
import { User } from '@supabase/supabase-js';
import { createClient } from '@/libs/supabase/client';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Loader2,
  ChevronDown,
  CreditCard,
  LogOut,
  Lock,
  Link,
} from 'lucide-react';
import apiClient from '@/libs/api';
import { Separator } from './ui/separator';
import { useRouter } from 'next/navigation';

// A button to show user some account actions
//  1. Billing: open a Stripe Customer Portal to manage their billing (cancel subscription, update payment method, etc.).
//     You have to manually activate the Customer Portal in your Stripe Dashboard (https://dashboard.stripe.com/test/settings/billing/portal)
//     This is only available if the customer has a customerId (they made a purchase previously)
//  2. Logout: sign out and go back to homepage
// See more at https://launchkit-docs.flyingweb.ie//components/buttonAccount
const ButtonAccount = () => {
  const supabase = createClient();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [user, setUser] = useState<User>(null);
  const router = useRouter();

  const handleUpdatePassword = async () => {
    router.push('/update-password');
  };

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setUser(user);
    };

    getUser();
  }, [supabase]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    window.location.href = '/';
  };

  const handleBilling = async () => {
    setIsLoading(true);

    try {
      const { url }: { url: string } = await apiClient.post(
        '/stripe/create-portal',
        {
          returnUrl: window.location.href,
        }
      );

      window.location.href = url;
    } catch (e) {
      console.error(e);
    }

    setIsLoading(false);
  };

  return (
    <Popover className="relative z-10">
      {({ open }) => (
        <>
          <Popover.Button as={Button} variant="outline" className="gap-2">
            <Avatar className="w-6 h-6">
              <AvatarImage
                src={user?.user_metadata?.avatar_url}
                alt="Profile picture"
              />
              <AvatarFallback className="text-xs bg-muted">
                {user?.email?.charAt(0)}
              </AvatarFallback>
            </Avatar>

            {user?.user_metadata?.name ??
              user?.email?.split('@')[0] ??
              'Account'}

            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <ChevronDown
                className={`w-4 h-4 duration-200 opacity-50 ${
                  open ? 'transform rotate-180 ' : ''
                }`}
              />
            )}
          </Popover.Button>
          <Transition
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
            <Popover.Panel className="absolute left-0 z-10 mt-3 w-screen max-w-[16rem] transform">
              <div className="overflow-hidden rounded-xl shadow-xl ring-1 ring-border bg-popover p-1">
                <div className="space-y-0.5 text-sm">
                  <button
                    className="flex items-center gap-2 hover:bg-accent duration-200 py-1.5 px-4 w-full rounded-lg font-medium text-popover-foreground"
                    onClick={handleBilling}
                  >
                    <CreditCard className="w-5 h-5" />
                    Billing
                  </button>
                  <button
                    className="flex items-center gap-2 hover:bg-accent duration-200 py-1.5 px-4 w-full rounded-lg font-medium text-popover-foreground"
                    onClick={handleUpdatePassword}
                  >
                    <Lock className="w-5 h-5" />
                    Update Password
                  </button>

                  <Separator />
                  <button
                    className="flex items-center gap-2 hover:bg-destructive/20 hover:text-destructive duration-200 py-1.5 px-4 w-full rounded-lg font-medium"
                    onClick={handleSignOut}
                  >
                    <LogOut className="w-5 h-5" />
                    Logout
                  </button>
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
};

export default ButtonAccount;
