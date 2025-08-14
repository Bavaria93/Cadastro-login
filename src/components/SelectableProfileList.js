import React from "react";
import SelectableList from "./common/lists/SelectableList"; // ajuste o caminho conforme sua estrutura

const SelectableProfileList = ({
  profiles = [],
  selectedProfile,
  onSelectProfile,
  itemsPerPage = 5,
  totalItems = profiles.length,
  currentPage = 0,
  onPageChange,
}) => {
  return (
    <SelectableList
      items={profiles}
      selectedItem={selectedProfile}
      onSelectItem={onSelectProfile}
      itemsPerPage={itemsPerPage}
      currentPage={currentPage}
      totalItems={totalItems}
      onPageChange={onPageChange}
      serverSide
      getPrimaryText={(profile) => profile.type}
      getSecondaryText={(profile) => profile.description}
    />
  );
};

export default SelectableProfileList;
