import type { GiftCardStatus, PaymentStatus, ProductType } from './supabase';

export type JldDataMode = 'supabase' | 'mock';

export type JldCustomer = {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  phone: string | null;
  notes: string | null;
  newsletterOptIn: boolean;
  createdAt: string;
  updatedAt: string;
};

export type JldCustomerInput = {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string | null;
  notes?: string | null;
  newsletterOptIn?: boolean;
};

export type JldGiftCard = {
  id: string;
  code: string;
  customerId: string | null;
  customerEmail: string;
  amountMxn: number;
  currency: string;
  qrValue: string | null;
  status: GiftCardStatus;
  message: string | null;
  recipientName: string | null;
  purchasedAt: string | null;
  redeemedAt: string | null;
  expiresAt: string | null;
  createdAt: string;
  updatedAt: string;
};

export type JldPayment = {
  id: string;
  customerId: string | null;
  giftCardId: string | null;
  productId: string | null;
  amountMxn: number;
  currency: string;
  provider: string;
  providerReference: string | null;
  paymentStatus: PaymentStatus;
  paidAt: string | null;
  createdAt: string;
  updatedAt: string;
};

export type JldProduct = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  productType: ProductType;
  priceMxn: number;
  active: boolean;
  imageUrl: string | null;
  createdAt: string;
  updatedAt: string;
};

export type JldProductInput = {
  name: string;
  slug?: string;
  description?: string | null;
  productType: ProductType;
  priceMxn: number;
  active?: boolean;
  imageUrl?: string | null;
};

export type JldNewsletterSubscriber = {
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  source: string | null;
  consent: boolean;
  subscribedAt: string;
  createdAt: string;
  updatedAt: string;
};

export type JldNewsletterSubscriberInput = {
  email: string;
  firstName?: string | null;
  lastName?: string | null;
  source?: string | null;
  consent?: boolean;
};

export type JldGiftCardRedemption = {
  id: string;
  giftCardId: string;
  redeemedAmountMxn: number;
  redeemedAt: string;
  redeemedBy: string | null;
  notes: string | null;
  createdAt: string;
};

export type JldDashboardOverview = {
  dataMode: JldDataMode;
  stats: {
    customers: number;
    activeGiftCards: number;
    pendingPayments: number;
    activeProducts: number;
    newsletterSubscribers: number;
    grossRevenueMxn: number;
    giftCardLiabilityMxn: number;
  };
  recentCustomers: JldCustomer[];
  recentGiftCards: JldGiftCard[];
  recentPayments: JldPayment[];
  newsletterBreakdown: Array<{ source: string; count: number }>;
};

export type JldMockDatabase = {
  customers: JldCustomer[];
  giftCards: JldGiftCard[];
  payments: JldPayment[];
  products: JldProduct[];
  newsletterSubscribers: JldNewsletterSubscriber[];
  giftCardRedemptions: JldGiftCardRedemption[];
};
