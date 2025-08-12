import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePermission } from "../hooks/usePermission";
import ListPage from "../components/common/ListPage";
import CourseCard from "../components/courses/CourseCard";
import EditCourseDialog from "../components/courses/EditCourseDialog";
import DeleteDialog from "../components/common/DeleteDialog";

export default function ListaCursos() {
  const navigate = useNavigate();
  const canCreate = usePermission("Cadastrar Curso");
  const canEdit = usePermission("Atualizar Curso");
  const canDelete = usePermission("Excluir Curso");

  const [selected, setSelected] = useState(null);
  const [editOpen, setEditOpen] = useState(false);
  const [delOpen, setDelOpen] = useState(false);
  const [refresh, setRefresh] = useState(0);

  const formatDate = (dateString) =>
    dateString ? new Date(dateString).toLocaleDateString() : "N/A";

  const handleCreate = () => navigate("/cursos/cadastroCurso");

  const handleEdit = (course) => {
    setSelected(course);
    setEditOpen(true);
  };

  const handleDelete = (course) => {
    setSelected(course);
    setDelOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:8000/courses/${selected.id}`);
      setDelOpen(false);
      setRefresh((r) => r + 1);
    } catch (err) {
      console.error("Erro ao excluir curso:", err);
    }
  };

  const renderItem = (course) => (
    <CourseCard
      course={course}
      onEdit={canEdit ? () => handleEdit(course) : null}
      onDelete={canDelete ? () => handleDelete(course) : null}
      formatDate={formatDate}
    />
  );

  return (
    <>
      <ListPage
        endpoint="http://localhost:8000/courses/"
        title="Cursos"
        renderItem={renderItem}
        canCreate={canCreate}
        onCreate={handleCreate}
        refreshTrigger={refresh}
      />

      <EditCourseDialog
        open={editOpen}
        onClose={() => setEditOpen(false)}
        course={selected}
        onSaved={() => setRefresh((r) => r + 1)}
      />

      <DeleteDialog
        open={delOpen}
        onClose={() => setDelOpen(false)}
        onConfirm={confirmDelete}
        entityLabel="o curso"
        entityValue={selected?.name}
      />
    </>
  );
}
