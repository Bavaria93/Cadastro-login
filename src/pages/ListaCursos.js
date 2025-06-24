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
import PaginationControls from "../components/PaginationControls";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { usePermission } from "../hooks/usePermission";

function ListaCursos() {
  const [dbCourses, setDbCourses] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 9;

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState(null);

  const navigate = useNavigate();
  const canCreateCourses = usePermission("Cadastrar Curso");
  const canEditCourses = usePermission("Atualizar Curso");
  const canDeleteCourses = usePermission("Excluir Curso");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get("http://localhost:8000/courses/", {
          params: { page: currentPage + 1, limit: itemsPerPage },
        });
        console.log("Dados retornados da API:", response.data);
        if (response.data && Array.isArray(response.data.items)) {
          setDbCourses(response.data.items);
          setTotalItems(response.data.total);
        } else {
          setDbCourses([]);
          setTotalItems(0);
        }
      } catch (error) {
        console.error("Erro ao buscar cursos:", error);
      }
    };
    fetchCourses();
  }, [currentPage, itemsPerPage]);

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

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  return (
    <Container maxWidth="md" style={{ padding: "20px" }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" component="h1">Lista de Cursos</Typography>
        <Box display="flex" gap={2}>
          {canCreateCourses && (
            <Button variant="contained" color="primary" onClick={() => navigate("/cadastroCurso")}>
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

      {/* Controles de Paginação */}
      <Box mt={3}>
        <PaginationControls
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
          lazyLoad={false}
        />
      </Box>

      {canDeleteCourses && (
        <Dialog open={deleteDialogOpen} onClose={handleCloseDeleteDialog}>
          <DialogTitle>Confirmar Exclusão</DialogTitle>
          <DialogContent>
            <Typography>
              Tem certeza de que deseja excluir o curso{" "}
              <strong>{dbCourses.find((course) => course.id === selectedCourseId)?.name}</strong>?
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDeleteDialog} color="primary">Cancelar</Button>
            <Button onClick={handleDeleteCourse} color="secondary">Excluir</Button>
          </DialogActions>
        </Dialog>
      )}

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
