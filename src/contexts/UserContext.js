// src/contexts/UserContext.js
import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  // Tenta carregar os usuários do localStorage ao iniciar; se não houver, inicia com um array vazio.
  const [users, setUsers] = useState(() => {
    const usersFromStorage = localStorage.getItem('users');
    return usersFromStorage ? JSON.parse(usersFromStorage) : [];
  });

  // Sempre que a lista de usuários mudar, salva no localStorage.
  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  return (
    <UserContext.Provider value={{ users, setUsers }}>
      {children}
    </UserContext.Provider>
  );
};
