import { useState, useEffect } from "react";
import axios from "axios";

export default function useCourses() {
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8000/courses/")
      .then((res) => setCourses(res.data.items || []))
      .catch(() => setCourses([]));
  }, []);
  return courses;
}
