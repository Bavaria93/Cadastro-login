import axios from "axios";

export async function enviarSolicitacao(data) {
  return axios.post("http://localhost:8000/requests/", data);
}

export async function analisarDocumentos(files) {
  const formData = new FormData();
  files.forEach(f => formData.append("files", f));
  return axios.post("http://200.239.90.80:8000/documents/analyze-document", formData, {
    headers: { "Content-Type": "multipart/form-data" }
  });
}
