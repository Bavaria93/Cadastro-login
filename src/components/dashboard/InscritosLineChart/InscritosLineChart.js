import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line
} from "recharts";
import { Box, Typography } from "@mui/material";
import { lineData } from "../../../data/dashboardData";
import {
  ChartWrapper,
  ChartTitle,
  ChartContent
} from "./InscritosLineChart.styles";

const CustomLegend = ({ payload }) => (
  <Box display="flex" justifyContent="center" gap={2} mb={1}>
    {payload.map((entry) => (
      <Box key={entry.value} display="flex" alignItems="center" gap={1}>
        <Box
          sx={{
            width: 14,
            height: 14,
            border: `2px solid ${entry.color}`,
            borderRadius: "3px"
          }}
        />
        <Typography variant="body2">{entry.value}</Typography>
      </Box>
    ))}
  </Box>
);

const InscritosLineChart = () => {
  return (
    <ChartWrapper>
      <ChartTitle>Evolução das Solicitações</ChartTitle>

      <ChartContent>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={lineData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            {/* legenda customizada no topo */}
            <Legend verticalAlign="top" align="center" content={CustomLegend} />
            <Line
              type="monotone"
              dataKey="inscritos"
              stroke="#388e3c"
              strokeWidth={2}
              dot={{ r: 3 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </ChartContent>
    </ChartWrapper>
  );
};

export default React.memo(InscritosLineChart);
