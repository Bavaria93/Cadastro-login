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
  CircularProgress,
} from "@mui/material";
import UserCard from "../components/UserCard";
import EditUserDialog from "../components/EditUserDialog";
import PaginationControls from "../components/PaginationControls";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { usePermission } from "../hooks/usePermission";

function ListaUsuarios() {
  // Estados para os dados vindos da API (apenas a página atual) e para paginar
  const [dbUsers, setDbUsers] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(0); // 0-indexado
  const itemsPerPage = 9;

  // loading
  const [loadingUsers, setLoadingUsers] = useState(false);

  // diálogos
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const navigate = useNavigate();

  // Permissões do usuário
  const canEditUsers = usePermission("Atualizar Usuário");
  const canDeleteUsers = usePermission("Excluir Usuário");
  const canCreateUsers = usePermission("Cadastrar Usuário");

  // Busca os usuários via backend para a página atual
  useEffect(() => {
    const fetchUsers = async () => {
      setLoadingUsers(true);
      try {
        const response = await axios.get("http://localhost:8000/users/", {
          params: {
            page: currentPage + 1,
            limit: itemsPerPage,
          },
        });
        console.log("Dados retornados da API:", response.data);
        // Espera-se o formato: { items: [...], total: total_de_registros }
        if (response.data && Array.isArray(response.data.items)) {
          setDbUsers(response.data.items);
          setTotalItems(response.data.total);
        } else {
          setDbUsers([]);
          setTotalItems(0);
        }
      } catch (error) {
        console.error("Erro ao buscar usuários:", error);
        setDbUsers([]);
        setTotalItems(0);
      } finally {
        setLoadingUsers(false);
      }
    };

    fetchUsers();
  }, [currentPage, itemsPerPage]);

  // Funções para abertura/fechamento dos diálogos
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

  // Função para excluir usuário via backend e atualizar o estado
  const handleDeleteUser = async () => {
    if (!selectedUserId) return;
    try {
      await axios.delete(`http://localhost:8000/users/${selectedUserId}`);
      setDbUsers((prev) =>
        prev.filter((user) => user.id !== selectedUserId)
      );
      handleCloseDeleteDialog();
    } catch (error) {
      console.error("Erro ao excluir usuário:", error);
    }
  };

  const formatDate = (dateString) =>
    dateString ? new Date(dateString).toLocaleDateString() : "N/A";

  // Atualiza a página atual quando o PaginationControls informa a mudança
  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  return (
    <Container maxWidth="md" style={{ padding: "20px" }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" component="h1">
          Lista de Usuários
        </Typography>
        {canCreateUsers && (
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/cadastroUsuario")}
          >
            Cadastrar Usuário
          </Button>
        )}
      </Box>

      {loadingUsers ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="200px"
        >
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={3} justifyContent="center">
          {dbUsers.map((user) => (
            <Grid item key={user.id} xs={12} sm={6} md={4}>
              <UserCard
                user={user}
                onEdit={canEditUsers ? () => handleOpenEditDialog(user.id) : null}
              onDelete={canDeleteUsers ? () => handleOpenDeleteDialog(user) : null}
                formatDate={formatDate}
              />
            </Grid>
          ))}
        </Grid>
      )}

      {/* Controles de Paginação */}
      <Box mt={3}>
        <PaginationControls
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={handlePageChange}
          lazyLoad={false}
        />
      </Box>

      {/* Diálogo de Exclusão */}
      {canDeleteUsers && (
        <Dialog open={deleteDialogOpen} onClose={handleCloseDeleteDialog}>
          <DialogTitle>Confirmar Exclusão</DialogTitle>
          <DialogContent>
            <Typography>
              Tem certeza de que deseja excluir o usuário{" "}
              <strong>
                {dbUsers.find((u) => u.id === selectedUserId)?.name}
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
      )}

      {/* Modal de Edição */}
      {canEditUsers && (
        <EditUserDialog
          open={editDialogOpen}
          onClose={handleCloseEditDialog}
          user={dbUsers.find((u) => u.id === selectedUserId)}
          setLoggedUser={(updated) =>
            setDbUsers((prev) =>
              prev.map((u) => (u.id === updated.id ? updated : u))
            )
          }
        />
      )}
    </Container>
  );
}

export default ListaUsuarios;
