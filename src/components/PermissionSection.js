import React, { useState } from "react";
import { Box, TextField, Typography } from "@mui/material";
import PermissionList from "./PermissionList";

const PermissionSection = ({
  permissions,
  selectedPermissions,
  onTogglePermission,
  itemsPerPage = 5,
  currentPage,      // Nova prop
  totalItems,       // Nova prop
  onPageChange,     // Nova prop
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  // Filtra as permissões com base na pesquisa pelo tipo ou descrição
  const filteredPermissions = permissions.filter((permission) => {
    const search = searchTerm.toLowerCase().trim();
    return (
      (permission.type || "").toLowerCase().includes(search) ||
      (permission.description || "").toLowerCase().includes(search)
    );
  });

  return (
    <Box>
      <TextField
        fullWidth
        label="Pesquisar Permissão"
        variant="outlined"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: "20px", marginTop: "20px" }}
      />
      <Typography variant="h6">Selecione as Permissões:</Typography>
      <PermissionList
        permissions={filteredPermissions}
        selectedPermissions={selectedPermissions}
        onTogglePermission={onTogglePermission}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        totalItems={totalItems}
        onPageChange={onPageChange}
      />
    </Box>
  );
};

export default PermissionSection;
