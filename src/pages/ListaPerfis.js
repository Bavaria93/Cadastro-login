import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { usePermission } from "../hooks/usePermission";
import ListPage from "../components/common/ListPage";
import ProfileCard from "../components/profiles/ProfileCard";
import EditProfileDialog from "../components/profiles/EditProfileDialog";
import DeleteProfileDialog from "../components/profiles/DeleteProfileDialog";

export default function ListaPerfis() {
  const navigate = useNavigate();
  const canCreate = usePermission("Cadastrar Perfil");
  const canEdit = usePermission("Atualizar Perfil");
  const canDelete = usePermission("Excluir Perfil");

  const [selected, setSelected] = useState(null);
  const [editOpen, setEditOpen] = useState(false);
  const [delOpen, setDelOpen] = useState(false);
  const [refresh, setRefresh] = useState(0);

  const formatDate = (dateString) =>
    dateString ? new Date(dateString).toLocaleDateString() : "N/A";

  const handleCreate = () => navigate("/perfis/cadastro");

  const handleEdit = (profile) => {
    setSelected(profile);
    setEditOpen(true);
  };

  const handleDelete = (profile) => {
    setSelected(profile);
    setDelOpen(true);
  };

  const confirmDelete = async () => {
    try {
      if (!selected?.id) return;
      await axios.delete(`http://localhost:8000/profiles/${selected.id}`);
      setDelOpen(false);
      setSelected(null);
      setRefresh((r) => r + 1);
    } catch (err) {
      console.error("Erro ao excluir perfil:", err);
    }
  };

  const renderItem = (profile) => (
    <ProfileCard
      profile={profile}
      onEdit={canEdit ? () => handleEdit(profile) : null}
      onDelete={canDelete ? () => handleDelete(profile) : null}
      formatDate={formatDate}
    />
  );

  return (
    <>
      <ListPage
        endpoint="http://localhost:8000/profiles/"
        title="Perfis"
        singular="Perfil"
        renderItem={renderItem}
        canCreate={canCreate}
        onCreate={handleCreate}
        refreshTrigger={refresh}
      />

      <EditProfileDialog
        open={editOpen}
        onClose={() => setEditOpen(false)}
        profile={selected}
        onSaved={() => setRefresh((r) => r + 1)}
      />

      <DeleteProfileDialog
        open={delOpen}
        onClose={() => setDelOpen(false)}
        profile={selected}
        onConfirm={confirmDelete}
      />
    </>
  );
}
