/**
 * Product response model
 */
export interface ProductDimensions {
  width: number
  height: number
  depth: number
}

export interface ProductMeta {
  createdAt: string
  updatedAt: string
  barcode: string
  qrCode: string
}

export interface ProductReview {
  rating: number
  comment: string
  date: string
  reviewerName: string
  reviewerEmail: string
}

export interface Product {
  id: number
  title: string
  description: string
  category: string
  price: number
  discountPercentage: number
  rating: number
  stock: number
  tags: string[]
  brand?: string
  sku: string
  weight: number
  dimensions: ProductDimensions
  warrantyInformation: string
  shippingInformation: string
  availabilityStatus: string
  reviews: ProductReview[]
  returnPolicy: string
  minimumOrderQuantity: number
  meta: ProductMeta
  images: string[]
  thumbnail: string
}

export interface ProductListResponse {
  products: Product[]
  total: number
  skip: number
  limit: number
}

export interface AddToCartRequest {
  userId: number
  products: { id: number; quantity: number }[]
}

export interface CartProduct {
  id: number
  title: string
  price: number
  quantity: number
  total: number
  discountPercentage: number
  discountedPrice?: number
  thumbnail: string
}

export interface Cart {
  id: number
  products: CartProduct[]
  total: number
  discountedTotal: number
  userId: number
  totalProducts: number
  totalQuantity: number
}