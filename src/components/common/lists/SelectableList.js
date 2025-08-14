import React from "react";
import { List, ListItem, ListItemText } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PaginationControls from "../../PaginationControls";

const SelectableList = ({
  items = [],
  selectedItem,
  onSelectItem,
  itemsPerPage = 5,
  totalItems = items.length,
  currentPage = 0,
  onPageChange,
  getPrimaryText = (item) => item.name ?? "",
  getSecondaryText = (item) => item.email ?? "",
  serverSide = false,
}) => {
  const paginationParams = serverSide
    ? { page: currentPage + 1, limit: itemsPerPage }
    : undefined;

  return (
    <>
      <List>
        {items.map((item) => {
          const isSelected = selectedItem && selectedItem.id === item.id;
          return (
            <ListItem
              key={item.id}
              button
              selected={isSelected}
              onClick={() => onSelectItem(item)}
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
                primary={getPrimaryText(item)}
                secondary={getSecondaryText(item)}
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

export default SelectableList;
