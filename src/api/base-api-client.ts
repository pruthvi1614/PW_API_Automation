import { APIRequestContext, APIResponse } from '@playwright/test'
import { getEnvironmentConfig } from '../config/environment.config'

/**
 * Base API client for all API requests
 * Provides centralized request handling with logging and error management
 */
export class BaseApiClient {
  private request: APIRequestContext
  private baseUrl: string

  constructor(request: APIRequestContext) {
    this.request = request
    this.baseUrl = getEnvironmentConfig().baseUrl
  }

  /**
   * GET request wrapper
   * @param endpoint - API endpoint path
   * @param headers - Optional headers
   * @returns APIResponse
   */
  async get(endpoint: string, headers?: Record<string, string>): Promise<APIResponse> {
    const response = await this.request.get(`${this.baseUrl}${endpoint}`, {
      headers: this.buildHeaders(headers)
    })
    this.logRequest('GET', endpoint, response.status())
    return response
  }

  /**
   * POST request wrapper
   * @param endpoint - API endpoint path
   * @param data - Request body data
   * @param headers - Optional headers
   * @returns APIResponse
   */
  async post(endpoint: string, data: object, headers?: Record<string, string>): Promise<APIResponse> {
    const response = await this.request.post(`${this.baseUrl}${endpoint}`, {
      data,
      headers: this.buildHeaders(headers)
    })
    this.logRequest('POST', endpoint, response.status())
    return response
  }

  /**
   * PUT request wrapper
   * @param endpoint - API endpoint path
   * @param data - Request body data
   * @param headers - Optional headers
   * @returns APIResponse
   */
  async put(endpoint: string, data: object, headers?: Record<string, string>): Promise<APIResponse> {
    const response = await this.request.put(`${this.baseUrl}${endpoint}`, {
      data,
      headers: this.buildHeaders(headers)
    })
    this.logRequest('PUT', endpoint, response.status())
    return response
  }

  /**
   * PATCH request wrapper
   * @param endpoint - API endpoint path
   * @param data - Request body data
   * @param headers - Optional headers
   * @returns APIResponse
   */
  async patch(endpoint: string, data: object, headers?: Record<string, string>): Promise<APIResponse> {
    const response = await this.request.patch(`${this.baseUrl}${endpoint}`, {
      data,
      headers: this.buildHeaders(headers)
    })
    this.logRequest('PATCH', endpoint, response.status())
    return response
  }

  /**
   * DELETE request wrapper
   * @param endpoint - API endpoint path
   * @param headers - Optional headers
   * @returns APIResponse
   */
  async delete(endpoint: string, headers?: Record<string, string>): Promise<APIResponse> {
    const response = await this.request.delete(`${this.baseUrl}${endpoint}`, {
      headers: this.buildHeaders(headers)
    })
    this.logRequest('DELETE', endpoint, response.status())
    return response
  }

  /**
   * Build headers with default content-type
   * @param customHeaders - Custom headers to merge
   * @returns Headers object
   */
  private buildHeaders(customHeaders?: Record<string, string>): Record<string, string> {
    return {
      'Content-Type': 'application/json',
      ...customHeaders
    }
  }

  /**
   * Log API request details
   * @param method - HTTP method
   * @param endpoint - API endpoint
   * @param status - Response status code
   */
  private logRequest(method: string, endpoint: string, status: number): void {
    const timestamp = new Date().toISOString()
    console.log(`[${timestamp}] ${method} ${endpoint} - Status: ${status}`)
  }
}