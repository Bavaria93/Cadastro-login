import React from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
} from "@mui/material";

const CampusesSelect = ({ campuses, selectedCampuses, setSelectedCampuses }) => {
  return (
    <FormControl fullWidth required>
      <InputLabel id="campus-label">Informe os polos</InputLabel>
      <Select
        labelId="campus-label"
        multiple
        value={selectedCampuses}
        onChange={(e) => setSelectedCampuses(e.target.value)}
        renderValue={(selected) =>
          campuses
            .filter((campus) => selected.includes(campus.id))
            .map((campus) => campus.name)
            .join(", ")
        }
      >
        {campuses.map((campus) => (
          <MenuItem key={campus.id} value={campus.id}>
            <Checkbox checked={selectedCampuses.indexOf(campus.id) > -1} />
            <ListItemText primary={campus.name} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CampusesSelect;
