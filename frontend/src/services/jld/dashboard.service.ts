'use client';

import { listCustomersRepository, listGiftCardsRepository, listNewsletterSubscribersRepository, listPaymentsRepository, listProductsRepository, getJldDataMode } from '@/repositories/jld';
import type { JldDashboardOverview } from '@/types/jld';

export async function getDashboardOverview(): Promise<JldDashboardOverview> {
  const [customers, giftCards, payments, products, newsletterSubscribers] = await Promise.all([
    listCustomersRepository(),
    listGiftCardsRepository(),
    listPaymentsRepository(),
    listProductsRepository(),
    listNewsletterSubscribersRepository(),
  ]);

  const grossRevenueMxn = payments
    .filter((payment) => payment.paymentStatus === 'paid')
    .reduce((sum, payment) => sum + payment.amountMxn, 0);

  const giftCardLiabilityMxn = giftCards
    .filter((giftCard) => giftCard.status === 'active')
    .reduce((sum, giftCard) => sum + giftCard.amountMxn, 0);

  const newsletterBreakdown = newsletterSubscribers.reduce<Record<string, number>>((acc, subscriber) => {
    const source = subscriber.source || 'manual_admin';
    acc[source] = (acc[source] || 0) + 1;
    return acc;
  }, {});

  return {
    dataMode: getJldDataMode(),
    stats: {
      customers: customers.length,
      activeGiftCards: giftCards.filter((giftCard) => giftCard.status === 'active').length,
      pendingPayments: payments.filter((payment) => payment.paymentStatus === 'pending').length,
      activeProducts: products.filter((product) => product.active).length,
      newsletterSubscribers: newsletterSubscribers.length,
      grossRevenueMxn,
      giftCardLiabilityMxn,
    },
    recentCustomers: customers.slice(0, 5),
    recentGiftCards: giftCards.slice(0, 5),
    recentPayments: payments.slice(0, 5),
    newsletterBreakdown: Object.entries(newsletterBreakdown)
      .map(([source, count]) => ({ source, count }))
      .sort((a, b) => b.count - a.count),
  };
}
