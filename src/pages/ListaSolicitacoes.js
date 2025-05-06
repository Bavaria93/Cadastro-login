import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
} from "@mui/material";
import SolicitacaoCard from "../components/SolicitacaoCard";
import EditSolicitacaoDialog from "../components/EditSolicitacaoDialog";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function ListaSolicitacoes() {
  // Estado local para as solicitações obtidas da API
  const [dbSolicitacoes, setDbSolicitacoes] = useState([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedSolicitacaoId, setSelectedSolicitacaoId] = useState(null);

  const navigate = useNavigate();

  // Busca as solicitações salvas no backend e armazena em dbSolicitacoes
  useEffect(() => {
    const fetchSolicitacoes = async () => {
      try {
        const response = await axios.get("http://localhost:8000/requests/");
        console.log("Dados retornados da API:", response.data);
        setDbSolicitacoes(response.data);
      } catch (error) {
        console.error("Erro ao buscar solicitações:", error);
      }
    };
    fetchSolicitacoes();
  }, []);

  const handleOpenEditDialog = (id) => {
    setSelectedSolicitacaoId(id);
    setEditDialogOpen(true);
  };

  const handleCloseEditDialog = () => {
    setSelectedSolicitacaoId(null);
    setEditDialogOpen(false);
  };

  const handleOpenDeleteDialog = (solicitacao) => {
    setSelectedSolicitacaoId(solicitacao.id);
    setDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setSelectedSolicitacaoId(null);
    setDeleteDialogOpen(false);
  };

  // Exclui a solicitação e atualiza a listagem
  const handleDeleteSolicitacao = async () => {
    if (selectedSolicitacaoId) {
      try {
        await axios.delete(`http://localhost:8000/requests/${selectedSolicitacaoId}`);
        setDbSolicitacoes((prevSolicitacoes) =>
          prevSolicitacoes.filter(
            (solicitacao) => solicitacao.id !== selectedSolicitacaoId
          )
        );
        handleCloseDeleteDialog();
      } catch (error) {
        console.error("Erro ao excluir solicitação:", error);
      }
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <Container maxWidth="md" style={{ padding: "20px" }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h4" component="h1">
          Lista de Solicitações
        </Typography>
        <Box display="flex" gap={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/cadastroSolicitacao")}
          >
            Cadastrar Solicitação
          </Button>
        </Box>
      </Box>

      <Grid container spacing={3} justifyContent="center">
        {dbSolicitacoes.map((solicitacao) => (
          <Grid item key={solicitacao.id} xs={12} sm={6} md={4}>
            <SolicitacaoCard
              solicitacao={solicitacao}
              onEdit={() => handleOpenEditDialog(solicitacao.id)}
              onDelete={() => handleOpenDeleteDialog(solicitacao)}
              formatDate={formatDate}
            />
          </Grid>
        ))}
      </Grid>

      {/* Diálogo de Exclusão */}
      <Dialog open={deleteDialogOpen} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Confirmar Exclusão</DialogTitle>
        <DialogContent>
          <Typography>
            Tem certeza de que deseja excluir a solicitação{" "}
            <strong>
              {dbSolicitacoes.find(
                (solicitacao) => solicitacao.id === selectedSolicitacaoId
              )?.notice_label}
            </strong>
            ?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleDeleteSolicitacao} color="secondary">
            Excluir
          </Button>
        </DialogActions>
      </Dialog>

      {/* Modal de Edição de Solicitação */}
      <EditSolicitacaoDialog
        open={editDialogOpen}
        onClose={handleCloseEditDialog}
        solicitacao={dbSolicitacoes.find(
          (solicitacao) => solicitacao.id === selectedSolicitacaoId
        )}
        setSolicitacoes={setDbSolicitacoes}
      />
    </Container>
  );
}

export default ListaSolicitacoes;
