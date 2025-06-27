import React from "react";
import { Box, TextField, Typography } from "@mui/material";
import PermissionList from "./PermissionList";

export default function PermissionSection({
  permissions,
  selectedPermissions,
  onTogglePermission,
  itemsPerPage,
  currentPage,
  totalItems,
  onPageChange,
  loading,
  searchTerm,
  setSearchTerm,
}) {
  return (
    <Box sx={{ mt: 4 }}>
      <TextField
        fullWidth
        label="Pesquisar Permissão"
        variant="outlined"
        value={searchTerm}
        onChange={e => {
          setSearchTerm(e.target.value);
          onPageChange(0);
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
        loading={loading}
      />
    </Box>
  );
}
