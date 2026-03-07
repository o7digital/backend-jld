'use client';

import { listGiftCardRedemptionsRepository, listGiftCardsRepository } from '@/repositories/jld';
import type { JldGiftCard } from '@/types/jld';

export type GiftCardWithBalance = JldGiftCard & {
  redeemedAmountMxn: number;
  remainingAmountMxn: number;
};

export async function listGiftCards(): Promise<GiftCardWithBalance[]> {
  const [giftCards, redemptions] = await Promise.all([listGiftCardsRepository(), listGiftCardRedemptionsRepository()]);

  return giftCards.map((giftCard) => {
    const redeemedAmountMxn = redemptions
      .filter((redemption) => redemption.giftCardId === giftCard.id)
      .reduce((sum, redemption) => sum + redemption.redeemedAmountMxn, 0);

    return {
      ...giftCard,
      redeemedAmountMxn,
      remainingAmountMxn: Math.max(giftCard.amountMxn - redeemedAmountMxn, 0),
    };
  });
}

export async function getGiftCardSummary() {
  const giftCards = await listGiftCards();

  return {
    total: giftCards.length,
    active: giftCards.filter((giftCard) => giftCard.status === 'active').length,
    redeemed: giftCards.filter((giftCard) => giftCard.status === 'redeemed').length,
    totalIssuedMxn: giftCards.reduce((sum, giftCard) => sum + giftCard.amountMxn, 0),
    remainingLiabilityMxn: giftCards.reduce((sum, giftCard) => sum + giftCard.remainingAmountMxn, 0),
  };
}
