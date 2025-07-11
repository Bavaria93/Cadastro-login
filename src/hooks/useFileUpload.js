import { useRef, useState } from "react";

export default function useFileUpload(maxFiles = 10) {
  const fileInputRef = useRef();
  const [selectedFiles, setSelectedFiles] = useState([]);

  const addFiles = (files) => {
    const arr = Array.from(files).slice(0, maxFiles - selectedFiles.length);
    setSelectedFiles((prev) => [...prev, ...arr]);
  };

  const removeFile = (idx) =>
    setSelectedFiles((prev) => prev.filter((_, i) => i !== idx));

  return { fileInputRef, selectedFiles, addFiles, removeFile };
}
