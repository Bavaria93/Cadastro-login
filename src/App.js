import React, { useState, useEffect } from "react";
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
  Menu,
  MenuItem,
} from "@mui/material";
import { Menu as MenuIcon, Search as SearchIcon } from "@mui/icons-material";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useLocation } from "react-router-dom";
import Cadastro from "./components/Cadastro";
import ListaUsuarios from "./components/ListaUsuarios";
import Login from "./components/Login";
import { UserProvider } from "./contexts/UserContext";

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

function App() {
  const [menuAberto, setMenuAberto] = useState(true);
  const [loggedUser, setLoggedUser] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const location = useLocation(); // Obtém a rota atual

  // Recuperar o usuário logado do localStorage ao carregar o sistema
  useEffect(() => {
    const userFromStorage = localStorage.getItem("loggedUser");
    if (userFromStorage) {
      setLoggedUser(JSON.parse(userFromStorage)); // Atualiza o estado com o usuário salvo
    } else if (location.pathname !== "/login") {
      // Apenas redireciona para login se o usuário não estiver logado
      navigate("/login");
    }
  }, [navigate, location.pathname]);

  const alternarMenu = () => {
    setMenuAberto(!menuAberto);
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    setLoggedUser(null);
    localStorage.removeItem("loggedUser");
    handleMenuClose();
    navigate("/login");
  };

  return (
    <UserProvider>
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
              <Link to="/usuarios" style={{ textDecoration: "none", color: "white" }}>
                <ListItemText primary="Lista de Usuários" />
              </Link>
            </ListItem>
            <ListItem button>
              <Link to="/cadastro" style={{ textDecoration: "none", color: "white" }}>
                <ListItemText primary="Cadastro de Usuário" />
              </Link>
            </ListItem>
            <ListItem button>
              <Link to="/login" style={{ textDecoration: "none", color: "white" }}>
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
                sx={{
                  mt: 1.5, // Margem adicional para posicionar abaixo do AppBar
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

          <Box sx={{ padding: "20px" }}>
            {/* Rotas */}
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
              <Route
                path="/login"
                element={
                  <Login
                    setLoggedUser={(user) => {
                      setLoggedUser(user);
                      localStorage.setItem("loggedUser", JSON.stringify(user));
                    }}
                  />
                }
              />
            </Routes>
          </Box>
        </Box>
      </Box>
    </UserProvider>
  );
}

export default AppWrapper;
