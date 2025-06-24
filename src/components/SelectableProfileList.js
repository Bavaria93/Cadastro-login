import React from "react";
import { List, ListItem, ListItemText } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PaginationControls from "./PaginationControls";

const SelectableProfileList = ({
  profiles = [],          // Espera os itens da página atual (já paginados no backend)
  selectedProfile,
  onSelectProfile,
  itemsPerPage = 5,
  totalItems,             // Total global retornado pelo backend
  currentPage,            // Estado da página, gerenciado pelo pai
  onPageChange            // Callback para mudança de página, gerenciado pelo pai
}) => {
  return (
    <>
      <List>
        {profiles.map((profile) => {
          const isSelected =
            selectedProfile && selectedProfile.id === profile.id;

          return (
            <ListItem
              key={profile.id}
              button
              selected={isSelected}
              onClick={() => onSelectProfile(profile)}
              sx={{
                backgroundColor: isSelected ? "rgba(25, 118, 210, 0.08)" : "inherit",
                "&:hover": {
                  backgroundColor: isSelected ? "rgba(25, 118, 210, 0.2)" : "rgba(0, 0, 0, 0.04)"
                },
                border: isSelected ? "1px solid rgba(25, 118, 210, 0.5)" : "none",
                display: "flex",
                alignItems: "center"
              }}
            >
              <CheckCircleIcon
                color="primary"
                sx={{ mr: 1, visibility: isSelected ? "visible" : "hidden" }}
              />
              <ListItemText
                primary={profile.type}
                secondary={profile.description}
              />
            </ListItem>
          );
        })}
      </List>
      <PaginationControls
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={onPageChange}
      />
    </>
  );
};

export default SelectableProfileList;
