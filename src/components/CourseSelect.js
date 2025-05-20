import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const CourseSelect = ({ courses, selectedCourse, setSelectedCourse }) => {
  return (
    <FormControl fullWidth required>
      <InputLabel id="course-label">Curso</InputLabel>
      <Select
        labelId="course-label"
        value={selectedCourse}
        label="Curso"
        onChange={(e) => setSelectedCourse(e.target.value)}
      >
        {courses.map((course) => (
          <MenuItem key={course.id} value={course.id}>
            {course.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CourseSelect;
