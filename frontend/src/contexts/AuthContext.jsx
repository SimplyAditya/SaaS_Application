import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const BACKEND_URL = 'http://localhost:5100';


const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

const DEFAULT_REDIRECT_PATHS = {
  superadmin: '/superadmin/dashboard',
  admin: '/admin/dashboard',
  user: '/user/dashboard',
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      try {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post(`${BACKEND_URL}/api/auth/login`, { email, password });
      // console.log(response.data);
      const { token, user } = response.data;
      setUser(user);
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', token); // Store token if needed
      // console.log(user.role);
      // Determine redirect path based on role and subscriptionAdmin
      let defaultPath;
      if (user.role === 'Admin') {
        defaultPath = '/superadmin/dashboard';
      } else if (user.role === 'User' && user.subscriptionAdmin) {
        defaultPath = '/admin/dashboard';
      } else {
        defaultPath = DEFAULT_REDIRECT_PATHS.user;
      }

      return { success: true, defaultPath };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: error.response?.data?.message || 'Login failed' };
    }
  };

  const register = async (userData) => {
    try {
      const response = await axios.post(`${BACKEND_URL}/api/auth/register`, userData);
      const { user } = response.data;
      setUser(user);
      localStorage.setItem('user', JSON.stringify(user));
      return { success: true, defaultPath: DEFAULT_REDIRECT_PATHS.user };
    } catch (error) {
      console.error('Registration error:', error);
      return { success: false, error: error.response?.data?.message || 'Registration failed' };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const value = {
    user,
    loading,
    login,
    logout,
    register,
    isAuthenticated: !!user,
    role: user?.role || null,
    getDefaultPath: (role) => DEFAULT_REDIRECT_PATHS[role] || DEFAULT_REDIRECT_PATHS.user,
  };

  if (loading) {
    // You might want to show a loading spinner or placeholder here.
    return null;
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
