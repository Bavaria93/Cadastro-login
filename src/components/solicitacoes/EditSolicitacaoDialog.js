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

const EditSolicitacaoDialog = ({ open, onClose, solicitacao, onSaved }) => {
  const [editedSolicitacao, setEditedSolicitacao] = useState(solicitacao);
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [feedbackType, setFeedbackType] = useState("success");
  const [feedbackMsg, setFeedbackMsg] = useState("");

  useEffect(() => {
    if (open) {
      setEditedSolicitacao(solicitacao);
    }
  }, [open, solicitacao]);

  const handleInputChange = (field, value) => {
    setEditedSolicitacao((prev) => ({ ...prev, [field]: value }));
  };

  const showFeedback = (type, message) => {
    setFeedbackType(type);
    setFeedbackMsg(message);
    setFeedbackOpen(true);
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(
        `http://localhost:8000/requests/${editedSolicitacao.id}`,
        editedSolicitacao
      );
      onSaved && onSaved(response.data);
      showFeedback("success", "Solicitação atualizada com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar solicitação:", error);
      showFeedback("error", "Erro ao atualizar. Tente novamente.");
    } finally {
      onClose();
    }
  };

  if (!editedSolicitacao) return null;

  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle>Editar Solicitação</DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
            <TextField
              label="Rótulo do Edital"
              value={editedSolicitacao.notice_label || ""}
              onChange={(e) => handleInputChange("notice_label", e.target.value)}
              fullWidth
            />
            <TextField
              label="Função"
              value={editedSolicitacao.job_function || ""}
              onChange={(e) => handleInputChange("job_function", e.target.value)}
              fullWidth
            />
            <TextField
              label="Tipo de Publicação"
              value={editedSolicitacao.publication_type || ""}
              onChange={(e) => handleInputChange("publication_type", e.target.value)}
              fullWidth
            />
            <TextField
              label="ID do Sagitta"
              value={editedSolicitacao.sagitta_id || ""}
              onChange={(e) => handleInputChange("sagitta_id", e.target.value)}
              fullWidth
              type="number"
            />
            <TextField
              label="ID do Curso"
              value={editedSolicitacao.course_id || ""}
              onChange={(e) => handleInputChange("course_id", e.target.value)}
              fullWidth
              type="number"
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ pb: 2, pr: 2 }}>
          <Button onClick={onClose}>Cancelar</Button>
          <Button onClick={handleSave} variant="contained">
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
          <Button
            onClick={() => setFeedbackOpen(false)}
            color={feedbackType === "success" ? "primary" : "error"}
          >
            Fechar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default EditSolicitacaoDialog;
