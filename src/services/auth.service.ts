import { BaseApiClient } from '../api/base-api-client'
import { API_ENDPOINTS } from '../constants/api-endpoints'
import { AuthResponse, LoginRequest } from '../models/auth.model'

/**
 * Authentication service for handling login and token management
 */
export class AuthService extends BaseApiClient {
  /**
   * Login with credentials
   * @param username - User username
   * @param password - User password
   * @returns AuthResponse with tokens
   */
  async login(username: string, password: string): Promise<AuthResponse> {
    const response = await this.post(API_ENDPOINTS.AUTH.LOGIN, {
      username,
      password
    })
    return response.json()
  }

  /**
   * Login with pre-built request object
   * @param request - LoginRequest object
   * @returns AuthResponse with tokens
   */
  async loginWithRequest(request: LoginRequest): Promise<AuthResponse> {
    const response = await this.post(API_ENDPOINTS.AUTH.LOGIN, request)
    return response.json()
  }
}