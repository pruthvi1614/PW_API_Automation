import { test, expect } from '@playwright/test'
import { AuthService } from '../src/services/auth.service'
import { UserService } from '../src/services/user.service'
import { ProductService } from '../src/services/product.service'
import { CartService } from '../src/services/cart.service'
import { AuthValidator } from '../src/validators/auth.validator'
import { ProductValidator } from '../src/validators/product.validator'
import { getEnvironmentConfig } from '../src/config/environment.config'

// ==================== LOGIN API TESTS ====================
test.describe('Login API Tests', () => {
  test('TC01: Valid credentials should return access token', async ({ request }) => {
    const authService = new AuthService(request)
    const config = getEnvironmentConfig()
    
    const response = await authService.login(config.credentials.username, config.credentials.password)
    
    // Validate response
    AuthValidator.validateAuthResponse(response)
    AuthValidator.validateJwtToken(response.accessToken)
    AuthValidator.validateJwtToken(response.refreshToken)
  })

  test('TC02: Invalid username should return error', async ({ request }) => {
    const authService = new AuthService(request)
    
    const response = await request.post('/auth/login', {
      data: { username: 'invaliduser', password: 'emilyspass' }
    })
    
    expect(response.status()).toBe(400)
    const responseData = await response.json()
    expect(responseData).toHaveProperty('message')
  })

  test('TC03: Invalid password should return error', async ({ request }) => {
    const response = await request.post('/auth/login', {
      data: { username: 'emilys', password: 'wrongpassword' }
    })
    
    expect(response.status()).toBe(400)
    const responseData = await response.json()
    expect(responseData).toHaveProperty('message')
  })

  test('TC04: Missing username should return error', async ({ request }) => {
    const response = await request.post('/auth/login', {
      data: { password: 'emilyspass' }
    })
    
    expect(response.status()).toBe(400)
    const responseData = await response.json()
    expect(responseData).toHaveProperty('message')
  })

  test('TC05: Missing password should return error', async ({ request }) => {
    const response = await request.post('/auth/login', {
      data: { username: 'emilys' }
    })
    
    expect(response.status()).toBe(400)
    const responseData = await response.json()
    expect(responseData).toHaveProperty('message')
  })

  test('TC06: Empty request body should return error', async ({ request }) => {
    const response = await request.post('/auth/login', {
      data: {}
    })
    
    expect(response.status()).toBe(400)
    const responseData = await response.json()
    expect(responseData).toHaveProperty('message')
  })

  test('TC07: SQL injection attempt in username should return error', async ({ request }) => {
    const response = await request.post('/auth/login', {
      data: { username: "admin'--", password: 'emilyspass' }
    })
    
    expect([400, 401, 403]).toContain(response.status())
  })

  test('TC08: SQL injection attempt in password should return error', async ({ request }) => {
    const response = await request.post('/auth/login', {
      data: { username: 'emilys', password: "' OR '1'='1" }
    })
    
    expect([400, 401, 403]).toContain(response.status())
  })

  test('TC09: Response time should be within acceptable limits', async ({ request }) => {
    const startTime = Date.now()
    const response = await request.post('/auth/login', {
      data: { username: 'emilys', password: 'emilyspass' }
    })
    const responseTime = Date.now() - startTime
    
    expect(response.status()).toBe(200)
    expect(responseTime).toBeLessThan(5000) // 5 seconds
  })
})

