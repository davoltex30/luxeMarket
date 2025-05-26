import React, { useState } from 'react';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import ProductPage from './pages/ProductPage';
import CartSidebar from './components/cart/CartSidebar';
import AuthModal from './components/auth/AuthModal';
import CheckoutModal from './components/checkout/CheckoutModal';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';

function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'shop' | 'product'>('home');
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);

  const handleProductClick = (id: number) => {
    setSelectedProductId(id);
    setCurrentPage('product');
    window.scrollTo(0, 0);
  };

  const handleBackToShop = () => {
    setCurrentPage('shop');
    setSelectedProductId(null);
  };

  const handleCartClick = () => {
    setIsCartOpen(true);
  };

  const handleAuthClick = () => {
    setIsAuthModalOpen(true);
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutModalOpen(true);
  };

  // Update document title based on current page
  React.useEffect(() => {
    const titles = {
      home: 'LuxeMarket | Premium Online Shopping',
      shop: 'Shop All Products | LuxeMarket',
      product: selectedProductId ? `Product Details | LuxeMarket` : 'LuxeMarket'
    };
    
    document.title = titles[currentPage];
  }, [currentPage, selectedProductId]);

  return (
    <AuthProvider>
      <CartProvider>
        <div className="flex flex-col min-h-screen">
          <Header onCartClick={handleCartClick} onAuthClick={handleAuthClick} />
          
          <main className="flex-grow pt-16">
            {currentPage === 'home' && (
              <HomePage onProductClick={handleProductClick} />
            )}
            
            {currentPage === 'shop' && (
              <ShopPage onProductClick={handleProductClick} />
            )}
            
            {currentPage === 'product' && selectedProductId && (
              <ProductPage 
                productId={selectedProductId} 
                onBackClick={handleBackToShop}
                onProductClick={handleProductClick}
              />
            )}
          </main>
          
          <Footer />
          
          <CartSidebar 
            isOpen={isCartOpen} 
            onClose={() => setIsCartOpen(false)} 
            onCheckout={handleCheckout}
          />
          
          <AuthModal 
            isOpen={isAuthModalOpen} 
            onClose={() => setIsAuthModalOpen(false)} 
          />
          
          <CheckoutModal 
            isOpen={isCheckoutModalOpen} 
            onClose={() => setIsCheckoutModalOpen(false)} 
          />
        </div>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;