import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';

// Kenya Water Products Catalog with SVG icons
const WATER_PRODUCTS = [
  {
    id: 1,
    name: '20L Water Bottle',
    price: 150,
    icon: 'water-20l',
    description: 'Pure drinking water in 20-liter bottles. Perfect for families and offices.',
    category: 'bottles',
    popular: true,
    inStock: true,
    features: ['Purified water', 'BPA-free bottle', 'Reusable container']
  },
  {
    id: 2,
    name: '5L Water Bottle',
    price: 50,
    icon: 'water-5l',
    description: 'Convenient 5-liter water bottles for smaller households.',
    category: 'bottles',
    popular: false,
    inStock: true,
    features: ['Portable size', 'Easy handling', 'Perfect for refrigerators']
  },
  {
    id: 3,
    name: '1L Water Bottles (Pack of 12)',
    price: 240,
    icon: 'water-pack',
    description: 'Pack of 12 single-serve 1-liter bottles. Great for on-the-go.',
    category: 'bottles',
    popular: true,
    inStock: true,
    features: ['12 bottles included', 'Individual serving', 'Portable design']
  },
  {
    id: 4,
    name: 'Water Dispenser (Hot/Cold)',
    price: 2500,
    icon: 'dispenser',
    description: 'Electric water dispenser with hot and cold water options.',
    category: 'equipment',
    popular: false,
    inStock: true,
    features: ['Hot & cold water', 'Energy efficient', '1-year warranty']
  },
  {
    id: 5,
    name: 'Manual Water Pump',
    price: 450,
    icon: 'pump',
    description: 'Manual water pump for 20L bottles. No electricity required.',
    category: 'equipment',
    popular: false,
    inStock: true,
    features: ['Manual operation', 'Fits most bottles', 'Easy to clean']
  },
  {
    id: 6,
    name: 'Premium Alkaline Water (20L)',
    price: 200,
    icon: 'premium',
    description: 'Premium alkaline water with enhanced pH for better health.',
    category: 'bottles',
    popular: false,
    inStock: true,
    features: ['pH 8.5-9.0', 'Enhanced minerals', 'Health benefits']
  },
  {
    id: 7,
    name: 'Water Delivery Service',
    price: 50,
    icon: 'delivery',
    description: 'Professional water delivery service to your doorstep.',
    category: 'service',
    popular: true,
    inStock: true,
    features: ['Same-day delivery', 'Professional handling', 'Scheduled delivery available']
  },
  {
    id: 8,
    name: 'Water Cooler Stand',
    price: 800,
    icon: 'stand',
    description: 'Sturdy stand for water dispensers and bottles.',
    category: 'equipment',
    popular: false,
    inStock: true,
    features: ['Heavy-duty construction', 'Fits most dispensers', 'Storage compartment']
  }
];

const CATEGORIES = [
  { 
    id: 'all', 
    name: 'All Products', 
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    )
  },
  { 
    id: 'bottles', 
    name: 'Water Bottles', 
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2l-2 4c-4 8-4 10 0 14 2 2 6 2 8 0 4-4 4-6 0-14l-6-4z"/>
      </svg>
    )
  },
  { 
    id: 'equipment', 
    name: 'Equipment', 
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    )
  },
  { 
    id: 'service', 
    name: 'Services', 
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
      </svg>
    )
  }
];

// Product Icon Component
const ProductIcon = ({ iconType, className = "w-12 h-12" }) => {
  const icons = {
    'water-20l': (
      <svg className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2l-2 4c-4 8-4 10 0 14 2 2 6 2 8 0 4-4 4-6 0-14l-6-4z"/>
        <circle cx="12" cy="14" r="2"/>
      </svg>
    ),
    'water-5l': (
      <svg className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2l-1.5 3c-3 6-3 7.5 0 10.5 1.5 1.5 4.5 1.5 6 0 3-3 3-4.5 0-10.5L12 2z"/>
      </svg>
    ),
    'water-pack': (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <rect x="3" y="6" width="18" height="12" rx="2" strokeWidth={2}/>
        <circle cx="8" cy="12" r="1" fill="currentColor"/>
        <circle cx="12" cy="12" r="1" fill="currentColor"/>
        <circle cx="16" cy="12" r="1" fill="currentColor"/>
      </svg>
    ),
    'dispenser': (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <rect x="6" y="4" width="12" height="16" rx="2" strokeWidth={2}/>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 8h4M10 12h4"/>
        <circle cx="12" cy="16" r="1" fill="currentColor"/>
      </svg>
    ),
    'pump': (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4"/>
      </svg>
    ),
    'premium': (
      <svg className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2l-2 4c-4 8-4 10 0 14 2 2 6 2 8 0 4-4 4-6 0-14l-6-4z"/>
        <path fill="gold" d="M12 8l1 2h2l-1.5 1.5L14 14l-2-1-2 1 .5-2.5L9 10h2l1-2z"/>
      </svg>
    ),
    'delivery': (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4"/>
      </svg>
    ),
    'stand': (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
      </svg>
    )
  };

  return icons[iconType] || icons['water-20l'];
};

