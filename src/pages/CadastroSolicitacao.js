import React, { useState, useEffect } from "react";
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
} from "@mui/material";

function CadastroSolicitacao() {
  // States for the edital fields and for generating the notice label in real time
  const [numeroEdital, setNumeroEdital] = useState("");
  const [dataEdital, setDataEdital] = useState("");
  const [noticeLabel, setNoticeLabel] = useState("");

  // States for the other fields
  const [funcao, setFuncao] = useState("");
  const [outraFuncao, setOutraFuncao] = useState("");
  const [polos, setPolos] = useState("");
  const [tipoPublicacao, setTipoPublicacao] = useState("");
  const [inscInicio, setInscInicio] = useState("");
  const [inscFim, setInscFim] = useState("");
  const [docComprob, setDocComprob] = useState("Não");
  const [dataPublicacao, setDataPublicacao] = useState("");

  // States for dialog feedback
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const [dialogType, setDialogType] = useState("success");

  // Update the notice label in real time based on "Número do Edital" and "Data do Edital"
  useEffect(() => {
    // Date formatting can be enhanced here if needed.
    const formattedData = dataEdital;
    setNoticeLabel(`${numeroEdital} - ${formattedData}`);
  }, [numeroEdital, dataEdital]);

  // Validate required fields
  const validateFields = () => {
    if (!numeroEdital.trim() || !dataEdital || !funcao || !tipoPublicacao || !dataPublicacao) {
      return false;
    }
    if (funcao === "Outros" && !outraFuncao.trim()) return false;
    if (tipoPublicacao === "Publicação de Edital/Abertura das Inscrições" && (!inscInicio || !inscFim)) {
      return false;
    }
    return true;
  };

  // Submit form data to the API
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateFields()) {
      setDialogMessage("Por favor, preencha todos os campos obrigatórios.");
      setDialogType("error");
      setDialogOpen(true);
      return;
    }
    // Prepare the form data. Note: sagitta_id e course_id são valores dummy.
    const formData = {
      notice_label: noticeLabel,
      job_function: funcao === "Outros" ? outraFuncao : funcao,
      publication_type: tipoPublicacao,
      polos: polos,
      periodoInscricao:
        tipoPublicacao === "Publicação de Edital/Abertura das Inscrições"
          ? { inicio: inscInicio, fim: inscFim, publicarDocumentacao: docComprob }
          : null,
      dataPublicacao: dataPublicacao,
      sagitta_id: 0,
      course_id: 0
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

  const clearForm = () => {
    setNumeroEdital("");
    setDataEdital("");
    setNoticeLabel("");
    setFuncao("");
    setOutraFuncao("");
    setPolos("");
    setTipoPublicacao("");
    setInscInicio("");
    setInscFim("");
    setDocComprob("Não");
    setDataPublicacao("");
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
        
        {/* Row for "Número do Edital" and "Data do Edital" */}
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
        
        {/* Non-editable field showing the notice label in real time */}
        <TextField
          label="Rótulo do Edital"
          value={noticeLabel}
          fullWidth
          InputProps={{ readOnly: true }}
          variant="filled"
        />

        {/* Job Function - will be saved in the JobFunction table (column "position") */}
        <FormControl component="fieldset">
          <FormLabel component="legend">Processo Seletivo para qual função?</FormLabel>
          <RadioGroup
            value={funcao}
            onChange={(e) => setFuncao(e.target.value)}
            row
          >
            <FormControlLabel value="Discente" control={<Radio />} label="Discente" />
            <FormControlLabel value="Equipe de Apoio Multidisciplinar" control={<Radio />} label="Equipe de Apoio Multidisciplinar" />
            <FormControlLabel value="Coordenador de Curso" control={<Radio />} label="Coordenador de Curso" />
            <FormControlLabel value="Coordenador de Tutoria" control={<Radio />} label="Coordenador de Tutoria" />
            <FormControlLabel value="Professor Formador" control={<Radio />} label="Professor Formador" />
            <FormControlLabel value="Tutor a Distância" control={<Radio />} label="Tutor a Distância" />
            <FormControlLabel value="Tutor Presencial" control={<Radio />} label="Tutor Presencial" />
            <FormControlLabel value="Tutor a Distância e/ou Presencial" control={<Radio />} label="Tutor a Distância e/ou Presencial" />
            <FormControlLabel value="Outros" control={<Radio />} label="Outros" />
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
        
        {/* Field for "Polos" */}
        <TextField
          label="Informe os polos"
          value={polos}
          onChange={(e) => setPolos(e.target.value)}
          fullWidth
        />

        {/* Publication Type - will be saved in the PublicationType table (column "type") */}
        <FormControl fullWidth required>
          <InputLabel id="tipo-publicacao-label">Tipo de Publicação</InputLabel>
          <Select
            labelId="tipo-publicacao-label"
            value={tipoPublicacao}
            label="Tipo de Publicação"
            onChange={(e) => setTipoPublicacao(e.target.value)}
          >
            <MenuItem value="Publicação de Edital/Abertura das Inscrições">
              Publicação de Edital/Abertura das Inscrições
            </MenuItem>
            <MenuItem value="Homologação das Inscrições">
              Homologação das Inscrições
            </MenuItem>
            <MenuItem value="Resultado da Análise de Documentos">
              Resultado da Análise de Documentos
            </MenuItem>
            <MenuItem value="Resultado da Entrevista">
              Resultado da Entrevista
            </MenuItem>
            <MenuItem value="Resultado da Prova Escrita">
              Resultado da Prova Escrita
            </MenuItem>
            <MenuItem value="Resultado Preliminar do Processo Seletivo Simplificado">
              Resultado Preliminar do Processo Seletivo Simplificado
            </MenuItem>
            <MenuItem value="Local de Prova">Local de Prova</MenuItem>
            <MenuItem value="Resultado Final do Processo Seletivo Simplificado">
              Resultado Final do Processo Seletivo Simplificado
            </MenuItem>
            <MenuItem value="Atualização do Cronograma do Processo Seletivo Simplificado">
              Atualização do Cronograma do Processo Seletivo Simplificado
            </MenuItem>
            <MenuItem value="Comunicado">Comunicado</MenuItem>
            <MenuItem value="Resultado do Recurso">Resultado do Recurso</MenuItem>
            <MenuItem value="Retificação/Errata">Retificação/Errata</MenuItem>
            <MenuItem value="Convocação">Convocação</MenuItem>
            <MenuItem value="Outras publicações">Outras publicações</MenuItem>
          </Select>
        </FormControl>

        {/* Additional fields for Edital Publication */}
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
                <FormControlLabel value="Sim" control={<Radio />} label="Sim" />
                <FormControlLabel value="Não" control={<Radio />} label="Não" />
              </RadioGroup>
            </FormControl>
          </>
        )}

        {/* Publication Date */}
        <TextField
          label="Data da Publicação"
          type="date"
          value={dataPublicacao}
          onChange={(e) => setDataPublicacao(e.target.value)}
          fullWidth
          InputLabelProps={{ shrink: true }}
          required
        />

        <Box display="flex" justifyContent="center" my={2}>
          <Button variant="contained" color="primary" type="submit">
            Enviar Solicitação
          </Button>
        </Box>
      </Box>

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

export default CadastroSolicitacao;
