// src/hooks/useLoginForm.js
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { AuthContext } from '../contexts/AuthContext';

export default function useLoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const { signIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const validateEmailFormat = v =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

  const handleSubmit = async e => {
    e?.preventDefault();
    e?.stopPropagation();

    const errors = [];
    if (!email.trim()) errors.push('E-mail é obrigatório');
    else if (!validateEmailFormat(email))
      errors.push('Formato de e-mail inválido');

    if (!password) errors.push('Senha é obrigatória');

    if (errors.length) {
      errors.reverse().forEach(msg =>
        enqueueSnackbar(msg, { variant: 'warning' })
      );
      return;
    }

    try {
      await signIn(email, password);
      enqueueSnackbar('Login realizado com sucesso!', { variant: 'success' });
      navigate('/');
    } catch (err) {
      enqueueSnackbar(err.message, { variant: 'error' });
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    showPassword,
    setShowPassword,
    handleSubmit
  };
}
