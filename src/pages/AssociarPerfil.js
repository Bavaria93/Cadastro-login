// src/pages/AssociarProfile.js
import React, { useContext, useState } from "react";
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

function AssociarProfile() {
  const navigate = useNavigate();

  // Obtém usuários e profiles do contexto global
  const { users, setUsers, profiles } = useContext(UserContext);

  // Estado para armazenar a pesquisa de usuário
  const [searchUser, setSearchUser] = useState("");
  const [selectedUser, setSelectedUser] = useState(null); // Apenas um usuário pode ser selecionado
  const [selectedProfiles, setSelectedProfiles] = useState([]); // Lista de profiles selecionados

  const filteredUsers = users.filter((user) => {
    const search = searchUser.toLowerCase().trim();
    const name = (user.name || "").toLowerCase();
    const email = (user.email || "").toLowerCase();

    // Debug: imprime no console os valores para cada usuário
    console.log("Busca:", search, "| Nome:", name, "| Email:", email);

    return name.includes(search) || email.includes(search);
  });

  // Atualiza o usuário selecionado
  const handleSelectUser = (user) => {
    setSelectedUser(user);
  };

  // Alterna a seleção dos profiles na lista
  const handleToggleProfile = (profileId) => {
    setSelectedProfiles((prev) =>
      prev.includes(profileId)
        ? prev.filter((id) => id !== profileId) // Remove se já estiver selecionado
        : [...prev, profileId] // Adiciona se não estiver selecionado
    );
  };

  // Função para associar os profiles ao usuário selecionado
  const handleAssociarProfile = () => {
    if (!selectedUser || selectedProfiles.length === 0) {
      alert("Selecione um usuário e ao menos um profile!");
      return;
    }

    // Atualiza o usuário com os novos profiles
    const updatedUsers = users.map((user) =>
      user.id === selectedUser.id ? { ...user, profiles: selectedProfiles } : user
    );

    setUsers(updatedUsers);
    alert("Profiles associados com sucesso!");
  };

  return (
    <Container maxWidth="md" style={{ padding: "20px" }}>
      <Box mb={3}>
        <Typography variant="h4" component="h1">
          Associação de Perfis ao Usuário
        </Typography>
      </Box>

      {/* Barra de pesquisa para buscar usuários */}
      <TextField
        fullWidth
        label="Pesquisar Usuário"
        variant="outlined"
        value={searchUser}
        onChange={(e) => {
          setSearchUser(e.target.value);
          console.log("Valor da pesquisa:", e.target.value);
        }}
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

      {/* Lista de profiles disponíveis */}
      <Typography variant="h6">Selecione os Profiles:</Typography>
      <List>
        {profiles.map((profile) => (
          <ListItem
            key={profile.id}
            button
            onClick={() => handleToggleProfile(profile.id)}
          >
            <Checkbox checked={selectedProfiles.includes(profile.id)} />
            <ListItemText primary={profile.type} secondary={profile.description} />
          </ListItem>
        ))}
      </List>

      {/* Botões de ação */}
      <Box mt={4}>
        <Button variant="contained" color="primary" onClick={handleAssociarProfile}>
          Associar Profiles
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

export default AssociarProfile;
