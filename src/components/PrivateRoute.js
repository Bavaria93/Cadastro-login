import React from "react";
import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");
  console.log("Token encontrado no PrivateRoute:", token);
  return token ? children : <Navigate to="/login" />;
}

export default PrivateRoute;
