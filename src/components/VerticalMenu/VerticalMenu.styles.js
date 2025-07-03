import { styled } from '@mui/material/styles';
import { Box, List } from '@mui/material';

export const MenuContainer = styled(
  Box,
  {
    shouldForwardProp: (prop) =>
      prop !== 'menuAberto' &&
      prop !== 'drawerWidthExpanded' &&
      prop !== 'drawerWidthCollapsed'
  }
)(
  ({ theme, menuAberto, drawerWidthExpanded, drawerWidthCollapsed }) => ({
    gridArea: 'menu',
    width: menuAberto
      ? drawerWidthExpanded
      : drawerWidthCollapsed,
    minWidth: menuAberto
      ? drawerWidthExpanded
      : drawerWidthCollapsed,
    height: '100%',
    backgroundColor: '#2C3E50',
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    }),
    borderRight: `1px solid ${theme.palette.divider}`
  })
);

export const MenuList = styled(List)(() => ({
  padding: 0
}));
