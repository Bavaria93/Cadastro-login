import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

// Hook customizado para sincronizar o estado com o localStorage,
// incluindo tratamento para valores inválidos (JSON.parse em try/catch)
function useLocalStorageState(key, initialValue) {
  const [state, setState] = useState(() => {
    const stored = localStorage.getItem(key);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (err) {
        console.error(`Erro ao fazer parse do valor armazenado com a chave "${key}":`, err);
        return initialValue;
      }
    }
    return initialValue;
  });

  useEffect(() => {
    if (state === null || state === undefined) {
      localStorage.removeItem(key);
    } else {
      try {
        localStorage.setItem(key, JSON.stringify(state));
      } catch (err) {
        console.error(`Erro ao salvar a chave "${key}" no localStorage:`, err);
      }
    }
  }, [key, state]);

  return [state, setState];
}

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useLocalStorageState('users', []);
  const [profiles, setProfiles] = useLocalStorageState('profiles', []);
  const [permissions, setPermissions] = useLocalStorageState('permissions', []);
  const [courses, setCourses] = useLocalStorageState('courses', []);
  // Removemos o estado relacionado ao token,
  // pois o AuthContext já cuida do gerenciamento do token e do usuário autenticado.

  return (
    <UserContext.Provider
      value={{
        users, setUsers,
        profiles, setProfiles,
        permissions, setPermissions,
        courses, setCourses,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
