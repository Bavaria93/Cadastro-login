import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  TextField,
} from "@mui/material";
import axios from "axios";

const EditCourseDialog = ({ open, onClose, course, setCourses }) => {
  const [editedCourse, setEditedCourse] = useState(course);

  // Atualiza os dados do curso quando o diálogo abre ou quando o curso muda
  useEffect(() => {
    if (open) {
      setEditedCourse(course);
    }
  }, [open, course]);

  const handleInputChange = (field, value) => {
    setEditedCourse((prevCourse) => ({
      ...prevCourse,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(
        `http://localhost:8000/courses/${editedCourse.id}`,
        editedCourse
      );
      const updatedCourse = response.data;
      setCourses((prevCourses) =>
        prevCourses.map((c) =>
          c.id === updatedCourse.id ? updatedCourse : c
        )
      );
      onClose();
    } catch (error) {
      console.error("Erro ao atualizar curso:", error);
      onClose();
    }
  };

  if (!editedCourse) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Editar Curso</DialogTitle>
      <DialogContent>
        <Box
          component="form"
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            mt: 1,
          }}
        >
          <TextField
            label="Nome"
            value={editedCourse.name || ""}
            onChange={(e) => handleInputChange("name", e.target.value)}
            fullWidth
          />
          <TextField
            label="Descrição"
            value={editedCourse.description || ""}
            onChange={(e) => handleInputChange("description", e.target.value)}
            fullWidth
          />
        </Box>
      </DialogContent>
      <DialogActions sx={{ pb: 2, pr: 2 }}>
        <Button onClick={onClose} color="primary">
          Cancelar
        </Button>
        <Button onClick={handleSave} color="primary" variant="contained">
          Salvar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditCourseDialog;
