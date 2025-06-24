import React from "react";
import { List, ListItem, ListItemText, Checkbox } from "@mui/material";
import PaginationControls from "./PaginationControls";

const ProfileList = ({
  profiles,         // Itens já correspondentes à página atual (servidor)
  selectedProfiles,
  onToggleProfile,
  itemsPerPage = 5,
  currentPage,      // Se definido, assume que estamos em paginação server side
  totalItems,       // Total de itens (para exibir o número de páginas)
  onPageChange,     // Callback para mudança de página
}) => {
  // Se estivermos em modo server side (currentPage definido), usamos o array recebido diretamente.
  // Caso contrário (client-side), faríamos o slice.
  const displayProfiles =
    currentPage !== undefined
      ? profiles
      : profiles.slice(
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
        {displayProfiles.map((profile) => (
          <ListItem
            key={profile.id}
            button
            onClick={() => onToggleProfile(profile.id)}
          >
            <Checkbox checked={selectedProfiles.includes(profile.id)} />
            <ListItemText
              primary={profile.type}
              secondary={profile.description}
            />
          </ListItem>
        ))}
      </List>

      <PaginationControls
        totalItems={totalItems || profiles.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={onPageChange}
        params={paginationParams}
      />
    </>
  );
};

export default ProfileList;
