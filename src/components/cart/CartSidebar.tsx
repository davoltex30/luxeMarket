import React from 'react';
import { X, ShoppingCart, Trash, Plus, Minus } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onCheckout: () => void;
}

const CartSidebar: React.FC<CartSidebarProps> = ({ isOpen, onClose, onCheckout }) => {
  const { state, removeFromCart, updateQuantity, clearCart } = useCart();
  const { isAuthenticated } = useAuth();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" 
          onClick={onClose}
        ></div>
        
        <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
          <div className="w-screen max-w-md">
            <div className="h-full flex flex-col bg-white shadow-xl">
              {/* Header */}
              <div className="px-4 py-6 bg-gray-50 sm:px-6">
                <div className="flex items-start justify-between">
                  <h2 className="text-lg font-medium text-gray-900 flex items-center">
                    <ShoppingCart className="mr-2" size={20} />
                    Your Cart
                    <span className="ml-2 text-sm text-gray-500">
                      ({state.items.reduce((count, item) => count + item.quantity, 0)} items)
                    </span>
                  </h2>
                  <button
                    type="button"
                    className="text-gray-400 hover:text-gray-500"
                    onClick={onClose}
                  >
                    <span className="sr-only">Close panel</span>
                    <X size={24} aria-hidden="true" />
                  </button>
                </div>
              </div>
              
              {/* Cart items */}
              <div className="flex-1 py-6 px-4 sm:px-6 overflow-auto">
                {state.items.length === 0 ? (
                  <div className="text-center py-12">
                    <ShoppingCart size={64} className="mx-auto text-gray-300 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Your cart is empty</h3>
                    <p className="text-gray-500">Start shopping to add items to your cart</p>
                    <button 
                      onClick={onClose}
                      className="mt-6 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Continue Shopping
                    </button>
                  </div>
                ) : (
                  <ul className="divide-y divide-gray-200">
                    {state.items.map((item) => (
                      <li key={item.id} className="py-4 flex">
                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                        
                        <div className="ml-4 flex flex-1 flex-col">
                          <div>
                            <div className="flex justify-between text-base font-medium text-gray-900">
                              <h3 className="line-clamp-1">{item.name}</h3>
                              <p className="ml-4">${(item.price * item.quantity).toFixed(2)}</p>
                            </div>
                            <p className="mt-1 text-sm text-gray-500 line-clamp-1">{item.category}</p>
                          </div>
                          
                          <div className="flex flex-1 items-end justify-between text-sm">
                            <div className="flex items-center border rounded">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                              >
                                <Minus size={14} />
                              </button>
                              <span className="px-2 py-1 text-gray-900">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                              >
                                <Plus size={14} />
                              </button>
                            </div>
                            
                            <button
                              type="button"
                              onClick={() => removeFromCart(item.id)}
                              className="font-medium text-red-600 hover:text-red-500"
                            >
                              <Trash size={16} />
                            </button>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              
              {/* Footer */}
              {state.items.length > 0 && (
                <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                  <div className="flex justify-between text-base font-medium text-gray-900 mb-4">
                    <p>Subtotal</p>
                    <p>${state.total.toFixed(2)}</p>
                  </div>
                  <p className="mt-0.5 text-sm text-gray-500">
                    Shipping and taxes calculated at checkout.
                  </p>
                  <div className="mt-6">
                    <button
                      onClick={onCheckout}
                      className={`w-full flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white ${
                        isAuthenticated
                          ? 'bg-blue-600 hover:bg-blue-700'
                          : 'bg-gray-400 cursor-not-allowed'
                      }`}
                      disabled={!isAuthenticated}
                    >
                      {isAuthenticated ? 'Checkout' : 'Login to Checkout'}
                    </button>
                    {!isAuthenticated && (
                      <p className="mt-2 text-sm text-center text-gray-500">
                        You need to login before checkout
                      </p>
                    )}
                  </div>
                  <div className="mt-6 flex justify-center text-sm text-center text-gray-500">
                    <p>
                      <button
                        type="button"
                        className="text-blue-600 font-medium hover:text-blue-500"
                        onClick={onClose}
                      >
                        Continue Shopping
                        <span aria-hidden="true"> &rarr;</span>
                      </button>
                    </p>
                  </div>
                  <div className="mt-4 flex justify-center">
                    <button
                      type="button"
                      className="text-sm text-gray-500 hover:text-gray-700"
                      onClick={clearCart}
                    >
                      Clear cart
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartSidebar;