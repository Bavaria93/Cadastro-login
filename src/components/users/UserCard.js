import React from "react";
import { Typography } from "@mui/material";
import GenericCard from "../GenericCard";

const UserCard = ({ user, onEdit, onDelete, formatDate }) => {
  return (
    <GenericCard data={user} onEdit={onEdit} onDelete={onDelete}>
      <Typography
        variant="h5"
        sx={{
          fontWeight: "bold",
          mb: 1,
          fontSize: 18,
        }}
      >
        {user.name}
      </Typography>
      <Typography
        variant="body1"
        color="textSecondary"
        sx={{ mb: 0.5, fontSize: 14 }}
      >
        Email: {user.email}
      </Typography>
      <Typography
        variant="body2"
        color="textSecondary"
        sx={{ mb: 0.5, fontSize: 12 }}
      >
        Criado em: {formatDate(user.creation_date)}
      </Typography>
      <Typography
        variant="body2"
        color="textSecondary"
        sx={{ mb: 0.5, fontSize: 12 }}
      >
        Atualizado em: {formatDate(user.update_date)}
      </Typography>
      <Typography variant="body2" color="textSecondary" sx={{ fontSize: 12 }}>
        Perfis:{" "}
        {user.profiles && user.profiles.length > 0
          ? user.profiles.map((p) => p.type).join(", ")
          : "Nenhum"}
      </Typography>
    </GenericCard>
  );
};

export default UserCard;
