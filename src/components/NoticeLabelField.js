import React from "react";
import { TextField } from "@mui/material";

export default function NoticeLabelField({ numero, data }) {
  const formatted = data
    ? data.split("-").reverse().join("/")
    : "";
  return (
    <TextField
      label="Rótulo do Edital"
      value={`${numero} - ${formatted}`}
      fullWidth
      variant="filled"
      InputProps={{ readOnly: true }}
    />
  );
}
