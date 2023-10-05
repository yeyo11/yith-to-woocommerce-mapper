export const yithToWcSubscriptions = async ({
  yithSubscriptions,
  db,
  stripeService,
}) => {
  const subscriptionsPromises = yithSubscriptions.map(async (subscription) => {
    const { customer_id, billing_email_address, status } = subscription;

    if (status !== 'active') {
      return null;
    }

    const user = await db.findUserById(customer_id);
    if (!user.length) {
      console.error(`No user found for ${billing_email_address}!`);
      return null;
    }

    const stripeUsers = await stripeService.findCustomerByEmail(
      billing_email_address
    );
    if (!stripeUsers.length) {
      console.error(`No stripe user found for ${billing_email_address}!`);
      return null;
    }

    const phone = String(subscription.billing_phone);

    return {
      customer_id: subscription.customer_id,
      billing_first_name: subscription.billing_first_name,
      billing_last_name: subscription.billing_last_name,
      billing_address_1: subscription.billing_street_address,
      billing_address_2: subscription.billing_apartment_room_staircase_etc,
      billing_city: subscription.billing_city,
      billing_state: subscription.billing_province,
      billing_postcode: subscription.billing_postal_code,
      billing_country: subscription.billing_country_region,
      billing_email: subscription.billing_email_address,
      billing_phone: phone.length > 9 ? phone.slice(2) : phone,
      billing_company: subscription.billing_company_name,
      subscription_status: 'wc-active',
      start_date: subscription.started_on,
      next_payment_date: '2023-10-10 02:00:00',
      billing_period: 'month',
      billing_interval: 1,
      order_subscriptions: `product_id:${subscription.product_id}`,
      cart_discount: 0,
      cart_discount_tax: 0,
      order_shipping: 0,
      order_shipping_tax: 0,
      order_total: subscription.periodic_amount,
      order_tax: 0,
      order_currency: subscription.currency || 'EUR',
      download_permissions: true,
      payment_method: subscription.payment_method || 'stripe',
      payment_method_title:
        subscription.payment_method_title || 'Tarjeta de crédito',
      payment_method_post_meta: `_stripe_customer_id:${stripeUsers[0].id}`,
    };
  });

  return (await Promise.all(subscriptionsPromises)).filter(
    (subscription) => subscription !== null
  );
};
