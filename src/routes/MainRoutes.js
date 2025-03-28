import React from "react";
import { Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";
import Home from "../pages/Home";
import Cadastro from "../pages/Cadastro";
import ListaUsuarios from "../pages/ListaUsuarios";
import Login from "../pages/Login";

const MainRoutes = ({ loggedUser, setLoggedUser }) => {
  return (
    <Box sx={{ padding: "20px" }}>
      <Routes>
        <Route path="/" element={<Home loggedUser={loggedUser} />} />
        <Route path="/usuarios" element={<ListaUsuarios />} />
        <Route path="/cadastro" element={<Cadastro />} />
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
