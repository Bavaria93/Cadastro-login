import RadioSelectField from "./RadioSelectField";
import TextField from "@mui/material/TextField";
import { jobFunctionOptions } from "../constants/jobFunctionOptions";

export default function JobFunctionField({
  value, onChange,
  otherValue, onOtherChange,
}) {
  return (
    <>
      <RadioSelectField
        label="Função do Processo Seletivo"
        name="jobFunction"
        options={jobFunctionOptions}
        value={value}
        onChange={onChange}
      />

      {value === "Outros" && (
        <TextField
          label="Descreva a função"
          value={otherValue}
          onChange={onOtherChange}
          fullWidth
          required
          sx={{ mt: 2 }}
        />
      )}
    </>
  );
}
