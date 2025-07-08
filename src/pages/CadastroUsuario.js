import axios from "axios";
import React, { useState, useContext, useEffect } from "react";
import {
  Container,
  Button,
  Box,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Paper,
  Stepper,
  Step,
  StepLabel
} from "@mui/material";
import { UserContext } from "../contexts/UserContext";
import StepDadosUsuario from "../steps/StepDadosUsuario";
import StepAssociarPerfis from "../steps/StepAssociarPerfis";
import StepConfirmacao from "../steps/StepConfirmacao";
import useWizardStepper from "../hooks/useWizardStepper";
import { fetchProfiles } from "../services/profileService";
import { createUser } from "../services/userService";
import ErrorBoundary from "../components/ErrorBoundary";

function CadastroUsuario() {
  // Recupera usuários, função para atualizar usuários e o token do contexto.
  const { setUsers, profiles, setProfiles, userToken } = useContext(UserContext);

  const steps = ["Dados do Usuário", "Associação de Perfis", "Confirmação"];
  const { activeStep, nextStep, prevStep, isLast, setStep } = useWizardStepper(0, steps);

  // Estados dos campos do formulário
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  // Estado para arquivo de foto e pré-visualização
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [previewPhoto, setPreviewPhoto] = useState("");

  const [loadingProfiles, setLoadingProfiles] = useState(false);

  const [profileCurrentPage, setProfileCurrentPage] = useState(0);
  const constProfileItemsPerPage = 5;
  const [totalProfiles, setTotalProfiles] = useState(0);

  const [profileSearchTerm, setProfileSearchTerm] = useState("");
  const [selectedProfiles, setSelectedProfiles] = useState([]);

  const [draftUser, setDraftUser] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const [dialogType, setDialogType] = useState("success");

  // Atualiza a pré-visualização da foto quando o selectedPhoto mudar
  useEffect(() => {
    if (!selectedPhoto) {
      setPreviewPhoto("");
      return;
    }
    const url = URL.createObjectURL(selectedPhoto);
    setPreviewPhoto(url);
    return () => URL.revokeObjectURL(url);
  }, [selectedPhoto]);

  useEffect(() => {
    if (activeStep !== 1) return;

    (async () => {
      setLoadingProfiles(true);
      try {
        const params = {
          page: profileCurrentPage + 1,
          limit: constProfileItemsPerPage,
          search: profileSearchTerm,
        };
        const response = await fetchProfiles(params);
        console.log("Dados retornados da API (perfis):", response.data);
        const data = response.data;
        if (Array.isArray(data)) {
          setProfiles(data);
          setTotalProfiles(data.length);
        } else if (data.items && Array.isArray(data.items)) {
          // Formato paginado: { items: [...], total: N }
          setProfiles(data.items);
          setTotalProfiles(data.total ?? data.items.length);
        } else {
          setProfiles([]);
          setTotalProfiles(0);
        }
      } catch {
        setProfiles([]);
        setTotalProfiles(0);
      } finally {
        setLoadingProfiles(false);
      }
    })();
  }, [activeStep, profileCurrentPage, profileSearchTerm, setProfiles]);

  const validateUserFields = () => {
    const temp = {};
    temp.name = name ? (/\d/.test(name) ? "Nome não pode conter números" : "") : "Nome é obrigatório";
    temp.email = email ? (/.+@.+\..+/.test(email) ? "" : "Email inválido") : "Email é obrigatório";
    temp.password = password ? "" : "Senha é obrigatória";
    setErrors(temp);
    return Object.values(temp).every(x => !x);
  };

  const handleNext = async () => {
    if (activeStep === 0) {
      if (!validateUserFields()) return;
      setDraftUser({ name, email, password });
      setDialogMessage("Dados salvos com sucesso!");
      setDialogType("success");
      setDialogOpen(true);
      nextStep();
    } else if (activeStep === 1) {
      if (profiles.length > 0 && selectedProfiles.length === 0) {
        setDialogMessage("Selecione ao menos um perfil.");
        setDialogType("error");
        setDialogOpen(true);
        return;
      }
      setDialogMessage("Perfis associados com sucesso!");
      setDialogType("success");
      setDialogOpen(true);
      nextStep();
    } else if (isLast) {
      try {
        const newUserData = {
          name: draftUser.name,
          email: draftUser.email,
          password: draftUser.password,
          profiles: profiles.length > 0 ? selectedProfiles : []
        };
        let response = await createUser(newUserData, userToken);
        let createdUser = response.data;

        if (selectedPhoto) {
          const fd = new FormData();
          fd.append("file", selectedPhoto);
          const response = await axios.post(
            `http://localhost:8000/users/${createdUser.id}/photo`,
            fd,
            { headers: { "Content-Type": "multipart/form-data" } }
          );
          createdUser = response.data;
        }

        setUsers(prev => [...prev, createdUser]);
        setDialogMessage("Usuário cadastrado com sucesso!");
        setDialogType("success");
        setDialogOpen(true);
        clearForm();
        setStep(0);
      } catch (error) {
        setDialogMessage(
          error.response?.data?.detail || "Erro ao cadastrar usuário"
        );
        setDialogType("error");
        setDialogOpen(true);
      }
    }
  };

  // Limpa os campos do formulário e estados de associação
  const clearForm = () => {
    setName("");
    setEmail("");
    setPassword("");
    setErrors({});
    setSelectedPhoto(null);
    setDraftUser(null);
    setSelectedProfiles([]);
  };

  const handleBack = () => {
    if (activeStep > 0) prevStep();
  };

  const handleToggleProfile = id => {
    setSelectedProfiles(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const handlePhotoChange = e => {
    if (e.target.files?.[0]) setSelectedPhoto(e.target.files[0]);
  };

  // Fecha o Dialog de feedback
  const handleCloseDialog = () => setDialogOpen(false);

  const stepComponents = [
    <StepDadosUsuario
      key="dados"
      name={name}
      setName={setName}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      errors={errors}
      selectedPhoto={selectedPhoto}
      previewPhoto={previewPhoto}
      onPhotoChange={handlePhotoChange}
    />,
    <StepAssociarPerfis
      key="perfis"
      profiles={profiles}
      loadingProfiles={loadingProfiles}
      selectedProfiles={selectedProfiles}
      onToggleProfile={handleToggleProfile}
      profileCurrentPage={profileCurrentPage}
      setProfileCurrentPage={setProfileCurrentPage}
      itemsPerPage={constProfileItemsPerPage}
      totalProfiles={totalProfiles}
      profileSearchTerm={profileSearchTerm}
      setProfileSearchTerm={setProfileSearchTerm}
    />,
    <StepConfirmacao
      key="confirma"
      draftUser={draftUser}
      selectedProfiles={selectedProfiles}
      profiles={profiles}
      previewPhoto={previewPhoto}
    />
  ];

  return (
    <ErrorBoundary>
      <Container maxWidth="sm" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map(label => (
            <Step key={label}><StepLabel>{label}</StepLabel></Step>
          ))}
        </Stepper>

        {stepComponents[activeStep]}

        <Box display="flex" justifyContent="space-between" mt={4}>
          <Button onClick={handleBack} disabled={activeStep === 0}>
            Voltar
          </Button>
          <Button variant="contained" onClick={handleNext}>
            {isLast ? "Concluir" : "Próximo"}
          </Button>
        </Box>
      </Paper>

      <Dialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        disableRestoreFocus
        disableEnforceFocus
      >
        <DialogTitle>{dialogType === "success" ? "Sucesso!" : "Erro!"}</DialogTitle>
        <DialogContent>
          <Typography>{dialogMessage}</Typography>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleCloseDialog} color="primary">Fechar</Button>
        </DialogActions>
      </Dialog>
    </Container>
    </ErrorBoundary>
    
  );
}

export default CadastroUsuario;
