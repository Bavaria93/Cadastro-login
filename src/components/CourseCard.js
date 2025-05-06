import React from "react";
import { Typography } from "@mui/material";
import GenericCard from "./GenericCard";
import axios from "axios";

const CourseCard = ({ course, onEdit, onDelete, formatDate }) => {
  // Função de exclusão específica para curso
  const handleDeleteCourse = async (courseData) => {
    try {
      await axios.delete(`http://localhost:8000/courses/${courseData.id}`);
      if (onDelete) {
        onDelete(courseData);
      }
    } catch (error) {
      console.error("Erro ao excluir curso:", error);
    }
  };

  return (
    <GenericCard data={course} onEdit={onEdit} onDelete={handleDeleteCourse}>
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
        Nome: {course.name}
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
        Descrição: {course.description}
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
        Criado em: {formatDate(course.creation_date)}
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
        Atualizado em: {formatDate(course.update_date)}
      </Typography>
    </GenericCard>
  );
};

export default CourseCard;
