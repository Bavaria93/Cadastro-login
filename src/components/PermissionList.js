import React from "react";
import MultiSelect from "./common/lists/MultiSelect";

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
    <MultiSelect
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
