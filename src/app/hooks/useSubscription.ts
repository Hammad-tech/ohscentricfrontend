import { useState, useEffect } from 'react';
import stripeService, { SubscriptionStatus } from '@/app/services/stripeService';
import { useAuth } from '@/app/context/AuthContext';

export const useSubscription = () => {
  const [subscriptionStatus, setSubscriptionStatus] = useState<SubscriptionStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const fetchSubscriptionStatus = async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const status = await stripeService.getSubscriptionStatus();
      setSubscriptionStatus(status);
    } catch (err) {
      console.error('Failed to fetch subscription status:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch subscription status');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscriptionStatus();
  }, [user]);

  const refreshSubscriptionStatus = () => {
    fetchSubscriptionStatus();
  };

  const isProfessional = subscriptionStatus?.plan === 'professional';
  const isActive = subscriptionStatus?.status === 'active';
  const willCancelAtPeriodEnd = subscriptionStatus?.cancel_at_period_end || false;

  return {
    subscriptionStatus,
    loading,
    error,
    refreshSubscriptionStatus,
    isProfessional,
    isActive,
    willCancelAtPeriodEnd,
  };
}; 