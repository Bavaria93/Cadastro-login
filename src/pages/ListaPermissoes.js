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
  TextField,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { usePermission } from "../hooks/usePermission";
import PermissionCard from "../components/PermissionCard";
import EditPermissionDialog from "../components/EditPermissionDialog";
import PaginationControls from "../components/PaginationControls";

function ListaPermissoes() {
  // Estado para os dados retornados do backend (apenas a página atual)
  const [dbPermissions, setDbPermissions] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 9;
  const [searchTerm, setSearchTerm] = useState("");

  // loading
  const [loadingPermissions, setLoadingPermissions] = useState(false);

  // Estados para dialogs
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedPermissionId, setSelectedPermissionId] = useState(null);

  const navigate = useNavigate();

  // Permissões do usuário para ações na tela
  const canCreatePermissions = usePermission("Cadastrar Permissão");
  const canAssociatePermissions = usePermission("Atualizar Perfil");
  const canEditPermissions = usePermission("Atualizar Permissão");
  const canDeletePermissions = usePermission("Excluir Permissão");

  // Busca os dados do backend para a página atual
  useEffect(() => {
    const fetchPermissions = async () => {
      setLoadingPermissions(true);
      try {
        const response = await axios.get("http://localhost:8000/permissions/", {
          params: {
            page: currentPage + 1,
            limit: itemsPerPage,
            search: searchTerm,
          },
        });
        console.log("Dados retornados da API (permissões):", response.data);
        if (response.data && Array.isArray(response.data.items)) {
          setDbPermissions(response.data.items);
          setTotalItems(response.data.total);
        } else {
          setDbPermissions([]);
          setTotalItems(0);
        }
      } catch (error) {
        console.error("Erro ao buscar permissões:", error);
        setDbPermissions([]);
        setTotalItems(0);
      } finally {
        setLoadingPermissions(false);
      }
    };

    fetchPermissions();
  }, [currentPage, itemsPerPage, searchTerm]);

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

  const handleDeletePermission = async () => {
    if (!selectedPermissionId) return;
    try {
      await axios.delete(
        `http://localhost:8000/permissions/${selectedPermissionId}`
      );
      setDbPermissions((prevPermissions) =>
        prevPermissions.filter(
          (permission) => permission.id !== selectedPermissionId
        )
      );
      handleCloseDeleteDialog();
    } catch (error) {
      console.error("Erro ao excluir permissão:", error);
    }
  };

  const formatDate = (dateString) =>
    dateString ? new Date(dateString).toLocaleDateString() : "N/A";

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  return (
    <Container maxWidth="md" sx={{ p: 2 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Lista de Permissões</Typography>
        <Box display="flex" gap={2}>
          {canCreatePermissions && (
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate("/cadastroPermissao")}
            >
              Cadastrar Permissão
            </Button>
          )}
          {canAssociatePermissions && (
            <Button
              variant="contained"
              color="secondary"
              onClick={() => navigate("/associarPermissao")}
            >
              Associar Permissão aos Perfis
            </Button>
          )}
        </Box>
      </Box>

      <TextField
        fullWidth
        label="Pesquisar Permissão"
        variant="outlined"
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setCurrentPage(0);
        }}
        sx={{ mb: 2 }}
      />

      {loadingPermissions ? (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
          <CircularProgress />
        </Box>
      ) : dbPermissions.length === 0 ? (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
          <Typography variant="body1">
            Nenhuma permissão cadastrada.
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={3} justifyContent="center">
          {dbPermissions.map((permission) => (
            <Grid item key={permission.id} xs={12} sm={6} md={4}>
              <PermissionCard
                permission={permission}
                onEdit={
                  canEditPermissions
                    ? () => handleOpenEditDialog(permission.id)
                    : null
                }
                onDelete={
                  canDeletePermissions
                    ? () => handleOpenDeleteDialog(permission)
                    : null
                }
                formatDate={formatDate}
              />
            </Grid>
          ))}
        </Grid>
      )}

      <Box mt={3}>
        <PaginationControls
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={handlePageChange}
          lazyLoad={false}
        />
      </Box>

      {canDeletePermissions && (
        <Dialog open={deleteDialogOpen} onClose={handleCloseDeleteDialog}>
          <DialogTitle>Confirmar Exclusão</DialogTitle>
          <DialogContent>
            <Typography>
              Tem certeza de que deseja excluir a permissão{" "}
              <strong>
                {
                  dbPermissions.find((p) => p.id === selectedPermissionId)
                    ?.type
                }
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
      )}

      {canEditPermissions && (
        <EditPermissionDialog
          open={editDialogOpen}
          onClose={handleCloseEditDialog}
          permission={dbPermissions.find((p) => p.id === selectedPermissionId)}
          setPermissions={setDbPermissions}
        />
      )}
    </Container>
  );
}

export default ListaPermissoes;
