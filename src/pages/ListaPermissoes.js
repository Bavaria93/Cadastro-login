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
import PermissionCard from "../components/PermissionCard";
import EditPermissionDialog from "../components/EditPermissionDialog";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function ListaPermissoes() {
  // Estado local para as permissões obtidas diretamente da API
  const [dbPermissions, setDbPermissions] = useState([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedPermissionId, setSelectedPermissionId] = useState(null);

  const navigate = useNavigate();

  // Busca as permissões salvas no banco via API
  useEffect(() => {
    const fetchPermissions = async () => {
      try {
        const response = await axios.get("http://localhost:8000/permissions/");
        console.log("Dados retornados da API:", response.data);
        setDbPermissions(response.data);
      } catch (error) {
        console.error("Erro ao buscar permissões:", error);
      }
    };

    fetchPermissions();
  }, []);

  const handleOpenEditDialog = (permissionId) => {
    setSelectedPermissionId(permissionId);
    setEditDialogOpen(true);
  };

  const handleCloseEditDialog = () => {
    setSelectedPermissionId(null);
    setEditDialogOpen(false);
  };

  const handleOpenDeleteDialog = (permission) => {
    setSelectedPermissionId(permission.id);
    setDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setSelectedPermissionId(null);
    setDeleteDialogOpen(false);
  };

  // Função para excluir a permissão no backend e atualizar a listagem
  const handleDeletePermission = async () => {
    if (selectedPermissionId) {
      try {
        await axios.delete(`http://localhost:8000/permissions/${selectedPermissionId}`);
        setDbPermissions((prevPermissions) =>
          prevPermissions.filter((permission) => permission.id !== selectedPermissionId)
        );
        handleCloseDeleteDialog();
      } catch (error) {
        console.error("Erro ao excluir permissão:", error);
      }
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <Container maxWidth="md" style={{ padding: "20px" }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" component="h1">
          Lista de Permissões
        </Typography>
        <Box display="flex" gap={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/cadastroPermissao")}
          >
            Cadastrar Permissão
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => navigate("/associarPermissao")}
          >
            Associar Permissão aos Perfis
          </Button>
        </Box>
      </Box>

      <Grid container spacing={3} justifyContent="center">
        {dbPermissions.map((permission) => (
          <Grid item key={permission.id} xs={12} sm={6} md={4}>
            <PermissionCard
              permission={permission}
              onEdit={() => handleOpenEditDialog(permission.id)}
              onDelete={() => handleOpenDeleteDialog(permission)}
              formatDate={formatDate}
            />
          </Grid>
        ))}
      </Grid>

      {/* Diálogo de Exclusão */}
      <Dialog open={deleteDialogOpen} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Confirmar Exclusão</DialogTitle>
        <DialogContent>
          <Typography>
            Tem certeza de que deseja excluir a permissão{" "}
            <strong>
              {dbPermissions.find((permission) => permission.id === selectedPermissionId)?.type}
            </strong>
            ?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleDeletePermission} color="secondary">
            Excluir
          </Button>
        </DialogActions>
      </Dialog>

      {/* Modal de Edição da Permissão */}
      <EditPermissionDialog
        open={editDialogOpen}
        onClose={handleCloseEditDialog}
        permission={dbPermissions.find((permission) => permission.id === selectedPermissionId)}
        setPermissions={setDbPermissions}
      />
    </Container>
  );
}

export default ListaPermissoes;
