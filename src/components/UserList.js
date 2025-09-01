import React from "react";
import SingleSelect from "./common/lists/SingleSelect"; // ajuste o path conforme seu projeto

const UserList = ({
  users,
  selectedUser,
  onSelectUser,
  itemsPerPage = 5,
  currentPage,
  totalItems,
  onPageChange,
  serverSide = false
}) => {
  return (
    <SingleSelect
      items={users}
      selectedItem={selectedUser}
      onSelectItem={onSelectUser}
      itemsPerPage={itemsPerPage}
      currentPage={currentPage}
      totalItems={totalItems}
      onPageChange={onPageChange}
      serverSide={serverSide}
      getPrimaryText={(user) => user.name}
      getSecondaryText={(user) => user.email}
    />
  );
};

export default UserList;
