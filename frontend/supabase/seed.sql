-- Seed aligned with frontend mock data for Jean Louis David Mexico.

insert into public.customers (
  id, first_name, last_name, full_name, email, phone, notes, newsletter_opt_in, created_at, updated_at
) values
  ('8a7f4d2a-9c12-4c23-bf1f-2c9a76381001', 'Valeria', 'Ortega', 'Valeria Ortega', 'valeria.ortega@jeanlouisdavid.mx', '+52 55 2104 1188', 'Compra gift cards para aniversarios del equipo directivo.', true, '2026-02-01T10:15:00Z', '2026-03-01T16:40:00Z'),
  ('8a7f4d2a-9c12-4c23-bf1f-2c9a76381002', 'Diego', 'Ramirez', 'Diego Ramirez', 'diego.ramirez@ateliermx.com', '+52 55 4432 9901', 'Prefiere entregas digitales con mensaje personalizado.', false, '2026-02-04T12:30:00Z', '2026-03-04T12:10:00Z'),
  ('8a7f4d2a-9c12-4c23-bf1f-2c9a76381003', 'Camila', 'Torres', 'Camila Torres', 'camila.torres@gmail.com', '+52 33 1098 5570', 'Cliente retail frecuente en sucursal Polanco.', true, '2026-02-12T09:00:00Z', '2026-03-06T08:55:00Z'),
  ('8a7f4d2a-9c12-4c23-bf1f-2c9a76381004', 'Mariana', 'Solis', 'Mariana Solis', 'mariana.solis@luxecircle.mx', '+52 81 5574 2011', 'Solicita seguimiento para regalos corporativos premium.', true, '2026-02-20T15:25:00Z', '2026-03-05T19:20:00Z')
on conflict (id) do nothing;

insert into public.products (
  id, name, slug, description, product_type, price_mxn, active, image_url, created_at, updated_at
) values
  ('4b560ca7-70d8-4d40-9e3f-5f7ecb811001', 'Gift Card 500 MXN', 'gift-card-500-mxn', 'Tarjeta digital para un detalle elegante.', 'gift_card', 500.00, true, '/tarjeta2.png', '2026-02-01T10:15:00Z', '2026-03-01T10:15:00Z'),
  ('4b560ca7-70d8-4d40-9e3f-5f7ecb811002', 'Gift Card 1,000 MXN', 'gift-card-1000-mxn', 'Formato premium para libertad total en servicio o retail.', 'gift_card', 1000.00, true, '/tarjeta2.png', '2026-02-01T10:20:00Z', '2026-03-01T10:20:00Z'),
  ('4b560ca7-70d8-4d40-9e3f-5f7ecb811003', 'Gift Card 2,000 MXN', 'gift-card-2000-mxn', 'Ideal para una experiencia de transformación completa.', 'gift_card', 2000.00, true, '/tarjeta2.png', '2026-02-01T10:25:00Z', '2026-03-01T10:25:00Z'),
  ('4b560ca7-70d8-4d40-9e3f-5f7ecb811004', 'Signature Care Duo', 'signature-care-duo', 'Set retail premium para cuidado en casa.', 'retail_product', 1290.00, true, null, '2026-02-08T09:00:00Z', '2026-03-02T11:10:00Z'),
  ('4b560ca7-70d8-4d40-9e3f-5f7ecb811005', 'Ritual Repair Experience', 'ritual-repair-experience', 'Servicio premium con asesoría y ritual de reparación.', 'service', 1800.00, true, null, '2026-02-15T16:40:00Z', '2026-03-03T14:00:00Z')
on conflict (id) do nothing;

insert into public.gift_cards (
  id, code, customer_id, customer_email, amount_mxn, currency, qr_value, status, message, recipient_name, purchased_at, redeemed_at, expires_at, created_at, updated_at
) values
  ('9d112f89-c4f5-4ec7-8bc9-66cdd1011001', 'JLDMX-500-VA01', '8a7f4d2a-9c12-4c23-bf1f-2c9a76381001', 'valeria.ortega@jeanlouisdavid.mx', 500.00, 'MXN', 'mock://gift-card/JLDMX-500-VA01', 'active', 'Para consentirte con estilo.', 'Paula Neri', '2026-03-01T18:30:00Z', null, '2027-03-01T18:30:00Z', '2026-03-01T18:30:00Z', '2026-03-01T18:30:00Z'),
  ('9d112f89-c4f5-4ec7-8bc9-66cdd1011002', 'JLDMX-1000-DR02', '8a7f4d2a-9c12-4c23-bf1f-2c9a76381002', 'diego.ramirez@ateliermx.com', 1000.00, 'MXN', 'mock://gift-card/JLDMX-1000-DR02', 'redeemed', 'Te va a encantar esta experiencia.', 'Sofia Herrera', '2026-02-26T13:10:00Z', '2026-03-03T19:20:00Z', '2027-02-26T13:10:00Z', '2026-02-26T13:10:00Z', '2026-03-03T19:20:00Z'),
  ('9d112f89-c4f5-4ec7-8bc9-66cdd1011003', 'JLDMX-2000-CT03', '8a7f4d2a-9c12-4c23-bf1f-2c9a76381003', 'camila.torres@gmail.com', 2000.00, 'MXN', 'mock://gift-card/JLDMX-2000-CT03', 'active', 'Un look completo para celebrar.', 'Camila Torres', '2026-03-05T09:30:00Z', null, '2027-03-05T09:30:00Z', '2026-03-05T09:30:00Z', '2026-03-05T09:30:00Z'),
  ('9d112f89-c4f5-4ec7-8bc9-66cdd1011004', 'JLDMX-5000-MS04', '8a7f4d2a-9c12-4c23-bf1f-2c9a76381004', 'mariana.solis@luxecircle.mx', 5000.00, 'MXN', 'mock://gift-card/JLDMX-5000-MS04', 'active', 'Regalo corporativo de edición exclusiva.', 'Equipo Luxe Circle', '2026-03-06T15:45:00Z', null, '2027-03-06T15:45:00Z', '2026-03-06T15:45:00Z', '2026-03-06T15:45:00Z')
