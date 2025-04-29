import React, { useState, useContext } from 'react';
import {
  Container,
  Box,
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import { UserContext } from '../contexts/UserContext';
import axios from 'axios';
import TypeDescriptionFields from '../components/TypeDescriptionFields';

function CadastroPermissao() {
  const { permissions, setPermissions } = useContext(UserContext);
  const [type, setType] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState({});
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');
  const [dialogType, setDialogType] = useState('success');

  const validatePermissionFields = () => {
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

  const handleAddPermission = async (e) => {
    e.preventDefault();
    if (!validatePermissionFields()) {
      setDialogMessage('Erro ao cadastrar permissão. Verifique os campos.');
      setDialogType('error');
      setDialogOpen(true);
      return;
    }
    const newPermissionData = { type, description };
    try {
      const response = await axios.post('http://localhost:8000/permissions/', newPermissionData);
      const newPermission = response.data;
      setPermissions([...permissions, newPermission]);
      setDialogMessage('Permissão cadastrada com sucesso!');
      setDialogType('success');
      setDialogOpen(true);
      clearForm();
    } catch (error) {
      console.error("Erro ao cadastrar permissão:", error);
      setDialogMessage(error.response?.data?.detail || 'Erro ao cadastrar permissão');
      setDialogType('error');
      setDialogOpen(true);
    }
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  return (
    <Container maxWidth="sm" style={{ padding: '20px', backgroundColor: '#f0f4f8' }}>
      <Box component="form" onSubmit={handleAddPermission} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <Box style={{ backgroundColor: '#ffffff', padding: '20px', borderRadius: '8px' }}>
          <Typography variant="h4" gutterBottom>
            Cadastro de Permissão
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
              Cadastrar Permissão
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

export default CadastroPermissao;
