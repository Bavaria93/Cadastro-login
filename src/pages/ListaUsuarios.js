import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePermission } from "../hooks/usePermission";
import ListPage from "../components/common/ListPage";
import UserCard from "../components/users/UserCard";
import EditUserDialog from "../components/users/EditUserDialog";
import DeleteUserDialog from "../components/users/DeleteUserDialog";

export default function ListaUsuarios() {
  const navigate = useNavigate();
  const canCreate = usePermission("Cadastrar Usuário");
  const canEdit = usePermission("Atualizar Usuário");
  const canDelete = usePermission("Excluir Usuário");

  const [selected, setSelected] = useState(null);
  const [editOpen, setEditOpen] = useState(false);
  const [delOpen, setDelOpen] = useState(false);
  const [refresh, setRefresh] = useState(0);

  const formatDate = (dateString) =>
    dateString ? new Date(dateString).toLocaleDateString() : "N/A";

  const handleCreate = () => navigate("/usuarios/cadastroUsuario");

  const handleEdit = (user) => {
    setSelected(user);
    setEditOpen(true);
  };

  const handleDelete = (user) => {
    setSelected(user);
    setDelOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:8000/users/${selected.id}`);
      setDelOpen(false);
      setRefresh((r) => r + 1);
    } catch (err) {
      console.error("Erro ao excluir usuário:", err);
    }
  };

  const renderItem = (user) => (
    <UserCard
      user={user}
      onEdit={canEdit ? () => handleEdit(user) : null}
      onDelete={canDelete ? () => handleDelete(user) : null}
      formatDate={formatDate}
    />
  );

  return (
    <>
      <ListPage
        endpoint="http://localhost:8000/users/"
        title="Usuários"
        renderItem={renderItem}
        canCreate={canCreate}
        onCreate={handleCreate}
        refreshTrigger={refresh}
      />

      <EditUserDialog
        open={editOpen}
        onClose={() => setEditOpen(false)}
        user={selected}
        onSaved={() => setRefresh((r) => r + 1)}
      />

      <DeleteUserDialog
        open={delOpen}
        onClose={() => setDelOpen(false)}
        user={selected}
        onConfirm={confirmDelete}
      />
    </>
  );
}
