import React from "react";
import { Box, Typography, Grid } from "@mui/material";
import DashboardCardGrid     from "../components/dashboard/DashboardCardGrid/DashboardCardGrid";
import EditalTable           from "../components/dashboard/EditalTable/EditalTable";
import EditaisBarChart       from "../components/dashboard/EditaisBarChart/EditaisBarChart";
import InscritosLineChart    from "../components/dashboard/InscritosLineChart/InscritosLineChart";

const Dashboard = () => (
  <Box sx={{ p: 3 }}>
    <Typography variant="h4" gutterBottom>
      Dashboard de Editais
    </Typography>

    <EditalTable />

    <DashboardCardGrid />

    <Grid container spacing={4}>
      <Grid item xs={12} md={6}>
        <EditaisBarChart />
      </Grid>
      <Grid item xs={12} md={6}>
        <InscritosLineChart />
      </Grid>
    </Grid>
  </Box>
);

export default Dashboard;
