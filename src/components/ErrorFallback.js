import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useNavigate } from "react-router-dom";

export default function ErrorFallback({ error, errorInfo, onReset }) {
  const navigate = useNavigate();
  const [sending, setSending] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);

  const handleSendError = async () => {
    const details = `${error.toString()}\n\n${errorInfo?.componentStack || ""}`;
    setSending(true);

    try {
      // copia para a área de transferência
      await navigator.clipboard.writeText(details);

      // envia ao servidor
      await fetch("/api/report-error", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          error: error.toString(),
          stack: errorInfo?.componentStack,
        }),
      });

      setOpenSuccess(true);
    } catch {
      setOpenError(true);
    } finally {
      setSending(false);
    }
  };

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
      <Typography variant="h5" gutterBottom>
        Ops! Algo deu errado.
      </Typography>
      <Typography variant="body1" mb={2}>
        Estamos trabalhando para resolver isto. Você pode recarregar ou voltar à dashboard.
      </Typography>

      {/* Botões principais */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 2,
          mb: 3,
        }}
      >
        <Button variant="contained" onClick={onReset}>
          Recarregar
        </Button>
        <Button variant="outlined" onClick={() => navigate("/")}>
          Voltar ao Dashboard
        </Button>
      </Box>

      {error && (
        <>
          {/* Detalhes técnicos */}
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
                  sx={{
                    whiteSpace: "pre-wrap",
                    fontFamily: "monospace",
                    mt: 2,
                  }}
                >
                  {errorInfo.componentStack}
                </Typography>
              )}
            </AccordionDetails>
          </Accordion>

          {/* Botão “Enviar relatório” abaixo dos detalhes */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mt: 3,
            }}
          >
            <Button
              variant="contained"
              color="secondary"
              onClick={handleSendError}
              disabled={sending}
            >
              {sending ? <CircularProgress size={20} /> : "Enviar relatório"}
            </Button>
          </Box>
        </>
      )}

      {/* Dialog de sucesso */}
      <Dialog
        open={openSuccess}
        onClose={() => setOpenSuccess(false)}
        aria-labelledby="success-dialog-title"
      >
        <DialogTitle id="success-dialog-title">
          Relatório enviado
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            O erro foi copiado para a área de transferência e enviado com sucesso.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenSuccess(false)}>Ok</Button>
        </DialogActions>
      </Dialog>

      {/* Dialog de falha */}
      <Dialog
        open={openError}
        onClose={() => setOpenError(false)}
        aria-labelledby="error-dialog-title"
      >
        <DialogTitle id="error-dialog-title">
          Falha ao enviar relatório
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Não foi possível enviar o relatório de erro. Tente novamente mais
            tarde.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenError(false)}>Fechar</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
