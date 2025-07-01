import React, { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';
import { Product } from '../types';

interface WishlistState {
  items: Product[];
}

type WishlistAction =
  | { type: 'ADD_ITEM'; payload: Product }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'CLEAR_WISHLIST' }
  | { type: 'LOAD_WISHLIST'; payload: WishlistState };

const initialState: WishlistState = {
  items: [],
};

const wishlistReducer = (state: WishlistState, action: WishlistAction): WishlistState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        return state; // Item already in wishlist
      }
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    }
    
    case 'REMOVE_ITEM': {
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload),
      };
    }
    
    case 'CLEAR_WISHLIST':
      return initialState;
    
    case 'LOAD_WISHLIST':
      return action.payload;
    
    default:
      return state;
  }
};

interface WishlistContextType {
  state: WishlistState;
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  clearWishlist: () => void;
  isInWishlist: (productId: string) => boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};

interface WishlistProviderProps {
  children: ReactNode;
}

export const WishlistProvider: React.FC<WishlistProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(wishlistReducer, initialState);

  // Load wishlist from localStorage on mount
  useEffect(() => {
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
      try {
        const wishlistData = JSON.parse(savedWishlist);
        dispatch({ type: 'LOAD_WISHLIST', payload: wishlistData });
      } catch (error) {
        localStorage.removeItem('wishlist');
      }
    }
  }, []);

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(state));
  }, [state]);

  const addItem = (product: Product) => {
    dispatch({ type: 'ADD_ITEM', payload: product });
  };

  const removeItem = (productId: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: productId });
  };

  const clearWishlist = () => {
    dispatch({ type: 'CLEAR_WISHLIST' });
  };

  const isInWishlist = (productId: string) => {
    return state.items.some(item => item.id === productId);
  };

  const value: WishlistContextType = {
    state,
    addItem,
    removeItem,
    clearWishlist,
    isInWishlist,
  };

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}; 