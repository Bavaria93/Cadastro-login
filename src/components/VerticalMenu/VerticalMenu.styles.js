import { styled } from '@mui/material/styles';     // para criar componentes estilizados
import { Box, List } from '@mui/material';          // Box como container, List para a lista de itens

export const MenuContainer = styled(
  Box,
  {
    // não repassa essas props para o DOM
    shouldForwardProp: (prop) =>
      prop !== 'menuAberto' &&
      prop !== 'drawerWidthExpanded' &&
      prop !== 'drawerWidthCollapsed'
  }
)(
  ({ theme, menuAberto, drawerWidthExpanded, drawerWidthCollapsed }) => ({
    gridArea: 'menu',                             // área do grid onde o menu será colocado
    width: menuAberto 
      ? drawerWidthExpanded 
      : drawerWidthCollapsed,
    minWidth: menuAberto 
      ? drawerWidthExpanded 
      : drawerWidthCollapsed,
    height: '100%',                                // preenche toda a altura do container
    backgroundColor: '#2C3E50',                    // cor de fundo do menu
    overflowX: 'hidden',                           // esconde overflow horizontal
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    }),                                            // animação suave ao mudar largura
    borderRight: `1px solid ${theme.palette.divider}`  // separador à direita
  })
);

export const MenuList = styled(List)(() => ({
  padding: 0    // remove padding padrão da lista
}));
