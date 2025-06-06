import React, { useContext } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Box,
  Menu,
  MenuItem,
  Avatar,
  Typography,
  TextField,
} from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import { Menu as MenuIcon, Search as SearchIcon } from "@mui/icons-material";
import { AuthContext } from "../contexts/AuthContext";

// Função auxiliar para garantir que a URL da foto esteja limpa e completa
const getFullImageUrl = (photoPath) => {
  if (!photoPath) return "https://via.placeholder.com/40";
  const trimmed = photoPath.trim();
  return trimmed.startsWith("http") ? trimmed : `http://localhost:8000${trimmed}`;
};

const HorizontalMenu = ({
  menuAberto,
  appBarLeft,
  appBarWidth,
  alternarMenu,
  handleMenuOpen,
  anchorEl,
  handleMenuClose,
  handleLogout,
  handleEditUser,
}) => {
  const { user } = useContext(AuthContext);

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
        <IconButton
          onClick={alternarMenu}
          edge="start"
          sx={{ mr: 2, color: "white" }}
        >
          <MenuIcon />
        </IconButton>
        <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
          <TextField
            placeholder="Pesquisar..."
            variant="outlined"
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: "grey" }} />
                </InputAdornment>
              ),
            }}
            sx={{
              backgroundColor: "white",
              borderRadius: 1,
              width: "300px",
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
              user && user.photo
                ? getFullImageUrl(user.photo)
                : "https://via.placeholder.com/40"
            }
            sx={{ marginRight: 1 }}
          />
          <Typography variant="body1" sx={{ color: "white" }}>
            {user && user.name ? user.name : "Usuário"}
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
              if (handleEditUser) {
                handleEditUser();
              }
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
