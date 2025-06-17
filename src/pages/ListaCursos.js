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
import CourseCard from "../components/CourseCard";
import EditCourseDialog from "../components/EditCourseDialog";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { usePermission } from "../hooks/usePermission";

function ListaCursos() {
  // Estado local para os cursos obtidos diretamente da API
  const [dbCourses, setDbCourses] = useState([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState(null);

  const navigate = useNavigate();

  // Permissões
  const canCreateCourses = usePermission("Cadastrar Curso");
  const canEditCourses = usePermission("Atualizar Curso");
  const canDeleteCourses = usePermission("Excluir Curso");

  // Busca os cursos salvos no banco (via API) e armazena em dbCourses
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        // Endpoint para cursos
        const response = await axios.get("http://localhost:8000/courses/");
        console.log("Dados retornados da API:", response.data);
        setDbCourses(response.data);
      } catch (error) {
        console.error("Erro ao buscar cursos:", error);
      }
    };

    fetchCourses();
  }, []);

  const handleOpenEditDialog = (courseId) => {
    setSelectedCourseId(courseId);
    setEditDialogOpen(true);
  };

  const handleCloseEditDialog = () => {
    setSelectedCourseId(null);
    setEditDialogOpen(false);
  };

  const handleOpenDeleteDialog = (course) => {
    setSelectedCourseId(course.id);
    setDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setSelectedCourseId(null);
    setDeleteDialogOpen(false);
  };

  // Função para excluir o curso no backend e atualizar a listagem
  const handleDeleteCourse = async () => {
    if (selectedCourseId) {
      try {
        await axios.delete(`http://localhost:8000/courses/${selectedCourseId}`);
        setDbCourses((prevCourses) =>
          prevCourses.filter((course) => course.id !== selectedCourseId)
        );
        handleCloseDeleteDialog();
      } catch (error) {
        console.error("Erro ao excluir curso:", error);
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
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" component="h1">
          Lista de Cursos
        </Typography>
        <Box display="flex" gap={2}>
          {canCreateCourses && (
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate("/cadastroCurso")}
            >
              Cadastrar Curso
            </Button>
          )}
        </Box>
      </Box>

      <Grid container spacing={3} justifyContent="center">
        {dbCourses.map((course) => (
          <Grid item key={course.id} xs={12} sm={6} md={4}>
            <CourseCard
              course={course}
              onEdit={canEditCourses ? () => handleOpenEditDialog(course.id) : null}
              onDelete={canDeleteCourses ? () => handleOpenDeleteDialog(course) : null}
              formatDate={formatDate}
            />
          </Grid>
        ))}
      </Grid>

      {/* Diálogo de Exclusão */}
      {canDeleteCourses && (
        <Dialog open={deleteDialogOpen} onClose={handleCloseDeleteDialog}>
          <DialogTitle>Confirmar Exclusão</DialogTitle>
          <DialogContent>
            <Typography>
              Tem certeza de que deseja excluir o curso{" "}
              <strong>
                {dbCourses.find((course) => course.id === selectedCourseId)?.name}
              </strong>
              ?
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDeleteDialog} color="primary">
              Cancelar
            </Button>
            <Button onClick={handleDeleteCourse} color="secondary">
              Excluir
            </Button>
          </DialogActions>
        </Dialog>
      )}

      {/* Modal de Edição do Curso */}
      {canEditCourses && (
        <EditCourseDialog
          open={editDialogOpen}
          onClose={handleCloseEditDialog}
          course={dbCourses.find((course) => course.id === selectedCourseId)}
          setCourses={setDbCourses}
        />
      )}
    </Container>
  );
}

export default ListaCursos;
