import { styled } from "@mui/material/styles";
import { Box, Typography, Paper } from "@mui/material";

// Wrapper agora é um Paper (card) com padding e margem
export const ChartWrapper = styled(Paper)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  padding: theme.spacing(2),
  elevation: 1
}));

// Título do gráfico
export const ChartTitle = styled(Typography)(({ theme }) => ({
  ...theme.typography.h6,
  marginBottom: theme.spacing(1),
}));

// Container interno com altura fixa
export const ChartContent = styled(Box)(() => ({
  width: "100%",
  height: 300,
}));
