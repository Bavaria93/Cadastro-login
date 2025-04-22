import React, { useState } from "react";
import { Box, TextField, Typography } from "@mui/material";
import ProfileList from "./ProfileList";

const ProfileSection = ({ profiles, selectedProfiles, onToggleProfile, itemsPerPage = 5 }) => {
  const [searchTerm, setSearchTerm] = useState("");

  // Filtra os perfis com base na pesquisa pelo tipo ou descrição
  const filteredProfiles = profiles.filter((profile) => {
    const search = searchTerm.toLowerCase().trim();
    return (
      (profile.type || "").toLowerCase().includes(search) ||
      (profile.description || "").toLowerCase().includes(search)
    );
  });

  return (
    <Box>
      <TextField
        fullWidth
        label="Pesquisar Perfil"
        variant="outlined"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: "20px", marginTop: "20px" }}
      />
      <Typography variant="h6">Selecione os Perfis:</Typography>
      <ProfileList
        profiles={filteredProfiles}
        selectedProfiles={selectedProfiles}
        onToggleProfile={onToggleProfile}
        itemsPerPage={itemsPerPage}
      />
    </Box>
  );
};

export default ProfileSection;
