import { BaseApiClient } from '../api/base-api-client'
import { API_ENDPOINTS } from '../constants/api-endpoints'
import { Product, ProductListResponse } from '../models/product.model'

/**
 * Product service for handling product operations
 */
export class ProductService extends BaseApiClient {
  /**
   * Get all products
   * @param limit - Optional limit parameter
   * @param skip - Optional skip parameter
   * @returns ProductListResponse
   */
  async getProducts(limit?: number, skip?: number): Promise<ProductListResponse> {
    let endpoint = API_ENDPOINTS.PRODUCTS.LIST
    const params: string[] = []
    
    if (limit !== undefined) {
      params.push(`limit=${limit}`)
    }
    if (skip !== undefined) {
      params.push(`skip=${skip}`)
    }
    
    if (params.length > 0) {
      endpoint += `?${params.join('&')}`
    }
    
    const response = await this.get(endpoint)
    return response.json()
  }

  /**
   * Get product by ID
   * @param id - Product ID
   * @returns Product
   */
  async getProductById(id: number | string): Promise<Product> {
    const response = await this.get(API_ENDPOINTS.PRODUCTS.DETAIL(id))
    return response.json()
  }
}