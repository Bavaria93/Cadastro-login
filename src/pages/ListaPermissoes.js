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
import PaginationControls from "../components/PaginationControls";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { usePermission } from "../hooks/usePermission";

function ListaPermissoes() {
  // Estado para os dados retornados do backend (apenas a página atual)
  const [dbPermissions, setDbPermissions] = useState([]);
  // Estado para o total de itens disponível (usado para paginar)
  const [totalItems, setTotalItems] = useState(0);
  // Estados para dialogs
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedPermissionId, setSelectedPermissionId] = useState(null);
  // Estado para a página atual (usaremos 0-indexado internamente)
  const [currentPage, setCurrentPage] = useState(0);

  const navigate = useNavigate();

  // Permissões do usuário para ações na tela
  const canCreatePermissions = usePermission("Cadastrar Permissão");
  const canAssociatePermissions = usePermission("Atualizar Perfil");
  const canEditPermissions = usePermission("Atualizar Permissão");
  const canDeletePermissions = usePermission("Excluir Permissão");

  const itemsPerPage = 9;
  
  // Busca os dados do backend para a página atual
  useEffect(() => {
    const fetchPermissions = async () => {
      try {
        // Aqui enviamos "page" como currentPage+1,
        // assumindo que o backend espera páginas 1-indexadas.
        const response = await axios.get("http://localhost:8000/permissions/", {
          params: {
            page: currentPage + 1,
            limit: itemsPerPage,
          },
        });
        // Verifique se o backend retorna { items: [...], total: number }
        console.log("Dados retornados da API:", response.data);
        if (response.data && Array.isArray(response.data.items)) {
          setDbPermissions(response.data.items);
          setTotalItems(response.data.total);
        } else {
          // Caso o formato seja diferente ou esteja vazio
          setDbPermissions([]);
          setTotalItems(0);
        }
      } catch (error) {
        console.error("Erro ao buscar permissões:", error);
        setDbPermissions([]);
        setTotalItems(0);
      }
    };

    fetchPermissions();
  }, [currentPage, itemsPerPage]);

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

  // Função para excluir a permissão no backend
  const handleDeletePermission = async () => {
    if (selectedPermissionId) {
      try {
        await axios.delete(`http://localhost:8000/permissions/${selectedPermissionId}`);
        // Opcional: refazer a busca para atualizar a listagem ou atualizar o estado local
        // (aqui, fazemos uma atualização local, removendo o item)
        setDbPermissions((prevPermissions) =>
          prevPermissions.filter(
            (permission) => permission.id !== selectedPermissionId
          )
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

  // Recebe a mudança de página do PaginationControls (que provavelmente manda um índice 0-indexado)
  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  return (
    <Container maxWidth="md" style={{ padding: "20px" }}>
      <Box 
        display="flex" 
        justifyContent="space-between" 
        alignItems="center" 
        mb={3}
      >
        <Typography variant="h4" component="h1">
          Lista de Permissões
        </Typography>
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

      {/* Controles de Paginação */}
      <Box mt={3}>
        <PaginationControls
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
          lazyLoad={false}
        />
      </Box>

      {/* Diálogo de Exclusão (apenas se tiver permissão) */}
      {canDeletePermissions && (
        <Dialog open={deleteDialogOpen} onClose={handleCloseDeleteDialog}>
          <DialogTitle>Confirmar Exclusão</DialogTitle>
          <DialogContent>
            <Typography>
              Tem certeza de que deseja excluir a permissão{" "}
              <strong>
                {dbPermissions.find(
                  (permission) => permission.id === selectedPermissionId
                )?.type}
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

      {/* Modal de Edição (apenas se tiver permissão) */}
      {canEditPermissions && (
        <EditPermissionDialog
          open={editDialogOpen}
          onClose={handleCloseEditDialog}
          permission={dbPermissions.find(
            (permission) => permission.id === selectedPermissionId
          )}
          setPermissions={setDbPermissions}
        />
      )}
    </Container>
  );
}

export default ListaPermissoes;
