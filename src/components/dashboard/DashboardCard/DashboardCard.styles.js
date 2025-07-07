import { styled } from "@mui/material/styles";
import { Card, CardContent, Typography, Grid } from "@mui/material";

// Grid container com espaçamento inferior
export const StyledGrid = styled(Grid)(({ theme }) => ({
  marginBottom: theme.spacing(4)
}));

// Card que preenche toda a altura disponível
export const StyledCard = styled(Card)(() => ({
  height: "100%"
}));

// Conteúdo interno do Card centralizado
export const StyledCardContent = styled(CardContent)(() => ({
  textAlign: "center"
}));

// Título do card com a tipografia subtitle2 e cor secundária
export const TitleText = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1)
}));

// Valor exibido no card usando a variante h4 da tipografia
export const ValueText = styled(Typography)(({ theme }) => ({
  ...theme.typography.h4
}));
