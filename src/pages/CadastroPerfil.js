import React, { useState, useContext } from 'react';
import { Container, TextField, Button, Box, Typography, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { UserContext } from '../contexts/UserContext'; // Ajuste o caminho conforme sua estrutura
import axios from 'axios';

function CadastroPerfil() {
  // Supondo que o contexto contenha 'profiles' e 'setProfiles'
  const { profiles, setProfiles } = useContext(UserContext);

  // Estados dos campos do formulário
  const [type, setType] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState({});
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');
  const [dialogType, setDialogType] = useState('success'); // 'success' ou 'error'

  // Validação dos campos do perfil: verifica se cada campo foi preenchido e segue a mesma lógica de validação
  const validatePerfilFields = () => {
    let tempErrors = {};

    tempErrors.type = type.trim()
      ? (/^[A-Za-z\s]+$/.test(type.trim()) ? '' : 'Tipo não pode incluir números ou caracteres especiais')
      : 'Tipo é obrigatório';
      
    // Validação da descrição igual à do tipo
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

  // Conecta com o backend para cadastrar o perfil
  const handleAddPerfil = async (e) => {
    e.preventDefault();

    if (!validatePerfilFields()) {
      setDialogMessage('Erro ao cadastrar perfil. Verifique os campos.');
      setDialogType('error');
      setDialogOpen(true);
      return;
    }

    const newPerfilData = {
      type,
      description,
    };

    try {
      const response = await axios.post('http://localhost:8000/perfis/', newPerfilData);
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

  // Fecha o Dialog
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
              Cadastrar Perfil
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

export default CadastroPerfil;
