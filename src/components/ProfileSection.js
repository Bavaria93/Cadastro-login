import React from "react";
import GenericSection from "./common/GenericSection";
import ProfileList from "./ProfileList";

export default function ProfileSection({
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
}) {
  return (
    <GenericSection
      title="Selecione os Perfis:"
      showSearch
      searchLabel="Pesquisar Perfil"
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      loading={loading}
      itemsPerPage={itemsPerPage}
      currentPage={currentPage}
      totalItems={totalItems}
      onPageChange={onPageChange}
      renderList={({ itemsPerPage, currentPage, totalItems, onPageChange }) => (
        <ProfileList
          profiles={profiles}
          multiSelect={selectionMode !== "single"}
          selectedProfiles={selectedProfiles}
          onToggleProfile={onToggleProfile}
          selectedProfile={selectedProfile}
          onSelectProfile={onSelectProfile}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          totalItems={totalItems}
          onPageChange={onPageChange}
        />
      )}
    />
  );
}
