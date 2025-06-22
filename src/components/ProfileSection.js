import React, { useState } from "react";
import { Box, TextField, Typography } from "@mui/material";
import ProfileList from "./ProfileList";
import SelectableProfileList from "./SelectableProfileList";

const ProfileSection = ({
  profiles = [],
  selectedProfiles,    // usado para seleção múltipla
  selectedProfile,     // usado para seleção única
  onToggleProfile,     // função para seleção múltipla
  onSelectProfile,     // função para seleção única
  selectionMode = "multiple", // "multiple" para seleção múltipla ou "single" para seleção única
  itemsPerPage = 5,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  // Filtra os perfis com base na pesquisa
  const filteredProfiles = Array.isArray(profiles)
  ? profiles.filter((profile) => {
    const search = searchTerm.toLowerCase().trim();
    return (
      (profile.type || "").toLowerCase().includes(search) ||
      (profile.description || "").toLowerCase().includes(search)
    );
  })
   : [];

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
      <Typography variant="h6">
        {selectionMode === "multiple" ? "Selecione os Perfis:" : "Selecione um Perfil:"}
      </Typography>
      
      {selectionMode === "multiple" ? (
        <ProfileList
          profiles={filteredProfiles}
          selectedProfiles={selectedProfiles}
          onToggleProfile={onToggleProfile}
          itemsPerPage={itemsPerPage}
        />
      ) : (
        <SelectableProfileList
          profiles={filteredProfiles}
          selectedProfile={selectedProfile}
          onSelectProfile={onSelectProfile}
          itemsPerPage={itemsPerPage}
        />
      )}
    </Box>
  );
};

export default ProfileSection;
