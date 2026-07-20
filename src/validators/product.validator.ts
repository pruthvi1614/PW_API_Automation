import { expect } from '@playwright/test'
import { Product, ProductListResponse, Cart } from '../models/product.model'

/**
 * Product response validator
 */
export class ProductValidator {
  /**
   * Validate product list response
   * @param response - ProductListResponse to validate
   */
  static validateProductListResponse(response: ProductListResponse): void {
    expect(response.products).toBeTruthy()
    expect(response.total).toBeGreaterThan(0)
    expect(response.skip).toBeGreaterThanOrEqual(0)
    expect(response.limit).toBeGreaterThan(0)
    expect(response.products.length).toBeGreaterThan(0)
  }

  /**
   * Validate product has required fields
   * @param product - Product to validate
   */
  static validateProduct(product: Product): void {
    expect(product.id).toBeTruthy()
    expect(product.title).toBeTruthy()
    expect(product.description).toBeTruthy()
    expect(product.category).toBeTruthy()
    expect(product.price).toBeTruthy()
    expect(product.discountPercentage).toBeTruthy()
    expect(product.rating).toBeTruthy()
    expect(product.stock).toBeTruthy()
    expect(product.tags).toBeTruthy()
    expect(product.sku).toBeTruthy()
    expect(product.weight).toBeTruthy()
    expect(product.dimensions).toBeTruthy()
    expect(product.warrantyInformation).toBeTruthy()
    expect(product.shippingInformation).toBeTruthy()
    expect(product.availabilityStatus).toBeTruthy()
    expect(product.reviews).toBeTruthy()
    expect(product.returnPolicy).toBeTruthy()
    expect(product.minimumOrderQuantity).toBeTruthy()
    expect(product.meta).toBeTruthy()
    expect(product.images).toBeTruthy()
    expect(product.thumbnail).toBeTruthy()
  }

  /**
   * Validate cart response
   * @param cart - Cart to validate
   */
  static validateCart(cart: Cart): void {
    expect(cart.id).toBeTruthy()
    expect(cart.products).toBeTruthy()
    expect(cart.total).toBeTruthy()
    expect(cart.discountedTotal).toBeTruthy()
    expect(cart.userId).toBeTruthy()
    expect(cart.totalProducts).toBeTruthy()
    expect(cart.totalQuantity).toBeTruthy()
  }

  /**
   * Validate cart product
   * @param product - CartProduct to validate
   */
  static validateCartProduct(product: { id: number; title: string; price: number; quantity: number; total: number; discountPercentage: number; thumbnail: string }): void {
    expect(product.id).toBeTruthy()
    expect(product.title).toBeTruthy()
    expect(product.price).toBeTruthy()
    expect(product.quantity).toBeTruthy()
    expect(product.total).toBeTruthy()
    expect(product.discountPercentage).toBeTruthy()
    expect(product.thumbnail).toBeTruthy()
  }
}