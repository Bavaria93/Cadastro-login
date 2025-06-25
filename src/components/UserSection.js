import React from "react";
import { Box, TextField, Typography } from "@mui/material";
import UserList from "./UserList";

const UserSection = ({
  users,
  selectedUser,
  onSelectUser,
  itemsPerPage = 5,
  currentPage,
  totalItems,
  onPageChange,
  searchTerm,
  setSearchTerm
}) => {

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
        users={users} // ou apenas users se o backend já filtra
        selectedUser={selectedUser}
        onSelectUser={onSelectUser}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        totalItems={totalItems}
        onPageChange={onPageChange}
      />
    </Box>
  );
};

export default UserSection;
