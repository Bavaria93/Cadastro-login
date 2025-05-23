// src/App.js
import React, { useState, useEffect, useCallback } from "react";
import { Box, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@mui/material";
import { BrowserRouter as Router, useNavigate, useLocation } from "react-router-dom";
import { UserProvider } from "./contexts/UserContext";
import VerticalMenu from "./components/VerticalMenu";
import HorizontalMenu from "./components/HorizontalMenu";
import MainRoutes from "./routes/MainRoutes";
import EditUserDialog from "./components/EditUserDialog";
import Breadcrumb from "./components/Breadcrumb";
import axios from "axios";
import { jwtDecode } from "jwt-decode"; // Importação nomeada conforme a biblioteca

// Interceptor de requisição: adiciona o token a cada requisição
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

// Interceptor de resposta: se o backend retornar 401, remove os dados e redireciona para o login
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.log("Erro interceptado:", error.response.status, error.response.data);
      if (error.response.status === 401) {
        console.log("Token expirado ou inválido, efetuando logout...");
        localStorage.removeItem("token");
        localStorage.removeItem("loggedUser");
        window.location.href = "/login";
      }
    } else {
      console.log("Erro sem resposta do servidor:", error);
    }
    return Promise.reject(error);
  }
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
  // Novo estado para controlar a exibição do diálogo de sessão expirada
  const [sessionExpired, setSessionExpired] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const normalizedPath = location.pathname.replace(/\/$/, "");
  const publicPaths = ["/login", "/cadastroUsuario"];
  const isPublicAuthPage = publicPaths.includes(normalizedPath);
  const hideMenus = normalizedPath === "/login";
  const drawerWidthExpanded = 200;
  const drawerWidthCollapsed = 0;
  const mainMarginLeft = !hideMenus && menuAberto ? `${drawerWidthExpanded}px` : "0px";
  const appBarLeft = !hideMenus && menuAberto ? `${drawerWidthExpanded}px` : "0px";
  const appBarWidth = !hideMenus && menuAberto ? `calc(100% - ${drawerWidthExpanded}px)` : "100%";

  // useCallback para garantir que handleLogout seja estável e evitar advertências de dependências
  const handleLogout = useCallback(() => {
    setLoggedUser(null);
    localStorage.removeItem("loggedUser");
    localStorage.removeItem("token");
    setAnchorEl(null);
    navigate("/login");
  }, [navigate]);

  // Efeito para verificar a expiração do token localmente e exibir o diálogo
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        // O claim 'exp' normalmente está em segundos, converta para milissegundos
        const expTime = decoded.exp * 1000;
        const timeRemaining = expTime - Date.now();
        console.log(`Tempo restante do token (ms): ${timeRemaining}`);
        if (timeRemaining <= 0) {
          console.log("Token já expirado. Exibindo diálogo de sessão expirada.");
          setSessionExpired(true);
        } else {
          const timeoutId = setTimeout(() => {
            console.log("Token expirou. Exibindo diálogo de sessão expirada.");
            setSessionExpired(true);
          }, timeRemaining);
          return () => clearTimeout(timeoutId);
        }
      } catch (error) {
        console.error("Erro ao decodificar o token:", error);
        setSessionExpired(true);
      }
    }
  }, [handleLogout]);

  // Efeito para restaurar o usuário logado a partir do localStorage
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
  const handleEditUser = () => setEditDialogOpen(true);
  const handleCloseEditDialog = () => setEditDialogOpen(false);

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
            transition: hideMenus ? "none" : "margin-left none, margin-top 0.3s",
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
        {/* Diálogo de sessão expirada */}
        <Dialog
          open={sessionExpired}
          disableEscapeKeyDown
          aria-labelledby="session-expired-dialog-title"
          aria-describedby="session-expired-dialog-description"
        >
          <DialogTitle id="session-expired-dialog-title">Acesso Expirado</DialogTitle>
          <DialogContent>
            <DialogContentText id="session-expired-dialog-description">
              Acesso ao portal expirado. É necessário fazer o Login na aplicação novamente!
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                setSessionExpired(false);
                handleLogout();
              }}
              color="primary"
              autoFocus
            >
              Fechar
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </UserProvider>
  );
}

export default AppWrapper;
