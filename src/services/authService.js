import axios from 'axios';

async function login(email, password) {
  const params = new URLSearchParams();
  params.append('username', email);
  params.append('password', password);

  const response = await axios.post('http://localhost:8000/login', params, {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  });
  return response.data;
}

const authService = { login };

export default authService;
