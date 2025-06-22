import React, { useContext, useState, useEffect } from "react";
import {
  Container,
  Typography,
  Button,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../contexts/UserContext";
import ProfileSection from "../components/ProfileSection";
import PermissionSection from "../components/PermissionSection";

function AssociarPermissao() {
  const navigate = useNavigate();
  const { profiles, setProfiles } = useContext(UserContext);

  const [permissions, setPermissions] = useState([]);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [selectedPermissions, setSelectedPermissions] = useState([]);

  // Estados para paginação (server side)
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5; // Exibir 5 itens por página
  const [totalItems, setTotalItems] = useState(0);

  // Estados para notificações via Dialog do Material UI
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const [dialogType, setDialogType] = useState("success"); // 'success' ou 'error'

  // Busca perfis e permissões do backend ao montar o componente e ao trocar de página
  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await axios.get("http://localhost:8000/profiles/");
        console.log("Dados retornados da API:", response.data);
        setProfiles(response.data);
      } catch (error) {
        console.error("Erro ao buscar perfis:", error);
      }
    };

    const fetchPermissions = async () => {
      try {
        // Parâmetros da requisição para paginação
        const params = {
          page: currentPage + 1, // backend espera página 1-indexada
          limit: itemsPerPage,
        };
        const response = await axios.get("http://localhost:8000/permissions/", { params });
        console.log("Dados retornados da API:", response.data);
        // Verifica se a resposta está no formato { items: [...], total: number }
        if (response.data && Array.isArray(response.data.items)) {
          setPermissions(response.data.items);
          setTotalItems(response.data.total);
        } else {
          setPermissions([]);
          setTotalItems(0);
        }
      } catch (error) {
        console.error("Erro ao buscar permissões:", error);
        setPermissions([]);
        setTotalItems(0);
      }
    };

    fetchProfiles();
    fetchPermissions();
  }, [setProfiles, currentPage, itemsPerPage]);

  // Seleciona um perfil (único)
  const handleSelectProfile = (profile) => {
    setSelectedProfile(profile);
    // Converte o array de permissões (se houver) para um array de IDs
    setSelectedPermissions(
      profile.permissions ? profile.permissions.map((perm) => perm.id) : []
    );
  };

  // Alterna a seleção de uma permissão
  const handleTogglePermission = (permissionId) => {
    setSelectedPermissions((prev) =>
      prev.includes(permissionId)
        ? prev.filter((id) => id !== permissionId)
        : [...prev, permissionId]
    );
  };

  // Associa as permissões selecionadas ao perfil escolhido via backend
  const handleAssociarPermissao = async () => {
    if (!selectedProfile || selectedPermissions.length === 0) {
      setDialogMessage("Selecione um perfil e ao menos uma permissão!");
      setDialogType("error");
      setDialogOpen(true);
      return;
    }

    try {
      await axios.put(`http://localhost:8000/profiles/${selectedProfile.id}/permissions`, {
        permissions: selectedPermissions,
      });
      setDialogMessage("Permissões associadas com sucesso!");
      setDialogType("success");
      setDialogOpen(true);
    } catch (error) {
      console.error("Erro ao associar permissões:", error);
      setDialogMessage("Erro ao associar permissões. Tente novamente.");
      setDialogType("error");
      setDialogOpen(true);
    }
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  // Handler para mudança de página (usado pelo componente de paginação)
  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  return (
    <Container maxWidth="md" style={{ padding: "20px" }}>
      <Box mb={3}>
        <Typography variant="h4">Associação de Permissões ao Perfil</Typography>
      </Box>

      {/* Seção de Perfis */}
      <ProfileSection
        profiles={profiles}
        selectedProfile={selectedProfile}
        onSelectProfile={handleSelectProfile}
        selectionMode="single" // Força seleção única para associar permissões
        itemsPerPage={5}
      />

      {/* Seção de Permissões – repassando os dados de paginação */}
      <PermissionSection
        permissions={permissions}
        selectedPermissions={selectedPermissions}
        onTogglePermission={handleTogglePermission}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        totalItems={totalItems}
        onPageChange={handlePageChange}
      />

      {/* Botões de ação */}
      <Box mt={4}>
        <Button variant="contained" color="primary" onClick={handleAssociarPermissao}>
          Associar Permissões
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          style={{ marginLeft: "10px" }}
          onClick={() => navigate("/")}
        >
          Voltar para a Home
        </Button>
      </Box>

      {/* Notificação via Dialog */}
      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>{dialogType === "success" ? "Sucesso!" : "Erro!"}</DialogTitle>
        <DialogContent>
          <Typography>{dialogMessage}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Fechar
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default AssociarPermissao;
