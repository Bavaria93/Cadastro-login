// src/components/ProfileList.js
import React from "react";
import { List, ListItem, ListItemText, Checkbox } from "@mui/material";
import PaginationControls from "./PaginationControls";

const ProfileList = ({
  profiles,
  selectedProfiles,
  onToggleProfile,    // recebe um objeto Profile
  itemsPerPage = 5,
  currentPage,
  totalItems,
  onPageChange,
}) => {
  const displayProfiles =
    currentPage !== undefined
      ? profiles
      : profiles.slice(
          currentPage * itemsPerPage,
          (currentPage + 1) * itemsPerPage
        );

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
            onClick={() => onToggleProfile(profile)}
          >
            <Checkbox
              checked={selectedProfiles.includes(profile.id)}
            />
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
