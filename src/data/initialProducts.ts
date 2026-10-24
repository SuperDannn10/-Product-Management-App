import { Product } from '../types/product';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'Sony WH-1000XM5 Wireless Headphones',
    category: 'Audio',
    description: 'Industry-leading noise canceling with two processors and 8 microphones for unprecedented sound purity and crystal-clear hands-free calling.',
    specifications: '30-hour battery life; Auto NC Optimizer; Multipoint connection; Speak-to-chat; High-resolution Audio LDAC',
    rating: 4.8,
    price: 399.99,
    quantity: 12,
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
    subtotal: 399.99 * 12, // 4799.88
    createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
  },
  {
    id: 'prod-2',
    name: 'MacBook Pro 14" M3 Pro',
    category: 'Computers',
    description: 'The most advanced chips ever built for a personal computer. With up to 18 hours of battery life and a stunning Liquid Retina XDR display.',
    specifications: 'Apple M3 Pro 12-core CPU; 18-core GPU; 18GB Unified Memory; 512GB SSD; 120Hz ProMotion XDR Display',
    rating: 4.9,
    price: 1999.00,
    quantity: 3, // LOW STOCK (< 5) to showcase conditional formatting
    imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80',
    subtotal: 1999.00 * 3, // 5997.00
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
  },
  {
    id: 'prod-3',
    name: 'Logitech MX Master 3S Wireless Mouse',
    category: 'Accessories',
    description: 'An iconic mouse remastered. With Quiet Clicks and 8,000 DPI track-on-glass sensor for next-level precision and tactile feel.',
    specifications: '8,000 DPI Darkfield Tracking; MagSpeed Electromagnetic Scrolling; Quiet Clicks; USB-C Fast Charging; Ergonomic silhouette',
    rating: 4.7,
    price: 99.50,
    quantity: 18,
    imageUrl: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=800&q=80',
    subtotal: 99.50 * 18, // 1791.00
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
  {
    id: 'prod-4',
    name: 'Apple Watch Ultra 2 Titanium',
    category: 'Wearables',
    description: 'Rugged and capable, crafted for athletes and outdoor adventurers. Features a lightweight titanium case and ultra-bright display.',
    specifications: '49mm Aerospace Titanium Case; 3000 nits display; Dual-frequency GPS; 36-hour normal battery life; Water resistant 100m',
    rating: 4.6,
    price: 799.00,
    quantity: 4, // LOW STOCK (< 5) to showcase conditional formatting
    imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
    subtotal: 799.00 * 4, // 3196.00
    createdAt: new Date(Date.now() - 86400000 * 1).toISOString(),
  },
  {
    id: 'prod-5',
    name: 'Keychron Q1 Pro Custom Mechanical Keyboard',
    category: 'Accessories',
    description: 'A full aluminum QMK/VIA wireless mechanical keyboard with hot-swappable switches and double-gasket acoustic design.',
    specifications: 'CNC Aluminum Body; Bluetooth 5.1 & Type-C wired; Double-Gasket Design; Hot-swappable K Pro Red Switches; RGB Backlight',
    rating: 4.9,
    price: 199.99,
    quantity: 7,
    imageUrl: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80',
    subtotal: 199.99 * 7, // 1399.93
    createdAt: new Date().toISOString(),
  }
];

export const PRESET_CATEGORIES = [
  'All Categories',
  'Audio',
  'Computers',
  'Accessories',
  'Wearables',
  'Cameras',
  'Gaming'
];

export const SAMPLE_IMAGE_PRESETS = [
  {
    label: 'Headphones',
    url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80'
  },
  {
    label: 'Laptop',
    url: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80'
  },
  {
    label: 'Smartwatch',
    url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80'
  },
  {
    label: 'Camera',
    url: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80'
  },
  {
    label: 'Keyboard',
    url: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80'
  },
  {
    label: 'Gaming Controller',
    url: 'https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?auto=format&fit=crop&w=800&q=80'
  }
];

