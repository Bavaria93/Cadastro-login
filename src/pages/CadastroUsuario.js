import axios from "axios";
import React, { useState, useContext, useEffect } from "react";
import {
  Container,
  TextField,
  Button,
  Box,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Paper,
  Avatar
} from "@mui/material";
import { UserContext } from "../contexts/UserContext";
import ProfileSection from "../components/ProfileSection";

function CadastroUsuario() {
  // Recupera usuários, função para atualizar usuários e o token do contexto.
  const { users, setUsers, userToken } = useContext(UserContext);

  // Estados dos campos do formulário
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  // Estado para arquivo de foto e pré-visualização
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [previewPhoto, setPreviewPhoto] = useState("");

  // Estados para Dialog de feedback
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const [dialogType, setDialogType] = useState("success");

  // Estados para fluxo de associação
  const [draftUser, setDraftUser] = useState(null); // Rascunho do usuário
  const [fetchedProfiles, setFetchedProfiles] = useState([]); // Perfis carregados do backend
  const [selectedProfiles, setSelectedProfiles] = useState([]); // IDs dos perfis selecionados
  const [isProfileAssociated, setIsProfileAssociated] = useState(false);

  // Atualiza a pré-visualização da foto quando o selectedPhoto mudar
  useEffect(() => {
    if (selectedPhoto) {
      const objectUrl = URL.createObjectURL(selectedPhoto);
      setPreviewPhoto(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    } else {
      setPreviewPhoto("");
    }
  }, [selectedPhoto]);

  // Valida os campos do usuário
  const validateUserFields = () => {
    let tempErrors = {};

    tempErrors.name = name
      ? /\d/.test(name)
        ? "Nome não pode incluir números"
        : ""
      : "Nome é obrigatório";

    tempErrors.email = email
      ? /.+@.+\..+/.test(email)
        ? ""
        : "Email inválido"
      : "Email é obrigatório";

    tempErrors.password = password ? "" : "Senha é obrigatória";

    setErrors(tempErrors);
    return Object.values(tempErrors).every((x) => x === "");
  };

  // Limpa os campos do formulário e estados de associação
  const clearForm = () => {
    setName("");
    setEmail("");
    setPassword("");
    setErrors({});
    setDraftUser(null);
    setSelectedProfiles([]);
    setIsProfileAssociated(false);
    setSelectedPhoto(null);
  };

  // Salva os dados inseridos em um rascunho
  const handleSalvarDados = (e) => {
    e.preventDefault();
    if (!validateUserFields()) {
      setDialogMessage("Erro: Verifique os campos do formulário.");
      setDialogType("error");
      setDialogOpen(true);
      return;
    }
    const tempUser = { name, email, password };
    setDraftUser(tempUser);
    setDialogMessage("Dados salvos com sucesso!");
    setDialogType("success");
    setDialogOpen(true);
  };

  // Busca os perfis do backend ao salvar os dados
  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await axios.get("http://localhost:8000/profiles/");
        setFetchedProfiles(response.data);
      } catch (error) {
        console.error("Erro ao buscar perfis:", error);
      }
    };

    if (draftUser) {
      fetchProfiles();
    }
  }, [draftUser]);

  // Lida com a seleção/desseleção de perfis
  const handleToggleProfile = (profileId) => {
    setSelectedProfiles((prev) =>
      prev.includes(profileId)
        ? prev.filter((id) => id !== profileId)
        : [...prev, profileId]
    );
  };

  // Confirma a associação de perfis
  const handleAssociarPerfil = () => {
    if (selectedProfiles.length === 0) {
      setDialogMessage("Selecione ao menos um perfil para associação.");
      setDialogType("error");
      setDialogOpen(true);
      return;
    }
    setIsProfileAssociated(true);
    setDialogMessage(
      "Perfil(ns) associado(s)! Agora, clique em 'Cadastrar Usuário' para finalizar o cadastro."
    );
    setDialogType("success");
    setDialogOpen(true);
  };

  // Funcionalidade de upload da foto após o cadastro
  const handleUploadPhoto = async (userId) => {
    const formData = new FormData();
    formData.append("file", selectedPhoto);
    try {
      const response = await axios.post(
        `http://localhost:8000/users/${userId}/photo`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" }
        }
      );
      return response.data;
    } catch (error) {
      console.error("Erro ao fazer upload da foto:", error);
      return null;
    }
  };

  // Efetua o cadastro final do usuário no backend
  const handleCadastrarUsuario = async () => {
    if (!draftUser) {
      setDialogMessage("Você precisa salvar os dados do usuário primeiro.");
      setDialogType("error");
      setDialogOpen(true);
      return;
    }
    if (fetchedProfiles.length > 0 && !isProfileAssociated) {
      setDialogMessage("Você precisa associar um perfil antes de cadastrar o usuário.");
      setDialogType("error");
      setDialogOpen(true);
      return;
    }

    const newUserData = {
      name: draftUser.name,
      email: draftUser.email,
      password: draftUser.password,
      profiles: fetchedProfiles.length > 0 ? selectedProfiles : []
    };

    try {
      // Configuração para incluir o token de autenticação no header
      const config = {
        headers: { Authorization: `Bearer ${userToken}` }
      };

      const response = await axios.post("http://localhost:8000/users/", newUserData, config);
      let createdUser = response.data;
      if (selectedPhoto) {
        const updatedUser = await handleUploadPhoto(createdUser.id);
        if (updatedUser) {
          createdUser = updatedUser;
        }
      }
      setUsers([...users, createdUser]);
      setDialogMessage("Usuário cadastrado com sucesso!");
      setDialogType("success");
      setDialogOpen(true);
      clearForm();
    } catch (error) {
      console.error(error);
      setDialogMessage(error.response?.data?.detail || "Erro ao cadastrar usuário");
      setDialogType("error");
      setDialogOpen(true);
    }
  };

  // Lida com a seleção do arquivo de foto
  const handlePhotoChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedPhoto(e.target.files[0]);
    }
  };

  // Fecha o Dialog de feedback
  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  return (
    <Container maxWidth="sm" sx={{ padding: 3, backgroundColor: "#f0f4f8" }}>
      <Paper
        component="form"
        onSubmit={handleSalvarDados}
        elevation={4}
        sx={{ display: "flex", flexDirection: "column", gap: 2, p: 3, borderRadius: 2 }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          Cadastro de Usuário
        </Typography>
        {/* Seção para upload e visualização da foto (dentro do mesmo box) */}
        <Box display="flex" flexDirection="column" alignItems="center" mb={2}>
          <Avatar
            src={selectedPhoto ? previewPhoto : "/default-avatar.png"}
            sx={{ width: 120, height: 120, mb: 1 }}
          />
          <Button variant="outlined" component="label">
            Atualizar Foto
            <input type="file" accept="image/*" hidden onChange={handlePhotoChange} />
          </Button>
        </Box>
        {/* Campos do formulário */}
        <TextField
          label="Nome Completo"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          error={!!errors.name}
          helperText={errors.name}
          disabled={!!draftUser}
        />
        <TextField
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          error={!!errors.email}
          helperText={errors.email}
          disabled={!!draftUser}
        />
        <TextField
          label="Senha"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          error={!!errors.password}
          helperText={errors.password}
          disabled={!!draftUser}
        />
        {/* Botão para salvar os dados (fase de rascunho) */}
        {!draftUser && (
          <Box display="flex" justifyContent="center" mt={2}>
            <Button type="submit" variant="contained" color="primary">
              Salvar Dados
            </Button>
          </Box>
        )}
      </Paper>

      {/* Se os dados foram salvos e houver perfis cadastrados, exibe a associação de perfis */}
      {draftUser && fetchedProfiles.length > 0 && (
        <Paper
          elevation={4}
          sx={{ p: 3, borderRadius: 2, mt: 3, backgroundColor: "#fff" }}
        >
          <ProfileSection
            profiles={fetchedProfiles}
            selectedProfiles={selectedProfiles}
            onToggleProfile={handleToggleProfile}
          />
          <Box display="flex" justifyContent="center" mt={2}>
            <Button variant="contained" color="secondary" onClick={handleAssociarPerfil}>
              Associar Perfil
            </Button>
          </Box>
        </Paper>
      )}

      {/* Exibe o botão final para cadastrar o usuário se houver associação ou se nenhum perfil estiver cadastrado */}
      {draftUser && (isProfileAssociated || fetchedProfiles.length === 0) && (
        <Box display="flex" justifyContent="center" mt={3} mb={4}>
          <Button variant="contained" color="primary" onClick={handleCadastrarUsuario}>
            Cadastrar Usuário
          </Button>
        </Box>
      )}

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

export default CadastroUsuario;
