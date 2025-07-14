import axios from "axios";
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
  List,
  ListItem,
  IconButton,
} from "@mui/material";
import { UserContext } from "../contexts/UserContext";
import DeleteIcon from '@mui/icons-material/Delete';

function CadastroCurso() {
  // Considerando que o contexto forneça courses e setCourses
  const { courses, setCourses } = useContext(UserContext);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  
  // Novo estado para armazenar os nomes dos polos (campuses)
  const [campuses, setCampuses] = useState([]);
  const [campusInput, setCampusInput] = useState("");
  
  const [errors, setErrors] = useState({});
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const [dialogType, setDialogType] = useState("success");

  // Validação dos campos do curso, incluindo a existência de pelo menos um polo
  const validateCursoFields = () => {
    let tempErrors = {};
    tempErrors.name = name.trim()
      ? (/\d/.test(name.trim()) ? "Nome não pode incluir números" : "")
      : "Nome é obrigatório";

    tempErrors.description = description.trim()
      ? (/\d/.test(description.trim()) ? "Descrição não pode incluir números" : "")
      : "Descrição é obrigatória";

    if (campuses.length === 0) {
      tempErrors.campuses = "Adicione pelo menos um polo";
    }
    setErrors(tempErrors);
    return Object.values(tempErrors).every((msg) => msg === "");
  };

  // Limpa os campos do formulário
  const clearForm = () => {
    setName("");
    setDescription("");
    setCampusInput("");
    setCampuses([]);
    setErrors({});
  };

  // Adiciona um polo na lista
  const addCampus = () => {
    if (campusInput.trim() === "") return;
    setCampuses([...campuses, campusInput.trim()]);
    setCampusInput("");
  };

  // Remove um polo da lista
  const removeCampus = (index) => {
    setCampuses(campuses.filter((_, i) => i !== index));
  };

  // Função para cadastrar o curso via API
  const handleAddCurso = async (e) => {
    e.preventDefault();
    if (!validateCursoFields()) {
      setDialogMessage("Erro ao cadastrar curso. Verifique os campos.");
      setDialogType("error");
      setDialogOpen(true);
      return;
    }
    const newCursoData = { name, description, campuses };
    try {
      const response = await axios.post("http://localhost:8000/courses/", newCursoData);
      const newCurso = response.data;
      setCourses([...courses, newCurso]);
      setDialogMessage("Curso cadastrado com sucesso!");
      setDialogType("success");
      setDialogOpen(true);
      clearForm();
    } catch (error) {
      console.error("Erro ao cadastrar curso:", error);
      setDialogMessage(error.response?.data?.detail || "Erro ao cadastrar curso");
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
        onSubmit={handleAddCurso}
        style={{ display: "flex", flexDirection: "column", gap: "15px" }}
      >
        <Box style={{ backgroundColor: "#ffffff", padding: "20px", borderRadius: "8px" }}>
          <Typography variant="h4" gutterBottom>
            Cadastro de Curso
          </Typography>
          <TextField
            label="Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            margin="normal"
            error={!!errors.name}
            helperText={errors.name}
          />
          <TextField
            label="Descrição"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
            margin="normal"
            multiline
            rows={6}
            inputProps={{ maxLength: 300 }}
            error={!!errors.description}
            helperText={
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <span>{errors.description || ""}</span>
                <span>{`${description.length}/300`}</span>
              </Box>
            }
          />
          {/* Seção para adicionar polos */}
          <Box>
            <Typography variant="h6">Adicionar Polos</Typography>
            <Box style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
              <TextField 
                label="Nome do Polo"
                value={campusInput}
                onChange={(e) => setCampusInput(e.target.value)}
                fullWidth
              />
              <Button variant="contained" onClick={addCampus}>
                Adicionar
              </Button>
            </Box>
            {errors.campuses && (
              <Typography variant="caption" color="error">
                {errors.campuses}
              </Typography>
            )}
            <List>
              {campuses.map((campus, index) => (
                <ListItem key={index} secondaryAction={
                  <IconButton edge="end" onClick={() => removeCampus(index)}>
                    <DeleteIcon />
                  </IconButton>
                }>
                  {campus}
                </ListItem>
              ))}
            </List>
          </Box>
          <Box display="flex" justifyContent="center" marginTop="10px">
            <Button type="submit" variant="contained" color="primary">
              Cadastrar Curso
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

export default CadastroCurso;
