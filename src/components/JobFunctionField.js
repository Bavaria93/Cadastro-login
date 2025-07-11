import React from "react";
import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
} from "@mui/material";
import { jobFunctionOptions } from "../constants/jobFunctionOptions";

export default function JobFunctionField({
  value,
  onChange,
  otherValue,
  onOtherChange,
}) {
  return (
    <FormControl component="fieldset">
      <FormLabel>Processo Seletivo para qual função?</FormLabel>
      <RadioGroup row value={value} onChange={onChange}>
        {jobFunctionOptions.map((opt) => (
          <FormControlLabel
            key={opt}
            value={opt}
            control={<Radio />}
            label={opt}
          />
        ))}
      </RadioGroup>
      {value === "Outros" && (
        <TextField
          label="Informe a função"
          value={otherValue}
          onChange={onOtherChange}
          fullWidth
          required
        />
      )}
    </FormControl>
  );
}
