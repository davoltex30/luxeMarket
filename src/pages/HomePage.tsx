import React, { useState } from 'react';
import { ArrowRight, ShoppingBag, Shield, Truck, RotateCcw } from 'lucide-react';
import ProductCard from '../components/products/ProductCard';
import { products } from '../data/products';

interface HomePageProps {
  onProductClick: (id: number) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onProductClick }) => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  
  const categories = ['all', ...new Set(products.map(product => product.category))];
  
  const filteredProducts = activeCategory
    ? products.filter(product => product.category === activeCategory)
    : products;
  
  const featuredProducts = filteredProducts.slice(0, 4);
  
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative h-[70vh] bg-gradient-to-r from-blue-900 to-gray-900 flex items-center">
        <div className="absolute inset-0 overflow-hidden">
          <img 
            src="https://images.pexels.com/photos/1884581/pexels-photo-1884581.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
            alt="Hero background" 
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
              Discover Products That Define Excellence
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              Curated selection of premium products for the discerning customer.
            </p>
            <div className="flex flex-wrap gap-4">
              <a 
                href="/shop" 
                className="bg-white text-blue-900 px-6 py-3 rounded-md font-medium hover:bg-blue-50 transition-colors"
              >
                Shop Now
              </a>
              <a 
                href="/categories" 
                className="border border-white text-white px-6 py-3 rounded-md font-medium hover:bg-white/10 transition-colors"
              >
                Explore Categories
              </a>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Products */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Featured Products</h2>
            <a 
              href="/shop" 
              className="text-blue-600 hover:text-blue-800 font-medium flex items-center transition-colors"
            >
              View All <ArrowRight size={18} className="ml-1" />
            </a>
          </div>
          
          <div className="flex gap-4 overflow-x-auto pb-4 mb-8 scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-4 py-2 rounded-full whitespace-nowrap capitalize ${
                  (category === 'all' && activeCategory === null) || category === activeCategory
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                } transition-colors`}
                onClick={() => setActiveCategory(category === 'all' ? null : category)}
              >
                {category}
              </button>
            ))}
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onClick={() => onProductClick(product.id)}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* Value Propositions */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Why Shop With Us</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 text-blue-600 mb-4">
                <Truck size={32} />
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">Free Shipping</h3>
              <p className="text-gray-600">
                On all orders over $50. International shipping available.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 text-blue-600 mb-4">
                <RotateCcw size={32} />
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">Easy Returns</h3>
              <p className="text-gray-600">
                30-day return policy for a stress-free shopping experience.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 text-blue-600 mb-4">
                <Shield size={32} />
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">Secure Payments</h3>
              <p className="text-gray-600">
                Your payment information is processed securely.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 text-blue-600 mb-4">
                <ShoppingBag size={32} />
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">Quality Products</h3>
              <p className="text-gray-600">
                Handpicked items to ensure quality and durability.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Newsletter */}
      <section className="py-16 bg-blue-800 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Join Our Newsletter</h2>
            <p className="text-blue-100 mb-8">
              Subscribe to our newsletter for exclusive offers, early access to new products, and expert shopping guides.
            </p>
            
            <form className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-grow px-4 py-3 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <button
                type="submit"
                className="bg-white text-blue-800 px-6 py-3 rounded-md font-medium hover:bg-blue-50 transition-colors whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
            
            <p className="text-sm text-blue-200 mt-4">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;