// ==================== USER PROFILE API TESTS ====================
test.describe('Get User Profile API Tests', () => {
  let authToken: string

  test.beforeAll(async ({ request }) => {
    const authService = new AuthService(request)
    const config = getEnvironmentConfig()
    const response = await authService.login(config.credentials.username, config.credentials.password)
    authToken = response.accessToken
  })

  test('TC07: Get user profile with valid token', async ({ request }) => {
    const userService = new UserService(request)
    
    const response = await userService.getProfile(authToken)
    
    // Verify all user fields
    expect(response).toHaveProperty('id')
    expect(response).toHaveProperty('firstName')
    expect(response).toHaveProperty('lastName')
    expect(response).toHaveProperty('maidenName')
    expect(response).toHaveProperty('age')
    expect(response).toHaveProperty('gender')
    expect(response).toHaveProperty('email')
    expect(response).toHaveProperty('phone')
    expect(response).toHaveProperty('username')
    expect(response).toHaveProperty('birthDate')
    expect(response).toHaveProperty('image')
    expect(response).toHaveProperty('bloodGroup')
    expect(response).toHaveProperty('height')
    expect(response).toHaveProperty('weight')
    expect(response).toHaveProperty('eyeColor')
    expect(response).toHaveProperty('ip')
    expect(response).toHaveProperty('university')
    expect(response).toHaveProperty('ein')
    expect(response).toHaveProperty('ssn')
    expect(response).toHaveProperty('role')
    
    // Verify nested objects
    expect(response.hair).toHaveProperty('color')
    expect(response.hair).toHaveProperty('type')
    
    expect(response.address).toHaveProperty('address')
    expect(response.address).toHaveProperty('city')
    expect(response.address).toHaveProperty('state')
    expect(response.address).toHaveProperty('country')
    
    expect(response.bank).toHaveProperty('cardExpire')
    expect(response.bank).toHaveProperty('cardNumber')
    expect(response.bank).toHaveProperty('cardType')
    
    expect(response.company).toHaveProperty('department')
    expect(response.company).toHaveProperty('name')
    expect(response.company).toHaveProperty('title')
  })

  test('TC08: Get user profile without token should return 401', async ({ request }) => {
    const response = await request.get('/auth/me')
    
    expect(response.status()).toBe(401)
  })

  test('TC09: Get user profile with invalid token should return 401', async ({ request }) => {
    const response = await request.get('/auth/me', {
      headers: { Authorization: 'Bearer invalidtoken123' }
    })
    
    expect(response.status()).toBe(401)
  })

  test('TC10: User profile response time should be within acceptable limits', async ({ request }) => {
    const authService = new AuthService(request)
    const config = getEnvironmentConfig()
    const authResponse = await authService.login(config.credentials.username, config.credentials.password)
    
    const startTime = Date.now()
    const response = await request.get('/auth/me', {
      headers: { Authorization: `Bearer ${authResponse.accessToken}` }
    })
    const responseTime = Date.now() - startTime
    
    expect(response.status()).toBe(200)
    expect(responseTime).toBeLessThan(5000) // 5 seconds
  })

  test('TC11: User profile data types should be valid', async ({ request }) => {
    const userService = new UserService(request)
    
    const response = await userService.getProfile(authToken)
    
    expect(typeof response.id).toBe('number')
    expect(typeof response.firstName).toBe('string')
    expect(typeof response.lastName).toBe('string')
    expect(typeof response.age).toBe('number')
    expect(typeof response.email).toBe('string')
  })
})

// ==================== PRODUCT LIST API TESTS ====================
test.describe('Product List API Tests', () => {
  test('TC10: Get all products', async ({ request }) => {
    const productService = new ProductService(request)
    
    const response = await productService.getProducts()
    
    // Validate response
    ProductValidator.validateProductListResponse(response)
    
    // Validate each product
    for (const product of response.products) {
      ProductValidator.validateProduct(product)
    }
  })

  test('TC11: Get products with limit parameter', async ({ request }) => {
    const productService = new ProductService(request)
    
    const response = await productService.getProducts(10)
    
    expect(response.products.length).toBeLessThanOrEqual(10)
    expect(response.limit).toBe(10)
  })

  test('TC12: Get products with skip parameter', async ({ request }) => {
    const productService = new ProductService(request)
    
    const response = await productService.getProducts(10, 10)
    
    expect(response.skip).toBe(10)
    expect(response.products.length).toBeGreaterThan(0)
  })

  test('TC13: Get products with negative limit should handle gracefully', async ({ request }) => {
    const response = await request.get('/products?limit=-5')
    
    expect([200, 400]).toContain(response.status())
  })

  test('TC14: Get products with invalid limit type', async ({ request }) => {
    const response = await request.get('/products?limit=abc')
    
    expect([200, 400]).toContain(response.status())
  })

  test('TC15: Search products by query', async ({ request }) => {
    const response = await request.get('/products/search?q=phone')
    
    expect(response.status()).toBe(200)
    const responseData = await response.json()
    expect(responseData.products.length).toBeGreaterThan(0)
  })

  test('TC16: Filter products by category', async ({ request }) => {
    const response = await request.get('/products/category/beauty')
    
    expect(response.status()).toBe(200)
    const responseData = await response.json()
    expect(responseData.products.length).toBeGreaterThan(0)
    // Verify all products are in beauty category
    for (const product of responseData.products) {
      expect(product.category).toBe('beauty')
    }
  })

  test('TC17: Product list response time should be within acceptable limits', async ({ request }) => {
    const startTime = Date.now()
    const response = await request.get('/products')
    const responseTime = Date.now() - startTime
    
    expect(response.status()).toBe(200)
    expect(responseTime).toBeLessThan(5000) // 5 seconds
  })

  test('TC18: Verify product price is positive', async ({ request }) => {
    const productService = new ProductService(request)
    const response = await productService.getProducts(5)
    
    for (const product of response.products) {
      expect(product.price).toBeGreaterThan(0)
    }
  })

  test('TC19: Verify product rating is within valid range', async ({ request }) => {
    const productService = new ProductService(request)
    const response = await productService.getProducts(5)
    
    for (const product of response.products) {
      expect(product.rating).toBeGreaterThanOrEqual(0)
      expect(product.rating).toBeLessThanOrEqual(5)
    }
  })
})

