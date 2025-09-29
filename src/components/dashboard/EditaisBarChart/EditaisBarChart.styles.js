import { styled } from "@mui/material/styles";
import { Box, Typography, Paper } from "@mui/material";

// Wrapper geral do gráfico, agora com Paper para parecer um card
export const ChartWrapper = styled(Paper)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  padding: theme.spacing(2),
  elevation: 1
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
