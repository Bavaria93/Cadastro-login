import React from "react";
import {
  Table,
  TableRow,
  TableCell,
  TableBody,
  Typography
} from "@mui/material";
import { tableData } from "../../../data/dashboardData";
import { StyledPaper } from "./EditalTable.styles";

// definição das colunas: chave do dado (sem label, já que não vamos exibir)
const columns = [
  { id: "id" },
  { id: "curso" },
  { id: "tipoPublicacao" },
  { id: "dataPublicacao" }
];

const EditalTable = () => {
  return (
    <StyledPaper elevation={1}>
      <Typography variant="h6" sx={{ p: 2 }}>
        Solicitações Recentes
      </Typography>

      <Table aria-label="Tabela de Solicitações Recentes">
        <TableBody>
          {tableData.map((row) => (
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