const ProductList = () => {
  const { addItem } = useCart();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [addingToCart, setAddingToCart] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Filter products based on category and search
  const filteredProducts = WATER_PRODUCTS.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch && product.inStock;
  });

  const handleAddToCart = async (product) => {
    setAddingToCart(product.id);
    
    // Simulate network delay for better UX
    await new Promise(resolve => setTimeout(resolve, 500));
    
    addItem(product);
    setAddingToCart(null);
    
    // Show success feedback
    showAddToCartFeedback(product.name);
  };

  const showAddToCartFeedback = (productName) => {
    // Create temporary success message
    const feedback = document.createElement('div');
    feedback.textContent = `${productName} added to cart!`;
    feedback.className = 'fixed top-20 left-1/2 transform -translate-x-1/2 bg-kenya-green-600 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-slide-up';
    
    document.body.appendChild(feedback);
    
    setTimeout(() => {
      if (document.body.contains(feedback)) {
        document.body.removeChild(feedback);
      }
    }, 2000);
  };

  return (
    <div className="max-w-md mx-auto px-4 py-6">
      {/* Header Section */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Clean Water, Delivered Fresh
        </h2>
        <p className="text-gray-600">
          Premium water products delivered to your doorstep across Kenya
        </p>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search water products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-field pl-10"
          />
          <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      {/* Category Filter */}
      <div className="mb-6">
        <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-hide">
          {CATEGORIES.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors touch-target ${
                selectedCategory === category.id
                  ? 'bg-kenya-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category.icon}
              <span>{category.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className="space-y-4">
        {filteredProducts.map(product => (
          <ProductCard 
            key={product.id} 
            product={product} 
            onAddToCart={handleAddToCart}
            isAdding={addingToCart === product.id}
          />
        ))}
      </div>

      {/* Empty State */}
      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
          <p className="text-gray-600 mb-4">
            {searchTerm ? 'Try adjusting your search terms' : 'Try selecting a different category'}
          </p>
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="btn-secondary"
            >
              Clear Search
            </button>
          )}
        </div>
      )}

      {/* Delivery Info Banner */}
      <div className="mt-8 bg-kenya-blue-50 border border-kenya-blue-200 rounded-lg p-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-kenya-blue-600 rounded-full flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h4 className="font-semibold text-kenya-blue-900">Free Delivery Available</h4>
            <p className="text-sm text-kenya-blue-700">
              Free delivery on orders over KSh 500. Standard delivery: KSh 50
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Individual Product Card Component
const ProductCard = ({ product, onAddToCart, isAdding }) => {
  return (
    <div className="card hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start space-x-4">
        {/* Product Icon */}
        <div className="w-16 h-16 bg-kenya-blue-50 rounded-lg flex items-center justify-center text-kenya-blue-600 flex-shrink-0">
          <ProductIcon iconType={product.icon} className="w-8 h-8" />
        </div>
        
        {/* Product Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
                {product.name}
                {product.popular && (
                  <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-orange-100 text-orange-800">
                    Popular
                  </span>
                )}
              </h3>
              <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                {product.description}
              </p>
              
              {/* Features */}
              <div className="mt-2">
                <div className="flex flex-wrap gap-1">
                  {product.features.slice(0, 2).map((feature, index) => (
                    <span key={index} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-700">
                      {feature}
                    </span>
                  ))}
                  {product.features.length > 2 && (
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-700">
                      +{product.features.length - 2} more
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          {/* Price and Add to Cart */}
          <div className="flex items-center justify-between mt-4">
            <div>
              <span className="text-2xl font-bold text-kenya-blue-600">
                KSh {product.price.toLocaleString()}
              </span>
              {product.category === 'bottles' && product.id !== 3 && (
                <span className="text-sm text-gray-500 ml-1">per bottle</span>
              )}
            </div>
            
            <button
              onClick={() => onAddToCart(product)}
              disabled={isAdding}
              className={`btn-primary text-sm px-4 py-2 ${isAdding ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isAdding ? (
                <div className="flex items-center space-x-2">
                  <div className="loading-dots">
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
                  <span>Adding...</span>
                </div>
              ) : (
                <>
                  <svg className="w-4 h-4 mr-1 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Add to Cart
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;