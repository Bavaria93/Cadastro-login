import React from 'react';
import { LoginContainer } from '../components/Login/Login.styles';
import LoginForm from '../components/Login/LoginForm';

export default function Login() {
  return (
    <LoginContainer maxWidth="sm">
      <LoginForm />
    </LoginContainer>
  );
}
