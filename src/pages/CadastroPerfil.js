import axios from "axios";
import React, { useState, useContext } from 'react';
import {
  Container,
  Button,
  Box,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import { UserContext } from '../contexts/UserContext';
import TypeDescriptionFields from '../components/TypeDescriptionFields';

function CadastroPerfil() {
  const { profiles, setProfiles } = useContext(UserContext);
  const [type, setType] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState({});
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');
  const [dialogType, setDialogType] = useState('success');

  const validatePerfilFields = () => {
    let tempErrors = {};
    tempErrors.type = type.trim()
      ? (/\d/.test(type.trim()) ? 'Tipo não pode incluir números' : '')
      : 'Tipo é obrigatório';

    tempErrors.description = description.trim()
      ? (/\d/.test(description.trim()) ? 'Descrição não pode incluir números' : '')
      : 'Descrição é obrigatória';

    setErrors(tempErrors);
    return Object.values(tempErrors).every((msg) => msg === '');
  };

  const clearForm = () => {
    setType('');
    setDescription('');
    setErrors({});
  };

  const handleAddPerfil = async (e) => {
    e.preventDefault();
    if (!validatePerfilFields()) {
      setDialogMessage('Erro ao cadastrar perfil. Verifique os campos.');
      setDialogType('error');
      setDialogOpen(true);
      return;
    }
    const newPerfilData = { type, description };
    try {
      const response = await axios.post('http://localhost:8000/profiles/', newPerfilData);
      const newPerfil = response.data;
      setProfiles([...profiles, newPerfil]);
      setDialogMessage('Perfil cadastrado com sucesso!');
      setDialogType('success');
      setDialogOpen(true);
      clearForm();
    } catch (error) {
      console.error("Erro ao cadastrar perfil:", error);
      setDialogMessage(error.response?.data?.detail || 'Erro ao cadastrar perfil');
      setDialogType('error');
      setDialogOpen(true);
    }
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  return (
    <Container maxWidth="sm" style={{ padding: '20px', backgroundColor: '#f0f4f8' }}>
      <Box component="form" onSubmit={handleAddPerfil} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <Box style={{ backgroundColor: '#ffffff', padding: '20px', borderRadius: '8px' }}>
          <Typography variant="h4" gutterBottom>
            Cadastro de Perfil
          </Typography>
          <TypeDescriptionFields
            type={type}
            description={description}
            onTypeChange={setType}
            onDescriptionChange={setDescription}
            errors={errors}
          />
          <Box display="flex" justifyContent="center" marginTop="10px">
            <Button type="submit" variant="contained" color="primary">
              Cadastrar Perfil
            </Button>
          </Box>
        </Box>
      </Box>

      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>{dialogType === 'success' ? 'Sucesso!' : 'Erro!'}</DialogTitle>
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

export default CadastroPerfil;
