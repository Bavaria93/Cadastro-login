import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";

const ProfileCard = ({
  profile,
  onEdit,
  onDelete,
  formatDate, // função para formatar a data
}) => {
  return (
    <Card
      style={{
        width: "100%",
        maxWidth: "250px",
        height: "180px", // Altura menor que a do card de usuário
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        border: "1px solid #dee2e6",
        borderRadius: "10px",
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
        <IconButton
          onClick={(e) => {
            e.stopPropagation();
            onEdit(profile);
          }}
          style={{
            borderRadius: "50%",
          }}
        >
          <Edit />
        </IconButton>
        <IconButton
          onClick={(e) => {
            e.stopPropagation();
            onDelete(profile);
          }}
          style={{
            borderRadius: "50%",
          }}
        >
          <Delete />
        </IconButton>
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
        }}
      >
        <Typography
          variant="h6"
          style={{
            fontWeight: "bold",
            marginBottom: "5px",
            padding: "3px",
            borderRadius: "3px",
            fontSize: "16px",
          }}
        >
          Tipo: {profile.type}
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          style={{
            marginBottom: "5px",
            padding: "2px",
            borderRadius: "3px",
            fontSize: "14px",
          }}
        >
          Descrição: {profile.description}
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          style={{
            padding: "2px",
            borderRadius: "3px",
            fontSize: "12px",
          }}
        >
          Criado em: {formatDate(profile.creation_date)}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
