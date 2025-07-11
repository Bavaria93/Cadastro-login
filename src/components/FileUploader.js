import React from "react";
import { Box, Button, Typography } from "@mui/material";

export default function FileUploader({
  fileInputRef,
  selectedFiles,
  addFiles,
  removeFile,
}) {
  return (
    <>
      <Box display="flex" justifyContent="center" my={2}>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => fileInputRef.current.click()}
        >
          Selecionar Documento(s)
        </Button>
        <input
          ref={fileInputRef}
          type="file"
          hidden
          multiple
          onChange={(e) => addFiles(e.target.files)}
        />
      </Box>
      {selectedFiles.length > 0 && (
        <Box m={2}>
          <Typography variant="subtitle1">
            Arquivos Selecionados:
          </Typography>
          {selectedFiles.map((file, idx) => (
            <Box
              key={idx}
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              my={1}
            >
              <Typography variant="body2">{file.name}</Typography>
              <Button onClick={() => removeFile(idx)} color="secondary">
                Remover
              </Button>
            </Box>
          ))}
        </Box>
      )}
    </>
  );
}
