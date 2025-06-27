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

  // Estados de loading
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [loadingProfiles, setLoadingProfiles] = useState(false);

  // Estados para usuários (server-side pagination)
  const [searchTerm, setSearchTerm] = useState("");
  const [userCurrentPage, setUserCurrentPage] = useState(0);
  const constUserItemsPerPage = 5;
  const [totalUsers, setTotalUsers] = useState(0);

  // Estados para perfis (server-side pagination)
  const [profileSearchTerm, setProfileSearchTerm] = useState("");
  const [profileCurrentPage, setProfileCurrentPage] = useState(0);
  const constProfileItemsPerPage = 5;
  const [totalProfiles, setTotalProfiles] = useState(0);

  // Estados para notificações via Dialog
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const [dialogType, setDialogType] = useState("success");

  // Funções para atualizar a página de usuários e perfis (server-side)
  const handleUserPageChange = (page) => {
    setUserCurrentPage(page);
  };

  const handleProfilePageChange = (page) => {
    setProfileCurrentPage(page);
  };

  // Fetch de usuários com paginação
  useEffect(() => {
    const fetchUsers = async () => {
      setLoadingUsers(true);
      try {
        const params = {
          page: userCurrentPage + 1,
          limit: constUserItemsPerPage,
          search: searchTerm,
        };
        const response = await axios.get("http://localhost:8000/users/", { params });
        console.log("Dados retornados da API (usuários):", response.data);
        if (response.data && Array.isArray(response.data.items)) {
          setUsers(response.data.items);
          setTotalUsers(response.data.total);
        } else {
          setUsers([]);
          setTotalUsers(0);
        }
      } catch (error) {
        console.error("Erro ao buscar usuários:", error);
        setUsers([]);
        setTotalUsers(0);
      } finally {
        setLoadingUsers(false);
      }
    };

    fetchUsers();
  }, [userCurrentPage, constUserItemsPerPage, searchTerm, setUsers]);

  // Fetch de perfis com paginação
  useEffect(() => {
    const fetchProfiles = async () => {
      setLoadingProfiles(true);
      try {
        const params = {
          page: profileCurrentPage + 1,
          limit: constProfileItemsPerPage,
          search: profileSearchTerm,
        };
        const response = await axios.get("http://localhost:8000/profiles/", { params });
        console.log("Dados retornados da API (perfis):", response.data);
        if (response.data && Array.isArray(response.data.items)) {
          setProfiles(response.data.items);
          setTotalProfiles(response.data.total);
        } else {
          setProfiles([]);
          setTotalProfiles(0);
        }
      } catch (err) {
        console.error("Erro ao buscar perfis:", err);
        setProfiles([]);
        setTotalProfiles(0);
      } finally {
        setLoadingProfiles(false);
      }
    };

    fetchProfiles();
  }, [profileCurrentPage, constProfileItemsPerPage, profileSearchTerm, setProfiles]);

  const handleSelectUser = (user) => {
    setSelectedUser(user);
    // Converte o array de perfis (objetos) em um array de IDs
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
        <Typography variant="h4">
          Associação de Perfis ao Usuário
        </Typography>
      </Box>

      {/* Seção de Usuários com paginação */}
      <UserSection
        users={users}
        loading={loadingUsers}
        selectedUser={selectedUser}
        onSelectUser={handleSelectUser}
        itemsPerPage={constUserItemsPerPage}
        currentPage={userCurrentPage}
        totalItems={totalUsers}
        onPageChange={handleUserPageChange}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      {/* Seção de Perfis com paginação */}
      <ProfileSection
        profiles={profiles}
        loading={loadingProfiles}
        selectedProfiles={selectedProfiles}
        onToggleProfile={handleToggleProfile}
        selectionMode="multiple"
        itemsPerPage={constProfileItemsPerPage}
        currentPage={profileCurrentPage}
        totalItems={totalProfiles}
        onPageChange={handleProfilePageChange}
        searchTerm={profileSearchTerm}
        setSearchTerm={setProfileSearchTerm}
      />

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
        <DialogTitle>
          {dialogType === "success" ? "Sucesso!" : "Erro!"}
        </DialogTitle>
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
