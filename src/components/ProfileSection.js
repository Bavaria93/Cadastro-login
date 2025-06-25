import React from "react";
import { Box, TextField, Typography } from "@mui/material";
import ProfileList from "./ProfileList";

const ProfileSection = ({
  profiles,
  currentPage,
  totalItems,
  itemsPerPage = 5,
  onPageChange,
  // **recebidos via props**
  searchTerm,
  setSearchTerm,
  selectedProfiles,
  onToggleProfile
}) => {

  return (
    <Box>
      <TextField
        fullWidth
        label="Pesquisar Perfil"
        variant="outlined"
        value={searchTerm}
        onChange={e => {
          setSearchTerm(e.target.value);
          onPageChange(0);    // reseta para 1ª página ao mudar search
        }}
        sx={{ mb: 2, mt: 2 }}
      />

      <Typography variant="h6">Selecione os Perfis:</Typography>

      <ProfileList
        profiles={profiles}         // já filtrados pelo backend
        selectedProfiles={selectedProfiles}
        onToggleProfile={onToggleProfile}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        totalItems={totalItems}
        onPageChange={onPageChange}
      />
    </Box>
  );
};

export default ProfileSection;
