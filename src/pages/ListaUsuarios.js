// src/components/ListaUsuarios.js
import React, { useContext, useState } from 'react';
import {
  Container,
  Card,
  CardContent,
  Grid,
  Typography,
  IconButton,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { UserContext } from '../contexts/UserContext';

function ListaUsuarios() {
  const { users, setUsers } = useContext(UserContext);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null); // Dados do usuário selecionado
  
  const handleOpenEditDialog = (user) => {
    setSelectedUser(user);
    setEditDialogOpen(true);
  };

  const handleCloseEditDialog = () => {
    setSelectedUser(null);
    setEditDialogOpen(false);
  };

  const handleUpdateUser = () => {
    if (selectedUser) {
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === selectedUser.id ? { ...selectedUser } : user
        )
      );
      handleCloseEditDialog();
    }
  };

  const handleOpenDeleteDialog = (user) => {
    setSelectedUser(user);
    setDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setSelectedUser(null);
    setDeleteDialogOpen(false);
  };

  const handleDeleteUser = () => {
    if (selectedUser) {
      setUsers((prevUsers) =>
        prevUsers.filter((user) => user.id !== selectedUser.id)
      );
      handleCloseDeleteDialog();
    }
  };

  // Função auxiliar para formatar datas
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString(); // Você pode personalizar o formato conforme necessário
  };

  return (
    <Container maxWidth="md" style={{ padding: '20px' }}>
      <Grid container spacing={3} justifyContent="center">
        {users.map((user) => (
          <Grid item key={user.id} xs={12} sm={6} md={4}>
            <Card
              style={{
                width: '100%',
                maxWidth: '300px',
                height: '300px',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                border: '1px solid #dee2e6',
                borderRadius: '10px',
              }}
            >
              <Box
                position="absolute"
                top="10px"
                right="10px"
                display="flex"
                gap="10px"
              >
                <IconButton
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpenEditDialog(user);
                  }}
                  style={{ borderRadius: '50%' }}
                >
                  <Edit />
                </IconButton>
                <IconButton
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpenDeleteDialog(user);
                  }}
                  style={{ borderRadius: '50%' }}
                >
                  <Delete />
                </IconButton>
              </Box>
              <CardContent
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  textAlign: 'left',
                  padding: '10px',
                  borderRadius: '5px',
                  width: '100%',
                  height: '200px',
                }}
              >
                <Typography variant="h5" style={{ fontWeight: 'bold', marginBottom: '10px' }}>
                  {user.name}
                </Typography>
                <Typography variant="body1" color="textSecondary" style={{ marginBottom: '5px' }}>
                  Email: {user.email}
                </Typography>
                <Typography variant="body2" color="textSecondary" style={{ marginBottom: '5px' }}>
                  Criado em: {formatDate(user.createdAt)}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Atualizado em: {formatDate(user.updatedAt)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Diálogo de Exclusão */}
      <Dialog open={deleteDialogOpen} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Confirmar Exclusão</DialogTitle>
        <DialogContent>
          <Typography>
            Tem certeza de que deseja excluir o usuário <strong>{selectedUser?.name}</strong>?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleDeleteUser} color="secondary">
            Excluir
          </Button>
        </DialogActions>
      </Dialog>

      {/* Diálogo de Edição */}
      <Dialog open={editDialogOpen} onClose={handleCloseEditDialog} maxWidth="md" fullWidth>
        <DialogTitle>Editar Usuário</DialogTitle>
        <DialogContent>
          <Box
            component="form"
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '15px',
              padding: '20px',
              borderRadius: '8px',
            }}
          >
            <TextField
              label="Nome"
              value={selectedUser?.name || ''}
              onChange={(e) => setSelectedUser({ ...selectedUser, name: e.target.value })}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Email"
              value={selectedUser?.email || ''}
              onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Senha"
              type="password"
              value={selectedUser?.senha || ''}
              onChange={(e) => setSelectedUser({ ...selectedUser, senha: e.target.value })}
              fullWidth
              margin="normal"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditDialog} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleUpdateUser} color="primary">
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default ListaUsuarios;
