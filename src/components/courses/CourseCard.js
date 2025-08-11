import React from "react";
import { Typography } from "@mui/material";
import GenericCard from "../GenericCard";

const CourseCard = ({ course, onEdit, onDelete, formatDate }) => {
  return (
    <GenericCard data={course} onEdit={onEdit} onDelete={onDelete}>
      <Typography
        variant="h5"
        sx={{
          fontWeight: "bold",
          mb: 1,
          fontSize: 18,
        }}
      >
        {course.name}
      </Typography>
      <Typography
        variant="body1"
        color="textSecondary"
        sx={{ mb: 0.5, fontSize: 14 }}
      >
        Descrição: {course.description || "Sem descrição"}
      </Typography>
      <Typography
        variant="body2"
        color="textSecondary"
        sx={{ mb: 0.5, fontSize: 12 }}
      >
        Criado em: {formatDate(course.creation_date)}
      </Typography>
      <Typography variant="body2" color="textSecondary" sx={{ fontSize: 12 }}>
        Atualizado em: {formatDate(course.update_date)}
      </Typography>
    </GenericCard>
  );
};

export default CourseCard;
