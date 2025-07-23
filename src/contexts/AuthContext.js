// src/contexts/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import authService from '../services/authService';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  // vai ser true sempre que você rodar `npm start` (NODE_ENV=development)
  const isDev = process.env.NODE_ENV === 'development';

  console.log('NODE_ENV =', process.env.NODE_ENV);
  console.log('isDev (bypass) =', isDev);

  const [user, setUser] = useState(() => {
    if (isDev) {
      return {
        id: 'dev-user',
        name: 'DEV Styler',
        email: 'dev@local',
        token: 'mock-token',
        permissions: ['*'],
      };
    }
    const s = localStorage.getItem('loggedUser');
    return s ? JSON.parse(s) : null;
  });

  const [token, setToken] = useState(() => {
    return isDev ? 'mock-token' : localStorage.getItem('token');
  });

  useEffect(() => {
    if (!token || isDev) return;
    try {
      const { exp } = jwtDecode(token);
      if (exp * 1000 < Date.now()) signOut();
    } catch {
      signOut();
    }
  }, [token, isDev]);

  const signIn = async (email, password) => {
    if (isDev) {
      // mock em dev
      const mockUser = {
        id: 'dev-user',
        name: 'DEV Styler',
        email: 'dev@local',
        token: 'mock-token',
        permissions: ['*'],
      };
      localStorage.setItem('token', mockUser.token);
      localStorage.setItem('loggedUser', JSON.stringify(mockUser));
      setToken(mockUser.token);
      setUser(mockUser);
      return { access_token: mockUser.token };
    }

    // produção: chamada real
    const data = await authService.login(email, password);
    if (!data?.access_token) {
      throw new Error('E-mail ou senha inválidos');
    }
    const decoded = jwtDecode(data.access_token);
    const userData = {
      email,
      name: data.name,
      photo: data.photo,
      token: data.access_token,
      permissions: decoded.permissions || [],
    };
    localStorage.setItem('token', data.access_token);
    localStorage.setItem('loggedUser', JSON.stringify(userData));
    setToken(data.access_token);
    setUser(userData);
    return data;
  };

  const signOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('loggedUser');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
