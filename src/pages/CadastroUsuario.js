import axios from 'axios';
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
  DialogActions,
} from '@mui/material';
import { UserContext } from '../contexts/UserContext';

function CadastroUsuario() {
  const { users, setUsers } = useContext(UserContext);

  // Estados dos campos do formulário
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [errors, setErrors] = useState({});
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');
  const [dialogType, setDialogType] = useState('success'); // 'success' ou 'error'

  // Valida os campos do usuário
  const validateUserFields = () => {
    let tempErrors = {};

    tempErrors.name = name
      ? (/^[A-Za-z\s]+$/.test(name) ? '' : 'Nome não pode incluir números')
      : 'Nome é obrigatório';

    tempErrors.email = email
      ? (/.+@.+\..+/.test(email) ? '' : 'Email inválido')
      : 'Email é obrigatório';

    tempErrors.senha = senha ? '' : 'Senha é obrigatória';

    setErrors(tempErrors);
    return Object.values(tempErrors).every((x) => x === '');
  };

  // Limpa os campos do formulário
  const clearForm = () => {
    setName('');
    setEmail('');
    setSenha('');
    setErrors({});
  };

  // Adiciona um novo usuário chamando o backend
  const handleAddUser = async (e) => {
    e.preventDefault();

    if (!validateUserFields()) {
      setDialogMessage('Erro ao cadastrar usuário. Verifique os campos.');
      setDialogType('error');
      setDialogOpen(true);
      return;
    }

    // Importante: adequar os nomes dos campos para o que o backend espera.
    // Observe que no seu schema.py, os campos são "nome", "email" e "senha".
    const newUserData = {
      name,
      email,
      senha,
    };

    try {
      const response = await axios.post('http://localhost:8000/usuarios/', newUserData);
      // Note que o backend retorna o usuário criado (com id, data_criacao, etc.)
      const novoUsuario = response.data;
      // Atualize o contexto com o novo usuário, se desejar
      setUsers([...users, novoUsuario]);

      setDialogMessage('Usuário cadastrado com sucesso!');
      setDialogType('success');
      setDialogOpen(true);
      clearForm();
    } catch (error) {
      console.error(error);
      setDialogMessage(error.response?.data?.detail || 'Erro ao cadastrar usuário');
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
      <Box
        component="form"
        onSubmit={handleAddUser}
        style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}
      >
        <Box style={{ backgroundColor: '#ffffff', padding: '20px', borderRadius: '8px' }}>
          <Typography variant="h4" gutterBottom>
            Cadastro de Usuário
          </Typography>
          <TextField
            label="Nome Completo"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            margin="normal"
            error={!!errors.name}
            helperText={errors.name}
          />
          <TextField
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            margin="normal"
            error={!!errors.email}
            helperText={errors.email}
          />
          <TextField
            label="Senha"
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            fullWidth
            margin="normal"
            error={!!errors.senha}
            helperText={errors.senha}
          />
          <Box display="flex" justifyContent="center" marginTop="10px">
            <Button type="submit" variant="contained" color="primary">
              Cadastrar Usuário
            </Button>
          </Box>
        </Box>
      </Box>

      {/* Modal de confirmação de cadastro */}
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

export default CadastroUsuario;
