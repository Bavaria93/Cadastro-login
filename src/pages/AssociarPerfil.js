import React, { useContext, useState, useEffect } from "react";
import {
  Container,
  Typography,
  Button,
  Box,
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../contexts/UserContext";
import UserList from "../components/UserList";
import ProfileList from "../components/ProfileList";

function AssociarPerfil() {
  const navigate = useNavigate();
  const { users, setUsers, profiles, setProfiles } = useContext(UserContext);

  const [searchUser, setSearchUser] = useState("");
  const [searchProfile, setSearchProfile] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedProfiles, setSelectedProfiles] = useState([]);

  // Busca usuários e perfis do backend no mount do componente
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:8000/usuarios/");
        setUsers(response.data);
      } catch (error) {
        console.error("Erro ao buscar usuários:", error);
      }
    };

    const fetchProfiles = async () => {
      try {
        const response = await axios.get("http://localhost:8000/perfis/");
        setProfiles(response.data);
      } catch (error) {
        console.error("Erro ao buscar perfis:", error);
      }
    };

    fetchUsers();
    fetchProfiles();
  }, [setUsers, setProfiles]);

  // Filtra usuários com base na pesquisa
  const filteredUsers = users.filter((user) => {
    const search = searchUser.toLowerCase().trim();
    return (
      (user.name || "").toLowerCase().includes(search) ||
      (user.email || "").toLowerCase().includes(search)
    );
  });

  // Filtra perfis pela pesquisa (tipo e descrição)
  const filteredProfiles = profiles.filter((profile) => {
    const search = searchProfile.toLowerCase().trim();
    return (
      (profile.type || "").toLowerCase().includes(search) ||
      (profile.description || "").toLowerCase().includes(search)
    );
  });

  const handleSelectUser = (user) => {
    setSelectedUser(user);
    setSelectedProfiles(user.perfis || []); // Seleciona os perfis já associados ao usuário
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
      alert("Selecione um usuário e ao menos um perfil!");
      return;
    }

    try {
      await axios.put(`http://localhost:8000/usuarios/${selectedUser.id}/perfis`, {
        perfis: selectedProfiles,
      });
      alert("Perfis associados com sucesso!");
    } catch (error) {
      console.error("Erro ao associar perfis:", error);
      alert("Erro ao associar perfis. Tente novamente.");
    }
  };

  return (
    <Container maxWidth="md" style={{ padding: "20px" }}>
      <Box mb={3}>
        <Typography variant="h4">Associação de Perfis ao Usuário</Typography>
      </Box>

      {/* Campo de pesquisa de usuários */}
      <TextField
        fullWidth
        label="Pesquisar Usuário"
        variant="outlined"
        value={searchUser}
        onChange={(e) => setSearchUser(e.target.value)}
        style={{ marginBottom: "20px" }}
      />

      {/* Renderiza o componente de lista de usuários */}
      <Typography variant="h6">Selecione um Usuário:</Typography>
      <UserList
        users={filteredUsers}
        selectedUser={selectedUser}
        onSelectUser={handleSelectUser}
      />

      {/* Campo de pesquisa de perfis */}
      <TextField
        fullWidth
        label="Pesquisar Perfil"
        variant="outlined"
        value={searchProfile}
        onChange={(e) => setSearchProfile(e.target.value)}
        style={{ marginBottom: "20px", marginTop: "20px" }}
      />

      {/* Renderiza o componente de lista de perfis */}
      <Typography variant="h6">Selecione os Perfis:</Typography>
      <ProfileList
        profiles={filteredProfiles}
        selectedProfiles={selectedProfiles}
        onToggleProfile={handleToggleProfile}
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
    </Container>
  );
}

export default AssociarPerfil;
