import React from "react";
import { Box, TextField, Typography } from "@mui/material";
import PermissionList from "./PermissionList";

export default function PermissionSection({
  permissions,           // itens da página atual (já filtrados no servidor)
  selectedPermissions,
  onTogglePermission,
  itemsPerPage = 5,
  currentPage,           // índice da página (0-based)
  totalItems,            // total global (vindo do backend)
  onPageChange,          // para trocar de página
  searchTerm,            // termo de busca vindo do pai
  setSearchTerm          // setter vindo do pai
}) {
  return (
    <Box sx={{ mt: 4 }}>
      <TextField
        fullWidth
        label="Pesquisar Permissão"
        variant="outlined"
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          onPageChange(0);   // sempre volta à página 1 ao digitar
        }}
        sx={{ mb: 2 }}
      />

      <Typography variant="h6">Selecione as Permissões:</Typography>
      <PermissionList
        permissions={permissions}
        selectedPermissions={selectedPermissions}
        onTogglePermission={onTogglePermission}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        totalItems={totalItems}
        onPageChange={onPageChange}
      />
    </Box>
  );
}
