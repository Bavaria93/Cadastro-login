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
import CheckCircleIcon from "@mui/icons-material/CheckCircle"; // Importa o ícone
import { UserContext } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AssociarPerfil() {
  const navigate = useNavigate();
  const { users, setUsers, profiles, setProfiles } = useContext(UserContext);

  const [searchUser, setSearchUser] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedProfiles, setSelectedProfiles] = useState([]);

  // Busca usuários e perfis do backend ao montar o componente
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
    setSelectedProfiles(user.perfis || []); // Se o usuário já tiver perfis associados, marca-os
  };

  const handleToggleProfile = (profileId) => {
    setSelectedProfiles((prev) =>
      prev.includes(profileId)
        ? prev.filter((id) => id !== profileId) // Remove se já estiver selecionado
        : [...prev, profileId] // Adiciona se não estiver selecionado
    );
  };

  const handleAssociarProfile = async () => {
    if (!selectedUser || selectedProfiles.length === 0) {
      alert("Selecione um usuário e ao menos um perfil!");
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:8000/usuarios/${selectedUser.id}/perfis`,
        {
          perfis: selectedProfiles
        }
      );
      console.log("Resposta da API:", response.data);
      // Restante do código...
    } catch (error) {
      // Imprime detalhadamente o erro
      if (error.response) {
        console.error("Erro na resposta:", error.response.data);
        console.error("Status:", error.response.status);
      } else {
        console.error("Erro na requisição:", error.message);
      }
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
        {filteredUsers.map((user) => {
          const isSelected = selectedUser && selectedUser.id === user.id;
          return (
            <ListItem
              key={user.id}
              button
              selected={isSelected}
              onClick={() => handleSelectUser(user)}
              // Estilização customizada para destacar a seleção
              sx={{
                backgroundColor: isSelected ? "rgba(25, 118, 210, 0.08)" : "inherit",
                "&:hover": {
                  backgroundColor: isSelected
                    ? "rgba(25, 118, 210, 0.2)"
                    : "rgba(0, 0, 0, 0.04)",
                },
                border: isSelected ? "1px solid rgba(25, 118, 210, 0.5)" : "none",
              }}
            >
              <ListItemText primary={user.name} secondary={user.email} />
              {isSelected && <CheckCircleIcon color="primary" />}
            </ListItem>
          );
        })}
      </List>

      {/* Lista de perfis disponíveis */}
      <Typography variant="h6">Selecione os Perfis:</Typography>
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
