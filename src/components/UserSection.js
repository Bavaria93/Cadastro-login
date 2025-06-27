import React from "react";
import { Box, TextField, Typography, CircularProgress } from "@mui/material";
import UserList from "./UserList";

const UserSection = ({
  users,
  loading = false,          // ← recebe o loading
  selectedUser,
  onSelectUser,
  itemsPerPage = 5,
  currentPage,
  totalItems,
  onPageChange,
  searchTerm,
  setSearchTerm
}) => {
  // altura da lista para centralizar o spinner
  const listHeight = itemsPerPage * 64;

  return (
    <Box>
      <TextField
        fullWidth
        label="Pesquisar Usuário"
        variant="outlined"
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          onPageChange(0);
        }}
        style={{ marginBottom: "20px" }}
      />

      <Typography variant="h6">Selecione um Usuário:</Typography>

      {loading ? (
        <Box
          sx={{
            height: listHeight,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <UserList
          users={users}
          selectedUser={selectedUser}
          onSelectUser={onSelectUser}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          totalItems={totalItems}
          onPageChange={onPageChange}
        />
      )}
    </Box>
  );
};

export default UserSection;
