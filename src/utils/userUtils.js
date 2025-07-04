// URL padrão utilizada quando não há foto disponível
export const placeholderAvatarUrl = 'https://via.placeholder.com/40';

// Retorna a URL completa da foto do usuário
export function getFullImageUrl(photoPath) {
  // Se não houver caminho, retorna o placeholder
  if (!photoPath) return placeholderAvatarUrl;

  // Remove espaços em branco antes/depois
  const trimmed = photoPath.trim();

  // Se já for URL absoluta, retorna direto; caso contrário, prefixa o localhost
  return trimmed.startsWith('http')
    ? trimmed
    : `http://localhost:8000${trimmed}`;
}
