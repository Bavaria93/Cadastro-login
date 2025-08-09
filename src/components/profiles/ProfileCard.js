import React from "react";
import { Typography } from "@mui/material";
import GenericCard from "../GenericCard";

const ProfileCard = ({ profile, onEdit, onDelete, formatDate }) => {
  return (
    <GenericCard data={profile} onEdit={onEdit} onDelete={onDelete}>
      <Typography
        variant="h5"
        sx={{
          fontWeight: "bold",
          mb: 1,
          fontSize: 18,
        }}
      >
        {profile.type}
      </Typography>
      <Typography
        variant="body1"
        color="textSecondary"
        sx={{ mb: 0.5, fontSize: 14 }}
      >
        Descrição: {profile.description || "Sem descrição"}
      </Typography>
      <Typography
        variant="body2"
        color="textSecondary"
        sx={{ mb: 0.5, fontSize: 12 }}
      >
        Criado em: {formatDate(profile.creation_date)}
      </Typography>
      <Typography
        variant="body2"
        color="textSecondary"
        sx={{ fontSize: 12 }}
      >
        Atualizado em: {formatDate(profile.update_date)}
      </Typography>
    </GenericCard>
  );
};

export default ProfileCard;
