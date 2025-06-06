import React, { useContext } from "react";
import { Typography } from "@mui/material";
import { AuthContext } from "../contexts/AuthContext";

const Home = () => {
  const { user } = useContext(AuthContext);

  return (
    <Typography variant="h5">
      {user && user.name
        ? `Bem-vindo ao Home, ${user.name}!`
        : "Bem-vindo ao Home!"}
    </Typography>
  );
};

export default Home;
