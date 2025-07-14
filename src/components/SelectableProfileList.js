import React from "react";
import { List, ListItem, ListItemText } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PaginationControls from "./PaginationControls";

const SelectableProfileList = ({
  profiles = [],
  selectedProfile,
  onSelectProfile,
  itemsPerPage = 5,
  totalItems = profiles.length,
  currentPage = 0,
  onPageChange,
}) => {
  // monta o params para o controle de paginação server‐side
  const paginationParams = {
    page: currentPage + 1,
    limit: itemsPerPage,
  };

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
                backgroundColor: isSelected
                  ? "rgba(25, 118, 210, 0.08)"
                  : "inherit",
                "&:hover": {
                  backgroundColor: isSelected
                    ? "rgba(25, 118, 210, 0.2)"
                    : "rgba(0, 0, 0, 0.04)",
                },
                border: isSelected
                  ? "1px solid rgba(25, 118, 210, 0.5)"
                  : "none",
                display: "flex",
                alignItems: "center",
              }}
            >
              <CheckCircleIcon
                color="primary"
                sx={{
                  marginRight: 1,
                  visibility: isSelected ? "visible" : "hidden",
                }}
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
        params={paginationParams}
      />
    </>
  );
};

export default SelectableProfileList;
