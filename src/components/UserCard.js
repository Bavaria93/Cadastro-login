// src/components/UserCard.js
import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";

// Componente para exibir as informações de cada usuário sem cores de fundo
const UserCard = ({
  user,
  onEdit,
  onDelete,
  formatDate, // Função para formatar a data
}) => {
  return (
    <Card
      style={{
        width: "100%",
        maxWidth: "250px",
        height: "250px",
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
            onEdit(user);
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
            onDelete(user);
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
          textAlign: "center",
          padding: "10px",
          borderRadius: "5px",
          width: "90%",
          height: "100px",
        }}
      >
        <Typography
          variant="h5"
          style={{
            fontWeight: "bold",
            marginBottom: "10px",
            padding: "3px",
            borderRadius: "3px",
          }}
        >
          {user.name}
        </Typography>
        <Typography
          variant="body1"
          color="textSecondary"
          style={{
            marginBottom: "5px",
            padding: "2px",
            borderRadius: "3px",
          }}
        >
          Email: {user.email}
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          style={{
            marginBottom: "5px",
            padding: "2px",
            borderRadius: "3px",
          }}
        >
          Criado em: {formatDate(user.createdAt)}
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          style={{
            padding: "2px",
            borderRadius: "3px",
          }}
        >
          Atualizado em: {formatDate(user.updatedAt)}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default UserCard;
