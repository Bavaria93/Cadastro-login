import React from "react";
import { Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";
import Home from "../pages/Home";
import CadastroUsuario from "../pages/CadastroUsuario";
import ListaUsuarios from "../pages/ListaUsuarios";
import CadastroPerfil from "../pages/CadastroPerfil";
import ListaPerfis from "../pages/ListaPerfis";
import AssociarPerfil from "../pages/AssociarPerfil";
import CadastroPermissao from "../pages/CadastroPermissao";
import ListaPermissoes from "../pages/ListaPermissoes";
import AssociarPermissao from "../pages/AssociarPermissao";
import Login from "../pages/Login";

// Novas páginas para Cursos e Solicitações
import ListaCursos from "../pages/ListaCursos";
import CadastroCurso from "../pages/CadastroCurso";
import ListaSolicitacoes from "../pages/ListaSolicitacoes";
import CadastroSolicitacao from "../pages/CadastroSolicitacao";

const MainRoutes = ({ loggedUser, setLoggedUser }) => {
  return (
    <Box sx={{ padding: "20px" }}>
      <Routes>
        <Route path="/" element={<Home loggedUser={loggedUser} />} />
        <Route path="/usuarios" element={<ListaUsuarios />} />
        <Route path="/cadastroUsuario" element={<CadastroUsuario />} />
        <Route path="/perfis" element={<ListaPerfis />} />
        <Route path="/cadastroPerfil" element={<CadastroPerfil />} />
        <Route path="/associarPerfil" element={<AssociarPerfil />} />
        <Route path="/permissoes" element={<ListaPermissoes />} />
        <Route path="/cadastroPermissao" element={<CadastroPermissao />} />
        <Route path="/associarPermissao" element={<AssociarPermissao />} />

        {/* Rotas para Cursos */}
        <Route path="/cursos" element={<ListaCursos />} />
        <Route path="/cadastroCurso" element={<CadastroCurso />} />

        {/* Rotas para Solicitações */}
        <Route path="/solicitacoes" element={<ListaSolicitacoes />} />
        <Route path="/cadastroSolicitacao" element={<CadastroSolicitacao />} />

        <Route
          path="/login"
          element={
            <Login
              setLoggedUser={(user) => {
                setLoggedUser(user);
                localStorage.setItem("loggedUser", JSON.stringify(user));
              }}
            />
          }
        />
      </Routes>
    </Box>
  );
};

export default MainRoutes;
