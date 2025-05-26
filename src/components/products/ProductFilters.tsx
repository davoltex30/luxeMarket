import React, { useState } from 'react';
import { FilterOptions, SortOption } from '../../types';
import { getCategories } from '../../data/products';
import { X, SlidersHorizontal } from 'lucide-react';

interface ProductFiltersProps {
  onFilterChange: (filters: FilterOptions) => void;
  onSortChange: (sort: SortOption) => void;
  activeCategory: string | null;
}

const sortOptions: { value: SortOption; label: string }[] = [
  { value: 'price-low-high', label: 'Price: Low to High' },
  { value: 'price-high-low', label: 'Price: High to Low' },
  { value: 'rating', label: 'Best Rating' },
  { value: 'newest', label: 'Newest' },
];

const ProductFilters: React.FC<ProductFiltersProps> = ({
  onFilterChange,
  onSortChange,
  activeCategory,
}) => {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [priceRange, setPriceRange] = useState<{ min: number | null; max: number | null }>({
    min: null,
    max: null,
  });
  const [selectedCategory, setSelectedCategory] = useState<string | null>(activeCategory);
  const [selectedSort, setSelectedSort] = useState<SortOption>('price-low-high');
  
  const categories = getCategories();

  const handleCategoryChange = (category: string) => {
    const newCategory = category === 'all' ? null : category;
    setSelectedCategory(newCategory);
    onFilterChange({
      category: newCategory,
      minPrice: priceRange.min,
      maxPrice: priceRange.max,
    });
  };

  const handlePriceChange = (min: number | null, max: number | null) => {
    setPriceRange({ min, max });
    onFilterChange({
      category: selectedCategory,
      minPrice: min,
      maxPrice: max,
    });
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const sort = e.target.value as SortOption;
    setSelectedSort(sort);
    onSortChange(sort);
  };

  const handleClearFilters = () => {
    setSelectedCategory(null);
    setPriceRange({ min: null, max: null });
    setSelectedSort('price-low-high');
    onFilterChange({
      category: null,
      minPrice: null,
      maxPrice: null,
    });
    onSortChange('price-low-high');
  };

  const toggleMobileFilters = () => {
    setMobileFiltersOpen(!mobileFiltersOpen);
  };

  return (
    <div className="mb-8">
      {/* Mobile filter button */}
      <div className="flex justify-between items-center mb-4 md:hidden">
        <button
          onClick={toggleMobileFilters}
          className="flex items-center px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white"
        >
          <SlidersHorizontal size={18} className="mr-2" />
          Filters
        </button>

        <div className="w-1/2">
          <select
            value={selectedSort}
            onChange={handleSortChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Mobile filters */}
      <div
        className={`fixed inset-0 z-50 transform ${
          mobileFiltersOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out md:hidden`}
      >
        <div className="bg-white h-full w-4/5 max-w-sm overflow-y-auto shadow-xl">
          <div className="p-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-lg font-medium text-gray-900">Filters</h2>
            <button onClick={toggleMobileFilters}>
              <X size={24} className="text-gray-500" />
            </button>
          </div>

          <div className="p-4">
            <h3 className="text-md font-medium text-gray-900 mb-3">Categories</h3>
            <div className="space-y-2">
              {categories.map((category) => (
                <div key={category} className="flex items-center">
                  <input
                    id={`mobile-category-${category}`}
                    type="radio"
                    name="mobile-category"
                    checked={
                      category === 'all'
                        ? selectedCategory === null
                        : category === selectedCategory
                    }
                    onChange={() => handleCategoryChange(category)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                  />
                  <label
                    htmlFor={`mobile-category-${category}`}
                    className="ml-3 text-sm text-gray-700 capitalize"
                  >
                    {category}
                  </label>
                </div>
              ))}
            </div>

            <h3 className="text-md font-medium text-gray-900 mt-6 mb-3">Price Range</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="mobile-min-price" className="block text-sm text-gray-700 mb-1">
                  Min ($)
                </label>
                <input
                  type="number"
                  id="mobile-min-price"
                  value={priceRange.min || ''}
                  onChange={(e) =>
                    handlePriceChange(
                      e.target.value ? Number(e.target.value) : null,
                      priceRange.max
                    )
                  }
                  placeholder="Min"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="mobile-max-price" className="block text-sm text-gray-700 mb-1">
                  Max ($)
                </label>
                <input
                  type="number"
                  id="mobile-max-price"
                  value={priceRange.max || ''}
                  onChange={(e) =>
                    handlePriceChange(
                      priceRange.min,
                      e.target.value ? Number(e.target.value) : null
                    )
                  }
                  placeholder="Max"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="mt-6 flex justify-between">
              <button
                onClick={handleClearFilters}
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                Clear all filters
              </button>
              <button
                onClick={toggleMobileFilters}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 text-sm"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
        <div
          className="bg-gray-900 bg-opacity-50 h-full w-1/5"
          onClick={toggleMobileFilters}
        ></div>
      </div>

      {/* Desktop filters */}
      <div className="hidden md:grid grid-cols-12 gap-4 items-center">
        <div className="col-span-3">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Categories</h3>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`px-3 py-1 text-sm rounded-full capitalize transition-colors ${
                  category === 'all'
                    ? selectedCategory === null
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    : category === selectedCategory
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="col-span-5">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Price Range</h3>
          <div className="flex items-center space-x-4">
            <div className="w-1/3">
              <input
                type="number"
                value={priceRange.min || ''}
                onChange={(e) =>
                  handlePriceChange(
                    e.target.value ? Number(e.target.value) : null,
                    priceRange.max
                  )
                }
                placeholder="Min"
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <span className="text-gray-500">to</span>
            <div className="w-1/3">
              <input
                type="number"
                value={priceRange.max || ''}
                onChange={(e) =>
                  handlePriceChange(
                    priceRange.min,
                    e.target.value ? Number(e.target.value) : null
                  )
                }
                placeholder="Max"
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        <div className="col-span-3">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Sort By</h3>
          <select
            value={selectedSort}
            onChange={handleSortChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="col-span-1 flex justify-end">
          <button
            onClick={handleClearFilters}
            className="text-sm text-gray-500 hover:text-gray-700 flex items-center"
          >
            <X size={16} className="mr-1" />
            Clear
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductFilters;