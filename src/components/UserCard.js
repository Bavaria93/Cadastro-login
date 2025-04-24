import React from "react";
import { Typography } from "@mui/material";
import GenericCard from "./GenericCard";
import axios from "axios";

const UserCard = ({ user, onEdit, onDelete, formatDate }) => {
  
  // Função de exclusão específica para usuário
  const handleDeleteUser = async (userData) => {
    try {
      await axios.delete(`http://localhost:8000/users/${userData.id}`);
      if (onDelete) {
        onDelete(userData);
      }
    } catch (error) {
      console.error("Erro ao excluir usuário:", error);
    }
  };

  return (
    <GenericCard data={user} onEdit={onEdit} onDelete={handleDeleteUser}>
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
        {user.profiles && user.profiles.length > 0
          ? user.profiles.map((perfil) => perfil.type).join(", ")
          : "Nenhum"}
      </Typography>
    </GenericCard>
  );
};

export default UserCard;
