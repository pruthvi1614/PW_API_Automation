# PW API Automation

A robust API automation testing framework built with [Playwright](https://playwright.dev/) and TypeScript. This framework provides a structured approach to API testing with support for multiple environments, centralized request handling, and comprehensive test coverage.

## 🚀 Features

- **Multi-environment Support**: Run tests against dev, staging, or production environments
- **TypeScript Support**: Full TypeScript integration with type definitions for all API models
- **Service Layer Architecture**: Clean separation of concerns with dedicated service classes
- **Centralized API Client**: Base API client with built-in logging and error handling
- **Request/Response Validation**: Dedicated validators for API responses
- **Token Management**: Automatic authentication and token handling
- **HTML Reports**: Built-in HTML test reporting

## 📁 Project Structure

```
PW_API_Automation/
├── src/
│   ├── api/
│   │   └── base-api-client.ts       # Base API client with HTTP methods
│   ├── config/
│   │   └── environment.config.ts    # Environment configuration
│   ├── constants/
│   │   └── api-endpoints.ts       # API endpoint constants
│   ├── helpers/
│   │   └── token-manager.ts         # Authentication token management
│   ├── models/
│   │   ├── auth.model.ts          # Authentication models
│   │   ├── product.model.ts       # Product and cart models
│   │   └── user.model.ts          # User profile models
│   ├── services/
│   │   ├── auth.service.ts        # Authentication service
│   │   ├── cart.service.ts        # Cart operations service
│   │   ├── product.service.ts     # Product operations service
│   │   └── user.service.ts        # User profile service
│   └── validators/
│       ├── auth.validator.ts      # Authentication validators
│       └── product.validator.ts   # Product and cart validators
├── tests/
│   └── api.spec.ts                # API test suite
├── playwright.config.ts           # Playwright configuration
├── tsconfig.json                # TypeScript configuration
└── package.json                 # Project dependencies
```

## 🛠️ Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- TypeScript

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/pruthvi1614/PW_API_Automation.git

# Install dependencies
npm install
```

## 🧪 Running Tests

### Run tests in development environment
```bash
npm run test:dev
```

### Run tests in staging environment
```bash
npm run test:staging
```

### Run tests in production environment
```bash
npm run test:prod
```

### View test report
```bash
npm run test:report
```

## 📊 Test Coverage

The test suite includes **32 test cases** covering the following API endpoints:

### Login API Tests (9 tests)
- Valid credentials authentication
- Invalid username handling
- Invalid password handling
- Missing username validation
- Missing password validation
- Empty request body validation
- SQL injection prevention (username)
- SQL injection prevention (password)
- Response time validation

### User Profile API Tests (5 tests)
- Get user profile with valid token
- Unauthorized access without token
- Invalid token handling
- Response time validation
- Data type validation

### Product List API Tests (8 tests)
- Get all products
- Products with limit parameter
- Products with skip parameter
- Negative limit handling
- Invalid limit type handling
- Product search functionality
- Category filtering
- Response time validation
- Price validation (positive values)
- Rating validation (0-5 range)

### Product Details API Tests (5 tests)
- Get product by valid ID
- Non-existent product handling (404)
- Invalid ID format handling
- Negative ID handling
- Response time validation
- Data type validation

### Add to Cart API Tests (9 tests)
- Add single product to cart
- Add multiple products to cart
- Missing userId validation
- Missing products validation
- Invalid product ID handling
- Negative quantity handling
- Zero quantity handling
- Empty products array validation
- Response time validation
- Cart total calculation verification

### Get Cart Details API Tests (6 tests)
- Get cart by valid ID
- Non-existent cart handling (404)
- Invalid ID format handling
- Negative ID handling
- Zero ID handling
- Response time validation
- Cart total calculation verification

## 🏗️ Architecture

### Base API Client
The `BaseApiClient` class provides centralized HTTP request handling with:
- GET, POST, PUT, PATCH, DELETE methods
- Automatic header management (Content-Type: application/json)
- Request logging with timestamps

### Services
Each service extends the base client and provides specific API operations:
- **AuthService**: Handles authentication and login
- **UserService**: Manages user profile operations
- **ProductService**: Handles product listing and details
- **CartService**: Manages cart operations

### Validators
Dedicated validator classes ensure response integrity:
- **AuthValidator**: Validates authentication responses and JWT tokens
- **ProductValidator**: Validates product and cart data structures

### Models
TypeScript interfaces for all API request/response types:
- `AuthResponse`, `LoginRequest`
- `Product`, `ProductListResponse`, `ProductReview`
- `Cart`, `CartProduct`, `AddToCartRequest`
- `UserProfile`, `Address`, `Company`, `Bank`

## ⚙️ Configuration

### Environment Configuration
The framework supports three environments configured in `src/config/environment.config.ts`:

| Environment | Base URL | Timeout |
|-------------|----------|---------|
| dev | https://dummyjson.com | 30000ms |
| staging | https://dummyjson.com | 30000ms |
| prod | https://dummyjson.com | 30000ms |

### Playwright Configuration
Key settings in `playwright.config.ts`:
- Test directory: `./tests`
- Parallel execution enabled
- HTML reporter
- Request tracing on retry

## 🔐 Authentication

The framework uses automatic token management via `TokenManager`:
1. Credentials are stored in environment configuration
2. Token is automatically retrieved on first use
3. Token is cached for subsequent requests

## 📝 API Endpoints

### Authentication
- `POST /auth/login` - User login
- `GET /auth/me` - Get current user profile

### Products
- `GET /products` - List all products (supports limit/skip)
- `GET /products/{id}` - Get product by ID
- `GET /products/search?q={query}` - Search products
- `GET /products/category/{category}` - Filter by category

### Carts
- `POST /carts/add` - Add products to cart
- `GET /carts/{id}` - Get cart by ID

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests to ensure everything works
5. Submit a pull request

## 📄 License

ISC License