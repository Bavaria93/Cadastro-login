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
import Breadcrumb from "./components/Breadcrumb"; // Novo: Exibe o caminho da página

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

function App() {
  // Estados para menu lateral, usuário logado, dropdown e modal de edição
  const [menuAberto, setMenuAberto] = useState(true);
  const [loggedUser, setLoggedUser] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // Determina se estamos na página de Login
  const isLoginPage =
    location.pathname === "/login" || location.pathname === "/login/";

  // Larguras definidas para o menu lateral quando aberto ou fechado
  const drawerWidthExpanded = 200;
  const drawerWidthCollapsed = 0;

  // Cálculo do posicionamento e largura da área de conteúdo
  const mainMarginLeft =
    !isLoginPage && menuAberto ? `${drawerWidthExpanded}px` : "0px";
  const appBarLeft =
    !isLoginPage && menuAberto ? `${drawerWidthExpanded}px` : "0px";
  const appBarWidth =
    !isLoginPage && menuAberto
      ? `calc(100% - ${drawerWidthExpanded}px)`
      : "100%";

  // Tenta recuperar o usuário logado pelo localStorage e redireciona para Login, se necessário
  useEffect(() => {
    const userFromStorage = localStorage.getItem("loggedUser");
    if (userFromStorage) {
      setLoggedUser(JSON.parse(userFromStorage));
    } else if (!isLoginPage) {
      navigate("/login");
    }
  }, [navigate, location.pathname, isLoginPage]);

  // Função que alterna o estado do menu lateral
  const alternarMenu = () => setMenuAberto(!menuAberto);

  // Funções para abrir/fechar o dropdown do menu
  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  // Função para logout
  const handleLogout = () => {
    setLoggedUser(null);
    localStorage.removeItem("loggedUser");
    handleMenuClose();
    navigate("/login");
  };

  // Ao clicar na opção "Editar Usuário" do dropdown, abrimos o modal de edição
  const handleEditUser = () => {
    setEditDialogOpen(true);
  };

  const handleCloseEditDialog = () => {
    setEditDialogOpen(false);
  };

  return (
    <UserProvider>
      <Box sx={{ display: "flex", height: "100vh" }}>
        {/* Renderiza os menus se não estiver na página de Login */}
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
              handleEditUser={handleEditUser}  // Passa a função para abrir o EditUserDialog
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
            transition: isLoginPage
              ? "none"
              : "margin-left 0.3s, margin-top 0.3s",
            backgroundColor: "#ECF0F1",
            width: "100%",
            position: "relative", // Necessário para posicionar Breadcrumb corretamente
          }}
        >
          {/* Exibe o caminho da página (exceto Login) */}
          {!isLoginPage && <Breadcrumb />}
          <MainRoutes loggedUser={loggedUser} setLoggedUser={setLoggedUser} />
        </Box>

        {/* Modal de edição do usuário (EditUserDialog) */}
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
