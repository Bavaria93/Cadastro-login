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
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { usePermission } from "../hooks/usePermission";

function ListaPerfis() {
  // Estado local para os perfis obtidos diretamente da API
  const [dbProfiles, setDbProfiles] = useState([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedProfileId, setSelectedProfileId] = useState(null);

  const navigate = useNavigate();

  // Permissões
  const canCreateProfiles = usePermission("Cadastrar Perfil");
  const canAssociarPerfil = usePermission("Atualizar Usuário");
  const canEditProfiles = usePermission("Atualizar Perfil");
  const canDeleteProfiles = usePermission("Excluir Perfil");

  // Busca os perfis salvos no banco (via API) e armazena em dbProfiles
  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        // Atualize o endpoint conforme o nome usado no backend ("/profiles/" neste exemplo)
        const response = await axios.get("http://localhost:8000/profiles/");
        console.log("Dados retornados da API:", response.data);
        setDbProfiles(response.data);
      } catch (error) {
        console.error("Erro ao buscar perfis:", error);
      }
    };

    fetchProfiles();
  }, []);

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
        // Utilize o endpoint correto para perfis, conforme o backend
        await axios.delete(`http://localhost:8000/profiles/${selectedProfileId}`);
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

      {/* Diálogo de Exclusão (aparece somente para quem tem permissão) */}
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

      {/* Modal de Edição do Perfil (aparece somente se houver permissão) */}
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
