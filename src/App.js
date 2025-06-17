import React, { useState, useEffect, useCallback, useContext } from 'react';
import { Box, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';
import { BrowserRouter as Router, useNavigate, useLocation } from 'react-router-dom';
import { AuthProvider, AuthContext } from './contexts/AuthContext';
import { UserProvider } from "./contexts/UserContext";
import VerticalMenu from './components/VerticalMenu';
import HorizontalMenu from './components/HorizontalMenu';
import MainRoutes from './routes/MainRoutes';
import EditUserDialog from './components/EditUserDialog';
import Breadcrumb from './components/Breadcrumb';
import axios from 'axios';
import { jwtDecode } from "jwt-decode";

// Configuração de interceptors do axios permanece igual...
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.log('Erro interceptado:', error.response.status, error.response.data);
      if (error.response.status === 401) {
        console.log('Token expirado ou inválido, efetuando logout...');
        localStorage.removeItem('token');
        localStorage.removeItem('loggedUser');
        window.location.href = '/login';
      }
    } else {
      console.log('Erro sem resposta do servidor:', error);
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
  const mainMarginLeft = !hideMenus && menuAberto ? `${drawerWidthExpanded}px` : '0px';
  const appBarLeft = !hideMenus && menuAberto ? `${drawerWidthExpanded}px` : '0px';
  const appBarWidth = !hideMenus && menuAberto ? `calc(100% - ${drawerWidthExpanded}px)` : '100%';

  const handleLogout = useCallback(() => {
    signOut();
    setAnchorEl(null);
    navigate('/login');
  }, [navigate, signOut]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const expTime = decoded.exp * 1000;
        const timeRemaining = expTime - Date.now();
        console.log(`Tempo restante do token (ms): ${timeRemaining}`);
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
    }
  }, [handleLogout]);

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
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
            alternarMenu={() => setMenuAberto(!menuAberto)}
            handleMenuOpen={(event) => setAnchorEl(event.currentTarget)}
            anchorEl={anchorEl}
            handleMenuClose={() => setAnchorEl(null)}
            handleLogout={handleLogout}
            handleEditUser={() => setEditDialogOpen(true)}
          />
        </>
      )}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          marginLeft: hideMenus ? '0px' : mainMarginLeft,
          marginTop: hideMenus ? '0px' : '64px',
          transition: hideMenus ? 'none' : 'margin-left none, margin-top 0.3s',
          backgroundColor: '#ECF0F1',
          width: '100%',
          position: 'relative',
        }}
      >
        {!hideMenus && <Breadcrumb />}
        <MainRoutes />
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
            color="primary"
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
