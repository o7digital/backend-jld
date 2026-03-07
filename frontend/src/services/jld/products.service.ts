'use client';

import {
  createProductRepository,
  deleteProductRepository,
  listProductsRepository,
  updateProductRepository,
} from '@/repositories/jld';
import type { JldProduct, JldProductInput } from '@/types/jld';

export async function listProducts(): Promise<JldProduct[]> {
  return listProductsRepository();
}

export async function createProduct(input: JldProductInput): Promise<JldProduct> {
  return createProductRepository(input);
}

export async function updateProduct(id: string, input: JldProductInput): Promise<JldProduct> {
  return updateProductRepository(id, input);
}

export async function deleteProduct(id: string): Promise<void> {
  return deleteProductRepository(id);
}

export async function getProductsSummary() {
  const products = await listProductsRepository();
  return {
    total: products.length,
    active: products.filter((product) => product.active).length,
    giftCards: products.filter((product) => product.productType === 'gift_card').length,
    services: products.filter((product) => product.productType === 'service').length,
    retail: products.filter((product) => product.productType === 'retail_product').length,
  };
}
