import React from "react";
import GenericSection from "./common/GenericSection";
import PermissionList from "./PermissionList";

export default function PermissionSection({
  permissions,
  selectedPermissions,
  onTogglePermission,
  itemsPerPage,
  currentPage,
  totalItems,
  onPageChange,
  loading,
  searchTerm,
  setSearchTerm,
}) {
  return (
    <GenericSection
      title="Selecione as Permissões:"
      showSearch
      searchLabel="Pesquisar Permissão"
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      loading={loading}
      itemsPerPage={itemsPerPage}
      currentPage={currentPage}
      totalItems={totalItems}
      onPageChange={onPageChange}
      renderList={({ itemsPerPage, currentPage, totalItems, onPageChange }) => (
        <PermissionList
          permissions={permissions}
          selectedPermissions={selectedPermissions}
          onTogglePermission={onTogglePermission}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          totalItems={totalItems}
          onPageChange={onPageChange}
          loading={loading}
        />
      )}
    />
  );
}
