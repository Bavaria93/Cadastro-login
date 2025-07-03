import React from "react";
import { Box } from "@mui/material";
import ProfileSection from "../components/ProfileSection";

export default function StepAssociarPerfis({
  profiles,
  loadingProfiles,
  selectedProfiles,          // ⬅️ deve bater com o nome do estado lá no root
  onToggleProfile,           // ⬅️ handler exato do root
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
        loading={loadingProfiles}               // ⬅️ props nomes iguais ao ProfileSection
        selectedProfiles={selectedProfiles}     // ⬅️
        onToggleProfile={onToggleProfile}       // ⬅️
        currentPage={profileCurrentPage}
        onPageChange={setProfileCurrentPage}    // ⬅️
        itemsPerPage={constProfileItemsPerPage}
        totalItems={totalProfiles}
        searchTerm={profileSearchTerm}
        setSearchTerm={setProfileSearchTerm}
      />
    </Box>
  );
}
