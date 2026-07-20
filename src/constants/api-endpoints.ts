/**
 * API endpoint constants
 */
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    ME: '/auth/me'
  },
  PRODUCTS: {
    LIST: '/products',
    DETAIL: (id: number | string) => `/products/${id}`
  },
  CARTS: {
    ADD: '/carts/add',
    DETAIL: (id: number | string) => `/carts/${id}`
  }
} as const