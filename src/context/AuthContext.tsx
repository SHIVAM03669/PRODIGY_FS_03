import React, { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';
import { User } from '../types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

type AuthAction =
  | { type: 'LOGIN_START' }
  | { type: 'LOGIN_SUCCESS'; payload: User }
  | { type: 'LOGIN_FAILURE' }
  | { type: 'LOGOUT' }
  | { type: 'REGISTER_START' }
  | { type: 'REGISTER_SUCCESS'; payload: User }
  | { type: 'REGISTER_FAILURE' };

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
};

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN_START':
    case 'REGISTER_START':
      return { ...state, isLoading: true };
    
    case 'LOGIN_SUCCESS':
    case 'REGISTER_SUCCESS':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        isLoading: false,
      };
    
    case 'LOGIN_FAILURE':
    case 'REGISTER_FAILURE':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
      };
    
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
      };
    
    default:
      return state;
  }
};

interface AuthContextType {
  state: AuthState;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser);
        dispatch({ type: 'LOGIN_SUCCESS', payload: user });
      } catch (error) {
        localStorage.removeItem('user');
      }
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    dispatch({ type: 'LOGIN_START' });
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Check hardcoded admin
    if (email === 'admin@example.com' && password === 'admin123') {
      const user: User = {
        id: 'admin-1',
        name: 'Admin User',
        email: 'admin@example.com',
        role: 'admin',
      };
      localStorage.setItem('user', JSON.stringify(user));
      dispatch({ type: 'LOGIN_SUCCESS', payload: user });
      return true;
    }
    // Check hardcoded regular user
    if (email === 'user@example.com' && password === 'user123') {
      const user: User = {
        id: 'user-1',
        name: 'Regular User',
        email: 'user@example.com',
        role: 'user',
      };
      localStorage.setItem('user', JSON.stringify(user));
      dispatch({ type: 'LOGIN_SUCCESS', payload: user });
      return true;
    }
    // Check registered users in localStorage
    const registeredUsersRaw = localStorage.getItem('registeredUsers');
    if (registeredUsersRaw) {
      try {
        const registeredUsers = JSON.parse(registeredUsersRaw);
        const found = registeredUsers.find((u: any) => u.email === email && u.password === password);
        if (found) {
          const user: User = {
            id: found.id,
            name: found.name,
            email: found.email,
            role: found.role || 'user',
          };
          localStorage.setItem('user', JSON.stringify(user));
          dispatch({ type: 'LOGIN_SUCCESS', payload: user });
          return true;
        }
      } catch {}
    }
    dispatch({ type: 'LOGIN_FAILURE' });
    return false;
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    dispatch({ type: 'REGISTER_START' });
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    if (email && password && name) {
      const user: User = {
        id: `user-${Date.now()}`,
        name,
        email,
        role: 'user',
      };
      // Save to registeredUsers array in localStorage
      const registeredUsersRaw = localStorage.getItem('registeredUsers');
      let registeredUsers = [];
      if (registeredUsersRaw) {
        try {
          registeredUsers = JSON.parse(registeredUsersRaw);
        } catch {}
      }
      registeredUsers.push({ ...user, password });
      localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
      localStorage.setItem('user', JSON.stringify(user));
      dispatch({ type: 'REGISTER_SUCCESS', payload: user });
      return true;
    } else {
      dispatch({ type: 'REGISTER_FAILURE' });
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    dispatch({ type: 'LOGOUT' });
  };

  const value: AuthContextType = {
    state,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}; 