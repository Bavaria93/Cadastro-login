import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  TextField,
  Avatar,
  IconButton,
  Typography,
} from "@mui/material";
import { Edit } from "@mui/icons-material";
import axios from "axios";

// Função auxiliar para garantir que a URL da foto seja completa e limpa de espaços
const getFullImageUrl = (photoPath) => {
  if (!photoPath) return "/default-avatar.png";
  const trimmed = photoPath.trim();
  return trimmed.startsWith("http") ? trimmed : `http://localhost:8000${trimmed}`;
};

const EditUserDialog = ({ open, onClose, user, setLoggedUser }) => {
  // Estado local para armazenar os dados editados do usuário
  const [editedUser, setEditedUser] = useState(user);
  // Estado para armazenar a nova foto selecionada (arquivo)
  const [newPhoto, setNewPhoto] = useState(null);
  // Estado para armazenar a URL de pré-visualização da nova foto
  const [previewPhoto, setPreviewPhoto] = useState("");

  // Dialog de feedback
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [feedbackType, setFeedbackType] = useState("success"); // 'success' | 'error'
  const [feedbackMsg, setFeedbackMsg] = useState("");

  // Quando o diálogo abrir, atualiza os dados do usuário e reseta a nova foto
  useEffect(() => {
    if (open) {
      setEditedUser(user);
      setNewPhoto(null);
      setPreviewPhoto("");
    }
  }, [open, user]);

  // Cria a URL de pré-visualização sempre que 'newPhoto' mudar e a revoga quando necessário
  useEffect(() => {
    if (newPhoto) {
      const objectUrl = URL.createObjectURL(newPhoto);
      setPreviewPhoto(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    } else {
      setPreviewPhoto("");
    }
  }, [newPhoto]);

  const handleInputChange = (field, value) => {
    setEditedUser((prevUser) => ({
      ...prevUser,
      [field]: value,
    }));
  };

  // Lida com a seleção do arquivo de nova foto
  const handlePhotoChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setNewPhoto(e.target.files[0]);
    }
  };

  // Exibe diálogo de feedback (sucesso ou erro)
  const showFeedback = (type, message) => {
    setFeedbackType(type);
    setFeedbackMsg(message);
    setFeedbackOpen(true);
  };

  // Ao salvar, atualiza os dados básicos via PUT e, se houver nova foto, realiza o upload
  const handleSave = async () => {
    try {
      // Constrói o payload convertendo o array de perfis (objetos) para um array de IDs,
      // conforme a API espera.
      const payload = {
        ...editedUser,
        ...(editedUser.profiles && {
          profiles: editedUser.profiles.map((profile) => profile.id),
        }),
      };

      // Atualiza os dados básicos do usuário via PUT
      const response = await axios.put(
        `http://localhost:8000/users/${editedUser.id}`,
        payload,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      let updatedUser = response.data;

      // Se uma nova foto foi selecionada, efetua o upload
      if (newPhoto) {
        const formData = new FormData();
        formData.append("file", newPhoto);
        try {
          const photoResponse = await axios.post(
            `http://localhost:8000/users/${editedUser.id}/photo`,
            formData,
            {
              headers: { "Content-Type": "multipart/form-data" },
            }
          );
          updatedUser = photoResponse.data;
        } catch (uploadError) {
          console.error("Erro ao fazer upload da nova foto:", uploadError);
          showFeedback("error", "Erro ao fazer upload da foto.");
        }
      }

      // Atualiza o usuário no estado global e no localStorage para persistência
      setLoggedUser(updatedUser);
      localStorage.setItem("loggedUser", JSON.stringify(updatedUser));

      showFeedback("success", "Usuário atualizado com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
      showFeedback("error", "Erro ao atualizar usuário. Tente novamente.");
    } finally {
      onClose();
    }
  };

  if (!editedUser) return null;

  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle>Editar Dados do Usuário</DialogTitle>
        <DialogContent>
          <Box
            component="form"
            sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}
          >
            {/* Seção de edição da foto posicionada no topo */}
            <Box
              sx={{
                position: "relative",
                width: 80,
                height: 80,
                mb: 2,
              }}
            >
              <Avatar
                src={
                  newPhoto ? previewPhoto : getFullImageUrl(editedUser.photo)
                }
                sx={{ width: 80, height: 80 }}
              />
              <IconButton
                sx={{
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  backgroundColor: "rgba(255,255,255,0.8)",
                  borderRadius: "50%",
                  p: 0.5,
                }}
                component="label"
              >
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={handlePhotoChange}
                />
                <Edit fontSize="small" />
              </IconButton>
            </Box>
            {/* Campos de edição */}
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
              value={editedUser.password || ""}
              onChange={(e) => handleInputChange("password", e.target.value)}
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

      {/* Dialog de feedback */}
      <Dialog open={feedbackOpen} onClose={() => setFeedbackOpen(false)}>
        <DialogTitle>
          {feedbackType === "success" ? "Sucesso" : "Erro"}
        </DialogTitle>
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

export default EditUserDialog;
