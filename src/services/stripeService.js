import Stripe from 'stripe';

export const buildStripeService = (apiKey) => {
  const stripeService = new Stripe(apiKey, { telemetry: false });

  const findCustomerByEmail = async (email) => {
    const customers = await stripeService.customers.list({
      email,
    });
    return customers.data;
  };

  return {
    findCustomerByEmail,
  };
};