on conflict (id) do nothing;

insert into public.payments (
  id, customer_id, gift_card_id, product_id, amount_mxn, currency, provider, provider_reference, payment_status, paid_at, created_at, updated_at
) values
  ('71d43d5d-31b1-4fef-9fdf-1f1fe0811001', '8a7f4d2a-9c12-4c23-bf1f-2c9a76381001', '9d112f89-c4f5-4ec7-8bc9-66cdd1011001', '4b560ca7-70d8-4d40-9e3f-5f7ecb811001', 500.00, 'MXN', 'manual', 'MANUAL-0301-001', 'paid', '2026-03-01T18:31:00Z', '2026-03-01T18:30:00Z', '2026-03-01T18:31:00Z'),
  ('71d43d5d-31b1-4fef-9fdf-1f1fe0811002', '8a7f4d2a-9c12-4c23-bf1f-2c9a76381002', '9d112f89-c4f5-4ec7-8bc9-66cdd1011002', '4b560ca7-70d8-4d40-9e3f-5f7ecb811002', 1000.00, 'MXN', 'manual', 'MANUAL-0226-002', 'paid', '2026-02-26T13:12:00Z', '2026-02-26T13:10:00Z', '2026-02-26T13:12:00Z'),
  ('71d43d5d-31b1-4fef-9fdf-1f1fe0811003', '8a7f4d2a-9c12-4c23-bf1f-2c9a76381003', '9d112f89-c4f5-4ec7-8bc9-66cdd1011003', '4b560ca7-70d8-4d40-9e3f-5f7ecb811003', 2000.00, 'MXN', 'pending_checkout', 'CHECKOUT-0305-003', 'pending', null, '2026-03-05T09:30:00Z', '2026-03-05T09:30:00Z'),
  ('71d43d5d-31b1-4fef-9fdf-1f1fe0811004', '8a7f4d2a-9c12-4c23-bf1f-2c9a76381004', '9d112f89-c4f5-4ec7-8bc9-66cdd1011004', '4b560ca7-70d8-4d40-9e3f-5f7ecb811003', 5000.00, 'MXN', 'manual', 'MANUAL-0306-004', 'paid', '2026-03-06T15:47:00Z', '2026-03-06T15:45:00Z', '2026-03-06T15:47:00Z'),
  ('71d43d5d-31b1-4fef-9fdf-1f1fe0811005', '8a7f4d2a-9c12-4c23-bf1f-2c9a76381003', null, '4b560ca7-70d8-4d40-9e3f-5f7ecb811004', 1290.00, 'MXN', 'terminal', 'TERM-0304-005', 'paid', '2026-03-04T17:05:00Z', '2026-03-04T17:02:00Z', '2026-03-04T17:05:00Z')
on conflict (id) do nothing;

insert into public.newsletter_subscribers (
  id, email, first_name, last_name, source, consent, subscribed_at, created_at, updated_at
) values
  ('af6e66c0-5417-4237-8d90-9f82ee311001', 'valeria.ortega@jeanlouisdavid.mx', 'Valeria', 'Ortega', 'corporate_gifting', true, '2026-02-01T10:15:00Z', '2026-02-01T10:15:00Z', '2026-02-01T10:15:00Z'),
  ('af6e66c0-5417-4237-8d90-9f82ee311002', 'camila.torres@gmail.com', 'Camila', 'Torres', 'in_salon', true, '2026-02-12T09:00:00Z', '2026-02-12T09:00:00Z', '2026-02-12T09:00:00Z'),
  ('af6e66c0-5417-4237-8d90-9f82ee311003', 'mariana.solis@luxecircle.mx', 'Mariana', 'Solis', 'website_popup', true, '2026-02-20T15:25:00Z', '2026-02-20T15:25:00Z', '2026-02-20T15:25:00Z'),
  ('af6e66c0-5417-4237-8d90-9f82ee311004', 'hello@luxebridal.mx', 'Sofia', 'Delgado', 'bridal_event', true, '2026-03-02T11:20:00Z', '2026-03-02T11:20:00Z', '2026-03-02T11:20:00Z')
on conflict (id) do nothing;

insert into public.gift_card_redemptions (
  id, gift_card_id, redeemed_amount_mxn, redeemed_at, redeemed_by, notes, created_at
) values
  ('1d989255-b7a8-4c21-b7fd-5d8352011001', '9d112f89-c4f5-4ec7-8bc9-66cdd1011002', 1000.00, '2026-03-03T19:20:00Z', 'polanco-front-desk', 'Canje completo en servicio color signature.', '2026-03-03T19:20:00Z'),
  ('1d989255-b7a8-4c21-b7fd-5d8352011002', '9d112f89-c4f5-4ec7-8bc9-66cdd1011004', 1500.00, '2026-03-07T16:10:00Z', 'corporate-concierge', 'Uso parcial reservado para sesión editorial.', '2026-03-07T16:10:00Z')
on conflict (id) do nothing;
