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

export default function EditProfileDialog({
  open,
  onClose,
  profile,
  onSaved,
}) {
  const [form, setForm] = useState({ name: "", description: "" });
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({ name: "" });

  useEffect(() => {
    if (profile) {
      setForm({
        name: profile.name || "",
        description: profile.description || "",
      });
    } else {
      setForm({ name: "", description: "" });
    }
    setErrors({ name: "" });
  }, [profile, open]);

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
      if (profile) {
        await axios.put(
          `http://localhost:8000/profiles/${profile.id}`,
          payload
        );
      } else {
        await axios.post("http://localhost:8000/profiles/", payload);
      }
      onClose();
      if (onSaved) onSaved();
    } catch (err) {
      console.error("Erro ao salvar perfil:", err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        {profile ? "Editar Perfil" : "Cadastrar Perfil"}
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
