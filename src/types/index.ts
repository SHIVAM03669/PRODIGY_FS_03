export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  brand: string;
  rating: number;
  reviewCount: number;
  stock: number;
  tags: string[];
  specifications?: Record<string, string>;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: Address;
  role?: 'user' | 'admin';
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: OrderStatus;
  createdAt: Date;
  updatedAt: Date;
  shippingAddress: Address;
  trackingNumber?: string;
  estimatedDelivery?: Date;
}

export type OrderStatus = 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';

export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: Date;
}

export interface FilterOptions {
  category?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  rating?: number;
  inStock?: boolean;
}

export interface SortOption {
  field: 'name' | 'price' | 'rating' | 'createdAt';
  direction: 'asc' | 'desc';
} 