import React, { useState, useContext } from "react";
import {
  Container,
  Button,
  Box,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import { UserContext } from "../contexts/UserContext";
import axios from "axios";

function CadastroSolicitacao() {
  // Supondo que o contexto forneça solicitacoes e setSolicitacoes
  const { solicitacoes, setSolicitacoes } = useContext(UserContext);
  const [noticeLabel, setNoticeLabel] = useState("");
  const [jobFunction, setJobFunction] = useState("");
  const [publicationType, setPublicationType] = useState("");
  const [sagittaId, setSagittaId] = useState("");
  const [courseId, setCourseId] = useState("");
  const [errors, setErrors] = useState({});
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const [dialogType, setDialogType] = useState("success");

  const validateSolicitacaoFields = () => {
    let tempErrors = {};
    tempErrors.noticeLabel = noticeLabel.trim() ? "" : "Rótulo é obrigatório";
    tempErrors.jobFunction = jobFunction.trim() ? "" : "Função é obrigatória";
    tempErrors.publicationType = publicationType.trim() ? "" : "Tipo de publicação é obrigatório";
    tempErrors.sagittaId = sagittaId !== "" ? "" : "ID do Sagitta é obrigatório";
    tempErrors.courseId = courseId !== "" ? "" : "ID do Curso é obrigatório";

    setErrors(tempErrors);
    return Object.values(tempErrors).every((msg) => msg === "");
  };

  const clearForm = () => {
    setNoticeLabel("");
    setJobFunction("");
    setPublicationType("");
    setSagittaId("");
    setCourseId("");
    setErrors({});
  };

  const handleAddSolicitacao = async (e) => {
    e.preventDefault();
    if (!validateSolicitacaoFields()) {
      setDialogMessage("Erro ao cadastrar solicitação. Verifique os campos.");
      setDialogType("error");
      setDialogOpen(true);
      return;
    }
    const newSolicitacaoData = {
      notice_label: noticeLabel,
      job_function: jobFunction,
      publication_type: publicationType,
      sagitta_id: parseInt(sagittaId),
      course_id: parseInt(courseId),
    };
    try {
      const response = await axios.post("http://localhost:8000/requests/", newSolicitacaoData);
      const newSolicitacao = response.data;
      setSolicitacoes([...solicitacoes, newSolicitacao]);
      setDialogMessage("Solicitação cadastrada com sucesso!");
      setDialogType("success");
      setDialogOpen(true);
      clearForm();
    } catch (error) {
      console.error("Erro ao cadastrar solicitação:", error);
      setDialogMessage(error.response?.data?.detail || "Erro ao cadastrar solicitação");
      setDialogType("error");
      setDialogOpen(true);
    }
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  return (
    <Container maxWidth="sm" style={{ padding: "20px", backgroundColor: "#f0f4f8" }}>
      <Box
        component="form"
        onSubmit={handleAddSolicitacao}
        style={{ display: "flex", flexDirection: "column", gap: "15px" }}
      >
        <Box style={{ backgroundColor: "#ffffff", padding: "20px", borderRadius: "8px" }}>
          <Typography variant="h4" gutterBottom>
            Cadastro de Solicitação
          </Typography>
          <TextField
            label="Rótulo do Edital"
            value={noticeLabel}
            onChange={(e) => setNoticeLabel(e.target.value)}
            fullWidth
            margin="normal"
            error={!!errors.noticeLabel}
            helperText={errors.noticeLabel}
          />
          <TextField
            label="Função"
            value={jobFunction}
            onChange={(e) => setJobFunction(e.target.value)}
            fullWidth
            margin="normal"
            error={!!errors.jobFunction}
            helperText={errors.jobFunction}
          />
          <TextField
            label="Tipo de Publicação"
            value={publicationType}
            onChange={(e) => setPublicationType(e.target.value)}
            fullWidth
            margin="normal"
            error={!!errors.publicationType}
            helperText={errors.publicationType}
          />
          <TextField
            label="ID do Sagitta"
            value={sagittaId}
            onChange={(e) => setSagittaId(e.target.value)}
            fullWidth
            margin="normal"
            type="number"
            error={!!errors.sagittaId}
            helperText={errors.sagittaId}
          />
          <TextField
            label="ID do Curso"
            value={courseId}
            onChange={(e) => setCourseId(e.target.value)}
            fullWidth
            margin="normal"
            type="number"
            error={!!errors.courseId}
            helperText={errors.courseId}
          />
          <Box display="flex" justifyContent="center" marginTop="10px">
            <Button type="submit" variant="contained" color="primary">
              Cadastrar Solicitação
            </Button>
          </Box>
        </Box>
      </Box>

      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>{dialogType === "success" ? "Sucesso!" : "Erro!"}</DialogTitle>
        <DialogContent>
          <Typography>{dialogMessage}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Fechar
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default CadastroSolicitacao;
