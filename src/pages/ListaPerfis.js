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
import ProfileCard from "../components/ProfileCard"; // Agora usamos o ProfileCard para exibir perfis
import EditUserDialog from "../components/EditUserDialog"; // Se for EditPerfilDialog, atualize também
import { useNavigate } from "react-router-dom";

function ListaProfiles() {
  // Trabalha com perfis usando valores do contexto
  const { profiles, setProfiles } = useContext(UserContext);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedProfileId, setSelectedProfileId] = useState(null);

  const navigate = useNavigate();

  // Inicializa as datas para perfis existentes (caso não estejam definidas)
  useEffect(() => {
    setProfiles((prevProfiles) =>
      prevProfiles.map((profile) => ({
        ...profile,
        createdAt: profile.createdAt || new Date().toISOString(),
        updatedAt:
          profile.updatedAt || profile.createdAt || new Date().toISOString(),
      }))
    );
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

  const handleDeleteProfile = () => {
    if (selectedProfileId) {
      setProfiles((prevProfiles) =>
        prevProfiles.filter((profile) => profile.id !== selectedProfileId)
      );
      handleCloseDeleteDialog();
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString();
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
          Lista de Perfis
        </Typography>
        <Box display="flex" gap={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/cadastroPerfil")} // Navega para a página de cadastro
          >
            Cadastrar Perfil
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => navigate("/associarPerfil")} // Navega para a página de associação
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
              {profiles.find(
                (profile) => profile.id === selectedProfileId
              )?.type}
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
      <EditUserDialog
        open={editDialogOpen}
        onClose={handleCloseEditDialog}
        user={profiles.find((profile) => profile.id === selectedProfileId)}
        setUsers={setProfiles}
      />
    </Container>
  );
}

export default ListaProfiles;
