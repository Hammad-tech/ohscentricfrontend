const API_BASE_URL = (import.meta.env.VITE_FASTAPI_URL || 'http://127.0.0.1:8000').replace(/\/$/, '');

export interface SubscriptionStatus {
  plan: string;
  status: string;
  current_period_end?: string;
  cancel_at_period_end?: boolean;
  stripe_customer_id?: string;
  stripe_subscription_id?: string;
}

export interface CheckoutSessionResponse {
  checkout_url: string;
  session_id: string;
}

export interface CustomerPortalResponse {
  portal_url: string;
}

class StripeService {
  private async makeAuthenticatedRequest(endpoint: string, options: RequestInit = {}) {
    const token = localStorage.getItem('authToken');
    
    if (!token) {
      throw new Error('Authentication required');
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        ...options.headers,
      },
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(`API request failed: ${response.status} - ${errorData}`);
    }

    return response.json();
  }

  /**
   * Create a Stripe Checkout session and redirect user to payment page
   */
  async upgradeToProffesional(successUrl: string, cancelUrl: string): Promise<void> {
    try {
      const response: CheckoutSessionResponse = await this.makeAuthenticatedRequest('/api/stripe/create-checkout', {
        method: 'POST',
        body: JSON.stringify({
          success_url: successUrl,
          cancel_url: cancelUrl,
        }),
      });

      // Redirect to Stripe Checkout
      window.location.href = response.checkout_url;
    } catch (error) {
      console.error('Failed to create checkout session:', error);
      throw error;
    }
  }

  /**
   * Open Stripe Customer Portal for subscription management
   */
  async manageSubscription(returnUrl: string): Promise<void> {
    try {
      const response: CustomerPortalResponse = await this.makeAuthenticatedRequest('/api/stripe/create-portal', {
        method: 'POST',
        body: JSON.stringify({
          return_url: returnUrl,
        }),
      });

      // Redirect to Stripe Customer Portal
      window.location.href = response.portal_url;
    } catch (error) {
      console.error('Failed to create customer portal session:', error);
      throw error;
    }
  }

  /**
   * Get current subscription status
   */
  async getSubscriptionStatus(): Promise<SubscriptionStatus> {
    try {
      return await this.makeAuthenticatedRequest('/api/stripe/subscription-status', {
        method: 'GET',
      });
    } catch (error) {
      console.error('Failed to get subscription status:', error);
      throw error;
    }
  }
}

export const stripeService = new StripeService();
export default stripeService; 