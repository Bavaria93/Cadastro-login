import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from "jwt-decode";
import authService from '../services/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Inicializa usuário e token a partir do localStorage
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('loggedUser');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem('token'));

  // Verifica a expiração do token e efetua logout se necessário
  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const expTime = decoded.exp * 1000;
        if (expTime < Date.now()) {
          signOut();
        }
      } catch (error) {
        console.error('Erro ao decodificar o token:', error);
        signOut();
      }
    }
  }, [token]);

  const signIn = async (email, password) => {
    try {
      const data = await authService.login(email, password);
      if (data) {
        // Atualiza localStorage e estados
        localStorage.setItem('token', data.access_token);
        const userData = {
          email,
          token: data.access_token,
          name: data.name,
          photo: data.photo,
          permissions: data.permissions, // campo contendo um array com as permissões do usuário
        };
        localStorage.setItem('loggedUser', JSON.stringify(userData));

        setToken(data.access_token);
        setUser(userData);
      }
      return data;
    } catch (error) {
      throw error;
    }
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
};
