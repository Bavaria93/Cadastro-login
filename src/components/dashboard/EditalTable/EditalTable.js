import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableRow,
  TableCell,
  TableBody,
  Typography
} from "@mui/material";
import { StyledPaper } from "./EditalTable.styles";

const columns = [
  { id: "id" },
  { id: "curso" },
  { id: "tipoPublicacao" },
  { id: "dataPublicacao" }
];

const EditalTable = () => {
  const [rows, setRows] = useState([]);

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

        // tipos de publicação
        const pubTypesRes = await axios.get("http://localhost:8000/publication_types/");
        const pubTypes = pubTypesRes.data;
        const pubTypesMap = Object.fromEntries(pubTypes.map(p => [p.id, p.type]));

        // ordena por data de criação (mais recente primeiro)
        requests.sort((a, b) => new Date(b.creation_date) - new Date(a.creation_date));

        // pega só os 5 mais recentes
        requests = requests.slice(0, 5);

        // monta linhas com id fixo de 1 a 5
        const mapped = requests.map((req, index) => ({
          id: index + 1, // 1 é o mais recente
          curso: coursesMap[req.course_id] || req.course_id,
          tipoPublicacao: pubTypesMap[req.publication_type] || req.publication_type,
          dataPublicacao: new Date(req.creation_date).toLocaleDateString("pt-BR")
        }));

        setRows(mapped);
      } catch (err) {
        console.error("Erro ao carregar dados:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <StyledPaper elevation={1}>
      <Typography variant="h6" sx={{ p: 2 }}>
        Solicitações Recentes
      </Typography>

      <Table aria-label="Tabela de Solicitações Recentes">
        <TableBody>
          {rows.map((row) => (
            <TableRow hover key={row.id}>
              {columns.map(({ id }) => (
                <TableCell key={id}>{row[id]}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </StyledPaper>
  );
};

export default React.memo(EditalTable);
