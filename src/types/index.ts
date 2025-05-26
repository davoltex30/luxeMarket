export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export interface CartItem extends Product {
  quantity: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
}

export type SortOption = 'price-low-high' | 'price-high-low' | 'rating' | 'newest';

export interface FilterOptions {
  category: string | null;
  minPrice: number | null;
  maxPrice: number | null;
}