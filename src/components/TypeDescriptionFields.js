import React from "react";
import { Box, TextField } from "@mui/material";

const TypeDescriptionFields = ({
  type,
  description,
  onTypeChange,
  onDescriptionChange,
  errors = {},
}) => {
  return (
    <Box>
      <TextField
        label="Tipo"
        value={type}
        onChange={(e) => onTypeChange(e.target.value)}
        fullWidth
        margin="normal"
        error={!!errors.type}
        helperText={errors.type}
      />
      <TextField
        label="Descrição"
        value={description}
        onChange={(e) => onDescriptionChange(e.target.value)}
        multiline
        fullWidth
        margin="normal"
        rows={6}  // Define uma altura fixa. Ajuste esse número se necessário.
        inputProps={{ maxLength: 300 }}
        error={!!errors.description}
        // Exibe a mensagem de erro (se houver) à esquerda e o contador de caracteres à direita.
        helperText={
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <span>{errors.description || ""}</span>
            <span>{`${description.length}/300`}</span>
          </Box>
        }
      />
    </Box>
  );
};

export default TypeDescriptionFields;
