import React, { createContext, useContext, useReducer, useEffect } from 'react';

const CartContext = createContext();

// Cart action types
const CART_ACTIONS = {
  LOAD_CART: 'LOAD_CART',
  ADD_ITEM: 'ADD_ITEM',
  REMOVE_ITEM: 'REMOVE_ITEM',
  UPDATE_QUANTITY: 'UPDATE_QUANTITY',
  CLEAR_CART: 'CLEAR_CART',
  APPLY_DISCOUNT: 'APPLY_DISCOUNT',
  SET_DELIVERY_INFO: 'SET_DELIVERY_INFO'
};

// Initial cart state
const initialState = {
  items: [],
  total: 0,
  subtotal: 0,
  deliveryFee: 50, // KSh 50 standard delivery fee
  discount: 0,
  discountCode: null,
  deliveryInfo: {
    area: '',
    address: '',
    phone: '',
    specialInstructions: ''
  },
  minimumOrder: 100 // KSh 100 minimum order
};

// Cart reducer function
const cartReducer = (state, action) => {
  switch (action.type) {
    case CART_ACTIONS.LOAD_CART:
      return { ...state, ...action.payload };
    
    case CART_ACTIONS.ADD_ITEM: {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      let newItems;
      
      if (existingItem) {
        newItems = state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        newItems = [...state.items, { ...action.payload, quantity: 1 }];
      }
      
      const subtotal = newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      const deliveryFee = subtotal >= state.minimumOrder ? state.deliveryFee : state.deliveryFee + 20; // Extra fee for small orders
      const total = subtotal + deliveryFee - state.discount;
      
      return { 
        ...state, 
        items: newItems, 
        subtotal, 
        total,
        deliveryFee 
      };
    }
    
    case CART_ACTIONS.REMOVE_ITEM: {
      const filteredItems = state.items.filter(item => item.id !== action.payload);
      const subtotal = filteredItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      const deliveryFee = subtotal >= state.minimumOrder ? state.deliveryFee : state.deliveryFee + 20;
      const total = subtotal + deliveryFee - state.discount;
      
      return { 
        ...state, 
        items: filteredItems, 
        subtotal, 
        total,
        deliveryFee 
      };
    }
    
    case CART_ACTIONS.UPDATE_QUANTITY: {
      const updatedItems = state.items.map(item =>
        item.id === action.payload.id
          ? { ...item, quantity: Math.max(0, action.payload.quantity) }
          : item
      ).filter(item => item.quantity > 0);
      
      const subtotal = updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      const deliveryFee = subtotal >= state.minimumOrder ? state.deliveryFee : state.deliveryFee + 20;
      const total = subtotal + deliveryFee - state.discount;
      
      return { 
        ...state, 
        items: updatedItems, 
        subtotal, 
        total,
        deliveryFee 
      };
    }
    
    case CART_ACTIONS.APPLY_DISCOUNT: {
      const { code, amount } = action.payload;
      const total = state.subtotal + state.deliveryFee - amount;
      
      return {
        ...state,
        discount: amount,
        discountCode: code,
        total: Math.max(0, total)
      };
    }
    
    case CART_ACTIONS.SET_DELIVERY_INFO:
      return {
        ...state,
        deliveryInfo: { ...state.deliveryInfo, ...action.payload }
      };
    
    case CART_ACTIONS.CLEAR_CART:
      return {
        ...initialState,
        deliveryInfo: state.deliveryInfo // Keep delivery info
      };
    
    default:
      return state;
  }
};

// Discount codes for Kenya market
const DISCOUNT_CODES = {
  'WELCOME10': { amount: 50, description: 'KSh 50 off your first order' },
  'BULK20': { amount: 100, description: 'KSh 100 off orders over KSh 500' },
  'STUDENT': { amount: 30, description: 'Student discount: KSh 30 off' },
  'WEEKEND': { amount: 25, description: 'Weekend special: KSh 25 off' }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('aquakenya-cart');
    if (savedCart) {
      try {
        const cartData = JSON.parse(savedCart);
        dispatch({ type: CART_ACTIONS.LOAD_CART, payload: cartData });
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('aquakenya-cart', JSON.stringify(state));
  }, [state]);

  // Cart actions
  const addItem = (product) => {
    dispatch({ type: CART_ACTIONS.ADD_ITEM, payload: product });
  };

  const removeItem = (productId) => {
    dispatch({ type: CART_ACTIONS.REMOVE_ITEM, payload: productId });
  };

  const updateQuantity = (productId, quantity) => {
    dispatch({ 
      type: CART_ACTIONS.UPDATE_QUANTITY, 
      payload: { id: productId, quantity } 
    });
  };

  const clearCart = () => {
    dispatch({ type: CART_ACTIONS.CLEAR_CART });
  };

  const applyDiscountCode = (code) => {
    const discount = DISCOUNT_CODES[code.toUpperCase()];
    if (discount) {
      // Check if discount code has conditions
      if (code.toUpperCase() === 'BULK20' && state.subtotal < 500) {
        return { success: false, message: 'Minimum order of KSh 500 required for this discount' };
      }
      
      dispatch({ 
        type: CART_ACTIONS.APPLY_DISCOUNT, 
        payload: { code: code.toUpperCase(), amount: discount.amount } 
      });
      return { success: true, message: discount.description };
    }
    return { success: false, message: 'Invalid discount code' };
  };

  const removeDiscount = () => {
    dispatch({ 
      type: CART_ACTIONS.APPLY_DISCOUNT, 
      payload: { code: null, amount: 0 } 
    });
  };

  const setDeliveryInfo = (info) => {
    dispatch({ type: CART_ACTIONS.SET_DELIVERY_INFO, payload: info });
  };

  // Helper functions
  const getItemCount = () => {
    return state.items.reduce((sum, item) => sum + item.quantity, 0);
  };

  const isMinimumOrderMet = () => {
    return state.subtotal >= state.minimumOrder;
  };

  const getDeliveryEstimate = () => {
    // Simple delivery estimation based on area
    const area = state.deliveryInfo.area.toLowerCase();
    if (area.includes('nairobi') || area.includes('cbd')) {
      return '2-4 hours';
    } else if (area.includes('kiambu') || area.includes('machakos')) {
      return '4-6 hours';
    } else {
      return '6-8 hours';
    }
  };

  const value = {
    // State
    ...state,
    
    // Actions
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    applyDiscountCode,
    removeDiscount,
    setDeliveryInfo,
    
    // Helpers
    getItemCount,
    isMinimumOrderMet,
    getDeliveryEstimate,
    
    // Constants
    availableDiscountCodes: Object.keys(DISCOUNT_CODES)
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};

export default CartContext;