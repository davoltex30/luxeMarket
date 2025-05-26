import React, { useState } from 'react';
import { ArrowLeft, Star, ShoppingCart, Heart, TruckIcon, Shield, RotateCcw } from 'lucide-react';
import { Product } from '../types';
import { getProductById, products } from '../data/products';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/products/ProductCard';

interface ProductPageProps {
  productId: number;
  onBackClick: () => void;
  onProductClick: (id: number) => void;
}

const ProductPage: React.FC<ProductPageProps> = ({ productId, onBackClick, onProductClick }) => {
  const product = getProductById(productId);
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h2>
        <p className="text-gray-600 mb-8">The product you are looking for does not exist.</p>
        <button 
          onClick={onBackClick}
          className="inline-flex items-center text-blue-600 hover:text-blue-800"
        >
          <ArrowLeft size={20} className="mr-2" /> Back to Shop
        </button>
      </div>
    );
  }
  
  // Get related products (same category)
  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);
  
  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
  };
  
  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, index) => (
      <Star 
        key={index} 
        size={18} 
        className={`${index < Math.round(rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="mb-8">
        <button 
          onClick={onBackClick}
          className="inline-flex items-center text-blue-600 hover:text-blue-800"
        >
          <ArrowLeft size={20} className="mr-2" /> Back to Shop
        </button>
      </div>
      
      {/* Product Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {/* Product Image */}
        <div className="bg-white rounded-lg overflow-hidden shadow-sm">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-contain aspect-square"
          />
        </div>
        
        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
          
          <div className="flex items-center mb-4">
            <div className="flex items-center">
              {renderStars(product.rating.rate)}
            </div>
            <span className="text-gray-600 ml-2">
              {product.rating.rate} ({product.rating.count} reviews)
            </span>
          </div>
          
          <div className="text-2xl font-bold text-gray-900 mb-6">
            ${product.price.toFixed(2)}
          </div>
          
          <p className="text-gray-700 mb-6">{product.description}</p>
          
          {/* Product Actions */}
          <div className="mb-8">
            <div className="flex items-center mb-6">
              <label htmlFor="quantity" className="mr-4 text-gray-700 font-medium">
                Quantity:
              </label>
              <div className="flex items-center border border-gray-300 rounded">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                >
                  -
                </button>
                <span className="px-4 py-1 border-x border-gray-300">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                >
                  +
                </button>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 transition-colors flex items-center justify-center"
              >
                <ShoppingCart size={20} className="mr-2" />
                Add to Cart
              </button>
              <button
                className="flex-1 sm:flex-none border border-gray-300 text-gray-700 px-6 py-3 rounded-md font-medium hover:bg-gray-50 transition-colors flex items-center justify-center"
              >
                <Heart size={20} className="mr-2" />
                Add to Wishlist
              </button>
            </div>
          </div>
          
          {/* Product Features */}
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Product Details</h3>
            <ul className="space-y-3">
              <li className="flex items-center text-gray-600">
                <TruckIcon size={20} className="mr-2 text-blue-600" />
                Free shipping on orders over $50
              </li>
              <li className="flex items-center text-gray-600">
                <Shield size={20} className="mr-2 text-blue-600" />
                2-year warranty included
              </li>
              <li className="flex items-center text-gray-600">
                <RotateCcw size={20} className="mr-2 text-blue-600" />
                30-day money-back guarantee
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map(relatedProduct => (
              <ProductCard
                key={relatedProduct.id}
                product={relatedProduct}
                onClick={() => onProductClick(relatedProduct.id)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductPage;