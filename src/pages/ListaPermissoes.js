import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePermission } from "../hooks/usePermission";
import ListPage from "../components/common/ListPage";
import PermissionCard from "../components/permissions/PermissionCard";
import EditPermissionDialog from "../components/permissions/EditPermissionDialog";
import DeleteDialog from "../components/common/DeleteDialog";

export default function ListaPermissoes() {
  const navigate = useNavigate();
  const canCreate = usePermission("Cadastrar Permissão");
  const canAssociate = usePermission("Atualizar Perfil");
  const canEdit = usePermission("Atualizar Permissão");
  const canDelete = usePermission("Excluir Permissão");

  const [selected, setSelected] = useState(null);
  const [editOpen, setEditOpen] = useState(false);
  const [delOpen, setDelOpen] = useState(false);
  const [refresh, setRefresh] = useState(0);

  const formatDate = (dateString) =>
    dateString ? new Date(dateString).toLocaleDateString() : "N/A";

  const handleCreate = () => navigate("/permissoes/cadastroPermissao");
  const handleAssociate = () => navigate("/permissoes/associarPermissao");

  const handleEdit = (permission) => {
    setSelected(permission);
    setEditOpen(true);
  };

  const handleDelete = (permission) => {
    setSelected(permission);
    setDelOpen(true);
  };

  const confirmDelete = async () => {
    try {
      if (!selected?.id) return;
      await axios.delete(`http://localhost:8000/permissions/${selected.id}`);
      setDelOpen(false);
      setSelected(null);
      setRefresh((r) => r + 1);
    } catch (err) {
      console.error("Erro ao excluir permissão:", err);
    }
  };

  const renderItem = (permission) => (
    <PermissionCard
      permission={permission}
      onEdit={canEdit ? () => handleEdit(permission) : null}
      onDelete={canDelete ? () => handleDelete(permission) : null}
      formatDate={formatDate}
    />
  );

  return (
    <>
      <ListPage
        endpoint="http://localhost:8000/permissions/"
        title="Permissões"
        singular="Permissão"
        renderItem={renderItem}
        canCreate={canCreate}
        onCreate={handleCreate}
        canAssociate={canAssociate}
        onAssociate={handleAssociate}
        refreshTrigger={refresh}
      />

      <EditPermissionDialog
        open={editOpen}
        onClose={() => setEditOpen(false)}
        permission={selected}
        onSaved={() => setRefresh((r) => r + 1)}
      />

      <DeleteDialog
        open={delOpen}
        onClose={() => setDelOpen(false)}
        onConfirm={confirmDelete}
        entityLabel="a permissão"
        entityValue={selected?.type}
      />
    </>
  );
}
