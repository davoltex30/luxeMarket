import React, { useState, useEffect } from 'react';
import { products } from '../data/products';
import { FilterOptions, Product, SortOption } from '../types';
import ProductGrid from '../components/products/ProductGrid';
import ProductFilters from '../components/products/ProductFilters';

interface ShopPageProps {
  onProductClick: (id: number) => void;
}

const ShopPage: React.FC<ShopPageProps> = ({ onProductClick }) => {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    category: null,
    minPrice: null,
    maxPrice: null,
  });
  const [sortOption, setSortOption] = useState<SortOption>('price-low-high');
  
  useEffect(() => {
    // Apply filters
    let result = [...products];
    
    if (filterOptions.category) {
      result = result.filter(product => product.category === filterOptions.category);
    }
    
    if (filterOptions.minPrice !== null) {
      result = result.filter(product => product.price >= filterOptions.minPrice!);
    }
    
    if (filterOptions.maxPrice !== null) {
      result = result.filter(product => product.price <= filterOptions.maxPrice!);
    }
    
    // Apply sorting
    switch (sortOption) {
      case 'price-low-high':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high-low':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating.rate - a.rating.rate);
        break;
      case 'newest':
        // For demo purposes, we'll just randomize
        result.sort(() => Math.random() - 0.5);
        break;
    }
    
    setFilteredProducts(result);
  }, [filterOptions, sortOption]);
  
  const handleFilterChange = (filters: FilterOptions) => {
    setFilterOptions(filters);
  };
  
  const handleSortChange = (sort: SortOption) => {
    setSortOption(sort);
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Shop Our Products</h1>
        <p className="text-gray-600">
          Browse our collection of premium products.
        </p>
      </div>
      
      <ProductFilters 
        onFilterChange={handleFilterChange}
        onSortChange={handleSortChange}
        activeCategory={filterOptions.category}
      />
      
      <ProductGrid 
        products={filteredProducts} 
        onProductClick={onProductClick}
      />
    </div>
  );
};

export default ShopPage;