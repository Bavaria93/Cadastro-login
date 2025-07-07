import React from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from "@mui/material";
import { tableData } from "../../../data/dashboardData";
import { StyledPaper } from "./EditalTable.styles";

// definição das colunas: chave do dado e rótulo exibido
const columns = [
  { id: "edital",     label: "Edital" },
  { id: "status",     label: "Status" },
  { id: "dataInicio", label: "Data Início" },
  { id: "dataFim",    label: "Data Fim" }
];

// componente principal que renderiza a tabela de editais
const EditalTable = () => {
  return (
    // container com barra de rolagem horizontal e padding automático
    <StyledPaper elevation={1}>
      {/* TableHead e TableBody compartilham colunas definidas acima */}
      <Table aria-label="Tabela de Editais">
        <TableHead>
          <TableRow>
            {columns.map(({ id, label }) => (
              // cabeçalho gerado dinamicamente
              <TableCell key={id}>{label}</TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {tableData.map((row) => (
            // cada linha reflete um objeto de tableData
            <TableRow hover key={row.id}>
              {columns.map(({ id }) => (
                // mapeia cada campo da coluna para uma célula
                <TableCell key={id}>{row[id]}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </StyledPaper>
  );
};

// React.memo otimiza evitando re-renders se props não mudarem
export default React.memo(EditalTable);
