import React from "react";
import {
  Box,
  List,
  ListItem,
  Checkbox,
  ListItemText,
  CircularProgress,
} from "@mui/material";
import PaginationControls from "../../PaginationControls";

export default function MultiSelect({
  items = [],
  selectedItems = [],
  onToggleItem,
  itemsPerPage = 5,
  currentPage = 0,
  totalItems = 0,
  onPageChange,
  loading = false,
  getPrimaryText = (item) => item.type,
  getSecondaryText = (item) => item.description,
}) {
  const listHeight = itemsPerPage * 64;

  return (
    <>
      {loading ? (
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
          {items.map((item) => (
            <ListItem
              key={item.id}
              button
              onClick={() => onToggleItem(item.id)}
            >
              <Checkbox checked={selectedItems.includes(item.id)} />
              <ListItemText
                primary={getPrimaryText(item)}
                secondary={getSecondaryText(item)}
              />
            </ListItem>
          ))}
        </List>
      )}

      <PaginationControls
        totalItems={totalItems || items.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={onPageChange}
      />
    </>
  );
}
