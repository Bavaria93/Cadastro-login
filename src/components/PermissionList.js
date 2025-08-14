import React from "react";
import SelectablePaginatedList from "./common/lists/SelectablePaginatedList";

export default function PermissionList({
  permissions = [],
  selectedPermissions = [],
  onTogglePermission,
  itemsPerPage = 5,
  currentPage = 0,
  totalItems = 0,
  onPageChange,
  loading = false,
}) {
  return (
    <SelectablePaginatedList
      items={permissions}
      selectedItems={selectedPermissions}
      onToggleItem={onTogglePermission}
      itemsPerPage={itemsPerPage}
      currentPage={currentPage}
      totalItems={totalItems}
      onPageChange={onPageChange}
      loading={loading}
    />
  );
}
