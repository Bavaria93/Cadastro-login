import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";

export default function FeedbackDialog({ dialog, onClose }) {
  return (
    <Dialog open={dialog.open} onClose={onClose}>
      <DialogTitle>
        {dialog.type === "success" ? "Sucesso!" : "Erro!"}
      </DialogTitle>
      <DialogContent>
        <Typography>{dialog.message}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Fechar</Button>
      </DialogActions>
    </Dialog>
  );
}
