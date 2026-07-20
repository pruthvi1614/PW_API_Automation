import { APIRequestContext } from '@playwright/test'
import { AuthService } from '../services/auth.service'
import { getEnvironmentConfig } from '../config/environment.config'

/**
 * Token manager for handling authentication tokens
 * Implements automatic login and token injection
 */
export class TokenManager {
  private static instance: TokenManager
  private authService: AuthService
  private token: string | null = null

  private constructor(request: APIRequestContext) {
    this.authService = new AuthService(request)
  }

  /**
   * Get singleton instance
   * @param request - APIRequestContext
   * @returns TokenManager instance
   */
  static getInstance(request: APIRequestContext): TokenManager {
    if (!TokenManager.instance) {
      TokenManager.instance = new TokenManager(request)
    }
    return TokenManager.instance
  }

  /**
   * Get authentication token, login if not available
   * @returns Access token
   */
  async getToken(): Promise<string> {
    if (!this.token) {
      await this.login()
    }
    return this.token!
  }

  /**
   * Perform login and store token
   */
  private async login(): Promise<void> {
    const config = getEnvironmentConfig()
    const response = await this.authService.login(config.credentials.username, config.credentials.password)
    this.token = response.accessToken
  }

  /**
   * Clear stored token
   */
  clearToken(): void {
    this.token = null
  }
}