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

  // Estados para notificações via Dialog do Material UI
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const [dialogType, setDialogType] = useState("success"); // 'success' ou 'error'

  // Busca perfis e permissões do backend ao montar o componente
  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await axios.get("http://localhost:8000/profiles/");
        setProfiles(response.data);
      } catch (error) {
        console.error("Erro ao buscar perfis:", error);
      }
    };

    const fetchPermissions = async () => {
      try {
        const response = await axios.get("http://localhost:8000/permissions/");
        setPermissions(response.data);
      } catch (error) {
        console.error("Erro ao buscar permissões:", error);
      }
    };

    fetchProfiles();
    fetchPermissions();
  }, [setProfiles]);

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
        itemsPerPage={5}
      />

      {/* Seção de Permissões */}
      <PermissionSection
        permissions={permissions}
        selectedPermissions={selectedPermissions}
        onTogglePermission={handleTogglePermission}
        itemsPerPage={5}
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
