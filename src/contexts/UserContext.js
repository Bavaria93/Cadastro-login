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

  // Carrega as permissões do localStorage; se não houver, inicia com um array vazio.
  const [permissions, setPermissions] = useState(() => {
    const permissionsFromStorage = localStorage.getItem('permissions');
    return permissionsFromStorage ? JSON.parse(permissionsFromStorage) : [];
  });

  // Sempre que a lista de usuários mudar, salva no localStorage.
  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  // Sempre que a lista de perfis mudar, salva no localStorage.
  useEffect(() => {
    localStorage.setItem('profiles', JSON.stringify(profiles));
  }, [profiles]);

  // Sempre que a lista de permissões mudar, salva no localStorage.
  useEffect(() => {
    localStorage.setItem('permissions', JSON.stringify(permissions));
  }, [permissions]);

  return (
    <UserContext.Provider value={{ users, setUsers, profiles, setProfiles, permissions, setPermissions }}>
      {children}
    </UserContext.Provider>
  );
};
