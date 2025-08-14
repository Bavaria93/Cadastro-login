import React from "react";
import SelectableList from "./common/lists/SelectableList";
import SelectablePaginatedList from "./common/lists/SelectablePaginatedList";

const ProfileList = ({
  profiles = [],
  // Props para seleção única
  selectedProfile,
  onSelectProfile,

  // Props para seleção múltipla
  selectedProfiles = [],
  onToggleProfile,

  // Configuração comum
  itemsPerPage = 5,
  currentPage = 0,
  totalItems = profiles.length,
  onPageChange,

  // Define o modo
  multiSelect = false,
}) => {
  const listProps = {
    items: profiles,
    itemsPerPage,
    currentPage,
    totalItems,
    onPageChange,
    serverSide: true,
    getPrimaryText: (profile) => profile.type,
    getSecondaryText: (profile) => profile.description,
  };

  return multiSelect ? (
    <SelectablePaginatedList
      {...listProps}
      selectedItems={selectedProfiles}
      onToggleItem={onToggleProfile}
    />
  ) : (
    <SelectableList
      {...listProps}
      selectedItem={selectedProfile}
      onSelectItem={onSelectProfile}
    />
  );
};

export default ProfileList;
