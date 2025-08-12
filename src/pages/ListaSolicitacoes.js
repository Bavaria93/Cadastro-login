import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePermission } from "../hooks/usePermission";
import ListPage from "../components/common/ListPage";
import SolicitacaoCard from "../components/solicitacoes/SolicitacaoCard";
import EditSolicitacaoDialog from "../components/solicitacoes/EditSolicitacaoDialog";
import DeleteDialog from "../components/common/DeleteDialog";

export default function ListaSolicitacoes() {
  const navigate = useNavigate();
  const canCreate = usePermission("Cadastrar Solicitação");
  const canEdit = usePermission("Atualizar Solicitação");
  const canDelete = usePermission("Excluir Solicitação");

  const [selected, setSelected] = useState(null);
  const [editOpen, setEditOpen] = useState(false);
  const [delOpen, setDelOpen] = useState(false);
  const [refresh, setRefresh] = useState(0);

  const formatDate = (dateString) =>
    dateString ? new Date(dateString).toLocaleDateString() : "N/A";

  const handleCreate = () => navigate("/solicitacoes/cadastroSolicitacao");

  const handleEdit = (sol) => {
    setSelected(sol);
    setEditOpen(true);
  };

  const handleDelete = (sol) => {
    setSelected(sol);
    setDelOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:8000/requests/${selected.id}`);
      setDelOpen(false);
      setRefresh((r) => r + 1);
    } catch (err) {
      console.error("Erro ao excluir solicitação:", err);
    }
  };

  const renderItem = (solicitacao) => (
    <SolicitacaoCard
      solicitacao={solicitacao}
      onEdit={canEdit ? () => handleEdit(solicitacao) : null}
      onDelete={canDelete ? () => handleDelete(solicitacao) : null}
      formatDate={formatDate}
    />
  );

  return (
    <>
      <ListPage
        endpoint="http://localhost:8000/requests/"
        title="Solicitações"
        singular="Solicitação"
        renderItem={renderItem}
        canCreate={canCreate}
        onCreate={handleCreate}
        refreshTrigger={refresh}
      />

      <EditSolicitacaoDialog
        open={editOpen}
        onClose={() => setEditOpen(false)}
        solicitacao={selected}
        onSaved={() => setRefresh((r) => r + 1)}
      />

      <DeleteDialog
        open={delOpen}
        onClose={() => setDelOpen(false)}
        onConfirm={confirmDelete}
        entityLabel="a solicitação"
        entityValue={selected?.notice_label}
      />
    </>
  );
}
