import { useState } from "react";

export default function useSolicitacaoForm(clearFiles) {
  const [numero, setNumero] = useState("");
  const [dataEdital, setDataEdital] = useState("");
  const [funcao, setFuncao] = useState("");
  const [outraFuncao, setOutraFuncao] = useState("");
  const [tipoPublicacao, setTipoPublicacao] = useState("");
  const [inscInicio, setInscInicio] = useState("");
  const [inscFim, setInscFim] = useState("");
  const [docComprob, setDocComprob] = useState("Não");
  const [dataPublicacao, setDataPublicacao] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedCampuses, setSelectedCampuses] = useState([]);

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

  const validate = () => {
    if (
      !numero.trim() ||
      !dataEdital ||
      !funcao ||
      !tipoPublicacao ||
      !dataPublicacao
    ) return false;
    if (funcao === "Outros" && !outraFuncao.trim()) return false;
    if (
      tipoPublicacao === "Publicação de Edital/Abertura das Inscrições" &&
      (!inscInicio || !inscFim)
    ) return false;
    if (!selectedCourse || selectedCampuses.length === 0) return false;
    return true;
  };

  return {
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
    validate,
    clearForm,
  };
}
