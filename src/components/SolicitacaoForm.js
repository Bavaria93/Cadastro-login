import React from "react";
import InputMask from "react-input-mask";
import {
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";

import NoticeLabelField from "./NoticeLabelField";
import JobFunctionField from "./JobFunctionField";
import CourseSelect from "./CourseSelect";
import CampusesSelect from "./CampusesSelect";
import PublicationTypeField from "./PublicationTypeField";
import FileUploader from "./FileUploader";

export default function SolicitacaoForm({
  numero, setNumero,
  dataEdital, setDataEdital,
  funcao, setFuncao,
  outraFuncao, setOutraFuncao,
  tipoPublicacao, setTipoPublicacao,
  inscInicio, setInscInicio,
  inscFim, setInscFim,
  docComprob, setDocComprob,
  dataPublicacao, setDataPublicacao,
  selectedCourse, setSelectedCourse,
  selectedCampuses, setSelectedCampuses,
  courses, campuses,
  fileInputRef, selectedFiles,
  addFiles, removeFile,
  uploading,
  onSubmit,
}) {
  return (
    <Box
      component="form"
      onSubmit={onSubmit}
      sx={{ display: "flex", flexDirection: "column", gap: 2 }}
    >
      <Typography variant="h4" align="center">
        Publicação de Processos Seletivos Simplificados - UAB/UFPA
      </Typography>

      <Box sx={{ display: "flex", gap: 2 }}>
        <InputMask
          mask="999/9999"
          value={numero}
          onChange={(e) => setNumero(e.target.value)}
          maskPlaceholder={null}
        >
          {(inputProps) => (
            <TextField
              {...inputProps}
              label="Número do Edital"
              required
              fullWidth
            />
          )}
        </InputMask>

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
        onDocComprobChange={(e) => setDocComprob(e.target.value)}
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
        {uploading ? <CircularProgress size={24} /> : "Enviar Solicitação"}
      </Button>
    </Box>
  );
}
