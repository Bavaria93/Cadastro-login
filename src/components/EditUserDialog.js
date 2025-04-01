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

  // Ao salvar, atualiza o estado global e o localStorage, e fecha o dialog
  const handleSave = () => {
    // Atualiza o usuário no estado
    setLoggedUser(editedUser);
    // Atualiza o usuário no localStorage para persistência
    localStorage.setItem("loggedUser", JSON.stringify(editedUser));
    // Fecha o modal
    onClose();
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
