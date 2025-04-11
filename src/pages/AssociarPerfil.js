import React, { useContext, useState, useEffect } from "react";
import {
  Container,
  Typography,
  Button,
  Box,
  TextField,
  List,
  ListItem,
  Checkbox,
  ListItemText,
} from "@mui/material";
import { UserContext } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AssociarPerfil() {
  const navigate = useNavigate();
  const { users, setUsers, profiles, setProfiles } = useContext(UserContext);

  const [searchUser, setSearchUser] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedProfiles, setSelectedProfiles] = useState([]);

  // Busca usuários do backend ao montar o componente
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

  const filteredUsers = users.filter((user) => {
    const search = searchUser.toLowerCase().trim();
    const name = (user.name || "").toLowerCase();
    const email = (user.email || "").toLowerCase();
    return name.includes(search) || email.includes(search);
  });

  const handleSelectUser = (user) => {
    setSelectedUser(user);
    setSelectedProfiles(user.perfis || []);
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
      const response = await axios.put(
        `http://localhost:8000/usuarios/${selectedUser.id}`,
        {
          name: selectedUser.name,
          email: selectedUser.email,
          perfis: selectedProfiles, // Envia a lista de IDs dos perfis associados
        }
      );

      const updatedUser = response.data;

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === updatedUser.id ? updatedUser : user
        )
      );

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

      {/* Lista de usuários filtrados */}
      <Typography variant="h6">Selecione um Usuário:</Typography>
      <List>
        {filteredUsers.map((user) => (
          <ListItem
            key={user.id}
            button
            selected={selectedUser?.id === user.id}
            onClick={() => handleSelectUser(user)}
          >
            <ListItemText primary={user.name} secondary={user.email} />
          </ListItem>
        ))}
      </List>

      {/* Lista de perfis disponíveis */}
      <Typography variant="h6">Selecione os Perfis:</Typography>
      <List>
        {profiles.map((profile) => (
          <ListItem key={profile.id} button onClick={() => handleToggleProfile(profile.id)}>
            <Checkbox checked={selectedProfiles.includes(profile.id)} />
            <ListItemText primary={profile.type} secondary={profile.description} />
          </ListItem>
        ))}
      </List>

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
