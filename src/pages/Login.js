import React, { useState } from 'react';
import {
  Container,
  TextField,
  Button,
  Box,
  Typography,
  Link,
  IconButton,
  InputAdornment,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login({ setLoggedUser }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [erro, setErro] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Cria os parâmetros no formato URLSearchParams
    const params = new URLSearchParams();
    params.append('username', email);
    params.append('password', password);

    try {
      const response = await axios.post(
        'http://localhost:8000/login',
        params,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );

      const { access_token, name, photo } = response.data;

      // Salva o token no localStorage
      localStorage.setItem('token', access_token);

      // Salva os dados do usuário (loggedUser) no localStorage
      const loggedUserData = { email, token: access_token, name, photo };
      localStorage.setItem('loggedUser', JSON.stringify(loggedUserData));

      // Atualiza o estado do usuário e redireciona para a tela inicial
      setLoggedUser(loggedUserData);
      setErro('');
      navigate('/');
    } catch (error) {
      console.error(error);
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
        {/* Link para cadastro */}
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
            type={showPassword ? 'text' : 'password'}
            fullWidth
            variant="outlined"
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleTogglePasswordVisibility}
                    edge="end"
                    aria-label="toggle password visibility"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
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
