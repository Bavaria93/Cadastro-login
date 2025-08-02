import axios from 'axios';

async function login(email, password) {
  const params = new URLSearchParams();
  params.append('username', email);
  params.append('password', password);

  try {
    // aqui usamos 'response' em vez de desestruturar data
    const response = await axios.post( 'http://localhost:8000/login', params, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    );
    const data = response.data;

    // se não recebeu token, é credencial inválida
    if (!data?.access_token) {
      throw new Error('E-mail ou senha inválidos');
    }

    return data;
  } catch (err) {
    // erro 401 → mensagem customizada
    if (err.response?.status === 401) {
      throw new Error('E-mail ou senha inválidos');
    }
    // outros erros: ou vem da API ou de rede
    const msg =
      err.response?.data?.message ||
      err.message ||
      'Falha na autenticação';
    throw new Error(msg);
  }
}

const authService = { login };
export default authService;
