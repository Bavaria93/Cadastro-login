import axios from "axios";
import React, { useState, useEffect } from "react";
import {
  Container,
  Box,
  Typography,
  TextField,
  Grid,
  CircularProgress,
  Button,
} from "@mui/material";
import PaginationControls from "../PaginationControls";

export default function ListPage({
  endpoint,
  title,
  singular,
  renderItem,
  canCreate = false,
  onCreate,
  itemsPerPage = 9,
  refreshTrigger = 0,
  canAssociate = false,
  onAssociate = null,
}) {
  const [items, setItems] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(endpoint, {
          params: {
            page: currentPage + 1,
            limit: itemsPerPage,
            search: searchTerm,
          },
        });
        setItems(data.items || []);
        setTotalItems(data.total || 0);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
        setItems([]);
        setTotalItems(0);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [endpoint, currentPage, itemsPerPage, searchTerm, refreshTrigger]);

  return (
    <Container maxWidth="md" style={{ padding: "20px" }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">{title}</Typography>

        {/* 🔘 Botões de ação fixos */}
        <Box display="flex" gap={2}>
          {canCreate && onCreate && (
            <Button variant="contained" color="primary" onClick={onCreate}>
              {`Cadastrar ${singular || title.slice(0, -1)}`}
            </Button>
          )}
          {canAssociate && onAssociate && (
            <Button variant="contained" color="secondary" onClick={onAssociate}>
              {`Associar ${singular || title.slice(0, -1)}`}
            </Button>
          )}
        </Box>
      </Box>

      <TextField
        fullWidth
        label={`Pesquisar ${singular || title.slice(0, -1)}`}
        variant="outlined"
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setCurrentPage(0);
        }}
        sx={{ mb: 2 }}
      />

      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight={200}>
          <CircularProgress />
        </Box>
      ) : items.length === 0 ? (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight={200}>
          <Typography variant="body1">
            {searchTerm
              ? "Nenhum resultado encontrado."
              : `Nenhum ${title.toLowerCase()} cadastrado.`}
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={3} justifyContent="center">
          {items.map((item) => (
            <Grid item key={item.id} xs={12} sm={6} md={4}>
              {renderItem(item)}
            </Grid>
          ))}
        </Grid>
      )}

      <Box mt={3}>
        <PaginationControls
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </Box>
    </Container>
  );
}
