'use client';

import { listPaymentsRepository } from '@/repositories/jld';

export async function listPayments() {
  return listPaymentsRepository();
}

export async function getPaymentsSummary() {
  const payments = await listPaymentsRepository();

  return {
    total: payments.length,
    pending: payments.filter((payment) => payment.paymentStatus === 'pending').length,
    paid: payments.filter((payment) => payment.paymentStatus === 'paid').length,
    failed: payments.filter((payment) => payment.paymentStatus === 'failed').length,
    totalPaidMxn: payments
      .filter((payment) => payment.paymentStatus === 'paid')
      .reduce((sum, payment) => sum + payment.amountMxn, 0),
  };
}
