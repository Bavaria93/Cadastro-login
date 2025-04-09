import React from "react";
import { Container, Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

function AssociarPerfil() {
  const navigate = useNavigate();

  return (
    <Container maxWidth="md" style={{ padding: "20px" }}>
      <Box mb={3}>
        <Typography variant="h4" component="h1">
          Associação de Perfil aos Usuários
        </Typography>
      </Box>

      <Typography variant="body1" color="textSecondary" paragraph>
        Nesta página, você poderá associar perfis aos usuários do sistema. Selecione
        o perfil desejado e escolha os usuários correspondentes para realizar a associação.
        {/* Aqui você pode incluir componentes, formulários ou listas que auxiliem na associação */}
      </Typography>

      {/* Exemplo de botão para voltar para a Home */}
      <Box mt={4}>
        <Button variant="contained" color="primary" onClick={() => navigate("/")}>
          Voltar para a Home
        </Button>
      </Box>
    </Container>
  );
}

export default AssociarPerfil;
