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
import Breadcrumb from "./components/Breadcrumb"; // Exibe o caminho da página

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

function App() {
  // Estados do aplicativo
  const [menuAberto, setMenuAberto] = useState(true);
  const [loggedUser, setLoggedUser] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // Normaliza o pathname removendo a barra final (se houver)
  const normalizedPath = location.pathname.replace(/\/$/, "");

  // Definindo as rotas públicas para o redirecionamento (usuário não autenticado pode acessar)
  // Essas rotas não exigem autenticação.
  const publicPaths = ["/login", "/cadastroUsuario"];
  const isPublicAuthPage = publicPaths.includes(normalizedPath);

  // Para exibir os menus, queremos escondê-los somente na página de login.
  const hideMenus = normalizedPath === "/login";

  // Larguras para o menu lateral (quando exibido)
  const drawerWidthExpanded = 200;
  const drawerWidthCollapsed = 0;

  // Cálculo do posicionamento e largura da área de conteúdo.
  // Se os menus estiverem exibidos, aplicamos um margin-left; caso contrário, 0.
  const mainMarginLeft =
    !hideMenus && menuAberto ? `${drawerWidthExpanded}px` : "0px";
  const appBarLeft =
    !hideMenus && menuAberto ? `${drawerWidthExpanded}px` : "0px";
  const appBarWidth =
    !hideMenus && menuAberto
      ? `calc(100% - ${drawerWidthExpanded}px)`
      : "100%";

  // Verifica se há um usuário logado; se não houver e a página não for pública,
  // redireciona para a página de login.
  useEffect(() => {
    const userFromStorage = localStorage.getItem("loggedUser");
    if (userFromStorage) {
      setLoggedUser(JSON.parse(userFromStorage));
    } else if (!isPublicAuthPage) {
      navigate("/login");
    }
  }, [navigate, normalizedPath, isPublicAuthPage]);

  // Função para alternar o menu lateral
  const alternarMenu = () => setMenuAberto(!menuAberto);

  // Funções para abrir/fechar o dropdown do menu
  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  // Função para logout
  const handleLogout = () => {
    setLoggedUser(null);
    localStorage.removeItem("loggedUser");
    setAnchorEl(null);
    navigate("/login");
  };

  // Funções para abrir/fechar o modal de edição do usuário
  const handleEditUser = () => {
    setEditDialogOpen(true);
  };

  const handleCloseEditDialog = () => {
    setEditDialogOpen(false);
  };

  return (
    <UserProvider>
      <Box sx={{ display: "flex", height: "100vh" }}>
        {/* Renderiza os menus se não estivermos na página de login */}
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

        {/* Área principal */}
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
            position: "relative", // Necessário para posicionar o Breadcrumb corretamente
          }}
        >
          {/* Exibe o Breadcrumb se não estivermos na página de login */}
          {!hideMenus && <Breadcrumb />}
          <MainRoutes loggedUser={loggedUser} setLoggedUser={setLoggedUser} />
        </Box>

        {/* Modal de edição do usuário */}
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
