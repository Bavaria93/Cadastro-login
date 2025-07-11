// src/hooks/useLoginForm.js
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

export default function useLoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // estados do Snackbar
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMsg, setSnackMsg] = useState("");
  const [snackSeverity, setSnackSeverity] = useState("info");

  const { signIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const validateEmailFormat = (value) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const openSnack = (message, severity = "info") => {
    setSnackMsg(message);
    setSnackSeverity(severity);
    setSnackOpen(true);
  };
  const closeSnack = (_, reason) => {
    if (reason === "clickaway") return;
    setSnackOpen(false);
  };

  const togglePasswordVisibility = () =>
    setShowPassword((s) => !s);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      openSnack("E-mail é obrigatório", "warning");
      return;
    }
    if (!validateEmailFormat(email)) {
      openSnack("Formato de e-mail inválido", "warning");
      return;
    }
    if (!password) {
      openSnack("Senha é obrigatória", "warning");
      return;
    }

    try {
      await signIn(email, password);
      openSnack("Login realizado com sucesso!", "success");
      navigate("/");
    } catch {
      openSnack("E-mail ou senha inválidos!", "error");
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    showPassword,
    togglePasswordVisibility,
    handleSubmit,

    // exposições do Snackbar
    snackOpen,
    snackMsg,
    snackSeverity,
    closeSnack,
  };
}
