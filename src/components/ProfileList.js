import React, { useState } from "react";
import { List, ListItem, ListItemText, Checkbox } from "@mui/material";
import PaginationControls from "./PaginationControls";

const ProfileList = ({ profiles, selectedProfiles, onToggleProfile, itemsPerPage = 5 }) => {
  const [currentPage, setCurrentPage] = useState(0);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <List>
        {profiles
          .slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)
          .map((profile) => (
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
      
      {/* Componente de Paginação para perfis */}
      <PaginationControls
        totalItems={profiles.length}
        itemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
      />
    </>
  );
};

export default ProfileList;
