import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  // Carrega os usuários do localStorage; se não houver, inicia com um array vazio.
  const [users, setUsers] = useState(() => {
    const usersFromStorage = localStorage.getItem('users');
    return usersFromStorage ? JSON.parse(usersFromStorage) : [];
  });

  // Carrega os perfis do localStorage; se não houver, inicia com um array vazio.
  const [profiles, setProfiles] = useState(() => {
    const profilesFromStorage = localStorage.getItem('profiles');
    return profilesFromStorage ? JSON.parse(profilesFromStorage) : [];
  });

  // Sempre que a lista de usuários mudar, salva no localStorage.
  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  // Sempre que a lista de perfis mudar, salva no localStorage.
  useEffect(() => {
    localStorage.setItem('profiles', JSON.stringify(profiles));
  }, [profiles]);

  return (
    <UserContext.Provider value={{ users, setUsers, profiles, setProfiles }}>
      {children}
    </UserContext.Provider>
  );
};
