import { Product } from '../types';

export const products: Product[] = [
  {
    id: '1',
    name: 'Wireless Bluetooth Headphones',
    description: 'High-quality wireless headphones with noise cancellation and 30-hour battery life. Perfect for music lovers and professionals.',
    price: 89.99,
    originalPrice: 129.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
    category: 'Electronics',
    brand: 'TechSound',
    rating: 4.5,
    reviewCount: 128,
    stock: 45,
    tags: ['wireless', 'bluetooth', 'noise-cancelling', 'music'],
    specifications: {
      'Battery Life': '30 hours',
      'Connectivity': 'Bluetooth 5.0',
      'Weight': '250g',
      'Warranty': '2 years'
    }
  },
  {
    id: '2',
    name: 'Organic Cotton T-Shirt',
    description: 'Comfortable and sustainable organic cotton t-shirt. Available in multiple colors and sizes.',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop',
    category: 'Clothing',
    brand: 'EcoWear',
    rating: 4.2,
    reviewCount: 89,
    stock: 120,
    tags: ['organic', 'cotton', 'sustainable', 'casual'],
    specifications: {
      'Material': '100% Organic Cotton',
      'Care': 'Machine wash cold',
      'Fit': 'Regular fit',
      'Origin': 'Made in USA'
    }
  },
  {
    id: '3',
    name: 'Smart Fitness Watch',
    description: 'Advanced fitness tracking watch with heart rate monitor, GPS, and water resistance.',
    price: 199.99,
    originalPrice: 249.99,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop',
    category: 'Electronics',
    brand: 'FitTech',
    rating: 4.7,
    reviewCount: 256,
    stock: 23,
    tags: ['fitness', 'smartwatch', 'health', 'tracking'],
    specifications: {
      'Battery Life': '7 days',
      'Water Resistance': '5ATM',
      'GPS': 'Built-in',
      'Heart Rate': '24/7 monitoring'
    }
  },
  {
    id: '4',
    name: 'Stainless Steel Water Bottle',
    description: 'Eco-friendly stainless steel water bottle that keeps drinks cold for 24 hours or hot for 12 hours.',
    price: 19.99,
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=400&fit=crop',
    category: 'Home & Garden',
    brand: 'HydroLife',
    rating: 4.4,
    reviewCount: 167,
    stock: 78,
    tags: ['eco-friendly', 'insulated', 'bpa-free', 'travel'],
    specifications: {
      'Capacity': '32 oz',
      'Material': 'Stainless Steel',
      'Insulation': 'Double-wall',
      'BPA Free': 'Yes'
    }
  },
  {
    id: '5',
    name: 'Leather Crossbody Bag',
    description: 'Handcrafted genuine leather crossbody bag with adjustable strap and multiple compartments.',
    price: 79.99,
    originalPrice: 99.99,
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=400&fit=crop',
    category: 'Accessories',
    brand: 'LeatherCraft',
    rating: 4.6,
    reviewCount: 94,
    stock: 34,
    tags: ['leather', 'handcrafted', 'crossbody', 'premium'],
    specifications: {
      'Material': 'Genuine Leather',
      'Dimensions': '10" x 8" x 2"',
      'Strap': 'Adjustable',
      'Compartments': '3 pockets'
    }
  },
  {
    id: '6',
    name: 'Ceramic Coffee Mug Set',
    description: 'Set of 4 beautiful ceramic coffee mugs, perfect for home or office use.',
    price: 34.99,
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=400&h=400&fit=crop',
    category: 'Home & Garden',
    brand: 'HomeStyle',
    rating: 4.3,
    reviewCount: 156,
    stock: 67,
    tags: ['ceramic', 'coffee', 'set', 'kitchen'],
    specifications: {
      'Capacity': '12 oz each',
      'Material': 'Ceramic',
      'Dishwasher Safe': 'Yes',
      'Microwave Safe': 'Yes'
    }
  },
  {
    id: '7',
    name: 'Wireless Charging Pad',
    description: 'Fast wireless charging pad compatible with all Qi-enabled devices.',
    price: 29.99,
    image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=400&fit=crop',
    category: 'Electronics',
    brand: 'PowerTech',
    rating: 4.1,
    reviewCount: 203,
    stock: 89,
    tags: ['wireless', 'charging', 'qi', 'fast-charging'],
    specifications: {
      'Output': '10W',
      'Compatibility': 'Qi-enabled devices',
      'LED Indicator': 'Yes',
      'Overcharge Protection': 'Yes'
    }
  },
  {
    id: '8',
    name: 'Yoga Mat Premium',
    description: 'Non-slip yoga mat made from eco-friendly materials, perfect for all types of yoga and fitness.',
    price: 44.99,
    originalPrice: 59.99,
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=400&fit=crop',
    category: 'Sports & Fitness',
    brand: 'YogaLife',
    rating: 4.8,
    reviewCount: 312,
    stock: 56,
    tags: ['yoga', 'fitness', 'non-slip', 'eco-friendly'],
    specifications: {
      'Thickness': '6mm',
      'Material': 'TPE',
      'Dimensions': '72" x 24"',
      'Weight': '2.5 lbs'
    }
  }
];

export const categories = [
  'All',
  'Electronics',
  'Clothing',
  'Home & Garden',
  'Accessories',
  'Sports & Fitness'
];

export const brands = [
  'All',
  'TechSound',
  'EcoWear',
  'FitTech',
  'HydroLife',
  'LeatherCraft',
  'HomeStyle',
  'PowerTech',
  'YogaLife'
]; 