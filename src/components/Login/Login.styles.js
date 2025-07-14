import React from 'react';
import { styled } from '@mui/material/styles';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  IconButton
} from '@mui/material';

/**
 * BaseTextField
 * Wrapper para injetar inline-styles em inputProps e InputProps
 */
const BaseTextField = ({ inputProps, InputProps, ...rest }) => (
  <TextField
    {...rest}
    inputProps={{
      style: { color: '#000000' },    // cor do texto e placeholder
      ...inputProps,
    }}
    InputProps={{
      style: { backgroundColor: '#ffffff' }, // cor de fundo do input
      ...InputProps,
    }}
  />
);

export const LoginContainer = styled(Container)({
  /* margin-top: 8 * 8px = 64px */
  marginTop: '64px',

  /* telas pequenas até 600px */
  '@media (max-width:600px)': {
    marginTop: '32px',
    padding: '8px'
  }
});

export const FormBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',

  /* padding interno de 32px */
  padding: '32px',

  /* sombra suave */
  boxShadow: '0 3px 6px rgba(0,0,0,0.16)',

  /* cantos arredondados */
  borderRadius: '4px',

  /* fundo branco */
  backgroundColor: '#fff'
});

export const Title = styled(Typography)({
  marginBottom: '24px'
});

export const StyledTextField = styled(BaseTextField)({
  width: '100%',
  marginBottom: '16px'
});

export const PasswordAdornmentButton = styled(IconButton)({
  padding: '4px'
});

export const SubmitButton = styled(Button)({
  marginTop: '24px'
});
