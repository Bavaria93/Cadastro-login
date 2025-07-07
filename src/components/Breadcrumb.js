import React from 'react';
import { useLocation, Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Breadcrumbs,
  Link as MuiLink,
  Typography
} from '@mui/material';

// títulos mapeados (não inclui '/')
const pageTitles = {
  '/usuarios/cadastroUsuario': 'Cadastro de Usuário',
  '/perfis/cadastroPerfil': 'Cadastro de Perfil',
  '/perfis/associarPerfil': 'Associar Perfil',
  '/permissoes/cadastroPermissao': 'Cadastro de Permissão',
  '/permissoes/associarPermissao': 'Associar Permissão',
  '/cursos/cadastroCurso': 'Cadastro de Curso',
  '/solicitacoes/cadastroSolicitacao': 'Cadastro de Solicitação'
};

// helper para capitalizar segmentos não mapeados
const capitalize = str =>
  str.charAt(0).toUpperCase() + str.slice(1);

const Breadcrumb = () => {
  const { pathname } = useLocation();

  // não renderiza na página de login
  if (pathname === '/login') return null;

  // separa a URL em segmentos não vazios
  const segments = pathname.split('/').filter(Boolean);

  // rótulo raiz: usa mapeamento ou capitaliza 'home'
  const rootTitle = pageTitles['/'] ?? capitalize('home');

  // gera os crumbs para cada segmento
  const breadcrumbs = segments.map((seg, idx) => {
    const to = '/' + segments.slice(0, idx + 1).join('/');
    const title = pageTitles[to] ?? capitalize(seg);
    const isLast = idx === segments.length - 1;

    return isLast ? (
      <Typography key={to} color="textPrimary" sx={{ fontWeight: 'bold' }}>
        {title}
      </Typography>
    ) : (
      <MuiLink
        key={to}
        component={RouterLink}
        to={to}
        underline="hover"
        color="inherit"
        sx={{ display: 'flex', alignItems: 'center' }}
      >
        {title}
      </MuiLink>
    );
  });

  return (
    <Box sx={{ mt: 2, ml: 2, opacity: 0.9, color: 'text.secondary' }}>
      <Breadcrumbs
        separator="/"
        aria-label="breadcrumb"
        sx={{ '& .MuiBreadcrumbs-separator': { mx: 1 } }}
      >
        <MuiLink
          component={RouterLink}
          to="/"
          underline="hover"
          color="inherit"
          sx={{ display: 'flex', alignItems: 'center' }}
        >
          {rootTitle}
        </MuiLink>

        {breadcrumbs}
      </Breadcrumbs>
    </Box>
  );
};

export default Breadcrumb;
