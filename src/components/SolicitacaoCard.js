import React from "react";
import { Typography } from "@mui/material";
import GenericCard from "./GenericCard";
import axios from "axios";

const SolicitacaoCard = ({ solicitacao, onEdit, onDelete, formatDate }) => {
  // Função de exclusão específica para solicitação
  const handleDeleteSolicitacao = async (solicitacaoData) => {
    try {
      await axios.delete(`http://localhost:8000/requests/${solicitacaoData.id}`);
      if (onDelete) {
        onDelete(solicitacaoData);
      }
    } catch (error) {
      console.error("Erro ao excluir solicitação:", error);
    }
  };

  return (
    <GenericCard data={solicitacao} onEdit={onEdit} onDelete={handleDeleteSolicitacao}>
      <Typography
        variant="h6"
        style={{
          fontWeight: "bold",
          marginBottom: "5px",
          padding: "3px",
          borderRadius: "3px",
          fontSize: "16px",
        }}
      >
        Rótulo: {solicitacao.notice_label}
      </Typography>
      <Typography
        variant="body2"
        color="textSecondary"
        style={{
          marginBottom: "5px",
          padding: "2px",
          borderRadius: "3px",
          fontSize: "14px",
        }}
      >
        Função: {solicitacao.job_function}
      </Typography>
      <Typography
        variant="body2"
        color="textSecondary"
        style={{
          marginBottom: "5px",
          padding: "2px",
          borderRadius: "3px",
          fontSize: "14px",
        }}
      >
        Tipo de Publicação: {solicitacao.publication_type}
      </Typography>
      <Typography
        variant="body2"
        color="textSecondary"
        style={{
          marginBottom: "5px",
          padding: "2px",
          borderRadius: "3px",
          fontSize: "12px",
        }}
      >
        ID do Sagitta: {solicitacao.sagitta_id}
      </Typography>
      <Typography
        variant="body2"
        color="textSecondary"
        style={{
          marginBottom: "5px",
          padding: "2px",
          borderRadius: "3px",
          fontSize: "12px",
        }}
      >
        Curso ID: {solicitacao.course_id}
      </Typography>
      <Typography
        variant="body2"
        color="textSecondary"
        style={{
          marginBottom: "5px",
          padding: "2px",
          borderRadius: "3px",
          fontSize: "12px",
        }}
      >
        Criado em: {formatDate(solicitacao.creation_date)}
      </Typography>
      <Typography
        variant="body2"
        color="textSecondary"
        style={{
          padding: "2px",
          borderRadius: "3px",
          fontSize: "12px",
        }}
      >
        Atualizado em: {formatDate(solicitacao.update_date)}
      </Typography>
    </GenericCard>
  );
};

export default SolicitacaoCard;
