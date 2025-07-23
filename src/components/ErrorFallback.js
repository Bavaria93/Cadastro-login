import React from "react";
import {
  Box,
  Typography,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useNavigate } from "react-router-dom";

export default function ErrorFallback({ error, errorInfo, onReset }) {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        maxWidth: 600,
        mx: "auto",
        mt: 8,
        p: 4,
        textAlign: "center",
        bgcolor: "background.paper",
        borderRadius: 1,
        boxShadow: 3,
      }}
    >
      {/* Mensagem de erro amigável */}
      <Typography variant="h5" gutterBottom>
        Ops! Algo deu errado.
      </Typography>
      <Typography variant="body1" mb={2}>
        Estamos trabalhando para resolver isto. Você pode recarregar ou voltar à dashboard.
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mb: 3 }}>
        <Button variant="contained" onClick={onReset}>
          Recarregar
        </Button>
        <Button variant="outlined" onClick={() => navigate("/")}>
          Voltar ao Dashboard
        </Button>
      </Box>

      {error && (
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="subtitle1">Detalhes do erro</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography
              component="pre"
              variant="body2"
              textAlign="initial"
              sx={{ whiteSpace: "pre-wrap", fontFamily: "monospace" }}
            >
              {error.toString()}
            </Typography>
            {errorInfo?.componentStack && (
              <Typography
                component="pre"
                variant="body2"
                textAlign="initial"
                sx={{ whiteSpace: "pre-wrap", fontFamily: "monospace", mt: 2 }}
              >
                {errorInfo.componentStack}
              </Typography>
            )}
          </AccordionDetails>
        </Accordion>
      )}
    </Box>
  );
}
