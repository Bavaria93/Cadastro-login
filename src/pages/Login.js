import React, { useState, useContext } from 'react';
import { Container, TextField, Button, Box, Typography, Link } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext'; // ajuste o caminho conforme sua estrutura

function Login({ setLoggedUser }) {
  const { users } = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [erro, setErro] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Busca no contexto o usuário cuja credencial corresponda ao informado
    const foundUser = users.find(
      (user) => user.email === email && user.password === password
    );

    if (foundUser) {
      setErro('');
      // Atualiza o usuário logado na aplicação
      setLoggedUser(foundUser);
      // Redireciona para a página Home
      navigate('/');
    } else {
      setErro('Email ou senha inválidos!');
    }
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: '50px' }}>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        padding={4}
        boxShadow={3}
        borderRadius={8}
        position="relative"
      >
        {/* Link para cadastro de usuário */}
        <Box position="absolute" top={10} right={10}>
          <Link
            component={RouterLink}
            to="/cadastroUsuario"
            variant="body2"
            color="primary"
            underline="hover"
          >
            Não tem uma conta?
          </Link>
        </Box>
        <Typography variant="h4" gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <TextField
            label="Email"
            type="email"
            fullWidth
            variant="outlined"
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Senha"
            type="password"
            fullWidth
            variant="outlined"
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {erro && (
            <Typography color="error" style={{ marginTop: '10px' }}>
              {erro}
            </Typography>
          )}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            style={{ marginTop: '20px' }}
          >
            Entrar
          </Button>
        </form>
      </Box>
    </Container>
  );
}

export default Login;
