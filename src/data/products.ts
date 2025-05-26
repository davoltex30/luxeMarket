import { Product } from '../types';

export const products: Product[] = [
  {
    id: 1,
    name: "Modern Slim Fit T-shirt",
    price: 29.99,
    description: "Comfortable slim-fit t-shirt made from premium cotton. Perfect for everyday wear with a modern cut that flatters any body type.",
    category: "clothing",
    image: "https://images.pexels.com/photos/5384423/pexels-photo-5384423.jpeg?auto=compress&cs=tinysrgb&w=800",
    rating: {
      rate: 4.5,
      count: 120
    }
  },
  {
    id: 2,
    name: "Wireless Noise-Cancelling Headphones",
    price: 199.99,
    description: "Premium wireless headphones with active noise cancellation, 30-hour battery life, and immersive sound quality for the ultimate listening experience.",
    category: "electronics",
    image: "https://images.pexels.com/photos/3394666/pexels-photo-3394666.jpeg?auto=compress&cs=tinysrgb&w=800",
    rating: {
      rate: 4.8,
      count: 259
    }
  },
  {
    id: 3,
    name: "Stylish Weekender Bag",
    price: 89.99,
    description: "A versatile weekender bag with plenty of compartments, made from durable water-resistant material that's perfect for short trips or gym sessions.",
    category: "accessories",
    image: "https://images.pexels.com/photos/2081199/pexels-photo-2081199.jpeg?auto=compress&cs=tinysrgb&w=800",
    rating: {
      rate: 4.3,
      count: 78
    }
  },
  {
    id: 4,
    name: "Smart Fitness Watch",
    price: 149.99,
    description: "Track your fitness goals with this advanced smartwatch featuring heart rate monitoring, sleep tracking, and 7-day battery life.",
    category: "electronics",
    image: "https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=800",
    rating: {
      rate: 4.6,
      count: 186
    }
  },
  {
    id: 5,
    name: "Designer Sunglasses",
    price: 129.99,
    description: "Protect your eyes in style with these UV-protected designer sunglasses featuring a timeless design that complements any face shape.",
    category: "accessories",
    image: "https://images.pexels.com/photos/701877/pexels-photo-701877.jpeg?auto=compress&cs=tinysrgb&w=800",
    rating: {
      rate: 4.4,
      count: 94
    }
  },
  {
    id: 6,
    name: "Organic Skincare Set",
    price: 79.99,
    description: "Revitalize your skin with this complete organic skincare set featuring cleanser, toner, and moisturizer made from natural ingredients.",
    category: "beauty",
    image: "https://images.pexels.com/photos/3685530/pexels-photo-3685530.jpeg?auto=compress&cs=tinysrgb&w=800",
    rating: {
      rate: 4.7,
      count: 142
    }
  },
  {
    id: 7,
    name: "Premium Coffee Maker",
    price: 119.99,
    description: "Brew barista-quality coffee at home with this premium coffee maker featuring precise temperature control and customizable brewing options.",
    category: "home",
    image: "https://images.pexels.com/photos/6205791/pexels-photo-6205791.jpeg?auto=compress&cs=tinysrgb&w=800",
    rating: {
      rate: 4.9,
      count: 210
    }
  },
  {
    id: 8,
    name: "Leather Wallet",
    price: 49.99,
    description: "Sophisticated genuine leather wallet with RFID protection, multiple card slots, and a sleek minimalist design.",
    category: "accessories",
    image: "https://images.pexels.com/photos/2079438/pexels-photo-2079438.jpeg?auto=compress&cs=tinysrgb&w=800",
    rating: {
      rate: 4.2,
      count: 65
    }
  }
];

export const getProductById = (id: number): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getProductsByCategory = (category: string): Product[] => {
  if (category === 'all') return products;
  return products.filter(product => product.category === category);
};

export const getCategories = (): string[] => {
  return ['all', ...new Set(products.map(product => product.category))];
};