import React from "react";
import { List, ListItem, ListItemText, Checkbox } from "@mui/material";
import PaginationControls from "./PaginationControls";

const PermissionList = ({
  permissions, // Itens já correspondentes à página atual (servidor)
  selectedPermissions,
  onTogglePermission,
  itemsPerPage = 5,
  currentPage,    // Se definido, assume que estamos em paginação server side
  totalItems,     // Total de itens (para exibir o número de páginas)
  onPageChange,   // Callback para mudança de página
}) => {
  // Se estivermos em modo server side (currentPage for definido), usamos o array recebido diretamente.
  // Caso contrário (client-side), faríamos o slice.
  const displayPermissions =
    currentPage !== undefined ? permissions : permissions.slice(
      currentPage * itemsPerPage,
      (currentPage + 1) * itemsPerPage
    );

  // Parâmetros para exibição (opcional, caso o PaginationControls os use)
  const paginationParams = {
    page: currentPage !== undefined ? currentPage + 1 : 1,
    limit: itemsPerPage,
  };

  return (
    <>
      <List>
        {displayPermissions.map((permission) => (
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
        totalItems={totalItems || permissions.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={onPageChange}
        params={paginationParams}
      />
    </>
  );
};

export default PermissionList;
