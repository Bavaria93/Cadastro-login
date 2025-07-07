import { styled } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";

// Wrapper geral do gráfico, com margem inferior
export const ChartWrapper = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(4),
}));

// Título do gráfico com tipografia h6 e espaçamento
export const ChartTitle = styled(Typography)(({ theme }) => ({
  ...theme.typography.h6,
  marginBottom: theme.spacing(1),
}));

// Container interno que define altura fixa para o Recharts
export const ChartContent = styled(Box)(() => ({
  width: "100%",
  height: 300,
}));
