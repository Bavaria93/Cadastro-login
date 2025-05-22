import React, { useState } from "react";
import { List, ListItem, ListItemText, Checkbox } from "@mui/material";
import PaginationControls from "./PaginationControls";

const PermissionList = ({ permissions, selectedPermissions, onTogglePermission, itemsPerPage = 5 }) => {
  const [currentPage, setCurrentPage] = useState(0);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <List>
        {permissions
          .slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)
          .map((permission) => (
            <ListItem
              key={permission.id}
              button
              onClick={() => onTogglePermission(permission.id)}
            >
              <Checkbox checked={selectedPermissions.includes(permission.id)} />
              <ListItemText
                primary={permission.type}
                secondary={permission.description}
              />
            </ListItem>
          ))}
      </List>

      <PaginationControls
        totalItems={permissions.length}
        itemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
      />
    </>
  );
};

export default PermissionList;
