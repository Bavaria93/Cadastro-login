import React, { useState } from "react";
import {
  Container,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  CircularProgress
} from "@mui/material";

import useCourses from "../hooks/useCourses";
import useCampuses from "../hooks/useCampuses";
import useFileUpload from "../hooks/useFileUpload";
import useDialog from "../hooks/useDialog";
import useSolicitacaoForm from "../hooks/useSolicitacaoForm";

import { enviarSolicitacao, analisarDocumentos } from "../services/solicitacaoService";

import SolicitacaoForm from "../components/SolicitacaoForm";
import FeedbackDialog from "../components/FeedbackDialog";

export default function CadastroSolicitacao() {
  const courses = useCourses();
  const {
    fileInputRef,
    selectedFiles,
    addFiles,
    removeFile,
    clearFiles
  } = useFileUpload();

  const form = useSolicitacaoForm(clearFiles);
  const campuses = useCampuses(form.selectedCourse, courses);

  const { dialog, openDialog, closeDialog } = useDialog();
  const {
    dialog: analysisDialog,
    openDialog: openAnalysis,
    closeDialog: closeAnalysis
  } = useDialog();

  const [uploading, setUploading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.validate()) {
      openDialog("Por favor, preencha todos os campos obrigatórios.", "error");
      return;
    }

    const formattedDate = form.dataEdital.split("-").reverse().join("/");
    const noticeLabel = `${form.numero} - ${formattedDate}`;

    const payload = {
      notice_label: noticeLabel,
      job_function: form.funcao === "Outros" ? form.outraFuncao : form.funcao,
      publication_type: form.tipoPublicacao,
      campuses: form.selectedCampuses,
      periodoInscricao:
        form.tipoPublicacao === "Publicação de Edital/Abertura das Inscrições"
          ? {
              inicio: form.inscInicio,
              fim: form.inscFim,
              publicarDocumentacao: form.docComprob
            }
          : null,
      dataPublicacao: form.dataPublicacao,
      sagitta_id: 0,
      course_id: form.selectedCourse
    };

    try {
      openAnalysis("Enviando solicitação e analisando documentos. Aguarde...");
      setUploading(true);

      await enviarSolicitacao(payload);

      if (selectedFiles.length) {
        await analisarDocumentos(selectedFiles);
      }

      form.clearForm();
      openDialog("Solicitação enviada com sucesso!");
      openAnalysis("Solicitação enviada e documentos analisados com sucesso!");
    } catch (err) {
      console.error("Erro ao enviar:", err);
      openAnalysis("Erro ao enviar solicitação ou analisar documentos.", "error");
    } finally {
      setUploading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ padding: "20px", backgroundColor: "#f0f4f8" }}>
      <SolicitacaoForm
        {...form}
        courses={courses}
        campuses={campuses}
        fileInputRef={fileInputRef}
        selectedFiles={selectedFiles}
        addFiles={addFiles}
        removeFile={removeFile}
        uploading={uploading}
        onSubmit={handleSubmit}
      />

      <FeedbackDialog dialog={dialog} onClose={closeDialog} />

      <Dialog open={analysisDialog.open} onClose={closeAnalysis}>
        <DialogTitle>Análise de Documentos</DialogTitle>
        <DialogContent>
          <Typography>{analysisDialog.message}</Typography>
          {uploading && (
            <Box display="flex" justifyContent="center" mt={2}>
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
