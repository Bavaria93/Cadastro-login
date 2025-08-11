import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";

const EditCourseDialog = ({ open, onClose, course, onSaved }) => {
  const [editedCourse, setEditedCourse] = useState(course);
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [feedbackType, setFeedbackType] = useState("success");
  const [feedbackMsg, setFeedbackMsg] = useState("");

  useEffect(() => {
    if (open) {
      setEditedCourse(course);
    }
  }, [open, course]);

  const handleInputChange = (field, value) => {
    setEditedCourse((prev) => ({ ...prev, [field]: value }));
  };

  const showFeedback = (type, message) => {
    setFeedbackType(type);
    setFeedbackMsg(message);
    setFeedbackOpen(true);
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(
        `http://localhost:8000/courses/${editedCourse.id}`,
        editedCourse,
        { headers: { "Content-Type": "application/json" } }
      );
      onSaved && onSaved(response.data);
      showFeedback("success", "Curso atualizado com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar curso:", error);
      showFeedback("error", "Erro ao atualizar curso.");
    } finally {
      onClose();
    }
  };

  if (!editedCourse) return null;

  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle>Editar Curso</DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
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
          <Button onClick={onClose}>Cancelar</Button>
          <Button variant="contained" onClick={handleSave}>
            Salvar
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={feedbackOpen} onClose={() => setFeedbackOpen(false)}>
        <DialogTitle>{feedbackType === "success" ? "Sucesso" : "Erro"}</DialogTitle>
        <DialogContent>
          <Typography>{feedbackMsg}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setFeedbackOpen(false)} color={feedbackType === "success" ? "primary" : "error"}>
            Fechar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default EditCourseDialog;
