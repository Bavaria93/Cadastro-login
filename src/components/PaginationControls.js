import React, { useEffect, useState } from "react";
import { Box, Pagination } from "@mui/material";

const PaginationControls = ({ totalItems, itemsPerPage, onPageChange }) => {
  // Usamos currentPage iniciando em 1 para compatibilidade com o componente Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  useEffect(() => {
    if (onPageChange) {
      // Se necessário, convertemos de 1-index para 0-index
      onPageChange(currentPage - 1);
    }
  }, [currentPage, onPageChange]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <Box display="flex" justifyContent="center" mt={2}>
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={handlePageChange}
        color="primary"
        variant="outlined"
        shape="rounded"
        siblingCount={1}
        boundaryCount={1}
      />
    </Box>
  );
};

export default PaginationControls;
