import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { AuthContext } from "../contexts/AuthContext";

export default function useLoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { enqueueSnackbar } = useSnackbar();
  const { signIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const validateEmailFormat = (v) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = [];

    if (!email.trim()) errors.push("E-mail é obrigatório");
    else if (!validateEmailFormat(email))
      errors.push("Formato de e-mail inválido");

    if (!password) errors.push("Senha é obrigatória");

    if (errors.length) {
      errors.reverse().forEach((msg) =>
        enqueueSnackbar(msg, { variant: "warning" })
      );
      return;
    }

    try {
      await signIn(email, password);
      enqueueSnackbar("Login realizado com sucesso!", {
        variant: "success",
      });
      navigate("/");
    } catch {
      enqueueSnackbar("E-mail ou senha inválidos!", {
        variant: "error",
      });
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    handleSubmit,
  };
}
