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

const EditSolicitacaoDialog = ({ open, onClose, solicitacao, setSolicitacoes }) => {
  const [editedSolicitacao, setEditedSolicitacao] = useState(solicitacao);

  // Atualiza os dados da solicitação quando o diálogo abre ou quando a solicitação muda
  useEffect(() => {
    if (open) {
      setEditedSolicitacao(solicitacao);
    }
  }, [open, solicitacao]);

  const handleInputChange = (field, value) => {
    setEditedSolicitacao((prevSolicitacao) => ({
      ...prevSolicitacao,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(
        `http://localhost:8000/requests/${editedSolicitacao.id}`,
        editedSolicitacao
      );
      const updatedSolicitacao = response.data;
      setSolicitacoes((prevSolicitacoes) =>
        prevSolicitacoes.map((s) =>
          s.id === updatedSolicitacao.id ? updatedSolicitacao : s
        )
      );
      onClose();
    } catch (error) {
      console.error("Erro ao atualizar solicitação:", error);
      onClose();
    }
  };

  if (!editedSolicitacao) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Editar Solicitação</DialogTitle>
      <DialogContent>
        <Box component="form" sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
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

export default EditSolicitacaoDialog;
