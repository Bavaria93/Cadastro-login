import React, { useContext, useState, useEffect } from "react";
import {
  Container,
  Typography,
  Button,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../contexts/UserContext";
import UserSection from "../components/UserSection";
import ProfileSection from "../components/ProfileSection";

function AssociarPerfil() {
  const navigate = useNavigate();
  const { users, setUsers, profiles, setProfiles } = useContext(UserContext);

  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedProfiles, setSelectedProfiles] = useState([]);

  // Estados para notificações usando Dialog do Material UI
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const [dialogType, setDialogType] = useState("success"); // 'success' ou 'error'

  // Busca usuários e perfis do backend ao montar o componente
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:8000/users/");
        setUsers(response.data);
      } catch (error) {
        console.error("Erro ao buscar usuários:", error);
      }
    };

    const fetchProfiles = async () => {
      try {
        const response = await axios.get("http://localhost:8000/profiles/");
        setProfiles(response.data);
      } catch (error) {
        console.error("Erro ao buscar perfis:", error);
      }
    };

    fetchUsers();
    fetchProfiles();
  }, [setUsers, setProfiles]);

  const handleSelectUser = (user) => {
    setSelectedUser(user);
    // Converte o array de perfis (objetos) para um array de IDs
    setSelectedProfiles(user.profiles ? user.profiles.map((perfil) => perfil.id) : []);
  };

  const handleToggleProfile = (profileId) => {
    setSelectedProfiles((prev) =>
      prev.includes(profileId)
        ? prev.filter((id) => id !== profileId)
        : [...prev, profileId]
    );
  };

  const handleAssociarProfile = async () => {
    if (!selectedUser || selectedProfiles.length === 0) {
      setDialogMessage("Selecione um usuário e ao menos um perfil!");
      setDialogType("error");
      setDialogOpen(true);
      return;
    }

    try {
      await axios.put(`http://localhost:8000/users/${selectedUser.id}/profiles`, {
        profiles: selectedProfiles,
      });
      setDialogMessage("Perfis associados com sucesso!");
      setDialogType("success");
      setDialogOpen(true);
    } catch (error) {
      console.error("Erro ao associar perfis:", error);
      setDialogMessage("Erro ao associar perfis. Tente novamente.");
      setDialogType("error");
      setDialogOpen(true);
    }
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  return (
    <Container maxWidth="md" style={{ padding: "20px" }}>
      <Box mb={3}>
        <Typography variant="h4">Associação de Perfis ao Usuário</Typography>
      </Box>

      {/* Seção de Usuários */}
      <UserSection
        users={users}
        selectedUser={selectedUser}
        onSelectUser={handleSelectUser}
      />

      {/* Seção de Perfis */}
      <ProfileSection
        profiles={profiles}
        selectedProfiles={selectedProfiles || []}
        onToggleProfile={handleToggleProfile}
        selectionMode="multiple"
        itemsPerPage={5}
      />

      {/* Botões de ação */}
      <Box mt={4}>
        <Button variant="contained" color="primary" onClick={handleAssociarProfile}>
          Associar Perfis
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          style={{ marginLeft: "10px" }}
          onClick={() => navigate("/")}
        >
          Voltar para a Home
        </Button>
      </Box>

      {/* Notificação via Dialog */}
      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>{dialogType === "success" ? "Sucesso!" : "Erro!"}</DialogTitle>
        <DialogContent>
          <Typography>{dialogMessage}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Fechar
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default AssociarPerfil;
