import React from "react";
import PropTypes from "prop-types";
import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";

export default function RadioSelectField({
  label,
  name,
  options,
  value,
  onChange,
  orientation = "row",
  disabled = false,
}) {
  return (
    <FormControl component="fieldset" fullWidth disabled={disabled}>
      <FormLabel component="legend">{label}</FormLabel>
      <RadioGroup
        name={name}
        row={orientation === "row"}
        value={value}
        onChange={onChange}
      >
        {options.map((opt) => (
          <FormControlLabel
            key={opt.value ?? opt}
            value={opt.value ?? opt}
            control={<Radio />}
            label={opt.label ?? opt}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
}

RadioSelectField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string,
  options: PropTypes.array.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  orientation: PropTypes.oneOf(["row", "column"]),
  disabled: PropTypes.bool,
};
