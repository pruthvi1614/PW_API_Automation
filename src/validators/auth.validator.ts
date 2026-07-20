import { expect } from '@playwright/test'
import { AuthResponse } from '../models/auth.model'

/**
 * Authentication response validator
 */
export class AuthValidator {
  /**
   * Validate auth response has all required fields
   * @param response - AuthResponse to validate
   */
  static validateAuthResponse(response: AuthResponse): void {
    expect(response.accessToken).toBeTruthy()
    expect(response.refreshToken).toBeTruthy()
    expect(response.id).toBeTruthy()
    expect(response.username).toBeTruthy()
    expect(response.email).toBeTruthy()
    expect(response.firstName).toBeTruthy()
    expect(response.lastName).toBeTruthy()
    expect(response.gender).toBeTruthy()
    expect(response.image).toBeTruthy()
  }

  /**
   * Validate JWT token format
   * @param token - Token to validate
   */
  static validateJwtToken(token: string): void {
    expect(token).toMatch(/^eyJ[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/)
  }
}