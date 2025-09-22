import React from "react";
import { Box } from "@mui/material";
import ProfileSection from "../components/ProfileSection";

export default function StepAssociarPerfis({
  profiles,
  loadingProfiles,
  selectedProfiles,
  onToggleProfile,           // vem do useCadastroUsuario via {...state}
  profileCurrentPage,
  setProfileCurrentPage,
  constProfileItemsPerPage,
  totalProfiles,
  profileSearchTerm,
  setProfileSearchTerm
}) {
  return (
    <Box mt={3}>
      <ProfileSection
        selectionMode="multiple"
        profiles={profiles}
        loading={loadingProfiles}
        selectedProfiles={selectedProfiles}
        onToggleProfile={onToggleProfile}          // mapeia para o nome que o ProfileSection espera
        currentPage={profileCurrentPage}
        onPageChange={setProfileCurrentPage}
        itemsPerPage={constProfileItemsPerPage}
        totalItems={totalProfiles}
        searchTerm={profileSearchTerm}
        setSearchTerm={setProfileSearchTerm}
      />
    </Box>
  );
}
