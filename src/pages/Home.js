import React from "react";
import { Typography } from "@mui/material";

const Home = ({ loggedUser }) => {
  return (
    <Typography variant="h5">
      {loggedUser && loggedUser.name
        ? `Bem-vindo ao Home, ${loggedUser.name}!`
        : "Bem-vindo ao Home!"}
    </Typography>
  );
};

export default Home;
