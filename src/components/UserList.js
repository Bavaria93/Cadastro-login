import React from "react";
import { List, ListItem, ListItemText } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PaginationControls from "./PaginationControls";

const UserList = ({
  users,            // Espera os itens já correspondentes à página atual (server‑side)
  selectedUser,
  onSelectUser,
  itemsPerPage = 5,
  currentPage,      // Estado de página vindo do pai
  totalItems,       // Total global de usuários (para calcular o número de páginas)
  onPageChange      // Callback para mudança de página vindo do pai
}) => {
  return (
    <>
      <List>
        {users.map((user) => {
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
                display: "flex",
                alignItems: "center",
              }}
            >
              <CheckCircleIcon 
                color="primary" 
                sx={{ marginRight: 1, visibility: isSelected ? "visible" : "hidden" }}
              />
              <ListItemText primary={user.name} secondary={user.email} />
            </ListItem>
          );
        })}
      </List>
      
      <PaginationControls
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}  // Passa a página atual, vinda do pai
        onPageChange={onPageChange} // Callback para mudança de página
      />
    </>
  );
};

export default UserList;
