// src/pages/Login.js
import React from "react";
import {
  InputAdornment,
  Snackbar,
  Alert
} from "@mui/material";
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
    togglePasswordVisibility,
    handleSubmit,
    snackOpen,
    snackMsg,
    snackSeverity,
    closeSnack,
  } = useLoginForm();

  return (
    <LoginContainer maxWidth="sm">
      <FormBox component="form" noValidate onSubmit={handleSubmit}>
        <Title variant="h4">Login</Title>

        <StyledTextField
          label="Email"
          type="email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />

        <StyledTextField
          label="Senha"
          type={showPassword ? "text" : "password"}
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <PasswordAdornmentButton
                  onClick={togglePasswordVisibility}
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

      {/** Aqui fica o Snackbar **/}
      <Snackbar
        open={snackOpen}
        autoHideDuration={3000}
        onClose={closeSnack}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={closeSnack}
          severity={snackSeverity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackMsg}
        </Alert>
      </Snackbar>
    </LoginContainer>
  );
}
