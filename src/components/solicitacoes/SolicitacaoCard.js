import React from "react";
import { Typography } from "@mui/material";
import GenericCard from "../GenericCard";

const SolicitacaoCard = ({ solicitacao, onEdit, onDelete, formatDate }) => {
  return (
    <GenericCard data={solicitacao} onEdit={onEdit} onDelete={onDelete}>
      <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
        Rótulo: {solicitacao.notice_label}
      </Typography>
      <Typography variant="body2" color="textSecondary" sx={{ mb: 0.5 }}>
        Função: {solicitacao.job_function}
      </Typography>
      <Typography variant="body2" color="textSecondary" sx={{ mb: 0.5 }}>
        Publicação: {solicitacao.publication_type}
      </Typography>
      <Typography variant="body2" color="textSecondary" sx={{ mb: 0.5 }}>
        Sagitta ID: {solicitacao.sagitta_id}
      </Typography>
      <Typography variant="body2" color="textSecondary" sx={{ mb: 0.5 }}>
        Curso ID: {solicitacao.course_id}
      </Typography>
      <Typography variant="body2" color="textSecondary" sx={{ mb: 0.5 }}>
        Criado em: {formatDate(solicitacao.creation_date)}
      </Typography>
      <Typography variant="body2" color="textSecondary">
        Atualizado em: {formatDate(solicitacao.update_date)}
      </Typography>
    </GenericCard>
  );
};

export default SolicitacaoCard;
