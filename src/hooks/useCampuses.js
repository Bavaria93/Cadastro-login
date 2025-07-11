import { useState, useEffect } from "react";

export default function useCampuses(selectedCourse, courses) {
  const [campuses, setCampuses] = useState([]);
  useEffect(() => {
    if (!selectedCourse) {
      setCampuses([]);
      return;
    }
    const course = courses.find((c) => c.id === selectedCourse);
    setCampuses(course?.campuses || []);
  }, [selectedCourse, courses]);
  return campuses;
}
