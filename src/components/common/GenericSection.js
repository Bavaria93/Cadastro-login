import React from "react";
import { Box, TextField, Typography, CircularProgress } from "@mui/material";

export default function GenericSection({
  // UI
  title,
  showSearch = true,
  searchLabel = "Pesquisar",
  searchTerm,
  setSearchTerm,
  // Data/paginação
  loading = false,
  itemsPerPage = 5,
  currentPage = 0,
  totalItems = 0,
  onPageChange,
  // Layout
  estimatedRowHeight = 64, // altura aproximada de cada item p/ centralizar o spinner
  containerSx,
  // Render
  renderList, // (ctx) => ReactNode
}) {
  const listHeight = itemsPerPage * estimatedRowHeight;

  return (
    <Box sx={containerSx}>
      {showSearch && (
        <TextField
          fullWidth
          label={searchLabel}
          variant="outlined"
          value={searchTerm ?? ""}
          onChange={(e) => {
            const value = e.target.value;
            setSearchTerm?.(value);
            // Reset de página quando buscar
            onPageChange?.(0);
          }}
          sx={{ mb: 2, mt: 2 }}
        />
      )}

      {title && (
        <Typography variant="h6" sx={{ mb: 1 }}>
          {title}
        </Typography>
      )}

      {loading ? (
        <Box
          sx={{
            height: listHeight,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          aria-busy="true"
        >
          <CircularProgress />
        </Box>
      ) : (
        renderList?.({
          itemsPerPage,
          currentPage,
          totalItems,
          onPageChange,
        })
      )}
    </Box>
  );
}
