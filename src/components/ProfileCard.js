import React from "react";
import { Typography } from "@mui/material";
import GenericCard from "./GenericCard";
import axios from "axios";

const ProfileCard = ({ profile, onEdit, onDelete, formatDate }) => {
  
  // Função de exclusão específica para perfil
  const handleDeleteProfile = async (profileData) => {
    try {
      await axios.delete(`http://localhost:8000/profiles/${profileData.id}`);
      if (onDelete) {
        onDelete(profileData);
      }
    } catch (error) {
      console.error("Erro ao excluir perfil:", error);
    }
  };

  const permissionList =
    profile.permissions && profile.permissions.length > 0
      ? profile.permissions.map((permission) => permission.type).join(", ")
      : "Nenhuma";

  return (
    <GenericCard data={profile} onEdit={onEdit} onDelete={handleDeleteProfile}>
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
          marginBottom: "5px",
          padding: "2px",
          borderRadius: "3px",
          fontSize: "12px",
        }}
      >
        Criado em: {formatDate(profile.creation_date)}
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
        Atualizado em: {formatDate(profile.update_date)}
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
        Permissões: {permissionList}
      </Typography>
    </GenericCard>
  );
};

export default ProfileCard;
