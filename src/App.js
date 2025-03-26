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
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Cadastro from "./components/Cadastro";
import ListaUsuarios from "./components/ListaUsuarios";
import Login from "./components/Login";
import { UserProvider } from "./contexts/UserContext"; // Certifique-se de que o caminho está correto

function App() {
  const [menuAberto, setMenuAberto] = useState(true);
  // Novo estado para armazenar o usuário logado
  const [loggedUser, setLoggedUser] = useState(null);

  const alternarMenu = () => {
    setMenuAberto(!menuAberto);
  };

  return (
    // Envolva todo o aplicativo com o UserProvider para que os dados sejam compartilhados globalmente
    <UserProvider>
      <Router>
        <Box sx={{ display: "flex", height: "100vh" }}>
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
                backgroundColor: "#2C3E50",
              },
            }}
          >
            <List>
              <ListItem button>
                <Link to="/" style={{ textDecoration: "none", color: "white" }}>
                  <ListItemText primary="Home" />
                </Link>
              </ListItem>
              <ListItem button>
                <Link
                  to="/usuarios"
                  style={{ textDecoration: "none", color: "white" }}
                >
                  <ListItemText primary="Lista de Usuários" />
                </Link>
              </ListItem>
              <ListItem button>
                <Link
                  to="/cadastro"
                  style={{ textDecoration: "none", color: "white" }}
                >
                  <ListItemText primary="Cadastro de Usuário" />
                </Link>
              </ListItem>
              <ListItem button>
                <Link
                  to="/login"
                  style={{ textDecoration: "none", color: "white" }}
                >
                  <ListItemText primary="Logar" />
                </Link>
              </ListItem>
            </List>
          </Drawer>

          {/* Conteúdo Principal */}
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              marginLeft: menuAberto ? "200px" : "0px",
              transition: "margin-left 0.3s",
              backgroundColor: "#ECF0F1",
            }}
          >
            {/* Menu Horizontal */}
            <AppBar position="static" sx={{ backgroundColor: "#3498DB" }}>
              <Toolbar>
                <IconButton
                  onClick={alternarMenu}
                  edge="start"
                  sx={{ mr: 2, color: "white" }}
                >
                  <MenuIcon />
                </IconButton>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    flexGrow: 1,
                  }}
                >
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
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Avatar
                    alt="Foto de Perfil"
                    // Se o usuário logado possuir uma foto, use-a; se não, use um placeholder
                    src={
                      loggedUser && loggedUser.foto
                        ? loggedUser.foto
                        : "https://via.placeholder.com/40"
                    }
                    sx={{ marginRight: 1 }}
                  />
                  <Typography variant="body1" sx={{ color: "white" }}>
                    {/* Se há usuário logado, exibe "Bem-vindo, [name]", senão "Usuário" */}
                    {loggedUser && loggedUser.name ? loggedUser.name : "Usuário"}
                  </Typography>
                </Box>
              </Toolbar>
            </AppBar>

            <Box sx={{ padding: "20px" }}>
              {/* Definição das rotas */}
              <Routes>
                <Route
                  path="/"
                  element={
                    <Typography variant="h5">
                      {loggedUser && loggedUser.name
                        ? `Bem-vindo ao Home, ${loggedUser.name}!`
                        : "Bem-vindo ao Home!"}
                    </Typography>
                  }
                />
                <Route path="/usuarios" element={<ListaUsuarios />} />
                <Route path="/cadastro" element={<Cadastro />} />
                {/* Passa a função 'setLoggedUser' para que o Login atualize o usuário logado */}
                <Route
                  path="/login"
                  element={<Login setLoggedUser={setLoggedUser} />}
                />
              </Routes>
            </Box>
          </Box>
        </Box>
      </Router>
    </UserProvider>
  );
}

export default App;
