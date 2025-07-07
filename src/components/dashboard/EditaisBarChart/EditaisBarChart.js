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

// gráfico de barras que mostra número de editais por mês
const EditaisBarChart = () => {
  return (
    // envolve título e gráfico
    <ChartWrapper>
      {/* título do gráfico */}
      <ChartTitle>
        Editais por Mês
      </ChartTitle>

      {/* área reservada para o gráfico, altura fixa */}
      <ChartContent>
        {/* container responsivo ajusta SVG ao espaço */}
        <ResponsiveContainer width="100%" height="100%">
          {/* componente principal do gráfico de barras */}
          <BarChart data={barData}>
            {/* linhas de grade de fundo */}
            <CartesianGrid strokeDasharray="3 3" />
            {/* eixo X mapeando o campo 'month' */}
            <XAxis dataKey="month" />
            {/* eixo Y automático */}
            <YAxis />
            {/* tooltip ao passar o mouse */}
            <Tooltip />
            {/* legenda das séries */}
            <Legend />
            {/* série de barras, usando cor primary */}
            <Bar dataKey="editais" fill="#1976d2" />
          </BarChart>
        </ResponsiveContainer>
      </ChartContent>
    </ChartWrapper>
  );
};

// memoização evita re-render sem necessidade
export default React.memo(EditaisBarChart);
