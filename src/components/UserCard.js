import React from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";

// Componente para exibir as informações de cada usuário
const UserCard = ({ user, onEdit, onDelete, formatDate }) => {
  // Função para tratar o clique no botão de edição
  const handleEditClick = (e) => {
    e.stopPropagation();
    onEdit(user);
  };

  // Função para tratar o clique no botão de exclusão,
  // realizando a chamada ao backend para remover o usuário.
  const handleDeleteClick = async (e) => {
    e.stopPropagation();
    try {
      await axios.delete(`http://localhost:8000/usuarios/${user.id}`);
      // Após a exclusão no backend, chama o callback para atualizar a lista no frontend
      if (onDelete) {
        onDelete(user);
      }
    } catch (error) {
      console.error("Erro ao excluir usuário:", error);
    }
  };

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
          onClick={handleEditClick}
          style={{
            borderRadius: "50%",
          }}
        >
          <Edit />
        </IconButton>
        <IconButton
          onClick={handleDeleteClick}
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
          height: "150px",
        }}
      >
        <Typography
          variant="h5"
          style={{
            fontWeight: "bold",
            marginBottom: "10px",
            padding: "3px",
            borderRadius: "3px",
            fontSize: "18px",
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
            fontSize: "14px",
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
            fontSize: "12px",
          }}
        >
          Criado em: {formatDate(user.creation_date)}
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          style={{
            marginBottom: "5px",
            padding: "2px",
            borderRadius: "3px",
            fontSize: "12px",
          }}
        >
          Atualizado em: {formatDate(user.update_date)}
        </Typography>
        {/* Exibindo os perfis associados */}
        <Typography
          variant="body2"
          color="textSecondary"
          style={{
            padding: "2px",
            borderRadius: "3px",
            fontSize: "12px",
          }}
        >
          Perfis:{" "}
          {user.perfis && user.perfis.length > 0
  ? user.perfis.map((perfil) => perfil.type).join(", ")
  : "Nenhum"}

        </Typography>
      </CardContent>
    </Card>
  );
};

export default UserCard;
