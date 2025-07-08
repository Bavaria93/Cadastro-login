import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ErrorFallback = ({ onReset }) => {
  // hook do React Router para navegação programática
  const navigate = useNavigate();

  // leva o usuário de volta à rota principal do Dashboard
  const handleBackToDashboard = () => {
    navigate("/");
  };

  return (
    <Box
      sx={{
        p: 4,
        textAlign: "center",
        bgcolor: "background.paper",
        borderRadius: 1,
      }}
    >
      {/* Mensagem de erro amigável */}
      <Typography variant="h5" gutterBottom>
        Ops! Algo deu errado.
      </Typography>
      <Typography variant="body1" mb={2}>
        Estamos trabalhando para resolver isso. Tente novamente.
      </Typography>

      {/* Botão para tentar recarregar o componente */}
      <Button variant="contained" onClick={onReset}>
        Recarregar
      </Button>

      {/* Espaço entre botões */}
      <Box component="span" sx={{ mx: 1 }} />

      {/* Botão para voltar à dashboard */}
      <Button variant="outlined" onClick={handleBackToDashboard}>
        Voltar ao Dashboard
      </Button>
    </Box>
  );
};

export default ErrorFallback;
