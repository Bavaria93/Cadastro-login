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

function ListaPerfis() {
  // Trabalha com perfis usando valores do contexto
  const { profiles, setProfiles } = useContext(UserContext);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedPerfilId, setSelectedPerfilId] = useState(null);

  const navigate = useNavigate();

  // Inicializa as datas para perfis existentes (caso não estejam definidas)
  useEffect(() => {
    setProfiles((prevProfiles) =>
      prevProfiles.map((perfil) => ({
        ...perfil,
        createdAt: perfil.createdAt || new Date().toISOString(),
        updatedAt: perfil.updatedAt || perfil.createdAt || new Date().toISOString(),
      }))
    );
  }, [setProfiles]);

  const handleOpenEditDialog = (perfilId) => {
    setSelectedPerfilId(perfilId);
    setEditDialogOpen(true);
  };

  const handleCloseEditDialog = () => {
    setSelectedPerfilId(null);
    setEditDialogOpen(false);
  };

  const handleOpenDeleteDialog = (perfil) => {
    setSelectedPerfilId(perfil.id);
    setDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setSelectedPerfilId(null);
    setDeleteDialogOpen(false);
  };

  const handleDeletePerfil = () => {
    if (selectedPerfilId) {
      setProfiles((prevProfiles) =>
        prevProfiles.filter((perfil) => perfil.id !== selectedPerfilId)
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
        {profiles.map((perfil) => (
          <Grid item key={perfil.id} xs={12} sm={6} md={4}>
            <ProfileCard
              profile={perfil}
              onEdit={() => handleOpenEditDialog(perfil.id)}
              onDelete={() => handleOpenDeleteDialog(perfil)}
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
              {profiles.find((perfil) => perfil.id === selectedPerfilId)?.type}
            </strong>
            ?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleDeletePerfil} color="secondary">
            Excluir
          </Button>
        </DialogActions>
      </Dialog>

      {/* Modal de edição do perfil */}
      <EditUserDialog
        open={editDialogOpen}
        onClose={handleCloseEditDialog}
        user={profiles.find((perfil) => perfil.id === selectedPerfilId)}
        setUsers={setProfiles}
      />
    </Container>
  );
}

export default ListaPerfis;
