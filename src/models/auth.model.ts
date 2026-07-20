/**
 * Authentication response model
 */
export interface AuthResponse {
  accessToken: string
  refreshToken: string
  id: number
  username: string
  email: string
  firstName: string
  lastName: string
  gender: string
  image: string
}

/**
 * Login request model
 */
export interface LoginRequest {
  username: string
  password: string
}