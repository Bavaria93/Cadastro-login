import { styled } from "@mui/material/styles";
import { Paper } from "@mui/material";

// Paper customizado que envolve a tabela
export const StyledPaper = styled(Paper)(({ theme }) => ({
  width: "100%",                     // ocupa 100% da largura do pai
  overflowX: "auto",                 // habilita scroll horizontal se necessário
  marginBottom: theme.spacing(4)     // espaçamento inferior consistente
}));
