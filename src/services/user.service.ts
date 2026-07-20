import { BaseApiClient } from '../api/base-api-client'
import { API_ENDPOINTS } from '../constants/api-endpoints'
import { UserProfile } from '../models/user.model'

/**
 * User service for handling user profile operations
 */
export class UserService extends BaseApiClient {
  /**
   * Get current user profile
   * @param token - Authentication token
   * @returns UserProfile
   */
  async getProfile(token: string): Promise<UserProfile> {
    const response = await this.get(API_ENDPOINTS.AUTH.ME, {
      Authorization: `Bearer ${token}`
    })
    return response.json()
  }
}