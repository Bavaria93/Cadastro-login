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
  TextField,
  CircularProgress,
} from "@mui/material";
import SolicitacaoCard from "../components/SolicitacaoCard";
import EditSolicitacaoDialog from "../components/EditSolicitacaoDialog";
import PaginationControls from "../components/PaginationControls";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function ListaSolicitacoes() {
  // Estados para as solicitações e para a paginação.
  const [dbSolicitacoes, setDbSolicitacoes] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [loadingSolicitacoes, setLoadingSolicitacoes] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const itemsPerPage = 9;

  // Estados para os diálogos.
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedSolicitacaoId, setSelectedSolicitacaoId] = useState(null);

  const navigate = useNavigate();

  // Busca as solicitações salvas no backend com paginação
  useEffect(() => {
    const fetchSolicitacoes = async () => {
      setLoadingSolicitacoes(true);
      try {
        const response = await axios.get("http://localhost:8000/requests/", {
          params: {
            page: currentPage + 1,
            limit: itemsPerPage,
            search: searchTerm,
          },
        });
        console.log("Dados retornados da API:", response.data);
        if (response.data && Array.isArray(response.data.items)) {
          setDbSolicitacoes(response.data.items);
          setTotalItems(response.data.total);
        } else {
          setDbSolicitacoes([]);
          setTotalItems(0);
        }
      } catch (error) {
        console.error("Erro ao buscar solicitações:", error);
        setDbSolicitacoes([]);
        setTotalItems(0);
      } finally {
        setLoadingSolicitacoes(false);
      }
    };

    fetchSolicitacoes();
  }, [currentPage, itemsPerPage, searchTerm]);

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

  const handleDeleteSolicitacao = async () => {
    if (!selectedSolicitacaoId) return;
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
  };

  const formatDate = (dateString) =>
    dateString ? new Date(dateString).toLocaleDateString() : "N/A";

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  return (
    <Container maxWidth="md" sx={{ p: 2 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h4">Lista de Solicitações</Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/cadastroSolicitacao")}
        >
          Cadastrar Solicitação
        </Button>
      </Box>

      <TextField
        fullWidth
        label="Pesquisar Solicitação"
        variant="outlined"
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setCurrentPage(0);
        }}
        sx={{ mb: 2 }}
      />

      {loadingSolicitacoes ? (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
          <CircularProgress />
        </Box>
      ) : dbSolicitacoes.length === 0 ? (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
          <Typography variant="body1">
            O usuário ainda não cadastrou nenhuma solicitação.
          </Typography>
        </Box>
      ) : (
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
      )}

      {/* Controles de Paginação */}
      <Box mt={3}>
        <PaginationControls
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={handlePageChange}
          lazyLoad={false}
        />
      </Box>

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
