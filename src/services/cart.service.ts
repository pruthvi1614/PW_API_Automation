import { BaseApiClient } from '../api/base-api-client'
import { API_ENDPOINTS } from '../constants/api-endpoints'
import { AddToCartRequest, Cart } from '../models/product.model'

/**
 * Cart service for handling cart operations
 */
export class CartService extends BaseApiClient {
  /**
   * Add products to cart
   * @param request - AddToCartRequest object
   * @returns Cart
   */
  async addToCart(request: AddToCartRequest): Promise<Cart> {
    const response = await this.post(API_ENDPOINTS.CARTS.ADD, request)
    return response.json()
  }

  /**
   * Get cart by ID
   * @param id - Cart ID
   * @returns Cart
   */
  async getCartById(id: number | string): Promise<Cart> {
    const response = await this.get(API_ENDPOINTS.CARTS.DETAIL(id))
    return response.json()
  }
}