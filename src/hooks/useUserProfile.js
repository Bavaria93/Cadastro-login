import { useContext, useMemo } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { getFullImageUrl, placeholderAvatarUrl } from '../utils/userUtils';

// Hook para extrair nome e URL de avatar do usuário autenticado
export function useUserProfile() {
  const { user } = useContext(AuthContext);

  return useMemo(() => {
    // Se não há usuário, usamos valores padrão
    if (!user) {
      return { name: 'Usuário', avatarUrl: placeholderAvatarUrl };
    }

    // Nome padrão ou nome do usuário
    const name = user.name || 'Usuário';
    // URL do avatar, tratando caminhos relativos
    const avatarUrl = getFullImageUrl(user.photo);
    return { name, avatarUrl };
  }, [user]);
}