// ==================== PRODUCT DETAILS API TESTS ====================
test.describe('Product Details API Tests', () => {
  test('TC15: Get product by valid ID', async ({ request }) => {
    const productService = new ProductService(request)
    
    const response = await productService.getProductById(1)
    
    // Validate product
    ProductValidator.validateProduct(response)
    expect(response.id).toBe(1)
    
    // Verify nested objects
    expect(response.dimensions).toHaveProperty('width')
    expect(response.dimensions).toHaveProperty('height')
    expect(response.dimensions).toHaveProperty('depth')
    
    expect(response.meta).toHaveProperty('createdAt')
    expect(response.meta).toHaveProperty('updatedAt')
    expect(response.meta).toHaveProperty('barcode')
    expect(response.meta).toHaveProperty('qrCode')
  })

  test('TC16: Get product with non-existent ID should return 404', async ({ request }) => {
    const response = await request.get('/products/99999')
    
    expect(response.status()).toBe(404)
  })

  test('TC17: Get product with invalid ID format', async ({ request }) => {
    const response = await request.get('/products/abc')
    
    expect(response.status()).toBe(404)
  })

  test('TC18: Get product with negative ID', async ({ request }) => {
    const response = await request.get('/products/-1')
    
    expect(response.status()).toBe(404)
  })

  test('TC20: Product details response time should be within acceptable limits', async ({ request }) => {
    const startTime = Date.now()
    const response = await request.get('/products/1')
    const responseTime = Date.now() - startTime
    
    expect(response.status()).toBe(200)
    expect(responseTime).toBeLessThan(5000) // 5 seconds
  })

  test('TC21: Product details data types should be valid', async ({ request }) => {
    const productService = new ProductService(request)
    const response = await productService.getProductById(1)
    
    expect(typeof response.id).toBe('number')
    expect(typeof response.title).toBe('string')
    expect(typeof response.price).toBe('number')
    expect(typeof response.stock).toBe('number')
  })
})

