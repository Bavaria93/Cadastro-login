import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

export const usePermission = (permission) => {
  const { user } = useContext(AuthContext);

  // Se não houver usuário ou não existir campo de permissões, retorna false.
  if (!user || !user.permissions) return false;

  // Supondo que `permissions` seja um array de strings
  return user.permissions.includes(permission);
};
