import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import axios from "axios";

export default function EditPermissionDialog({
  open,
  onClose,
  permission,
  onSaved,
}) {
  const [form, setForm] = useState({ name: "", description: "" });
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({ name: "" });

  useEffect(() => {
    if (permission) {
      setForm({
        name: permission.name || "",
        description: permission.description || "",
      });
    } else {
      setForm({ name: "", description: "" });
    }
    setErrors({ name: "" });
  }, [permission, open]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (name === "name" && errors.name) {
      setErrors((prev) => ({ ...prev, name: "" }));
    }
  };

  const handleSave = async () => {
    if (saving) return;
    const trimmedName = form.name.trim();
    if (!trimmedName) {
      setErrors((prev) => ({ ...prev, name: "Nome é obrigatório" }));
      return;
    }
    try {
      setSaving(true);
      const payload = { ...form, name: trimmedName };
      if (permission) {
        await axios.put(
          `http://localhost:8000/permissions/${permission.id}`,
          payload
        );
      } else {
        await axios.post("http://localhost:8000/permissions/", payload);
      }
      onClose();
      if (onSaved) onSaved();
    } catch (err) {
      console.error("Erro ao salvar permissão:", err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        {permission ? "Editar Permissão" : "Cadastrar Permissão"}
      </DialogTitle>
      <DialogContent>
        <TextField
          label="Nome"
          name="name"
          fullWidth
          margin="normal"
          value={form.name}
          onChange={handleChange}
          error={Boolean(errors.name)}
          helperText={errors.name || ""}
        />
        <TextField
          label="Descrição"
          name="description"
          fullWidth
          margin="normal"
          multiline
          rows={3}
          value={form.description}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={saving}>
          Cancelar
        </Button>
        <Button onClick={handleSave} variant="contained" disabled={saving}>
          Salvar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