// ==================== ADD TO CART API TESTS ====================
test.describe('Add to Cart API Tests', () => {
  test('TC19: Add valid product to cart', async ({ request }) => {
    const cartService = new CartService(request)
    
    const response = await cartService.addToCart({
      userId: 1,
      products: [{ id: 1, quantity: 4 }]
    })
    
    // Validate cart
    ProductValidator.validateCart(response)
    expect(response.userId).toBe(1)
    
    // Validate product in cart
    expect(response.products.length).toBeGreaterThan(0)
    const cartProduct = response.products[0]
    expect(cartProduct.id).toBe(1)
    expect(cartProduct.quantity).toBe(4)
  })

  test('TC20: Add multiple products to cart', async ({ request }) => {
    const cartService = new CartService(request)
    
    const response = await cartService.addToCart({
      userId: 1,
      products: [
        { id: 1, quantity: 2 },
        { id: 2, quantity: 3 }
      ]
    })
    
    expect(response.products.length).toBe(2)
    expect(response.totalProducts).toBe(2)
    expect(response.totalQuantity).toBe(5)
  })

  test('TC21: Add to cart with missing userId should return error', async ({ request }) => {
    const response = await request.post('/carts/add', {
      data: {
        products: [{ id: 1, quantity: 4 }]
      }
    })
    
    expect(response.status()).toBe(400)
  })

  test('TC22: Add to cart with missing products should return error', async ({ request }) => {
    const response = await request.post('/carts/add', {
      data: { userId: 1 }
    })
    
    expect(response.status()).toBe(400)
  })

  test('TC23: Add to cart with invalid product ID', async ({ request }) => {
    const response = await request.post('/carts/add', {
      data: {
        userId: 1,
        products: [{ id: 99999, quantity: 1 }]
      }
    })
    
    expect([200, 201, 400, 404]).toContain(response.status())
  })

  test('TC24: Add to cart with negative quantity', async ({ request }) => {
    const response = await request.post('/carts/add', {
      data: {
        userId: 1,
        products: [{ id: 1, quantity: -5 }]
      }
    })
    
    expect([200, 201, 400]).toContain(response.status())
  })

  test('TC25: Add to cart with empty products array', async ({ request }) => {
    const response = await request.post('/carts/add', {
      data: {
        userId: 1,
        products: []
      }
    })
    
    expect(response.status()).toBe(400)
  })

  test('TC26: Add to cart response time should be within acceptable limits', async ({ request }) => {
    const cartService = new CartService(request)
    
    const startTime = Date.now()
    const response = await cartService.addToCart({
      userId: 1,
      products: [{ id: 1, quantity: 1 }]
    })
    const responseTime = Date.now() - startTime
    
    // If we got a Cart response, the request was successful
    expect(response).toBeTruthy()
    expect(response.id).toBeGreaterThan(0)
    expect(responseTime).toBeLessThan(5000) // 5 seconds
  })

  test('TC27: Verify cart total calculation is correct', async ({ request }) => {
    const cartService = new CartService(request)
    
    const response = await cartService.addToCart({
      userId: 1,
      products: [{ id: 1, quantity: 2 }]
    })
    
    // Verify total calculation
    const productTotal = response.products[0].price * response.products[0].quantity
    expect(response.total).toBeCloseTo(productTotal, 2)
  })

  test('TC28: Add to cart with zero quantity', async ({ request }) => {
    const response = await request.post('/carts/add', {
      data: {
        userId: 1,
        products: [{ id: 1, quantity: 0 }]
      }
    })
    
    expect([200, 201, 400]).toContain(response.status())
  })
})

// ==================== GET CART DETAILS API TESTS ====================
test.describe('Get Cart Details API Tests', () => {
  test('TC26: Get cart by valid ID', async ({ request }) => {
    const cartService = new CartService(request)
    
    const response = await cartService.getCartById(31)
    
    // Validate cart
    ProductValidator.validateCart(response)
    expect(response.id).toBe(31)
    
    // Validate products in cart
    expect(response.products.length).toBeGreaterThan(0)
    for (const product of response.products) {
      ProductValidator.validateCartProduct(product)
    }
  })

  test('TC27: Get cart with non-existent ID should return 404', async ({ request }) => {
    const response = await request.get('/carts/99999')
    
    expect(response.status()).toBe(404)
  })

  test('TC28: Get cart with invalid ID format', async ({ request }) => {
    const response = await request.get('/carts/abc')
    
    expect(response.status()).toBe(404)
  })

  test('TC29: Get cart with negative ID', async ({ request }) => {
    const response = await request.get('/carts/-1')
    
    expect(response.status()).toBe(404)
  })

  test('TC30: Get cart with zero ID', async ({ request }) => {
    const response = await request.get('/carts/0')
    
    expect(response.status()).toBe(404)
  })

  test('TC31: Get cart response time should be within acceptable limits', async ({ request }) => {
    const cartService = new CartService(request)
    
    const startTime = Date.now()
    const response = await cartService.getCartById(31)
    const responseTime = Date.now() - startTime
    
    expect(response).toBeTruthy()
    expect(responseTime).toBeLessThan(5000) // 5 seconds
  })

  test('TC32: Verify cart total matches sum of product totals', async ({ request }) => {
    const cartService = new CartService(request)
    
    const response = await cartService.getCartById(31)
    
    // Calculate sum of product totals
    const calculatedTotal = response.products.reduce((sum, product) => sum + product.total, 0)
    expect(response.total).toBeCloseTo(calculatedTotal, 2)
  })
})
