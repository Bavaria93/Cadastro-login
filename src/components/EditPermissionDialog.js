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

const EditPermissionDialog = ({ open, onClose, permission, setPermissions }) => {
  const [editedPermission, setEditedPermission] = useState(permission);

  // Atualiza os dados da permissão quando o diálogo abre ou quando a permissão muda
  useEffect(() => {
    if (open) {
      setEditedPermission(permission);
    }
  }, [open, permission]);

  const handleInputChange = (field, value) => {
    setEditedPermission((prevPermission) => ({
      ...prevPermission,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(
        `http://localhost:8000/permissions/${editedPermission.id}`,
        editedPermission
      );
      const updatedPermission = response.data;
      setPermissions((prevPermissions) =>
        prevPermissions.map((p) =>
          p.id === updatedPermission.id ? updatedPermission : p
        )
      );
      onClose();
    } catch (error) {
      console.error("Erro ao atualizar permissão:", error);
      onClose();
    }
  };

  if (!editedPermission) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Editar Permissão</DialogTitle>
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
            value={editedPermission.type || ""}
            onChange={(e) => handleInputChange("type", e.target.value)}
            fullWidth
          />
          <TextField
            label="Descrição"
            value={editedPermission.description || ""}
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

export default EditPermissionDialog;
