import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  InputBase,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Typography,
  Avatar,
  Box,
} from "@mui/material";
import { Menu as MenuIcon, Search as SearchIcon } from "@mui/icons-material";

function App() {
  const [menuAberto, setMenuAberto] = useState(true);

  const alternarMenu = () => {
    setMenuAberto(!menuAberto);
  };

  return (
    <Box sx={{ display: "flex" }}>
      {/* Menu Vertical */}
      <Drawer
        variant="persistent"
        anchor="left"
        open={menuAberto}
        sx={{
          "& .MuiDrawer-paper": {
            width: menuAberto ? 200 : 60,
            transition: "width 0.3s",
            overflowX: "hidden",
          },
        }}
      >
        <IconButton onClick={alternarMenu} sx={{ margin: "10px" }}>
          <MenuIcon />
        </IconButton>
        <List>
          <ListItem button>
            <ListItemText primary="Opção 1" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="Opção 2" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="Opção 3" />
          </ListItem>
        </List>
      </Drawer>

      {/* Conteúdo */}
      <Box sx={{ flex: 1 }}>
        {/* Menu Horizontal */}
        <AppBar position="static" color="default">
          <Toolbar>
            <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
              <SearchIcon />
              <InputBase
                placeholder="Pesquisar..."
                sx={{
                  ml: 1,
                  flex: 1,
                  backgroundColor: "#f5f5f5",
                  borderRadius: 1,
                  padding: "5px 10px",
                }}
              />
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Avatar
                alt="Foto de Perfil"
                src="https://via.placeholder.com/40"
                sx={{ marginRight: 1 }}
              />
              <Typography variant="body1">Usuário</Typography>
            </Box>
          </Toolbar>
        </AppBar>

        <Box sx={{ padding: "20px" }}>
          <Typography variant="h4">Bem-vindo!</Typography>
          <Typography>
            Este é um exemplo de layout criado com Material UI.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default App;
