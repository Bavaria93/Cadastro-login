import React from "react";
import { List, ListItem, ListItemText, Checkbox } from "@mui/material";
import PaginationControls from "./PaginationControls";

const ProfileList = ({
  profiles,
  selectedProfiles,
  onToggleProfile,
  itemsPerPage = 5,
  currentPage,
  totalItems,
  onPageChange,
}) => {
  const displayProfiles = profiles;

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
      />
    </>
  );
};

export default ProfileList;
