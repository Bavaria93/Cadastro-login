// src/contexts/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from "jwt-decode";
import authService from '../services/authService';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const s = localStorage.getItem('loggedUser');
    return s ? JSON.parse(s) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem('token'));

  useEffect(() => {
    if (!token) return;
    try {
      const { exp } = jwtDecode(token);
      if (exp * 1000 < Date.now()) signOut();
    } catch {
      signOut();
    }
  }, [token]);

  const signIn = async (email, password) => {
    // SE der 401/403, authService.login já lança Error
    const data = await authService.login(email, password);

    // Se a API retornar sem token, forçamos erro também
    if (!data?.access_token) {
      throw new Error('E-mail ou senha inválidos');
    }

    // decodifica e popula o usuário
    const decoded = jwtDecode(data.access_token);
    const userData = {
      email,
      name: data.name,
      photo: data.photo,
      token: data.access_token,
      permissions: decoded.permissions || []
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
