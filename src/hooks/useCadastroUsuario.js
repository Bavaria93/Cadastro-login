import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "../contexts/UserContext";
import useWizardStepper from "../hooks/useWizardStepper";
import { createUser } from "../services/userService";
import useProfilesLoader from "./useProfilesLoader";

export default function useCadastroUsuario(steps) {
  const { setUsers, profiles, setProfiles, userToken } = useContext(UserContext);
  const { activeStep, nextStep, prevStep, isLast, setStep } = useWizardStepper(0, steps);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [previewPhoto, setPreviewPhoto] = useState("");
  const [selectedProfiles, setSelectedProfiles] = useState([]);
  const [draftUser, setDraftUser] = useState(null);
  const [dialog, setDialog] = useState({ open: false, message: "", type: "success" });

  const [profileCurrentPage, setProfileCurrentPage] = useState(0);
  const constProfileItemsPerPage = 5;
  const [totalProfiles, setTotalProfiles] = useState(0);
  const [profileSearchTerm, setProfileSearchTerm] = useState("");

  // Loader de perfis
  const { loadingProfiles } = useProfilesLoader({
    profileCurrentPage,
    profileSearchTerm,
    setProfiles,
    setTotalProfiles,
    itemsPerPage: constProfileItemsPerPage,
    shouldLoad: activeStep === 1
  });

  // Função para alternar seleção de perfis
  const onToggleProfile = id => {
    setSelectedProfiles(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  // Função para trocar a foto
  const onPhotoChange = e => {
    if (e.target.files?.[0]) {
      setSelectedPhoto(e.target.files[0]);
    }
  };

  // Gera preview da foto
  useEffect(() => {
    if (!selectedPhoto) return setPreviewPhoto("");
    const url = URL.createObjectURL(selectedPhoto);
    setPreviewPhoto(url);
    return () => URL.revokeObjectURL(url);
  }, [selectedPhoto]);

  const validateUserFields = () => {
    const temp = {
      name: name ? (/\d/.test(name) ? "Nome não pode conter números" : "") : "Nome é obrigatório",
      email: email ? (/.+@.+\..+/.test(email) ? "" : "Email inválido") : "Email é obrigatório",
      password: password ? "" : "Senha é obrigatória"
    };
    setErrors(temp);
    return Object.values(temp).every(x => !x);
  };

  const handleNext = async () => {
    if (activeStep === 0) {
      if (!validateUserFields()) return;
      setDraftUser({ name, email, password });
      setDialog({ open: true, message: "Dados salvos com sucesso!", type: "success" });
      return nextStep();
    }
    if (activeStep === 1) {
      if (profiles.length > 0 && selectedProfiles.length === 0) {
        return setDialog({ open: true, message: "Selecione ao menos um perfil.", type: "error" });
      }
      setDialog({ open: true, message: "Perfis associados com sucesso!", type: "success" });
      return nextStep();
    }
    if (isLast) {
      try {
        const newUserData = {
          name: draftUser.name,
          email: draftUser.email,
          password: draftUser.password,
          profiles: profiles.length > 0 ? selectedProfiles : []
        };
        let { data: createdUser } = await createUser(newUserData, userToken);
        if (selectedPhoto) {
          const fd = new FormData();
          fd.append("file", selectedPhoto);
          const { data } = await axios.post(
            `http://localhost:8000/users/${createdUser.id}/photo`,
            fd,
            { headers: { "Content-Type": "multipart/form-data" } }
          );
          createdUser = data;
        }
        setUsers(prev => [...prev, createdUser]);
        setDialog({ open: true, message: "Usuário cadastrado com sucesso!", type: "success" });
        clearForm();
        setStep(0);
      } catch (error) {
        setDialog({
          open: true,
          message: error.response?.data?.detail || "Erro ao cadastrar usuário",
          type: "error"
        });
      }
    }
  };

  const clearForm = () => {
    setName("");
    setEmail("");
    setPassword("");
    setErrors({});
    setSelectedPhoto(null);
    setDraftUser(null);
    setSelectedProfiles([]);
  };

  return {
    activeStep, nextStep, prevStep, isLast,
    name, setName, email, setEmail, password, setPassword, errors,
    selectedPhoto, previewPhoto,
    selectedProfiles, setSelectedProfiles,
    draftUser, dialog, setDialog,
    loadingProfiles,
    profileCurrentPage, setProfileCurrentPage,
    totalProfiles, profileSearchTerm, setProfileSearchTerm,
    setProfiles, setTotalProfiles, constProfileItemsPerPage, profiles,
    onToggleProfile,
    onPhotoChange, // ⬅️ agora faz parte do state
    handleNext, clearForm
  };
}
