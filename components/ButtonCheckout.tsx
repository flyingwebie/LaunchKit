'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import apiClient from '@/libs/api';
import config from '@/config';
import { Rocket } from 'lucide-react';

// This component is used to create Stripe Checkout Sessions
// It calls the /api/stripe/create-checkout route with the priceId, successUrl and cancelUrl
// Users must be authenticated. It will prefill the Checkout data with their email and/or credit card (if any)
// You can also change the mode to "subscription" if you want to create a subscription instead of a one-time payment
const ButtonCheckout = ({
  priceId,
  mode = 'payment',
}: {
  priceId: string;
  mode?: 'payment' | 'subscription';
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handlePayment = async () => {
    setIsLoading(true);

    try {
      const { url }: { url: string } = await apiClient.post(
        '/stripe/create-checkout',
        {
          priceId,
          successUrl: window.location.href,
          cancelUrl: window.location.href,
          mode,
        }
      );

      window.location.href = url;
    } catch (e) {
      console.error(e);
    }

    setIsLoading(false);
  };

  return (
    <Button
      className="w-full group gap-2"
      onClick={() => handlePayment()}
      disabled={isLoading}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        <Rocket className="w-5 h-5 fill-primary-foreground group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-200" />
      )}
      Get {config?.appName}
    </Button>
  );
};

export default ButtonCheckout;
