import React from "react";
import {
  Box,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";
import ProfileList from "./ProfileList";
import SelectableProfileList from "./SelectableProfileList";

const ProfileSection = ({
  selectionMode = "multiple",
  profiles,
  loading = false,
  itemsPerPage = 5,
  currentPage = 0,
  totalItems = 0,
  onPageChange,
  searchTerm,
  setSearchTerm,
  // múltipla
  selectedProfiles = [],
  onToggleProfile,
  // única
  selectedProfile,
  onSelectProfile,
}) => {
  const listHeight = itemsPerPage * 64;

  return (
    <Box>
      <TextField
        fullWidth
        label="Pesquisar Perfil"
        variant="outlined"
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          onPageChange(0);
        }}
        sx={{ mb: 2, mt: 2 }}
      />

      <Typography variant="h6">Selecione os Perfis:</Typography>

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
      ) : selectionMode === "single" ? (
        <SelectableProfileList
          profiles={profiles}
          selectedProfile={selectedProfile}
          onSelectProfile={onSelectProfile}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          totalItems={totalItems}
          onPageChange={onPageChange}
        />
      ) : (
        <ProfileList
          profiles={profiles}
          selectedProfiles={selectedProfiles}
          onToggleProfile={onToggleProfile}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          totalItems={totalItems}
          onPageChange={onPageChange}
        />
      )}
    </Box>
  );
};

export default ProfileSection;
