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

// Garante URL completa ou placeholder
const getFullImageUrl = (photoPath) => {
  if (!photoPath) return "https://via.placeholder.com/40";
  const trimmed = photoPath.trim();
  return trimmed.startsWith("http")
    ? trimmed
    : `http://localhost:8000${trimmed}`;
};

const HorizontalMenu = ({
  menuAberto,
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
      position="static"
      sx={{
        gridArea: "header",           // assume que o pai já definiu grid-area
        bgcolor: "#3498DB",
        boxShadow: 1
      }}
    >
      <Toolbar sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        {/* Botão de toggle do drawer */}
        <IconButton onClick={alternarMenu} edge="start" sx={{ color: "#fff" }}>
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
              )
            }}
            sx={{
              bgcolor: "#fff",
              borderRadius: 1
            }}
          />
        </Box>

        {/* Avatar + nome do usuário */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            color: "#fff",
            cursor: "pointer"
          }}
          onClick={handleMenuOpen}
        >
          <Avatar
            src={getFullImageUrl(user?.photo)}
            alt={user?.name || "Usuário"}
            sx={{ marginRight: 1 }}
          />
          <Typography variant="body1">{user?.name || "Usuário"}</Typography>
        </Box>

        {/* Menu de dropdown do avatar */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          sx={{ mt: 1 }}
        >
          <MenuItem
            onClick={() => {
              handleMenuClose();
              handleEditUser();
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
