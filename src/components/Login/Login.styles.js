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
 * LoginContainer
 * Componente Container do MUI com margem superior maior em telas médias para cima,
 * e margem + padding reduzidos em dispositivos pequenos (breakpoint 'sm').
 */
export const LoginContainer = styled(Container)(({ theme }) => ({
  // Espaçamento top padrão
  marginTop: theme.spacing(8),

  // Em telas pequenas, reduz margem e adiciona padding lateral
  [theme.breakpoints.down('sm')]: {
    marginTop: theme.spacing(4),
    padding: theme.spacing(1),
  },
}));

/**
 * FormBox
 * Box que envolve o <form>, centraliza conteúdo em coluna,
 * aplica padding, sombra e borda arredondada, além de fundo padrão.
 */
export const FormBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',

  // Espaçamento interno de 4 * 8px = 32px
  padding: theme.spacing(4),

  // Sombra moderada vinda do tema
  boxShadow: theme.shadows[3],

  // Raio de borda padrão do tema
  borderRadius: theme.shape.borderRadius,

  // Fundo branco ou equivalente do theme
  backgroundColor: theme.palette.background.paper,
}));


// Title
export const Title = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(3),
}));


// StyledTextField
export const StyledTextField = styled(TextField)(({ theme }) => ({
  width: '100%',
  marginBottom: theme.spacing(2),
}));


/**
 * PasswordAdornmentButton
 * IconButton para o ícone “mostrar/ocultar senha”,
 * com padding reduzido para ajustar-se ao campo de input.
 */
export const PasswordAdornmentButton = styled(IconButton)(
  ({ theme }) => ({
    padding: theme.spacing(0.5),
  })
);

// SubmitButton
export const SubmitButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(3),
}));
