import React, { useContext, useState, useEffect } from "react";
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
import { UserContext } from "../contexts/UserContext"; // Se possuir um contexto exclusivo para perfis, renomeie-o
import ProfileCard from "../components/ProfileCard"; // Componente para exibir perfis
import EditProfileDialog from "../components/EditProfileDialog"; // Novo diálogo específico para perfis
import { useNavigate } from "react-router-dom";
import axios from "axios";

function ListaPerfis() {
  const { profiles, setProfiles } = useContext(UserContext);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedProfileId, setSelectedProfileId] = useState(null);

  const navigate = useNavigate();

  // Busca os perfis do backend ao montar o componente
  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await axios.get("http://localhost:8000/perfis/");
        setProfiles(response.data);
      } catch (error) {
        console.error("Erro ao buscar perfis:", error);
      }
    };

    fetchProfiles();
  }, [setProfiles]);

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

  // Exclui o perfil via backend
  const handleDeleteProfile = async () => {
    if (selectedProfileId) {
      try {
        await axios.delete(`http://localhost:8000/perfis/${selectedProfileId}`);
        setProfiles((prevProfiles) =>
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

  return (
    <Container maxWidth="md" style={{ padding: "20px" }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" component="h1">
          Lista de Perfis
        </Typography>
        <Box display="flex" gap={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/cadastroPerfil")}
          >
            Cadastrar Perfil
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => navigate("/associarPerfil")}
          >
            Associar Perfil aos Usuários
          </Button>
        </Box>
      </Box>

      <Grid container spacing={3} justifyContent="center">
        {profiles.map((profile) => (
          <Grid item key={profile.id} xs={12} sm={6} md={4}>
            <ProfileCard
              profile={profile}
              onEdit={() => handleOpenEditDialog(profile.id)}
              onDelete={() => handleOpenDeleteDialog(profile)}
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
            Tem certeza de que deseja excluir o perfil{" "}
            <strong>
              {profiles.find((profile) => profile.id === selectedProfileId)?.type}
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

      {/* Modal de edição do perfil */}
      <EditProfileDialog
        open={editDialogOpen}
        onClose={handleCloseEditDialog}
        profile={profiles.find((profile) => profile.id === selectedProfileId)}
        setProfiles={setProfiles}
      />
    </Container>
  );
}

export default ListaPerfis;
