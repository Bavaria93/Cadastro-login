import React, { useState, useEffect } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";

const PaginationControls = ({ totalItems, itemsPerPage, onPageChange }) => {
  const [currentPage, setCurrentPage] = useState(0);

  // Notifica o pai sempre que a página muda
  useEffect(() => {
    if (onPageChange) {
      onPageChange(currentPage);
    }
  }, [currentPage, onPageChange]);

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if ((currentPage + 1) * itemsPerPage < totalItems) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  return (
    <Box display="flex" justifyContent="center" mt={2}>
      <IconButton disabled={currentPage === 0} onClick={handlePrevious}>
        <ArrowBack />
      </IconButton>
      <Typography style={{ margin: "0 10px" }}>Página {currentPage + 1}</Typography>
      <IconButton
        disabled={(currentPage + 1) * itemsPerPage >= totalItems}
        onClick={handleNext}
      >
        <ArrowForward />
      </IconButton>
    </Box>
  );
};

export default PaginationControls;
