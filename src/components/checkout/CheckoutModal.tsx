import React, { useState } from 'react';
import { X, CreditCard, Home, Truck, CheckCircle } from 'lucide-react';
import { useCart } from '../../context/CartContext';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose }) => {
  const { state, clearCart } = useCart();
  const [step, setStep] = useState(1);
  const [orderComplete, setOrderComplete] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Form state
  const [shippingInfo, setShippingInfo] = useState({
    fullName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
    phone: '',
  });
  
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
  });

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setOrderComplete(true);
      clearCart();
    }, 1500);
  };

  const handleClose = () => {
    if (orderComplete) {
      setStep(1);
      setOrderComplete(false);
      onClose();
    } else {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 text-center sm:block">
        {/* Backdrop */}
        <div 
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" 
          onClick={handleClose}
        ></div>

        {/* Modal */}
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="absolute top-0 right-0 pt-4 pr-4">
            <button
              type="button"
              className="bg-white rounded-md text-gray-400 hover:text-gray-500"
              onClick={handleClose}
            >
              <span className="sr-only">Close</span>
              <X size={24} aria-hidden="true" />
            </button>
          </div>

          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            {/* Order confirmation */}
            {orderComplete ? (
              <div className="text-center py-8">
                <CheckCircle size={64} className="mx-auto text-green-500 mb-4" />
                <h3 className="text-xl font-medium text-gray-900 mb-2">Your order is confirmed!</h3>
                <p className="text-gray-600 mb-4">
                  Thank you for your purchase. We've sent a confirmation email with your order details.
                </p>
                <p className="text-sm text-gray-500 mb-4">
                  Order #: {Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}
                </p>
                <button
                  onClick={handleClose}
                  className="mt-4 inline-flex justify-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <>
                {/* Checkout steps */}
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Checkout</h3>
                  <div className="flex justify-between items-center mb-6">
                    <div 
                      className={`flex flex-col items-center ${
                        step >= 1 ? 'text-blue-600' : 'text-gray-400'
                      }`}
                    >
                      <div className={`w-8 h-8 flex items-center justify-center rounded-full border-2 ${
                        step >= 1 ? 'border-blue-600 bg-blue-50' : 'border-gray-300'
                      }`}>
                        <Home size={16} />
                      </div>
                      <span className="text-xs mt-1">Shipping</span>
                    </div>
                    
                    <div className={`h-1 flex-grow mx-2 ${
                      step >= 2 ? 'bg-blue-600' : 'bg-gray-200'
                    }`}></div>
                    
                    <div 
                      className={`flex flex-col items-center ${
                        step >= 2 ? 'text-blue-600' : 'text-gray-400'
                      }`}
                    >
                      <div className={`w-8 h-8 flex items-center justify-center rounded-full border-2 ${
                        step >= 2 ? 'border-blue-600 bg-blue-50' : 'border-gray-300'
                      }`}>
                        <CreditCard size={16} />
                      </div>
                      <span className="text-xs mt-1">Payment</span>
                    </div>
                    
                    <div className={`h-1 flex-grow mx-2 ${
                      step >= 3 ? 'bg-blue-600' : 'bg-gray-200'
                    }`}></div>
                    
                    <div 
                      className={`flex flex-col items-center ${
                        step >= 3 ? 'text-blue-600' : 'text-gray-400'
                      }`}
                    >
                      <div className={`w-8 h-8 flex items-center justify-center rounded-full border-2 ${
                        step >= 3 ? 'border-blue-600 bg-blue-50' : 'border-gray-300'
                      }`}>
                        <Truck size={16} />
                      </div>
                      <span className="text-xs mt-1">Confirmation</span>
                    </div>
                  </div>
                </div>

                {/* Shipping Form */}
                {step === 1 && (
                  <form onSubmit={handleShippingSubmit}>
                    <div className="grid grid-cols-6 gap-4">
                      <div className="col-span-6">
                        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                          Full Name
                        </label>
                        <input
                          type="text"
                          id="fullName"
                          value={shippingInfo.fullName}
                          onChange={(e) => setShippingInfo({...shippingInfo, fullName: e.target.value})}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          required
                        />
                      </div>
                      
                      <div className="col-span-6">
                        <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                          Street Address
                        </label>
                        <input
                          type="text"
                          id="address"
                          value={shippingInfo.address}
                          onChange={(e) => setShippingInfo({...shippingInfo, address: e.target.value})}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          required
                        />
                      </div>
                      
                      <div className="col-span-6 sm:col-span-3">
                        <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                          City
                        </label>
                        <input
                          type="text"
                          id="city"
                          value={shippingInfo.city}
                          onChange={(e) => setShippingInfo({...shippingInfo, city: e.target.value})}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          required
                        />
                      </div>
                      
                      <div className="col-span-6 sm:col-span-3">
                        <label htmlFor="state" className="block text-sm font-medium text-gray-700">
                          State / Province
                        </label>
                        <input
                          type="text"
                          id="state"
                          value={shippingInfo.state}
                          onChange={(e) => setShippingInfo({...shippingInfo, state: e.target.value})}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          required
                        />
                      </div>
                      
                      <div className="col-span-6 sm:col-span-3">
                        <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700">
                          ZIP / Postal Code
                        </label>
                        <input
                          type="text"
                          id="zipCode"
                          value={shippingInfo.zipCode}
                          onChange={(e) => setShippingInfo({...shippingInfo, zipCode: e.target.value})}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          required
                        />
                      </div>
                      
                      <div className="col-span-6 sm:col-span-3">
                        <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                          Country
                        </label>
                        <select
                          id="country"
                          value={shippingInfo.country}
                          onChange={(e) => setShippingInfo({...shippingInfo, country: e.target.value})}
                          className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          required
                        >
                          <option value="United States">United States</option>
                          <option value="Canada">Canada</option>
                          <option value="United Kingdom">United Kingdom</option>
                          <option value="Australia">Australia</option>
                        </select>
                      </div>
                      
                      <div className="col-span-6">
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          value={shippingInfo.phone}
                          onChange={(e) => setShippingInfo({...shippingInfo, phone: e.target.value})}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="mt-6 flex justify-end">
                      <button
                        type="button"
                        onClick={onClose}
                        className="mr-3 inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                      >
                        Continue to Payment
                      </button>
                    </div>
                  </form>
                )}

                {/* Payment Form */}
                {step === 2 && (
                  <form onSubmit={handlePaymentSubmit}>
                    <div className="mb-6">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Order Summary</h4>
                      <div className="bg-gray-50 p-4 rounded-md">
                        <div className="flex justify-between mb-2">
                          <span className="text-sm text-gray-600">Subtotal</span>
                          <span className="text-sm font-medium">${state.total.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm text-gray-600">Shipping</span>
                          <span className="text-sm font-medium">$4.99</span>
                        </div>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm text-gray-600">Tax</span>
                          <span className="text-sm font-medium">${(state.total * 0.08).toFixed(2)}</span>
                        </div>
                        <div className="border-t border-gray-200 my-2"></div>
                        <div className="flex justify-between">
                          <span className="text-sm font-medium text-gray-700">Total</span>
                          <span className="text-sm font-bold">${(state.total + 4.99 + state.total * 0.08).toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-6 gap-4">
                      <div className="col-span-6">
                        <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">
                          Card Number
                        </label>
                        <input
                          type="text"
                          id="cardNumber"
                          value={paymentInfo.cardNumber}
                          onChange={(e) => setPaymentInfo({...paymentInfo, cardNumber: e.target.value})}
                          placeholder="1234 5678 9012 3456"
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          required
                        />
                      </div>
                      
                      <div className="col-span-6">
                        <label htmlFor="cardName" className="block text-sm font-medium text-gray-700">
                          Name on Card
                        </label>
                        <input
                          type="text"
                          id="cardName"
                          value={paymentInfo.cardName}
                          onChange={(e) => setPaymentInfo({...paymentInfo, cardName: e.target.value})}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          required
                        />
                      </div>
                      
                      <div className="col-span-3">
                        <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700">
                          Expiry Date
                        </label>
                        <input
                          type="text"
                          id="expiryDate"
                          value={paymentInfo.expiryDate}
                          onChange={(e) => setPaymentInfo({...paymentInfo, expiryDate: e.target.value})}
                          placeholder="MM/YY"
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          required
                        />
                      </div>
                      
                      <div className="col-span-3">
                        <label htmlFor="cvv" className="block text-sm font-medium text-gray-700">
                          CVV
                        </label>
                        <input
                          type="text"
                          id="cvv"
                          value={paymentInfo.cvv}
                          onChange={(e) => setPaymentInfo({...paymentInfo, cvv: e.target.value})}
                          placeholder="123"
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="mt-6 flex justify-end">
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="mr-3 inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        disabled={isProcessing}
                        className={`inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 ${
                          isProcessing ? 'opacity-70 cursor-not-allowed' : 'hover:bg-blue-700'
                        }`}
                      >
                        {isProcessing ? 'Processing...' : 'Complete Order'}
                      </button>
                    </div>
                  </form>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutModal;