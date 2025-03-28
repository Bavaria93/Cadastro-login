import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Box,
  InputBase,
  Menu,
  MenuItem,
  Avatar,
  Typography,
} from "@mui/material";
import { Menu as MenuIcon, Search as SearchIcon } from "@mui/icons-material";

const HorizontalMenu = ({
  menuAberto,
  appBarLeft,
  appBarWidth,
  alternarMenu,
  handleMenuOpen,
  anchorEl,
  loggedUser,
  handleMenuClose,
  handleLogout,
}) => {
  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: "#3498DB",
        zIndex: 1300,
        left: appBarLeft,
        width: appBarWidth,
        transition: "left 0.3s, width 0.3s",
      }}
    >
      <Toolbar>
        <IconButton onClick={alternarMenu} edge="start" sx={{ mr: 2, color: "white" }}>
          <MenuIcon />
        </IconButton>
        <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
          <SearchIcon sx={{ color: "white" }} />
          <InputBase
            placeholder="Pesquisar..."
            sx={{
              ml: 1,
              width: "300px",
              backgroundColor: "white",
              borderRadius: 1,
              padding: "5px 10px",
            }}
          />
        </Box>
        <Box
          sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
          onClick={handleMenuOpen}
        >
          <Avatar
            alt="Foto de Perfil"
            src={
              loggedUser && loggedUser.foto
                ? loggedUser.foto
                : "https://via.placeholder.com/40"
            }
            sx={{ marginRight: 1 }}
          />
          <Typography variant="body1" sx={{ color: "white" }}>
            {loggedUser && loggedUser.name ? loggedUser.name : "Usuário"}
          </Typography>
        </Box>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          sx={{ mt: 1.5 }}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <MenuItem
            onClick={() => {
              handleMenuClose();
              console.log("Editar usuário clicado");
            }}
          >
            Editar Usuário
          </MenuItem>
          <MenuItem onClick={handleLogout}>Sair</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default HorizontalMenu;
