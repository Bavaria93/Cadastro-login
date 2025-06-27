// src/components/PaginationControls.js

import React, { useEffect, useRef } from "react";
import { Box, CircularProgress, Pagination } from "@mui/material";

const PaginationControls = ({
  totalItems,
  itemsPerPage,
  currentPage = 0,    // agora vem do pai
  onPageChange,       // espera (newPageIndex: number)
  lazyLoad = false,   // continua suportando infinite-scroll
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const loaderRef = useRef();

  // infinite‐scroll
  useEffect(() => {
    if (!lazyLoad || currentPage + 1 >= totalPages) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onPageChange(currentPage + 1);
        }
      },
      { threshold: 0.5 }
    );

    obs.observe(loaderRef.current);
    return () => obs.disconnect();
  }, [lazyLoad, currentPage, totalPages, onPageChange]);

  return (
    <Box display="flex" flexDirection="column" alignItems="center" mt={2}>
      {lazyLoad ? (
        // infinite‐scroll spinner
        currentPage + 1 < totalPages && (
          <div ref={loaderRef} style={{ marginTop: 20 }}>
            <CircularProgress />
          </div>
        )
      ) : (
        // paginação tradicional
        <Pagination
          count={totalPages}
          page={currentPage + 1}                     // MUI é 1‐based
          onChange={(_e, newPage) => onPageChange(newPage - 1)}
          color="primary"
          variant="outlined"
          shape="rounded"
          siblingCount={1}
          boundaryCount={1}
        />
      )}
    </Box>
  );
};

export default PaginationControls;
