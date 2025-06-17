import React from "react";
import { Typography } from "@mui/material";
import GenericCard from "./GenericCard";
import axios from "axios";

const PermissionCard = ({ permission, onEdit, onDelete, formatDate }) => {
  // Se a propriedade onDelete não for passada, significa que o usuário não tem permissão para excluir,
  // assim, definimos deleteEnabled como false.
  const deleteEnabled = Boolean(onDelete);

  // Função de exclusão específica para a permissão (será passada somente se deleteEnabled for true)
  const handleDeletePermission = async (permissionData) => {
    try {
      await axios.delete(`http://localhost:8000/permissions/${permissionData.id}`);
      if (onDelete) {
        onDelete(permissionData);
      }
    } catch (error) {
      console.error("Erro ao excluir permissão:", error);
    }
  };

  return (
    <GenericCard
      data={permission}
      onEdit={onEdit}
      {...(deleteEnabled && { onDelete: handleDeletePermission })}
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
        Tipo: {permission.type}
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
        Descrição: {permission.description}
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
        Criado em: {formatDate(permission.creation_date)}
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
        Atualizado em: {formatDate(permission.update_date)}
      </Typography>
    </GenericCard>
  );
};

export default PermissionCard;
