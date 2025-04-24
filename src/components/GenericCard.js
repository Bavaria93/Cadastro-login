import React from "react";
import { Card, CardContent, Box, IconButton } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";

const GenericCard = ({
  children,
  onEdit,
  onDelete,
  data, // Dados que serão passados para os callbacks
  containerStyles = {},
  contentStyles = {},
}) => {
  return (
    <Card
      style={{
        width: "100%",
        maxWidth: "250px",
        minHeight: "180px",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        border: "1px solid #dee2e6",
        borderRadius: "10px",
        ...containerStyles,
      }}
    >
      <Box
        position="absolute"
        top="10px"
        right="10px"
        display="flex"
        gap="5px"
        style={{
          padding: "3px",
          borderRadius: "5px",
        }}
      >
        {onEdit && (
          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              onEdit(data);
            }}
            style={{ borderRadius: "50%" }}
          >
            <Edit />
          </IconButton>
        )}
        {onDelete && (
          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              onDelete(data);
            }}
            style={{ borderRadius: "50%" }}
          >
            <Delete />
          </IconButton>
        )}
      </Box>
      <CardContent
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          textAlign: "left",
          padding: "10px",
          borderRadius: "5px",
          width: "100%",
          ...contentStyles,
        }}
      >
        {children}
      </CardContent>
    </Card>
  );
};

export default GenericCard;
