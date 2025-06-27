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

  // Estados de loading
  const [loadingPermissions, setLoadingPermissions] = useState(false);

  // Paginação e busca de perfis
  const [profileSearchTerm, setProfileSearchTerm] = useState("");
  const [profileCurrentPage, setProfileCurrentPage] = useState(0);
  const constProfileItemsPerPage = 5;
  const [totalProfiles, setTotalProfiles] = useState(0);

  // Paginação e busca de permissões
  const [permissionSearchTerm, setPermissionSearchTerm] = useState("");
  const [permissionsCurrentPage, setPermissionsCurrentPage] = useState(0);
  const constPermissionsItemsPerPage = 5;
  const [totalPermissions, setTotalPermissions] = useState(0);

  // Estados para seleção
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [selectedPermissions, setSelectedPermissions] = useState([]);

  // Estados para notificações via Dialog
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const [dialogType, setDialogType] = useState("success");

  // Requisição de perfis com paginação
  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const params = {
          page: profileCurrentPage + 1, // backend espera página iniciada em 1
          limit: constProfileItemsPerPage,
          search: profileSearchTerm,    // envia o termo de busca
        };
        const response = await axios.get("http://localhost:8000/profiles/", { params });
        console.log("Dados retornados da API:", response.data);
        // Supondo que o backend retorne { items: [...], total: <número> }
        if (response.data && Array.isArray(response.data.items)) {
          setProfiles(response.data.items);
          setTotalProfiles(response.data.total);
        } else {
          setProfiles([]);
          setTotalProfiles(0);
        }
      } catch (error) {
        console.error("Erro ao buscar perfis:", error);
        setProfiles([]);
        setTotalProfiles(0);
      }
    };

    fetchProfiles();
  }, [setProfiles, profileCurrentPage, constProfileItemsPerPage, profileSearchTerm]);

  // Requisição de permissões com paginação
  useEffect(() => {
    const fetchPermissions = async () => {
      setLoadingPermissions(true);
      try {
        const params = {
          page: permissionsCurrentPage + 1,
          limit: constPermissionsItemsPerPage,
          search: permissionSearchTerm,  // envia termo de busca
        };
        const response = await axios.get(
          "http://localhost:8000/permissions/",
          { params }
        );
        console.log("Dados retornados da API:", response.data);
        if (response.data && Array.isArray(response.data.items)) {
          setPermissions(response.data.items);
          setTotalPermissions(response.data.total);
        } else {
          setPermissions([]);
          setTotalPermissions(0);
        }
      } catch (error) {
        console.error("Erro ao buscar permissões:", error);
        setPermissions([]);
        setTotalPermissions(0);
      } finally {
        setLoadingPermissions(false);
      }
    };

    fetchPermissions();
  }, [permissionsCurrentPage, constPermissionsItemsPerPage, permissionSearchTerm]);

  // Seleciona um perfil (modo seleção única)
  const handleSelectProfile = (profile) => {
    setSelectedProfile(profile);
    // Converte o array de permissões do perfil (se houver) para um array de IDs
    setSelectedPermissions(profile.permissions ? profile.permissions.map((p) => p.id) : []);
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

  // Mudança de página
  const handleProfilePageChange = (pageIndex) => {
    setProfileCurrentPage(pageIndex);
  };

  const handlePermissionPageChange = (pageIndex) => {
    setPermissionsCurrentPage(pageIndex);
  };

  return (
    <Container maxWidth="md" style={{ padding: "20px" }}>
      <Box mb={3}>
        <Typography variant="h4">Associação de Permissões ao Perfil</Typography>
      </Box>

      {/* Seção de Perfis com paginação server-side */}
      <ProfileSection
        profiles={profiles}
        selectedProfiles={[]}
        selectedProfile={selectedProfile}
        onSelectProfile={handleSelectProfile}
        selectionMode="single"
        itemsPerPage={constProfileItemsPerPage}
        currentPage={profileCurrentPage}
        totalItems={totalProfiles}
        onPageChange={handleProfilePageChange}
        searchTerm={profileSearchTerm}
        setSearchTerm={setProfileSearchTerm}
      />

      {/* Seção de Permissões com paginação server-side */}
      <PermissionSection
        permissions={permissions}
        selectedPermissions={selectedPermissions}
        onTogglePermission={handleTogglePermission}
        itemsPerPage={constPermissionsItemsPerPage}
        currentPage={permissionsCurrentPage}
        totalItems={totalPermissions}
        onPageChange={handlePermissionPageChange}
        loading={loadingPermissions}
        searchTerm={permissionSearchTerm}
        setSearchTerm={setPermissionSearchTerm}
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

      {/* Dialog para feedback */}
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
