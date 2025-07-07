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
// Dados de exemplo para inscritos por mês
import { lineData } from "../../../data/dashboardData";
// Componentes estilizados para layout e título
import {
  ChartWrapper,
  ChartTitle,
  ChartContent
} from "./InscritosLineChart.styles";

// Componente de gráfico de linha de inscritos por mês
const InscritosLineChart = () => {
  return (
    // Envolve título e área do gráfico
    <ChartWrapper>
      {/* Título do gráfico */}
      <ChartTitle>Inscritos por Mês</ChartTitle>

      {/* Área fixa para o gráfico responsivo */}
      <ChartContent>
        <ResponsiveContainer width="100%" height="100%">
          {/* LineChart recebe dados e desenha linhas */}
          <LineChart data={lineData}>
            {/* Grade de fundo pontilhada */}
            <CartesianGrid strokeDasharray="3 3" />
            {/* Eixo X baseado no campo 'month' */}
            <XAxis dataKey="month" />
            {/* Eixo Y automático conforme valores */}
            <YAxis />
            {/* Tooltip ao passar o mouse sobre pontos */}
            <Tooltip />
            {/* Legenda das séries */}
            <Legend />
            {/* Série de linha, tipo monotone, com estilo customizado */}
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

// Memoização para evitar re-renders quando não há mudanças
export default React.memo(InscritosLineChart);
