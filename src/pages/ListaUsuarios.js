import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
} from "@mui/material";
import UserCard from "../components/UserCard";
import EditUserDialog from "../components/EditUserDialog";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function ListaUsuarios() {
  // Estado local exclusivo para os usuários vindos do backend
  const [dbUsers, setDbUsers] = useState([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const navigate = useNavigate();

  // Busca os usuários salvos no banco usando o endpoint "/users/"
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:8000/users/");
        console.log("Dados retornados da API:", response.data);
        setDbUsers(response.data);
      } catch (error) {
        console.error("Erro ao buscar usuários:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleOpenEditDialog = (userId) => {
    setSelectedUserId(userId);
    setEditDialogOpen(true);
  };

  const handleCloseEditDialog = () => {
    setSelectedUserId(null);
    setEditDialogOpen(false);
  };

  const handleOpenDeleteDialog = (user) => {
    setSelectedUserId(user.id);
    setDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setSelectedUserId(null);
    setDeleteDialogOpen(false);
  };

  // Função para excluir usuário no backend e atualizar a listagem
  const handleDeleteUser = async () => {
    if (selectedUserId) {
      try {
        await axios.delete(`http://localhost:8000/users/${selectedUserId}`);
        setDbUsers((prevUsers) =>
          prevUsers.filter((user) => user.id !== selectedUserId)
        );
        handleCloseDeleteDialog();
      } catch (error) {
        console.error("Erro ao excluir usuário:", error);
      }
    }
  };

  // Função para formatação da data, para exibição
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <Container maxWidth="md" style={{ padding: "20px" }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" component="h1">
          Lista de Usuários
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/cadastroUsuario")}
        >
          Cadastrar Usuário
        </Button>
      </Box>

      <Grid container spacing={3} justifyContent="center">
        {dbUsers.map((user) => (
          <Grid item key={user.id} xs={12} sm={6} md={4}>
            <UserCard
              user={user}
              onEdit={() => handleOpenEditDialog(user.id)}
              onDelete={() => handleOpenDeleteDialog(user)}
              formatDate={formatDate}
            />
          </Grid>
        ))}
      </Grid>

      {/* Diálogo para confirmação de exclusão */}
      <Dialog open={deleteDialogOpen} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Confirmar Exclusão</DialogTitle>
        <DialogContent>
          <Typography>
            Tem certeza de que deseja excluir o usuário{" "}
            <strong>
              {dbUsers.find((user) => user.id === selectedUserId)?.name}
            </strong>
            ?
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

      {/* Modal para edição do usuário */}
      <EditUserDialog
        open={editDialogOpen}
        onClose={handleCloseEditDialog}
        user={dbUsers.find((user) => user.id === selectedUserId)}
        setLoggedUser={(updatedUser) => {
          setDbUsers((prevUsers) =>
            prevUsers.map((user) =>
              user.id === updatedUser.id ? updatedUser : user
            )
          );
        }}
      />
    </Container>
  );
}

export default ListaUsuarios;
