/**
 * Environment configuration for API automation framework
 * Supports multiple environments: dev, staging, prod
 */

export interface EnvironmentConfig {
  baseUrl: string
  timeout: number
  credentials: {
    username: string
    password: string
  }
}

/**
 * Environment configurations
 */
export const environments: Record<string, EnvironmentConfig> = {
  dev: {
    baseUrl: 'https://dummyjson.com',
    timeout: 30000,
    credentials: {
      username: 'emilys',
      password: 'emilyspass'
    }
  },
  staging: {
    baseUrl: 'https://dummyjson.com',
    timeout: 30000,
    credentials: {
      username: 'emilys',
      password: 'emilyspass'
    }
  },
  prod: {
    baseUrl: 'https://dummyjson.com',
    timeout: 30000,
    credentials: {
      username: 'emilys',
      password: 'emilyspass'
    }
  }
}

/**
 * Get current environment configuration
 * @returns EnvironmentConfig for the current environment
 */
export function getEnvironmentConfig(): EnvironmentConfig {
  const env = process.env.TEST_ENV || 'dev'
  return environments[env]
}