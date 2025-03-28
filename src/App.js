import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";
import Cadastro from "./components/Cadastro";
import ListaUsuarios from "./components/ListaUsuarios";
import Login from "./components/Login";
import { UserProvider } from "./contexts/UserContext";
import VerticalMenu from "./components/VerticalMenu";
import HorizontalMenu from "./components/HorizontalMenu";

// Este componente encapsula o App dentro do Router.
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
  const location = useLocation();

  // Verifica se estamos na página de Login
  const isLoginPage =
    location.pathname === "/login" || location.pathname === "/login/";

  // Larguras para o menu vertical quando expandido ou recolhido
  const drawerWidthExpanded = 200;
  const drawerWidthCollapsed = 0; // Não reserva espaço quando recolhido

  // Calcula os deslocamentos da área principal e da AppBar
  const mainMarginLeft = !isLoginPage && menuAberto ? `${drawerWidthExpanded}px` : "0px";
  const appBarLeft = !isLoginPage && menuAberto ? `${drawerWidthExpanded}px` : "0px";
  const appBarWidth =
    !isLoginPage && menuAberto
      ? `calc(100% - ${drawerWidthExpanded}px)`
      : "100%";

  // Recupera o usuário logado do localStorage ao carregar a aplicação
  useEffect(() => {
    const userFromStorage = localStorage.getItem("loggedUser");
    if (userFromStorage) {
      setLoggedUser(JSON.parse(userFromStorage));
    } else if (!isLoginPage) {
      navigate("/login");
    }
  }, [navigate, location.pathname, isLoginPage]);

  const alternarMenu = () => setMenuAberto(!menuAberto);
  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);
  const handleLogout = () => {
    setLoggedUser(null);
    localStorage.removeItem("loggedUser");
    handleMenuClose();
    navigate("/login");
  };

  return (
    <UserProvider>
      <Box sx={{ display: "flex", height: "100vh" }}>
        {/* Renderiza os menus somente se não estivermos na página de Login */}
        {!isLoginPage && (
          <>
            <VerticalMenu
              menuAberto={menuAberto}
              drawerWidthExpanded={drawerWidthExpanded}
              drawerWidthCollapsed={drawerWidthCollapsed}
            />
            <HorizontalMenu
              menuAberto={menuAberto}
              appBarLeft={appBarLeft}
              appBarWidth={appBarWidth}
              alternarMenu={alternarMenu}
              handleMenuOpen={handleMenuOpen}
              anchorEl={anchorEl}
              loggedUser={loggedUser}
              handleMenuClose={handleMenuClose}
              handleLogout={handleLogout}
            />
          </>
        )}

        {/* Área principal */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            marginLeft: isLoginPage ? "0px" : mainMarginLeft,
            marginTop: isLoginPage ? "0px" : "64px",
            transition: isLoginPage ? "none" : "margin-left 0.3s, margin-top 0.3s",
            backgroundColor: "#ECF0F1",
            width: "100%",
          }}
        >
          <Box sx={{ padding: "20px" }}>
            <Routes>
              <Route
                path="/"
                element={
                  <Typography variant="h5" sx={{ transition: "none" }}>
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
