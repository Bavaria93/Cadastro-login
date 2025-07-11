// src/pages/CadastroSolicitacao.js

import React, { useState } from "react";
import axios from "axios";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

import CourseSelect from "../components/CourseSelect";
import CampusesSelect from "../components/CampusesSelect";
import NoticeLabelField from "../components/NoticeLabelField";
import JobFunctionField from "../components/JobFunctionField";
import PublicationTypeField from "../components/PublicationTypeField";
import FileUploader from "../components/FileUploader";
import FeedbackDialog from "../components/FeedbackDialog";

import useCourses from "../hooks/useCourses";
import useCampuses from "../hooks/useCampuses";
import useFileUpload from "../hooks/useFileUpload";
import useDialog from "../hooks/useDialog";

export default function CadastroSolicitacao() {
  // Estados de formulário
  const [numero, setNumero] = useState("");
  const [dataEdital, setDataEdital] = useState("");
  const [funcao, setFuncao] = useState("");
  const [outraFuncao, setOutraFuncao] = useState("");
  const [tipoPublicacao, setTipoPublicacao] = useState("");
  const [inscInicio, setInscInicio] = useState("");
  const [inscFim, setInscFim] = useState("");
  const [docComprob, setDocComprob] = useState("Não");
  const [dataPublicacao, setDataPublicacao] = useState("");

  // Hooks customizados
  const courses = useCourses();
  const [selectedCourse, setSelectedCourse] = useState("");
  const campuses = useCampuses(selectedCourse, courses);
  const [selectedCampuses, setSelectedCampuses] = useState([]);
  const {
    fileInputRef,
    selectedFiles,
    addFiles,
    removeFile,
    clearFiles,
  } = useFileUpload();
  const { dialog, openDialog, closeDialog } = useDialog();
  const {
    dialog: analysisDialog,
    openDialog: openAnalysis,
    closeDialog: closeAnalysis,
  } = useDialog();
  const [uploading, setUploading] = useState(false);

  // 1) Validação dos campos
  const validate = () => {
    if (
      !numero.trim() ||
      !dataEdital ||
      !funcao ||
      !tipoPublicacao ||
      !dataPublicacao
    ) {
      return false;
    }
    if (funcao === "Outros" && !outraFuncao.trim()) return false;
    if (
      tipoPublicacao ===
        "Publicação de Edital/Abertura das Inscrições" &&
      (!inscInicio || !inscFim)
    ) {
      return false;
    }
    if (!selectedCourse) return false;
    if (selectedCampuses.length === 0) return false;
    return true;
  };

  // 2) Limpar o formulário após o envio
  const clearForm = () => {
    setNumero("");
    setDataEdital("");
    setFuncao("");
    setOutraFuncao("");
    setTipoPublicacao("");
    setInscInicio("");
    setInscFim("");
    setDocComprob("Não");
    setDataPublicacao("");
    setSelectedCourse("");
    setSelectedCampuses([]);
    clearFiles();
  };

  // 3) Submit da solicitação
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      openDialog(
        "Por favor, preencha todos os campos obrigatórios.",
        "error"
      );
      return;
    }

    // monta o rótulo no formato "Nº - dd/mm/aaaa"
    const formattedDate = dataEdital
      .split("-")
      .reverse()
      .join("/");
    const noticeLabel = `${numero} - ${formattedDate}`;

    openAnalysis(
      "Enviando solicitação e analisando documentos. Aguarde..."
    );
    setUploading(true);

    const requestData = {
      notice_label: noticeLabel,
      job_function:
        funcao === "Outros" ? outraFuncao : funcao,
      publication_type: tipoPublicacao,
      campuses: selectedCampuses,
      periodoInscricao:
        tipoPublicacao ===
        "Publicação de Edital/Abertura das Inscrições"
          ? {
              inicio: inscInicio,
              fim: inscFim,
              publicarDocumentacao: docComprob,
            }
          : null,
      dataPublicacao,
      sagitta_id: 0,
      course_id: selectedCourse,
    };

    try {
      // 1. criar a solicitação
      await axios.post(
        "http://localhost:8000/requests/",
        requestData
      );

      // 2. enviar arquivos, se houver
      if (selectedFiles.length) {
        const fileData = new FormData();
        selectedFiles.forEach((f) =>
          fileData.append("files", f)
        );
        await axios.post(
          "http://200.239.90.80:8000/documents/analyze-document",
          fileData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
      }

      openAnalysis(
        "Solicitação enviada e documentos analisados com sucesso!"
      );
      clearForm();
      openDialog("Solicitação enviada com sucesso!");
    } catch (error) {
      console.error("Erro no envio:", error);
      openAnalysis(
        "Erro ao enviar solicitação ou analisar documentos.",
        "error"
      );
    } finally {
      setUploading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ p: 2 }}>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        <Typography variant="h4" align="center">
          Publicação de Processos Seletivos Simplificados
        </Typography>

        <Box sx={{ display: "flex", gap: 2 }}>
          <TextField
            label="Número do Edital"
            value={numero}
            onChange={(e) => setNumero(e.target.value)}
            required
            fullWidth
          />
          <TextField
            label="Data do Edital"
            type="date"
            value={dataEdital}
            onChange={(e) => setDataEdital(e.target.value)}
            InputLabelProps={{ shrink: true }}
            required
            fullWidth
          />
        </Box>

        <NoticeLabelField numero={numero} data={dataEdital} />

        <JobFunctionField
          value={funcao}
          onChange={(e) => setFuncao(e.target.value)}
          otherValue={outraFuncao}
          onOtherChange={(e) => setOutraFuncao(e.target.value)}
        />

        <CourseSelect
          courses={courses}
          selectedCourse={selectedCourse}
          setSelectedCourse={setSelectedCourse}
        />

        {selectedCourse && (
          <CampusesSelect
            campuses={campuses}
            selectedCampuses={selectedCampuses}
            setSelectedCampuses={setSelectedCampuses}
          />
        )}

        <PublicationTypeField
          tipo={tipoPublicacao}
          onTipoChange={(e) => setTipoPublicacao(e.target.value)}
          inicio={inscInicio}
          onInicioChange={(e) => setInscInicio(e.target.value)}
          fim={inscFim}
          onFimChange={(e) => setInscFim(e.target.value)}
          docComprob={docComprob}
          onDocComprobChange={(e) =>
            setDocComprob(e.target.value)
          }
        />

        <TextField
          label="Data da Publicação"
          type="date"
          value={dataPublicacao}
          onChange={(e) => setDataPublicacao(e.target.value)}
          InputLabelProps={{ shrink: true }}
          required
          fullWidth
        />

        <FileUploader
          fileInputRef={fileInputRef}
          selectedFiles={selectedFiles}
          addFiles={addFiles}
          removeFile={removeFile}
        />

        <Button
          variant="contained"
          color="primary"
          type="submit"
          disabled={uploading}
        >
          {uploading ? (
            <CircularProgress size={24} />
          ) : (
            "Enviar Solicitação"
          )}
        </Button>
      </Box>

      <FeedbackDialog dialog={dialog} onClose={closeDialog} />

      <Dialog
        open={analysisDialog.open}
        onClose={closeAnalysis}
      >
        <DialogTitle>Análise de Documentos</DialogTitle>
        <DialogContent>
          <Typography>
            {analysisDialog.message}
          </Typography>
          {uploading && (
            <Box
              display="flex"
              justifyContent="center"
              mt={2}
            >
              <CircularProgress />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={closeAnalysis}>Fechar</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
