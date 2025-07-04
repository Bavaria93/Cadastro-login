import React, { useCallback } from 'react';
import {
  Menu,
  MenuItem,
  Avatar,
  Typography,
  InputAdornment
} from '@mui/material';
import { Menu as MenuIcon, Search as SearchIcon } from '@mui/icons-material';
import { useUserProfile } from '../../hooks/useUserProfile';

import {
  StyledAppBar,
  StyledToolbar,
  ToggleButton,
  SearchContainer,
  SearchField,
  UserContainer
} from './HorizontalMenu.styles';

// Componente de menu horizontal fixa na parte superior
const HorizontalMenu = ({
  menuAberto,        // controla se o drawer está aberto
  appBarLeft,        // valor de deslocamento horizontal do AppBar
  appBarWidth,       // largura do AppBar
  alternarMenu,      // função para abrir/fechar o drawer
  handleMenuOpen,    // função disparada ao clicar no user container
  anchorEl,          // elemento ancorado para o Menu de dropdown
  handleMenuClose,   // função para fechar o Menu de dropdown
  handleLogout,      // função de logout
  handleEditUser     // função para abrir diálogo de edição de usuário
}) => {
  // Obtém nome e URL do avatar do usuário autenticado
  const { name, avatarUrl } = useUserProfile();

  // Callback que fecha o dropdown e abre o diálogo de edição
  const onEditClick = useCallback(() => {
    handleMenuClose();
    handleEditUser();
  }, [handleMenuClose, handleEditUser]);

  return (
    // AppBar estilizado, posicionado com props de left/width
    <StyledAppBar appBarLeft={appBarLeft} appBarWidth={appBarWidth}>
      <StyledToolbar>
        {/* Botão de alternar o menu lateral */}
        <ToggleButton onClick={alternarMenu} edge="start">
          <MenuIcon />
        </ToggleButton>

        {/* Campo de busca centralizado */}
        <SearchContainer>
          <SearchField
            placeholder="Pesquisar..."
            variant="outlined"
            size="small"
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: 'grey' }} />
                </InputAdornment>
              )
            }}
          />
        </SearchContainer>

        {/* Área de avatar e nome do usuário */}
        <UserContainer onClick={handleMenuOpen}>
          <Avatar
            src={avatarUrl}
            alt={name}
            sx={{ mr: 1 }}
          />
          <Typography variant="body1">
            {name}
          </Typography>
        </UserContainer>

        {/* Dropdown contendo opções de editar usuário e logout */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          transformOrigin={{ vertical: 'top', horizontal: 'left' }}
          sx={{ mt: 1.5 }}
        >
          <MenuItem onClick={onEditClick}>Editar Usuário</MenuItem>
          <MenuItem onClick={handleLogout}>Sair</MenuItem>
        </Menu>
      </StyledToolbar>
    </StyledAppBar>
  );
};

export default HorizontalMenu;
