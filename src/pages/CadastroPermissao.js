import React, { useState, useContext } from 'react';
import { 
  Container, 
  TextField, 
  Button, 
  Box, 
  Typography, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions 
} from '@mui/material';
import { UserContext } from '../contexts/UserContext';
import axios from 'axios';

function CadastroPermissao() {
  // Supondo que o contexto contenha 'permissions' e 'setPermissions'
  const { permissions, setPermissions } = useContext(UserContext);

  // Estados dos campos do formulário
  const [type, setType] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState({});
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');
  const [dialogType, setDialogType] = useState('success'); // 'success' ou 'error'

  // Validação dos campos da permissão
  const validatePermissionFields = () => {
    let tempErrors = {};

    // O regex exige somente letras e espaços
    tempErrors.type = type.trim()
      ? (/^[A-Za-z\s]+$/.test(type.trim()) ? '' : 'Tipo não pode incluir números ou caracteres especiais')
      : 'Tipo é obrigatório';
      
    tempErrors.description = description.trim()
      ? (/^[A-Za-z\s]+$/.test(description.trim()) ? '' : 'Descrição não pode incluir números ou caracteres especiais')
      : 'Descrição é obrigatória';

    setErrors(tempErrors);
    return Object.values(tempErrors).every((msg) => msg === '');
  };

  // Limpa os campos do formulário
  const clearForm = () => {
    setType('');
    setDescription('');
    setErrors({});
  };

  // Conecta com o backend para cadastrar a permissão
  const handleAddPermission = async (e) => {
    e.preventDefault();

    if (!validatePermissionFields()) {
      setDialogMessage('Erro ao cadastrar permissão. Verifique os campos.');
      setDialogType('error');
      setDialogOpen(true);
      return;
    }

    const newPermissionData = {
      type,
      description,
    };

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

  // Fecha o Dialog
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
          <TextField
            label="Tipo"
            value={type}
            onChange={(e) => setType(e.target.value)}
            fullWidth
            margin="normal"
            error={!!errors.type}
            helperText={errors.type}
          />
          <TextField
            label="Descrição"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
            margin="normal"
            error={!!errors.description}
            helperText={errors.description}
          />
          <Box display="flex" justifyContent="center" marginTop="10px">
            <Button type="submit" variant="contained" color="primary">
              Cadastrar Permissão
            </Button>
          </Box>
        </Box>
      </Box>

      {/* Modal de confirmação */}
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
