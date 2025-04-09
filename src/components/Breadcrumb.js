import React from "react";
import { useLocation } from "react-router-dom";
import { Typography, Box } from "@mui/material";
import { ChevronRight } from "@mui/icons-material"; // Ícone de separação

const Breadcrumb = () => {
  const location = useLocation();

  // Mapeia as páginas para definir o título corretamente
  const pageTitles = {
    "/": "Home",
    "/usuarios": "Lista de Usuários",
    "/cadastroUsuario": "Cadastro de Usuário",
    "/perfis": "Lista de Perfis",
    "/cadastroPerfil": "Cadastro de Perfil",
    "/associarPerfil": "Associar Perfil",
  };

  // Obtém o título atual com base na rota
  const currentTitle = pageTitles[location.pathname] || "Página";
  const breadcrumbPath = ["Home", currentTitle];

  // Não exibir breadcrumb na página de Login
  if (location.pathname === "/login") return null;

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1.2, opacity: 0.9,
        color: "#34495E",
        mt: 2, // Margem superior para separar do conteúdo
        ml: 2, // Opcional: margem à esquerda
      }}
    >
      <Typography variant="h6" fontWeight="bold">
        {currentTitle}
      </Typography>
      <Typography variant="body1" color="textSecondary" sx={{ display: "flex", alignItems: "center" }}>
        {breadcrumbPath.map((item, index) => (
          <span key={index} style={{ display: "flex", alignItems: "center" }}>
            {index > 0 && <ChevronRight sx={{ fontSize: 18, color: "#7F8C8D", mx: 0.5, verticalAlign: "middle" }} />}
            {item}
          </span>
        ))}
      </Typography>
    </Box >
  );
};

export default Breadcrumb;
