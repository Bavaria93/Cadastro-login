import { styled } from '@mui/material/styles';   // Para criar componentes estilizados com tema MUI
import { AppBar, Toolbar, IconButton, Box, TextField } from '@mui/material';  // Componentes base do layout

// Evita que props personalizadas (appBarLeft/appBarWidth) sejam passadas ao DOM
const shouldForwardProp = (prop) =>
  prop !== 'appBarLeft' && prop !== 'appBarWidth';

export const StyledAppBar = styled(
  AppBar,
  { shouldForwardProp }
)(
  ({ appBarLeft, appBarWidth }) => ({
    position: 'static',                // Mantém o AppBar no fluxo do layout
    backgroundColor: '#3498DB',        // Cor de fundo fixa
    zIndex: 1300,                      // Garante que fique acima de outros elementos
    left: appBarLeft,                  // Deslocamento horizontal controlado por prop
    width: appBarWidth,                // Largura controlada por prop
    transition: 'left 0.3s, width 0.3s'// Anima alterações de posição e tamanho
  })
);

export const StyledToolbar = styled(Toolbar)({
  display: 'flex',     // Layout flex para posicionar itens horizontalmente
  alignItems: 'center' // Alinha verticalmente ao centro
});

export const ToggleButton = styled(IconButton)(({ theme }) => ({
  marginRight: theme.spacing(2),  // Espaçamento à direita
  color: '#fff'                    // Ícones brancos
}));

export const SearchContainer = styled(Box)({
  display: 'flex',       // Flex para expandir o campo de busca
  alignItems: 'center',
  flexGrow: 1            // Ocupa todo o espaço disponível entre botões
});

export const SearchField = styled(TextField)(({ theme }) => ({
  backgroundColor: '#fff',            // Fundo branco para o input
  borderRadius: theme.shape.borderRadius, 
  width: '300px'                      // Largura fixa para consistência visual
}));

export const UserContainer = styled(Box)(({ theme }) => ({
  display: 'flex',                       // Flex para alinhar avatar e texto
  alignItems: 'center',
  color: theme.palette.common.white,     // Texto branco
  cursor: 'pointer',                     // Indica área clicável
  width: '150px',                        // Largura fixa para conter nome e avatar
  overflow: 'hidden',                    // Esconde excesso de conteúdo
  textOverflow: 'ellipsis'               // Trunca texto que ultrapassar a largura
}));
