import type { Database } from '@/types/supabase';
import type {
  JldCustomer,
  JldGiftCard,
  JldGiftCardRedemption,
  JldNewsletterSubscriber,
  JldPayment,
  JldProduct,
} from '@/types/jld';

type CustomerRow = Database['public']['Tables']['customers']['Row'];
type GiftCardRow = Database['public']['Tables']['gift_cards']['Row'];
type PaymentRow = Database['public']['Tables']['payments']['Row'];
type ProductRow = Database['public']['Tables']['products']['Row'];
type NewsletterRow = Database['public']['Tables']['newsletter_subscribers']['Row'];
type RedemptionRow = Database['public']['Tables']['gift_card_redemptions']['Row'];

export function mapCustomerRow(row: CustomerRow): JldCustomer {
  return {
    id: row.id,
    firstName: row.first_name,
    lastName: row.last_name,
    fullName: row.full_name,
    email: row.email,
    phone: row.phone,
    notes: row.notes,
    newsletterOptIn: row.newsletter_opt_in,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export function mapGiftCardRow(row: GiftCardRow): JldGiftCard {
  return {
    id: row.id,
    code: row.code,
    customerId: row.customer_id,
    customerEmail: row.customer_email,
    amountMxn: row.amount_mxn,
    currency: row.currency,
    qrValue: row.qr_value,
    status: row.status,
    message: row.message,
    recipientName: row.recipient_name,
    purchasedAt: row.purchased_at,
    redeemedAt: row.redeemed_at,
    expiresAt: row.expires_at,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export function mapPaymentRow(row: PaymentRow): JldPayment {
  return {
    id: row.id,
    customerId: row.customer_id,
    giftCardId: row.gift_card_id,
    productId: row.product_id,
    amountMxn: row.amount_mxn,
    currency: row.currency,
    provider: row.provider,
    providerReference: row.provider_reference,
    paymentStatus: row.payment_status,
    paidAt: row.paid_at,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export function mapProductRow(row: ProductRow): JldProduct {
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    description: row.description,
    productType: row.product_type,
    priceMxn: row.price_mxn,
    active: row.active,
    imageUrl: row.image_url,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export function mapNewsletterRow(row: NewsletterRow): JldNewsletterSubscriber {
  return {
    id: row.id,
    email: row.email,
    firstName: row.first_name,
    lastName: row.last_name,
    source: row.source,
    consent: row.consent,
    subscribedAt: row.subscribed_at,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export function mapRedemptionRow(row: RedemptionRow): JldGiftCardRedemption {
  return {
    id: row.id,
    giftCardId: row.gift_card_id,
    redeemedAmountMxn: row.redeemed_amount_mxn,
    redeemedAt: row.redeemed_at,
    redeemedBy: row.redeemed_by,
    notes: row.notes,
    createdAt: row.created_at,
  };
}
