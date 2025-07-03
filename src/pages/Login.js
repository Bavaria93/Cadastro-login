import React from 'react';
import { InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

// Hook customizado que encapsula toda a lógica de estado e submissão do formulário de login
import useLoginForm from '../hooks/useLoginForm';

// Componentes estilizados (via MUI styled) para separar a lógica de marcação das regras de estilo
import {
  LoginContainer,           // Container centralizado com margem e espaçamentos
  FormBox,                  // Box que envolve o formulário, aplica padding, sombra e borda arredondada
  Title,                    // Typography para títulos e textos, com espaçamento padronizado
  StyledTextField,          // TextField estilizado para inputs
  PasswordAdornmentButton,  // IconButton estilizado para alternar visibilidade da senha
  SubmitButton             // Button estilizado para o botão de submit
} from '../components/Login/Login.styles';

const Login = () => {
  // Obtemos todos os estados e handlers necessários do hook
  const {
    email,                    // valor atual do campo de email
    setEmail,                 // função para atualizar o email
    password,                 // valor atual do campo de senha
    setPassword,              // função para atualizar a senha
    error,                    // mensagem de erro de login (string vazia se não houver)
    showPassword,             // booleano que controla se a senha está visível
    togglePasswordVisibility, // alterna o valor de showPassword
    handleSubmit              // função que trata o envio do formulário
  } = useLoginForm();

  return (
    // Container principal centralizado, largura máxima 'sm'
    <LoginContainer maxWidth="sm">
      {/* FormBox usa 'component="form"' para tornar esse Box um <form> semanticamente */}
      <FormBox component="form" onSubmit={handleSubmit}>
        {/* Título do formulário */}
        <Title variant="h4">Login</Title>

        {/* Campo de email */}
        <StyledTextField
          label="Email"
          type="email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Campo de senha com botão para alternar visibilidade */}
        <StyledTextField
          label="Senha"
          type={showPassword ? 'text' : 'password'}
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <PasswordAdornmentButton
                  onClick={togglePasswordVisibility}
                  edge="end"
                  aria-label="toggle password visibility"
                >
                  {/* Ícone muda conforme o estado showPassword */}
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </PasswordAdornmentButton>
              </InputAdornment>
            )
          }}
        />

        {/* Exibe mensagem de erro caso exista */}
        {error && (
          <Title variant="body2" color="error">
            {error}
          </Title>
        )}

        {/* Botão de envio do formulário */}
        <SubmitButton type="submit" variant="contained" fullWidth>
          Entrar
        </SubmitButton>
      </FormBox>
    </LoginContainer>
  );
};

export default Login;
