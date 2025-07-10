// src/App.js
import React, { useState, useEffect, useCallback, useContext } from 'react';
import { Box, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';
import { BrowserRouter as Router, useNavigate, useLocation } from 'react-router-dom';
import { AuthProvider, AuthContext } from './contexts/AuthContext';
import { UserProvider } from "./contexts/UserContext";
import VerticalMenu from './components/VerticalMenu/VerticalMenu';
import HorizontalMenu from './components/HorizontalMenu/HorizontalMenu';
import MainRoutes from './routes/MainRoutes';
import EditUserDialog from './components/EditUserDialog';
import Breadcrumb from './components/Breadcrumb';
import axios from 'axios';
import { jwtDecode } from "jwt-decode";
import ErrorBoundary from "./components/ErrorBoundary";      // ← import do ErrorBoundary

// Configuração de interceptors do axios permanece igual...
axios.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) config.headers['Authorization'] = `Bearer ${token}`;
    return config;
  },
  error => Promise.reject(error)
);
axios.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('loggedUser');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

function AppWrapper() {
  return (
    <Router>
      <AuthProvider>
        <UserProvider>
          <App />
        </UserProvider>
      </AuthProvider>
    </Router>
  );
}

function App() {
  const [menuAberto, setMenuAberto] = useState(true);
  const { user, signOut } = useContext(AuthContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [sessionExpired, setSessionExpired] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const normalizedPath = location.pathname.replace(/\/$/, '');
  const hideMenus = normalizedPath === '/login';
  const drawerWidthExpanded = 200;
  const drawerWidthCollapsed = 0;

  // Configurações do grid: menu ocupa primeira coluna, header e main segunda coluna
  const gridTemplateColumns = hideMenus
    ? '1fr'
    : `${menuAberto ? drawerWidthExpanded : drawerWidthCollapsed}px auto`;
  const gridTemplateRows = hideMenus ? '1fr' : '64px auto';
  const gridTemplateAreas = hideMenus
    ? `"main"`
    : `"menu header"
       "menu main"`;

  const handleLogout = useCallback(() => {
    signOut();
    setAnchorEl(null);
    navigate('/login');
  }, [navigate, signOut]);

  // Verifica expiração do token e abre diálogo quando expirar
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const decoded = jwtDecode(token);
      const expTime = decoded.exp * 1000;
      const timeRemaining = expTime - Date.now();

      // converte milissegundos em minutos
      const minutesRemaining = timeRemaining / (1000 * 60);
      console.log(
        `Tempo restante do token (min): ${minutesRemaining.toFixed(2)}`
      );

      if (timeRemaining <= 0) {
        console.log('Token já expirado. Exibindo diálogo.');
        setSessionExpired(true);
      } else {
        const timeoutId = setTimeout(() => {
          console.log('Token expirou. Exibindo diálogo.');
          setSessionExpired(true);
        }, timeRemaining);
        return () => clearTimeout(timeoutId);
      }
    } catch (error) {
      console.error('Erro ao decodificar o token:', error);
      setSessionExpired(true);
    }
  }, [handleLogout]);


  return (
    <Box
      sx={{
        display: 'grid',
        height: '100vh',
        gridTemplateColumns,
        gridTemplateRows,
        gridTemplateAreas,
        transition: theme =>
          theme.transitions.create('grid-template-columns', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.standard
          })
      }}
    >
      {!hideMenus && (
        <Box sx={{ gridArea: 'menu' }}>
          <VerticalMenu
            menuAberto={menuAberto}
            drawerWidthExpanded={drawerWidthExpanded}
            drawerWidthCollapsed={drawerWidthCollapsed}
          />
        </Box>
      )}

      {!hideMenus && (
        <Box sx={{ gridArea: 'header' }}>
          <HorizontalMenu
            menuAberto={menuAberto}
            alternarMenu={() => setMenuAberto(v => !v)}
            handleMenuOpen={(event) => setAnchorEl(event.currentTarget)}
            anchorEl={anchorEl}
            handleMenuClose={() => setAnchorEl(null)}
            handleLogout={handleLogout}
            handleEditUser={() => setEditDialogOpen(true)}
          />
        </Box>
      )}

      <Box
        component="main"
        sx={{
          gridArea: 'main',
          p: 3,
          bgcolor: '#ECF0F1',
          overflow: 'auto'
        }}
      >
        {!hideMenus && <Breadcrumb />}
        <ErrorBoundary key={location.pathname}>
          <MainRoutes />
        </ErrorBoundary>
      </Box>

      {user && (
        <EditUserDialog
          open={editDialogOpen}
          onClose={() => setEditDialogOpen(false)}
          user={user}
        />
      )}

      <Dialog
        open={sessionExpired}
        disableEscapeKeyDown
        aria-labelledby="session-expired-dialog-title"
        aria-describedby="session-expired-dialog-description"
      >
        <DialogTitle id="session-expired-dialog-title">Acesso Expirado</DialogTitle>
        <DialogContent>
          <DialogContentText id="session-expired-dialog-description">
            Acesso ao portal expirado. É necessário fazer o Login novamente.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setSessionExpired(false);
              handleLogout();
            }}
            autoFocus
          >
            Fechar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default AppWrapper;
