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
import ProfileCard from "../components/ProfileCard";
import EditProfileDialog from "../components/EditProfileDialog";
import PaginationControls from "../components/PaginationControls";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { usePermission } from "../hooks/usePermission";

function ListaPerfis() {
  // Estados para os dados e paginação
  const [dbProfiles, setDbProfiles] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(0); // 0-indexado
  const itemsPerPage = 9;

  // Estados para diálogos
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedProfileId, setSelectedProfileId] = useState(null);

  const navigate = useNavigate();

  // Permissões
  const canCreateProfiles = usePermission("Cadastrar Perfil");
  const canAssociarPerfil = usePermission("Atualizar Usuário");
  const canEditProfiles = usePermission("Atualizar Perfil");
  const canDeleteProfiles = usePermission("Excluir Perfil");

  // Busca os perfis para a página atual – endpoint deve retornar { items: [...], total: X }
  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        // Se o backend espera a página como 1-indexada, enviamos currentPage+1
        const response = await axios.get("http://localhost:8000/profiles/", {
          params: { page: currentPage + 1, limit: itemsPerPage },
        });
        console.log("Dados retornados da API:", response.data);
        if (response.data && Array.isArray(response.data.items)) {
          setDbProfiles(response.data.items);
          setTotalItems(response.data.total);
        } else {
          setDbProfiles([]);
          setTotalItems(0);
        }
      } catch (error) {
        console.error("Erro ao buscar perfis:", error);
      }
    };

    fetchProfiles();
  }, [currentPage, itemsPerPage]);

  const handleOpenEditDialog = (profileId) => {
    setSelectedProfileId(profileId);
    setEditDialogOpen(true);
  };

  const handleCloseEditDialog = () => {
    setSelectedProfileId(null);
    setEditDialogOpen(false);
  };

  const handleOpenDeleteDialog = (profile) => {
    setSelectedProfileId(profile.id);
    setDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setSelectedProfileId(null);
    setDeleteDialogOpen(false);
  };

  // Função para excluir o perfil no backend e atualizar a listagem
  const handleDeleteProfile = async () => {
    if (selectedProfileId) {
      try {
        await axios.delete(`http://localhost:8000/profiles/${selectedProfileId}`);
        // Atualiza o estado removendo o perfil excluído
        setDbProfiles((prevProfiles) =>
          prevProfiles.filter((profile) => profile.id !== selectedProfileId)
        );
        handleCloseDeleteDialog();
      } catch (error) {
        console.error("Erro ao excluir perfil:", error);
      }
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  // Atualiza a página atual conforme o controle de paginação
  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  return (
    <Container maxWidth="md" style={{ padding: "20px" }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" component="h1">
          Lista de Perfis
        </Typography>
        <Box display="flex" gap={2}>
          {canCreateProfiles && (
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate("/cadastroPerfil")}
            >
              Cadastrar Perfil
            </Button>
          )}
          {canAssociarPerfil && (
            <Button
              variant="contained"
              color="secondary"
              onClick={() => navigate("/associarPerfil")}
            >
              Associar Perfil aos Usuários
            </Button>
          )}
        </Box>
      </Box>

      <Grid container spacing={3} justifyContent="center">
        {dbProfiles.map((profile) => (
          <Grid item key={profile.id} xs={12} sm={6} md={4}>
            <ProfileCard
              profile={profile}
              onEdit={canEditProfiles ? () => handleOpenEditDialog(profile.id) : null}
              onDelete={canDeleteProfiles ? () => handleOpenDeleteDialog(profile) : null}
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

      {/* Diálogo de Exclusão */}
      {canDeleteProfiles && (
        <Dialog open={deleteDialogOpen} onClose={handleCloseDeleteDialog}>
          <DialogTitle>Confirmar Exclusão</DialogTitle>
          <DialogContent>
            <Typography>
              Tem certeza de que deseja excluir o perfil{" "}
              <strong>
                {dbProfiles.find((profile) => profile.id === selectedProfileId)?.type}
              </strong>
              ?
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDeleteDialog} color="primary">
              Cancelar
            </Button>
            <Button onClick={handleDeleteProfile} color="secondary">
              Excluir
            </Button>
          </DialogActions>
        </Dialog>
      )}

      {/* Modal de Edição */}
      {canEditProfiles && (
        <EditProfileDialog
          open={editDialogOpen}
          onClose={handleCloseEditDialog}
          profile={dbProfiles.find((profile) => profile.id === selectedProfileId)}
          setProfiles={setDbProfiles}
        />
      )}
    </Container>
  );
}

export default ListaPerfis;
