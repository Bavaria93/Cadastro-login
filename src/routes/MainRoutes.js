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
import PrivateRoute from "../components/PrivateRoute";

const MainRoutes = ({ loggedUser, setLoggedUser }) => {
  return (
    <Box sx={{ padding: "20px" }}>
      <Routes>
        <Route path="/login" element={<Login setLoggedUser={setLoggedUser} />} />
        <Route path="/cadastroUsuario" element={<CadastroUsuario />} />

        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home loggedUser={loggedUser} />
            </PrivateRoute>
          }
        />
        <Route
          path="/usuarios"
          element={
            <PrivateRoute>
              <ListaUsuarios />
            </PrivateRoute>
          }
        />
        <Route
          path="/perfis"
          element={
            <PrivateRoute>
              <ListaPerfis />
            </PrivateRoute>
          }
        />
        <Route
          path="/cadastroPerfil"
          element={
            <PrivateRoute>
              <CadastroPerfil />
            </PrivateRoute>
          }
        />
        <Route
          path="/associarPerfil"
          element={
            <PrivateRoute>
              <AssociarPerfil />
            </PrivateRoute>
          }
        />
        <Route
          path="/permissoes"
          element={
            <PrivateRoute>
              <ListaPermissoes />
            </PrivateRoute>
          }
        />
        <Route
          path="/cadastroPermissao"
          element={
            <PrivateRoute>
              <CadastroPermissao />
            </PrivateRoute>
          }
        />
        <Route
          path="/associarPermissao"
          element={
            <PrivateRoute>
              <AssociarPermissao />
            </PrivateRoute>
          }
        />

        {/* Rotas para Cursos */}
        <Route
          path="/cursos"
          element={
            <PrivateRoute>
              <ListaCursos />
            </PrivateRoute>
          }
        />
        <Route
          path="/cadastroCurso"
          element={
            <PrivateRoute>
              <CadastroCurso />
            </PrivateRoute>
          }
        />
        {/* Rotas para Solicitações */}
        <Route
          path="/solicitacoes"
          element={
            <PrivateRoute>
              <ListaSolicitacoes />
            </PrivateRoute>
          }
        />
        <Route
          path="/cadastroSolicitacao"
          element={
            <PrivateRoute>
              <CadastroSolicitacao />
            </PrivateRoute>
          }
        />
      </Routes>
    </Box>
  );
};

export default MainRoutes;
