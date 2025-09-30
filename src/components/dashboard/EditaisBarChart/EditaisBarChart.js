import React, { useEffect, useState } from "react";
import axios from "axios";
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
import { ChartWrapper, ChartTitle, ChartContent } from "./EditaisBarChart.styles";

const EditaisBarChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // solicitações
        const requestsRes = await axios.get("http://localhost:8000/requests/");
        let requests = requestsRes.data.items;

        // cursos
        const coursesRes = await axios.get("http://localhost:8000/courses/");
        const courses = coursesRes.data.items;
        const coursesMap = Object.fromEntries(courses.map(c => [c.id, c.name]));

        // ordena solicitações por data (mais recente primeiro)
        requests.sort((a, b) => new Date(b.creation_date) - new Date(a.creation_date));

        // pega só as 5 mais recentes
        requests = requests.slice(0, 5);

        // monta dados agrupando por curso
        const grouped = requests.reduce((acc, req) => {
          const curso = coursesMap[req.course_id] || `Curso ${req.course_id}`;
          acc[curso] = (acc[curso] || 0) + 1;
          return acc;
        }, {});

        const chartData = Object.entries(grouped).map(([curso, solicitacoes]) => ({
          curso,
          solicitacoes
        }));

        setData(chartData);
      } catch (err) {
        console.error("Erro ao carregar dados:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <ChartWrapper>
      <ChartTitle>Solicitações por Curso</ChartTitle>
      <ChartContent>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="curso" /> {/* agora mostra o nome do curso */}
            <YAxis />
            <Tooltip />
            <Legend verticalAlign="top" />
            <Bar dataKey="solicitacoes" fill="#1976d2" />
          </BarChart>
        </ResponsiveContainer>
      </ChartContent>
    </ChartWrapper>
  );
};

export default React.memo(EditaisBarChart);
