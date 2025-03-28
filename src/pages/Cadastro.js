import React, { useState, useContext } from 'react';
import { Container, TextField, Button, Box, Typography } from '@mui/material';
import { UserContext } from '../contexts/UserContext'; // ajuste o caminho conforme sua estrutura

function Cadastro() {
  // Consumindo o contexto para acessar o estado global de usuários
  const { users, setUsers } = useContext(UserContext);

  // Estados dos campos do formulário
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState(''); // Novo campo para senha
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  
  // Valida os campos do usuário, agora incluindo a senha
  const validateUserFields = () => {
    let tempErrors = {};

    tempErrors.name = name
      ? (/^[A-Za-z\s]+$/.test(name) ? '' : 'Nome não pode incluir números')
      : 'Nome é obrigatório';

    tempErrors.email = email
      ? (/.+@.+\..+/.test(email) ? '' : 'Email inválido')
      : 'Email é obrigatório';

    // Validação para senha: obrigatório e pode incluir outras regras se necessário
    tempErrors.senha = senha ? '' : 'Senha é obrigatória';

    setErrors(tempErrors);
    return Object.values(tempErrors).every((x) => x === '');
  };

  // Limpa os campos do formulário
  const clearForm = () => {
    setName('');
    setEmail('');
    setSenha(''); // Limpa o campo senha
    setErrors({});
  };

  // Adiciona um novo usuário ao contexto
  const handleAddUser = (e) => {
    e.preventDefault();

    if (!validateUserFields()) return;

    const newUser = {
      id: users.length + 1,
      name,
      email,
      senha, // Incluindo a senha no cadastro
    };

    setUsers([...users, newUser]);
    setSuccessMessage('Usuário cadastrado com sucesso!');
    setErrorMessage('');
    clearForm();
  };

  return (
    <Container maxWidth="sm" style={{ padding: '20px', backgroundColor: '#f0f4f8' }}>
      {successMessage && <Typography style={{ color: 'green' }}>{successMessage}</Typography>}
      {errorMessage && <Typography style={{ color: 'red' }}>{errorMessage}</Typography>}
      <Typography variant="h4" gutterBottom>
        Cadastro de Usuário
      </Typography>
      <Box component="form" onSubmit={handleAddUser} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {/* Formulário de Usuário */}
        <Box style={{ backgroundColor: '#ffffff', padding: '20px', borderRadius: '8px' }}>
          <Typography variant="h6" gutterBottom>Informações do Usuário</Typography>
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
        </Box>

        {/* Botão de Cadastro */}
        <Box display="flex" justifyContent="center" marginTop="10px">
          <Button type="submit" variant="contained" color="primary">
            Cadastrar Usuário
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default Cadastro;
