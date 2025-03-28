// src/App.js
import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import {
  BrowserRouter as Router,
  useNavigate,
  useLocation,
} from "react-router-dom";
import MainRoutes from "./routes/MainRoutes";
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
        {/* Renderiza os menus somente se NÃO estivermos na página de Login */}
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
            // Aqui você pode manter ou remover transições de layout conforme necessário
            transition: "none",
            backgroundColor: "#ECF0F1",
            width: "100%",
          }}
        >
          <MainRoutes loggedUser={loggedUser} setLoggedUser={setLoggedUser} />
        </Box>
      </Box>
    </UserProvider>
  );
}

export default AppWrapper;
