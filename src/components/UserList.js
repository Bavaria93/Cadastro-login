import React, { useState } from "react";
import { List, ListItem, ListItemText } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PaginationControls from "./PaginationControls";

const UserList = ({ users, selectedUser, onSelectUser, itemsPerPage = 5 }) => {
  const [currentPage, setCurrentPage] = useState(0);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <List>
        {users
          .slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)
          .map((user) => {
            const isSelected = selectedUser && selectedUser.id === user.id;
            return (
              <ListItem
                key={user.id}
                button
                selected={isSelected}
                onClick={() => onSelectUser(user)}
                sx={{
                  backgroundColor: isSelected ? "rgba(25, 118, 210, 0.08)" : "inherit",
                  "&:hover": {
                    backgroundColor: isSelected
                      ? "rgba(25, 118, 210, 0.2)"
                      : "rgba(0, 0, 0, 0.04)",
                  },
                  border: isSelected ? "1px solid rgba(25, 118, 210, 0.5)" : "none",
                }}
              >
                <ListItemText primary={user.name} secondary={user.email} />
                {isSelected && <CheckCircleIcon color="primary" />}
              </ListItem>
            );
          })}
      </List>
      
      {/* Componente de Paginação para usuários */}
      <PaginationControls
        totalItems={users.length}
        itemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
      />
    </>
  );
};

export default UserList;
