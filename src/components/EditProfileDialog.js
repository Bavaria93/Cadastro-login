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

const EditProfileDialog = ({ open, onClose, profile, setProfiles }) => {
  const [editedProfile, setEditedProfile] = useState(profile);

  // Atualiza os dados do perfil quando o diálogo abre ou quando o perfil muda
  useEffect(() => {
    if (open) {
      setEditedProfile(profile);
    }
  }, [open, profile]);

  const handleInputChange = (field, value) => {
    setEditedProfile((prevProfile) => ({
      ...prevProfile,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(
        `http://localhost:8000/perfis/${editedProfile.id}`,
        editedProfile
      );
      const updatedProfile = response.data;
      setProfiles((prevProfiles) =>
        prevProfiles.map((p) => (p.id === updatedProfile.id ? updatedProfile : p))
      );
      onClose();
    } catch (error) {
      console.error("Erro ao atualizar perfil:", error);
      onClose();
    }
  };

  if (!editedProfile) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Editar Perfil</DialogTitle>
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
            label="Tipo"
            value={editedProfile.type || ""}
            onChange={(e) => handleInputChange("type", e.target.value)}
            fullWidth
          />
          <TextField
            label="Descrição"
            value={editedProfile.description || ""}
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

export default EditProfileDialog;
