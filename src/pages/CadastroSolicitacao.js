// CadastroSolicitacao.js
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
  Container,
  Button,
  Box,
  Typography,
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Select,
  MenuItem,
  InputLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
} from "@mui/material";
import CourseSelect from "../components/CourseSelect";
import CampusesSelect from "../components/CampusesSelect";
import { tipoPublicacaoOptions } from "../constants/tipoPublicacao";
import { jobFunctionOptions } from "../constants/jobFunctionOptions";

function CadastroSolicitacao() {
  // Estados para os campos do edital (sem alterações)
  const [numeroEdital, setNumeroEdital] = useState("");
  const [dataEdital, setDataEdital] = useState("");
  const [noticeLabel, setNoticeLabel] = useState("");

  // Estados para os demais campos originais
  const [funcao, setFuncao] = useState("");
  const [outraFuncao, setOutraFuncao] = useState("");
  // Como os polos serão vinculados via dropdown multiselect,
  // removemos o estado antigo "polos".
  const [tipoPublicacao, setTipoPublicacao] = useState("");
  const [inscInicio, setInscInicio] = useState("");
  const [inscFim, setInscFim] = useState("");
  const [docComprob, setDocComprob] = useState("Não");
  const [dataPublicacao, setDataPublicacao] = useState("");

  // Novos estados para seleção de Curso e Polos (campuses)
  const [selectedCourse, setSelectedCourse] = useState("");
  const [courses, setCourses] = useState([]);
  const [campuses, setCampuses] = useState([]);
  const [selectedCampuses, setSelectedCampuses] = useState([]);

  // Estados e ref para upload do documento
  const fileInputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);

  // Estados para feedback do diálogo
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const [dialogType, setDialogType] = useState("success");

  // Atualiza o rótulo do edital em tempo real
  useEffect(() => {
    const formattedDate = dataEdital
      ? dataEdital.split("-").reverse().join("/")
      : "";

    setNoticeLabel(`${numeroEdital} - ${formattedDate}`);
  }, [numeroEdital, dataEdital]);

  // Carrega os cursos via API quando o componente é montado
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get("http://localhost:8000/courses/");
        console.log("Dados retornados da API (cursos):", response.data);
        setCourses(response.data.items);
      } catch (error) {
        console.error("Erro ao carregar cursos:", error);
      }
    };
    fetchCourses();
  }, []);

  // Quando um curso é selecionado, carrega os polos vinculados e limpa seleção anterior
  useEffect(() => {
    if (selectedCourse) {
      const course = courses.find((c) => c.id === selectedCourse);
      setCampuses(course?.campuses || []);
      setSelectedCampuses([]);
    } else {
      setCampuses([]);
      setSelectedCampuses([]);
    }
  }, [selectedCourse, courses]);

  const validateFields = () => {
    if (!numeroEdital.trim() || !dataEdital || !funcao || !tipoPublicacao || !dataPublicacao) {
      return false;
    }
    if (funcao === "Outros" && !outraFuncao.trim()) return false;
    if (tipoPublicacao === "Publicação de Edital/Abertura das Inscrições" && (!inscInicio || !inscFim)) {
      return false;
    }
    if (!selectedCourse) return false;
    if (selectedCampuses.length === 0) return false;
    return true;
  };

  // Função acionada quando o usuário seleciona um arquivo
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      // A opção verbose pode ser passada via query string se necessária, ou através do formData
      try {
        setUploading(true);
        const response = await axios.post(
          "http://200.239.90.80:8000/documents/analyze-document",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log("Análise do documento:", response.data);
        setAnalysisResult(response.data);
      } catch (error) {
        console.error("Erro ao enviar documento para análise:", error);
      } finally {
        setUploading(false);
      }
    }
  };

  // Função para abrir o input de arquivo via botão
  const handleUploadButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const clearForm = () => {
    setNumeroEdital("");
    setDataEdital("");
    setNoticeLabel("");
    setFuncao("");
    setOutraFuncao("");
    setTipoPublicacao("");
    setInscInicio("");
    setInscFim("");
    setDocComprob("Não");
    setDataPublicacao("");
    setSelectedCourse("");
    setCampuses([]);
    setSelectedCampuses([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateFields()) {
      setDialogMessage("Por favor, preencha todos os campos obrigatórios.");
      setDialogType("error");
      setDialogOpen(true);
      return;
    }
    const formData = {
      notice_label: noticeLabel,
      job_function: funcao === "Outros" ? outraFuncao : funcao,
      publication_type: tipoPublicacao,
      campuses: selectedCampuses, // IDs dos polos selecionados
      periodoInscricao:
        tipoPublicacao === "Publicação de Edital/Abertura das Inscrições"
          ? { inicio: inscInicio, fim: inscFim, publicarDocumentacao: docComprob }
          : null,
      dataPublicacao: dataPublicacao,
      sagitta_id: 0,
      course_id: selectedCourse,
    };

    try {
      const response = await axios.post("http://localhost:8000/requests/", formData);
      console.log("Resposta da API:", response.data);
      setDialogMessage("Solicitação enviada com sucesso!");
      setDialogType("success");
      setDialogOpen(true);
      clearForm();
    } catch (error) {
      console.error("Erro ao enviar solicitação:", error);
      setDialogMessage("Erro ao enviar solicitação. Tente novamente.");
      setDialogType("error");
      setDialogOpen(true);
    }
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  return (
    <Container maxWidth="sm" style={{ padding: "20px", backgroundColor: "#f0f4f8" }}>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          Publicação de Processos Seletivos Simplificados - UAB/UFPA
        </Typography>

        {/* Linha para "Número do Edital" e "Data do Edital" */}
        <Box sx={{ display: "flex", gap: 2 }}>
          <TextField
            label="Número do Edital"
            value={numeroEdital}
            onChange={(e) => setNumeroEdital(e.target.value)}
            fullWidth
            required
          />
          <TextField
            label="Data do Edital"
            type="date"
            value={dataEdital}
            onChange={(e) => setDataEdital(e.target.value)}
            fullWidth
            InputLabelProps={{ shrink: true }}
            required
          />
        </Box>

        {/* Campo não editável mostrando o rótulo do edital */}
        <TextField
          label="Rótulo do Edital"
          value={noticeLabel}
          fullWidth
          InputProps={{ readOnly: true }}
          variant="filled"
        />

        {/* Seleção de função e, caso "Outros", campo de texto adicional */}
        <FormControl component="fieldset">
          <FormLabel component="legend">
            Processo Seletivo para qual função?
          </FormLabel>
          <RadioGroup
            value={funcao}
            onChange={(e) => setFuncao(e.target.value)}
            row
          >
            {jobFunctionOptions.map((option, index) => (
              <FormControlLabel
                key={index}
                value={option}
                control={<Radio />}
                label={option}
              />
            ))}
          </RadioGroup>
          {funcao === "Outros" && (
            <TextField
              label="Informe a função"
              value={outraFuncao}
              onChange={(e) => setOutraFuncao(e.target.value)}
              fullWidth
              required
            />
          )}
        </FormControl>

        {/* Dropdown para selecionar um Curso cadastrado */}
        <CourseSelect
          courses={courses}
          selectedCourse={selectedCourse}
          setSelectedCourse={setSelectedCourse}
        />

        {/* Dropdown multiselect para selecionar os polos vinculados ao curso escolhido */}
        {selectedCourse && (
          <CampusesSelect
            campuses={campuses}
            selectedCampuses={selectedCampuses}
            setSelectedCampuses={setSelectedCampuses}
          />
        )}

        {/* Campo para "Tipo de Publicação" */}
        <FormControl fullWidth required>
          <InputLabel id="tipo-publicacao-label">Tipo de Publicação</InputLabel>
          <Select
            labelId="tipo-publicacao-label"
            value={tipoPublicacao}
            label="Tipo de Publicação"
            onChange={(e) => setTipoPublicacao(e.target.value)}
          >
            {tipoPublicacaoOptions.map((option, index) => (
              <MenuItem key={index} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {tipoPublicacao === "Publicação de Edital/Abertura das Inscrições" && (
          <>
            <TextField
              label="Início das Inscrições"
              type="date"
              value={inscInicio}
              onChange={(e) => setInscInicio(e.target.value)}
              fullWidth
              InputLabelProps={{ shrink: true }}
              required
            />
            <TextField
              label="Fim das Inscrições"
              type="date"
              value={inscFim}
              onChange={(e) => setInscFim(e.target.value)}
              fullWidth
              InputLabelProps={{ shrink: true }}
              required
            />
            <FormControl component="fieldset">
              <FormLabel component="legend">
                Publicar documentação comprobatória junto com o edital?
              </FormLabel>
              <RadioGroup
                row
                value={docComprob}
                onChange={(e) => setDocComprob(e.target.value)}
              >
                <FormControlLabel
                  value="Sim"
                  control={<Radio />}
                  label="Sim"
                />
                <FormControlLabel
                  value="Não"
                  control={<Radio />}
                  label="Não"
                />
              </RadioGroup>
            </FormControl>
          </>
        )}

        <TextField
          label="Data da Publicação"
          type="date"
          value={dataPublicacao}
          onChange={(e) => setDataPublicacao(e.target.value)}
          fullWidth
          InputLabelProps={{ shrink: true }}
          required
        />

        {/* Botão que dispara o upload para análise */}
        <Box display="flex" justifyContent="center" my={2}>
          <Button
            variant="contained"
            color="secondary"
            type="button"
            onClick={handleUploadButtonClick}
          >
            Analisar Documento
          </Button>
        </Box>

        {/* Input oculto para upload */}
        <input
          ref={fileInputRef}
          type="file"
          style={{ display: "none" }}
          onChange={handleFileChange}
        />

        {/* Exibe um feedback enquanto o arquivo está sendo enviado */}
        {uploading && (
          <Box display="flex" justifyContent="center" m={2}>
            <CircularProgress />
          </Box>
        )}

        {/* Exibe o resultado da análise, se houver */}
        {analysisResult && (
          <Box m={2} p={2} border="1px solid #ddd" borderRadius={2}>
            <Typography variant="subtitle1" gutterBottom>
              Resultado da Análise do Documento:
            </Typography>
            <pre>{JSON.stringify(analysisResult, null, 2)}</pre>
          </Box>
        )}

        <Box display="flex" justifyContent="center" my={2}>
          <Button variant="contained" color="primary" type="submit">
            Enviar Solicitação
          </Button>
        </Box>
      </Box>

      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>
          {dialogType === "success" ? "Sucesso!" : "Erro!"}
        </DialogTitle>
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

export default CadastroSolicitacao;
