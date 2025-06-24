import React, { useEffect, useState, useRef } from "react";
import { Box, CircularProgress, Pagination } from "@mui/material";

const PaginationControls = ({
  totalItems,
  itemsPerPage,
  onPageChange,
  lazyLoad = false,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  useEffect(() => {
    if (onPageChange) {
      onPageChange(currentPage - 1);
    }
  }, [currentPage, onPageChange, totalPages]);

  const observerRef = useRef();
  useEffect(() => {
    if (lazyLoad && observerRef.current && currentPage < totalPages) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setCurrentPage((prev) => Math.min(prev + 1, totalPages));
            }
          });
        },
        {
          threshold: 0.5,
        }
      );
      observer.observe(observerRef.current);
      return () => observer.disconnect();
    }
  }, [lazyLoad, currentPage, totalPages]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" mt={2}>
      {lazyLoad ? (
        currentPage < totalPages && (
          <div ref={observerRef} style={{ marginTop: 20 }}>
            <CircularProgress />
          </div>
        )
      ) : (
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
      )}
    </Box>
  );
};

export default PaginationControls;
