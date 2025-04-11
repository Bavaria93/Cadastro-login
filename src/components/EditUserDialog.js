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

const EditUserDialog = ({ open, onClose, user, setLoggedUser }) => {
  // Estado local para armazenar os dados editados do usuário
  const [editedUser, setEditedUser] = useState(user);

  // Quando o diálogo abrir ou o usuário mudar, atualize o estado local
  useEffect(() => {
    if (open) {
      setEditedUser(user);
    }
  }, [open, user]);

  // Atualiza um campo específico do usuário conforme as alterações no input
  const handleInputChange = (field, value) => {
    setEditedUser((prevUser) => ({
      ...prevUser,
      [field]: value,
    }));
  };

  // Ao salvar, faz a requisição PUT para atualizar o usuário no backend
  // e atualiza o estado global e o localStorage com a resposta
  const handleSave = async () => {
    try {
      // Supondo que o endpoint para atualizar seja:
      // http://localhost:8000/usuarios/{usuario_id}
      const response = await axios.put(
        `http://localhost:8000/usuarios/${editedUser.id}`,
        editedUser
      );
      const updatedUser = response.data;
      // Atualiza o usuário no estado global
      setLoggedUser(updatedUser);
      // Atualiza o usuário no localStorage para persistência
      localStorage.setItem("loggedUser", JSON.stringify(updatedUser));
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
    } finally {
      // Fecha o diálogo, independentemente do sucesso ou falha da requisição
      onClose();
    }
  };

  // Se ainda não houver dados para editar, retorne null
  if (!editedUser) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Editar Dados do Usuário</DialogTitle>
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
            value={editedUser.name || ""}
            onChange={(e) => handleInputChange("name", e.target.value)}
            fullWidth
          />
          <TextField
            label="Email"
            value={editedUser.email || ""}
            onChange={(e) => handleInputChange("email", e.target.value)}
            fullWidth
          />
          <TextField
            label="Senha"
            type="password"
            value={editedUser.senha || ""}
            onChange={(e) => handleInputChange("senha", e.target.value)}
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

export default EditUserDialog;
