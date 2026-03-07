-- Jean Louis David Mexico
-- Base structure for the dedicated JLD Supabase project.
-- Phase 1 scope only: customers, gift cards, payments, products, newsletter, redemptions.
-- Stripe/webhooks/QR/email automation will be attached in a later phase.

create extension if not exists pgcrypto;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

create table if not exists public.customers (
  id uuid primary key default gen_random_uuid(),
  first_name text not null,
  last_name text not null,
  full_name text not null,
  email text not null unique,
  phone text,
  notes text,
  newsletter_opt_in boolean not null default false,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text,
  product_type text not null check (product_type in ('gift_card', 'retail_product', 'service')),
  price_mxn numeric(12,2) not null check (price_mxn >= 0),
  active boolean not null default true,
  image_url text,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.gift_cards (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  customer_id uuid references public.customers(id) on delete set null,
  customer_email text not null,
  amount_mxn numeric(12,2) not null check (amount_mxn >= 0),
  currency text not null default 'MXN',
  qr_value text,
  status text not null default 'active' check (status in ('active', 'redeemed', 'cancelled', 'expired')),
  message text,
  recipient_name text,
  purchased_at timestamptz,
  redeemed_at timestamptz,
  expires_at timestamptz,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.payments (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid references public.customers(id) on delete set null,
  gift_card_id uuid references public.gift_cards(id) on delete set null,
  product_id uuid references public.products(id) on delete set null,
  amount_mxn numeric(12,2) not null check (amount_mxn >= 0),
  currency text not null default 'MXN',
  provider text not null,
  provider_reference text,
  payment_status text not null default 'pending' check (payment_status in ('pending', 'paid', 'failed', 'refunded')),
  paid_at timestamptz,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  first_name text,
  last_name text,
  source text,
  consent boolean not null default true,
  subscribed_at timestamptz not null default timezone('utc', now()),
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.gift_card_redemptions (
  id uuid primary key default gen_random_uuid(),
  gift_card_id uuid not null references public.gift_cards(id) on delete cascade,
  redeemed_amount_mxn numeric(12,2) not null check (redeemed_amount_mxn >= 0),
  redeemed_at timestamptz not null default timezone('utc', now()),
  redeemed_by text,
  notes text,
  created_at timestamptz not null default timezone('utc', now())
);

create index if not exists idx_customers_email on public.customers(email);
create index if not exists idx_gift_cards_code on public.gift_cards(code);
create index if not exists idx_gift_cards_status on public.gift_cards(status);
create index if not exists idx_gift_cards_customer_id on public.gift_cards(customer_id);
create index if not exists idx_payments_customer_id on public.payments(customer_id);
create index if not exists idx_payments_gift_card_id on public.payments(gift_card_id);
create index if not exists idx_payments_status on public.payments(payment_status);
create index if not exists idx_products_slug on public.products(slug);
create index if not exists idx_newsletter_email on public.newsletter_subscribers(email);
create index if not exists idx_redemptions_gift_card_id on public.gift_card_redemptions(gift_card_id);

drop trigger if exists trg_customers_updated_at on public.customers;
create trigger trg_customers_updated_at
before update on public.customers
for each row execute function public.set_updated_at();

drop trigger if exists trg_products_updated_at on public.products;
create trigger trg_products_updated_at
before update on public.products
for each row execute function public.set_updated_at();

drop trigger if exists trg_gift_cards_updated_at on public.gift_cards;
create trigger trg_gift_cards_updated_at
before update on public.gift_cards
for each row execute function public.set_updated_at();

drop trigger if exists trg_payments_updated_at on public.payments;
create trigger trg_payments_updated_at
before update on public.payments
for each row execute function public.set_updated_at();

drop trigger if exists trg_newsletter_subscribers_updated_at on public.newsletter_subscribers;
create trigger trg_newsletter_subscribers_updated_at
before update on public.newsletter_subscribers
for each row execute function public.set_updated_at();

alter table public.customers enable row level security;
alter table public.products enable row level security;
alter table public.gift_cards enable row level security;
alter table public.payments enable row level security;
alter table public.newsletter_subscribers enable row level security;
alter table public.gift_card_redemptions enable row level security;

drop policy if exists customers_authenticated_full_access on public.customers;
create policy customers_authenticated_full_access on public.customers
for all to authenticated
using (true)
with check (true);

drop policy if exists products_authenticated_full_access on public.products;
create policy products_authenticated_full_access on public.products
for all to authenticated
using (true)
with check (true);

drop policy if exists gift_cards_authenticated_full_access on public.gift_cards;
create policy gift_cards_authenticated_full_access on public.gift_cards
for all to authenticated
using (true)
with check (true);

drop policy if exists payments_authenticated_full_access on public.payments;
create policy payments_authenticated_full_access on public.payments
for all to authenticated
using (true)
with check (true);

drop policy if exists newsletter_authenticated_full_access on public.newsletter_subscribers;
create policy newsletter_authenticated_full_access on public.newsletter_subscribers
for all to authenticated
using (true)
with check (true);

drop policy if exists redemptions_authenticated_full_access on public.gift_card_redemptions;
create policy redemptions_authenticated_full_access on public.gift_card_redemptions
for all to authenticated
using (true)
with check (true);

comment on table public.customers is 'JLD customers base for salon and gift card operations.';
comment on table public.gift_cards is 'Gift cards sold or issued by Jean Louis David Mexico.';
comment on table public.payments is 'Payment records prepared for future Stripe/manual provider integration.';
comment on table public.products is 'JLD product catalog including gift cards, retail and services.';
comment on table public.newsletter_subscribers is 'Newsletter audience with explicit consent tracking.';
comment on table public.gift_card_redemptions is 'Future-proof redemption ledger for partial or full canjes.';
