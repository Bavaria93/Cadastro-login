import React from "react";
import { Box, List, ListItem, Checkbox, ListItemText, CircularProgress } from "@mui/material";
import PaginationControls from "./PaginationControls";

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
  // reserva o espaço equivalente a N itens (64px de altura aproximada cada)
  const listHeight = itemsPerPage * 64;

  return (
    <>
      {loading ? (
        // spinner ocupando todo o espaço e centralizado verticalmente
        <Box
          sx={{
            height: listHeight,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <List>
          {permissions.map((perm) => (
            <ListItem
              key={perm.id}
              button
              onClick={() => onTogglePermission(perm.id)}
            >
              <Checkbox checked={selectedPermissions.includes(perm.id)} />
              <ListItemText
                primary={perm.type}
                secondary={perm.description}
              />
            </ListItem>
          ))}
        </List>
      )}

      <PaginationControls
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={onPageChange}
      />
    </>
  );
}
