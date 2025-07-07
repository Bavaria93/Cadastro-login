import React from "react";
import { Grid } from "@mui/material";
import DashboardCard from "../DashboardCard/DashboardCard";
import { cardData } from "../../../data/dashboardData";

// Componente que monta a grade de cards usando o array cardData
const DashboardCardGrid = () => (
  // Grid principal com espaçamento entre itens
  <Grid container spacing={2} mb={4}>
    {cardData.map((card) => (
      // Para cada item de cardData, renderiza um DashboardCard
      <DashboardCard
        key={card.title}
        title={card.title}
        value={card.value}
      />
    ))}
  </Grid>
);

// Memoização para não renderizar o grid se cardData não mudar
export default React.memo(DashboardCardGrid);
