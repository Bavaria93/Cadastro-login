import React from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { tipoPublicacaoOptions } from "../constants/tipoPublicacao";

export default function PublicationTypeField({
  tipo,
  onTipoChange,
  inicio,
  onInicioChange,
  fim,
  onFimChange,
  docComprob,
  onDocComprobChange,
}) {
  return (
    <>
      <FormControl fullWidth required>
        <InputLabel id="tipo-label">Tipo de Publicação</InputLabel>
        <Select
          labelId="tipo-label"
          value={tipo}
          label="Tipo de Publicação"
          onChange={onTipoChange}
        >
          {tipoPublicacaoOptions.map((opt) => (
            <MenuItem key={opt} value={opt}>
              {opt}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {tipo === "Publicação de Edital/Abertura das Inscrições" && (
        <>
          <TextField
            label="Início das Inscrições"
            type="date"
            value={inicio}
            onChange={onInicioChange}
            required
            InputLabelProps={{ shrink: true }}
            fullWidth
            sx={{ mt: 2 }}
          />
          <TextField
            label="Fim das Inscrições"
            type="date"
            value={fim}
            onChange={onFimChange}
            required
            InputLabelProps={{ shrink: true }}
            fullWidth
            sx={{ mt: 1 }}
          />
          <FormControl component="fieldset" sx={{ mt: 1 }}>
            <FormLabel>
              Publicar documentação comprobatória junto com o edital?
            </FormLabel>
            <RadioGroup row value={docComprob} onChange={onDocComprobChange}>
              <FormControlLabel value="Sim" control={<Radio />} label="Sim" />
              <FormControlLabel value="Não" control={<Radio />} label="Não" />
            </RadioGroup>
          </FormControl>
        </>
      )}
    </>
  );
}
