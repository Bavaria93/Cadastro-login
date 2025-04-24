import React, { useState } from "react";
import { List, ListItem, ListItemText } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PaginationControls from "./PaginationControls";

const SelectableProfileList = ({ profiles = [], selectedProfile, onSelectProfile, itemsPerPage = 5 }) => {
  const [currentPage, setCurrentPage] = useState(0);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <List>
        {profiles
          .slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)
          .map((profile) => {
            const isSelected = selectedProfile && selectedProfile.id === profile.id;

            return (
              <ListItem
                key={profile.id}
                button
                selected={isSelected}
                onClick={() => onSelectProfile(profile)}
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
        totalItems={profiles.length}
        itemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
      />
    </>
  );
};

export default SelectableProfileList;
