import React from "react";
import GenericSection from "./common/GenericSection";
import UserList from "./UserList";

export default function UserSection({
  users,
  loading = false,
  selectedUser,
  onSelectUser,
  itemsPerPage = 5,
  currentPage,
  totalItems,
  onPageChange,
  searchTerm,
  setSearchTerm,
}) {
  return (
    <GenericSection
      title="Selecione um Usuário:"
      showSearch
      searchLabel="Pesquisar Usuário"
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      loading={loading}
      itemsPerPage={itemsPerPage}
      currentPage={currentPage}
      totalItems={totalItems}
      onPageChange={onPageChange}
      renderList={({ itemsPerPage, currentPage, totalItems, onPageChange }) => (
        <UserList
          users={users}
          selectedUser={selectedUser}
          onSelectUser={onSelectUser}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          totalItems={totalItems}
          onPageChange={onPageChange}
        />
      )}
    />
  );
}
