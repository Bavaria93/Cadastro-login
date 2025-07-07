import { styled } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";

// Wrapper que envolve título e gráfico, com margem inferior
export const ChartWrapper = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(4),
}));

// Título do gráfico usando a variante h6 e espaçamento inferior
export const ChartTitle = styled(Typography)(({ theme }) => ({
  ...theme.typography.h6,
  marginBottom: theme.spacing(1),
}));

// Container que define altura fixa para o responsive chart
export const ChartContent = styled(Box)(() => ({
  width: "100%",
  height: 300,
}));
