// src/App.js
import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import {
  BrowserRouter as Router,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { UserProvider } from "./contexts/UserContext";
import VerticalMenu from "./components/VerticalMenu";
import HorizontalMenu from "./components/HorizontalMenu";
import MainRoutes from "./routes/MainRoutes";
import EditUserDialog from "./components/EditUserDialog";
import Breadcrumb from "./components/Breadcrumb";
import axios from "axios";

// Configura o interceptor do axios para enviar o token em todas as requisições
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

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
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const normalizedPath = location.pathname.replace(/\/$/, "");
  const publicPaths = ["/login", "/cadastroUsuario"];
  const isPublicAuthPage = publicPaths.includes(normalizedPath);
  const hideMenus = normalizedPath === "/login";
  const drawerWidthExpanded = 200;
  const drawerWidthCollapsed = 0;
  const mainMarginLeft =
    !hideMenus && menuAberto ? `${drawerWidthExpanded}px` : "0px";
  const appBarLeft =
    !hideMenus && menuAberto ? `${drawerWidthExpanded}px` : "0px";
  const appBarWidth =
    !hideMenus && menuAberto
      ? `calc(100% - ${drawerWidthExpanded}px)`
      : "100%";

  useEffect(() => {
    const userFromStorage = localStorage.getItem("loggedUser");
    if (userFromStorage) {
      setLoggedUser(JSON.parse(userFromStorage));
    } else if (!isPublicAuthPage) {
      navigate("/login");
    }
  }, [navigate, normalizedPath, isPublicAuthPage]);

  const alternarMenu = () => setMenuAberto(!menuAberto);
  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleLogout = () => {
    setLoggedUser(null);
    localStorage.removeItem("loggedUser");
    localStorage.removeItem("token");
    setAnchorEl(null);
    navigate("/login");
  };

  const handleEditUser = () => {
    setEditDialogOpen(true);
  };

  const handleCloseEditDialog = () => {
    setEditDialogOpen(false);
  };

  return (
    <UserProvider>
      <Box sx={{ display: "flex", height: "100vh" }}>
        {!hideMenus && (
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
              handleEditUser={handleEditUser}
            />
          </>
        )}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            marginLeft: hideMenus ? "0px" : mainMarginLeft,
            marginTop: hideMenus ? "0px" : "64px",
            transition: hideMenus
              ? "none"
              : "margin-left none, margin-top 0.3s",
            backgroundColor: "#ECF0F1",
            width: "100%",
            position: "relative",
          }}
        >
          {!hideMenus && <Breadcrumb />}
          <MainRoutes loggedUser={loggedUser} setLoggedUser={setLoggedUser} />
        </Box>
        {loggedUser && (
          <EditUserDialog
            open={editDialogOpen}
            onClose={handleCloseEditDialog}
            user={loggedUser}
            setLoggedUser={setLoggedUser}
          />
        )}
      </Box>
    </UserProvider>
  );
}

export default AppWrapper;
