import React from "react";
import SelectablePaginatedList from "./common/lists/SelectablePaginatedList";

const ProfileList = ({
  profiles,
  selectedProfiles,
  onToggleProfile,
  itemsPerPage = 5,
  currentPage,
  totalItems,
  onPageChange,
}) => {
  return (
    <SelectablePaginatedList
      items={profiles}
      selectedItems={selectedProfiles}
      onToggleItem={onToggleProfile}
      itemsPerPage={itemsPerPage}
      currentPage={currentPage}
      totalItems={totalItems}
      onPageChange={onPageChange}
    />
  );
};

export default ProfileList;
