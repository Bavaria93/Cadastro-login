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

  // Carrega as courses do localStorage; se não houver, inicia com um array vazio.
  const [courses, setCourses] = useState(() => {
    const coursesFromStorage = localStorage.getItem('courses');
    return coursesFromStorage ? JSON.parse(coursesFromStorage) : [];
  });

  // Estado para o token do usuário.
  const [userToken, setUserToken] = useState(() => localStorage.getItem('token') || null);

  // Atualiza o localStorage sempre que os estados mudarem.
  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem('profiles', JSON.stringify(profiles));
  }, [profiles]);

  useEffect(() => {
    localStorage.setItem('permissions', JSON.stringify(permissions));
  }, [permissions]);

  useEffect(() => {
    localStorage.setItem('courses', JSON.stringify(courses));
  }, [courses]);

  // Sempre que o token mudar, armazena no localStorage ou remove caso esteja nulo.
  useEffect(() => {
    if (userToken) {
      localStorage.setItem('token', userToken);
    } else {
      localStorage.removeItem('token');
    }
  }, [userToken]);

  return (
    <UserContext.Provider
      value={{
        users, setUsers,
        profiles, setProfiles,
        permissions, setPermissions,
        courses, setCourses,
        userToken, setUserToken,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
