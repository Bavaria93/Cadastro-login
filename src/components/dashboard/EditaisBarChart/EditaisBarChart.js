import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar
} from "recharts";
import { barData } from "../../../data/dashboardData"; 
import {
  ChartWrapper,
  ChartTitle,
  ChartContent
} from "./EditaisBarChart.styles";

const EditaisBarChart = () => {
  return (
    <ChartWrapper>
      <ChartTitle>Solicitações por Curso</ChartTitle>

      <ChartContent>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={barData}>
            <CartesianGrid strokeDasharray="3 3" />
            {/* eixo X agora usa 'curso' */}
            <XAxis dataKey="curso" />
            <YAxis />
            <Tooltip />
            {/* legenda posicionada no topo */}
            <Legend verticalAlign="top" />
            {/* barras representando quantidade de solicitações */}
            <Bar dataKey="solicitacoes" fill="#1976d2" />
          </BarChart>
        </ResponsiveContainer>
      </ChartContent>
    </ChartWrapper>
  );
};

export default React.memo(EditaisBarChart);
