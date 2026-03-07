'use client';

import {
  createCustomerRepository,
  deleteCustomerRepository,
  getCustomerRepository,
  listCustomersRepository,
  updateCustomerRepository,
} from '@/repositories/jld';
import type { JldCustomer, JldCustomerInput } from '@/types/jld';

export async function listCustomers(): Promise<JldCustomer[]> {
  return listCustomersRepository();
}

export async function getCustomer(id: string): Promise<JldCustomer | null> {
  return getCustomerRepository(id);
}

export async function createCustomer(input: JldCustomerInput): Promise<JldCustomer> {
  return createCustomerRepository(input);
}

export async function updateCustomer(id: string, input: JldCustomerInput): Promise<JldCustomer> {
  return updateCustomerRepository(id, input);
}

export async function deleteCustomer(id: string): Promise<void> {
  return deleteCustomerRepository(id);
}

export async function exportCustomersCsv(): Promise<string> {
  const customers = await listCustomersRepository();
  const headers = ['id', 'first_name', 'last_name', 'full_name', 'email', 'phone', 'newsletter_opt_in', 'created_at'];
  const rows = customers.map((customer) => [
    customer.id,
    customer.firstName,
    customer.lastName,
    customer.fullName,
    customer.email,
    customer.phone || '',
    customer.newsletterOptIn ? 'true' : 'false',
    customer.createdAt,
  ]);

  const escapeCell = (value: string) => `"${value.replace(/"/g, '""')}"`;
  return [headers, ...rows].map((row) => row.map((value) => escapeCell(String(value || ''))).join(',')).join('\r\n');
}
