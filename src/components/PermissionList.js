import React from "react";
import { Box, Typography, List, ListItem, ListItemText, Checkbox } from "@mui/material";

const PermissionList = ({ permissions, selectedPermissions, onTogglePermission, itemsPerPage }) => {
  return (
    <Box>
      {permissions.length === 0 ? (
        <Typography variant="body2">Nenhuma permissão encontrada.</Typography>
      ) : (
        <List>
          {permissions.map((permission) => (
            <ListItem
              key={permission.id}
              button
              onClick={() => onTogglePermission(permission.id)}
            >
              <Checkbox
                edge="start"
                checked={selectedPermissions.includes(permission.id)}
                tabIndex={-1}
                disableRipple
              />
              <ListItemText primary={`${permission.type} - ${permission.description}`} />
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
};

export default PermissionList;
