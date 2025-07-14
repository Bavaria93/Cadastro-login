import React from "react";
import { InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import useLoginForm from "../hooks/useLoginForm";
import {
  LoginContainer,
  FormBox,
  Title,
  StyledTextField,
  PasswordAdornmentButton,
  SubmitButton,
} from "../components/Login/Login.styles";

export default function Login() {
  const {
    email,
    setEmail,
    password,
    setPassword,
    showPassword,
    setShowPassword,
    handleSubmit,
  } = useLoginForm();

  return (
    <LoginContainer maxWidth="sm">
      <FormBox component="form" noValidate onSubmit={handleSubmit}>
        <Title variant="h4">Login</Title>

        <StyledTextField
          label="Email"
          type="email"
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <StyledTextField
          label="Senha"
          type={showPassword ? "text" : "password"}
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <PasswordAdornmentButton
                  onClick={() => setShowPassword((prev) => !prev)}
                  edge="end"
                  aria-label="toggle password visibility"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </PasswordAdornmentButton>
              </InputAdornment>
            ),
          }}
        />

        <SubmitButton type="submit" variant="contained" fullWidth>
          Entrar
        </SubmitButton>
      </FormBox>
    </LoginContainer>
  );
}
