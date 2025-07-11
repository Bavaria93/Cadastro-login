import { useState } from "react";

export default function useDialog() {
  const [dialog, setDialog] = useState({
    open: false,
    type: "success",
    message: "",
  });

  const openDialog = (message, type = "success") =>
    setDialog({ open: true, message, type });

  const closeDialog = () =>
    setDialog((prev) => ({ ...prev, open: false }));

  return { dialog, openDialog, closeDialog };
}
