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
import ProfileCard from "../components/ProfileCard";
import EditProfileDialog from "../components/EditProfileDialog";
import PaginationControls from "../components/PaginationControls";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { usePermission } from "../hooks/usePermission";

// helper para capitalizar
const capitalize = str =>
  str.charAt(0).toUpperCase() + str.slice(1);

function ListaPerfis() {
  // Estados para os dados e paginação
  const [dbProfiles, setDbProfiles] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 9;
  const [searchTerm, setSearchTerm] = useState("");

  // loading
  const [loadingProfiles, setLoadingProfiles] = useState(false);

  // Estados para diálogos
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedProfileId, setSelectedProfileId] = useState(null);

  const { pathname } = useLocation();
  const navigate = useNavigate();

  // extrai o último segmento ou "dashboard" se for raiz
  const segments = pathname.split("/").filter(Boolean);
  const currentSegment = segments.pop() || "dashboard";

  // Permissões
  const canCreateProfiles = usePermission("Cadastrar Perfil");
  const canAssociarPerfil = usePermission("Atualizar Usuário");
  const canEditProfiles = usePermission("Atualizar Perfil");
  const canDeleteProfiles = usePermission("Excluir Perfil");

  const title = capitalize(currentSegment);

  // Busca os perfis com loading e paginação
  useEffect(() => {
    const fetchProfiles = async () => {
      setLoadingProfiles(true);
      try {
        const response = await axios.get("http://localhost:8000/profiles/", {
          params: { page: currentPage + 1, limit: itemsPerPage, search: searchTerm },
        });
        console.log("Dados retornados da API (perfis):", response.data);
        if (response.data && Array.isArray(response.data.items)) {
          setDbProfiles(response.data.items);
          setTotalItems(response.data.total);
        } else {
          setDbProfiles([]);
          setTotalItems(0);
        }
      } catch (error) {
        console.error("Erro ao buscar perfis:", error);
        setDbProfiles([]);
        setTotalItems(0);
      } finally {
        setLoadingProfiles(false);
      }
    };

    fetchProfiles();
  }, [currentPage, itemsPerPage, searchTerm]);

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
    if (!selectedProfileId) return;
    try {
      await axios.delete(`http://localhost:8000/profiles/${selectedProfileId}`);
      setDbProfiles((prev) =>
        prev.filter((p) => p.id !== selectedProfileId)
      );
      handleCloseDeleteDialog();
    } catch (error) {
      console.error("Erro ao excluir perfil:", error);
    }
  };

  const formatDate = (dateString) =>
    dateString ? new Date(dateString).toLocaleDateString() : "N/A";

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  return (
    <Container maxWidth="md" style={{ padding: "20px" }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" component="h1">
          {title}
        </Typography>
        <Box display="flex" gap={2}>
          {canCreateProfiles && (
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate("/perfis/cadastroPerfil")}
            >
              Cadastrar Perfil
            </Button>
          )}
          {canAssociarPerfil && (
            <Button
              variant="contained"
              color="secondary"
              onClick={() => navigate("/perfis/associarPerfil")}
            >
              Associar Perfil aos Usuários
            </Button>
          )}
        </Box>
      </Box>

      <TextField
        fullWidth
        label="Pesquisar Perfil"
        variant="outlined"
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setCurrentPage(0);
        }}
        sx={{ mb: 2 }}
      />

      {loadingProfiles ? (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
          <CircularProgress />
        </Box>
      ) : dbProfiles.length === 0 ? (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
          <Typography variant="body1">
            {searchTerm
              ? "Nenhum perfil encontrado."
              : "Nenhum perfil cadastrado."}
          </Typography>
        </Box>
      ) : (
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
      {canDeleteProfiles && (
        <Dialog open={deleteDialogOpen} onClose={handleCloseDeleteDialog}>
          <DialogTitle>Confirmar Exclusão</DialogTitle>
          <DialogContent>
            <Typography>
              Tem certeza de que deseja excluir o perfil{" "}
              <strong>
                {dbProfiles.find((p) => p.id === selectedProfileId)?.type}
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
          profile={dbProfiles.find((p) => p.id === selectedProfileId)}
          setProfiles={setDbProfiles}
        />
      )}
    </Container>
  );
}

export default ListaPerfis;
