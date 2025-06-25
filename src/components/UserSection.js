// UserSection.js
import React, { useState } from "react";
import { Box, TextField, Typography } from "@mui/material";
import UserList from "./UserList";

const UserSection = ({
  users,
  selectedUser,
  onSelectUser,
  itemsPerPage = 5,
  currentPage,      // Adicionado
  totalItems,       // Adicionado
  onPageChange,     // Adicionado
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  // Filtra os usuários com base na barra de pesquisa
  const filteredUsers = users.filter((user) => {
    const search = searchTerm.toLowerCase().trim();
    return (
      (user.name || "").toLowerCase().includes(search) ||
      (user.email || "").toLowerCase().includes(search)
    );
  });

  return (
    <Box>
      <TextField
        fullWidth
        label="Pesquisar Usuário"
        variant="outlined"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: "20px" }}
      />
      <Typography variant="h6">Selecione um Usuário:</Typography>
      <UserList
        users={filteredUsers}
        selectedUser={selectedUser}
        onSelectUser={onSelectUser}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}    // Encaminhado
        totalItems={totalItems}      // Encaminhado
        onPageChange={onPageChange}  // Encaminhado
      />
    </Box>
  );
};

export default UserSection;
