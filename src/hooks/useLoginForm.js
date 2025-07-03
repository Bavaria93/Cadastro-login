import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

/**
 * Hook customizado para encapsular a lógica de login:
 * - controla estados de email, senha e visibilidade da senha
 * - executa o fluxo de autenticação via AuthContext
 * - gerencia navegação após sucesso ou falha
 */
export default function useLoginForm() {
  // Valor e setter para o campo de email
  const [email, setEmail] = useState('');
  
  // Valor e setter para o campo de senha
  const [password, setPassword] = useState('');
  
  // Mensagem de erro (string vazia quando não há erro)
  const [error, setError] = useState('');
  
  // Controla se a senha está visível (true) ou oculta (false)
  const [showPassword, setShowPassword] = useState(false);

  // Função de login provida pelo contexto de autenticação
  const { signIn } = useContext(AuthContext);

  // Hook do React Router para redirecionar após login
  const navigate = useNavigate();

  /**
   * Alterna o estado de visibilidade da senha.
   * Chamado quando o usuário clica no ícone de olho.
   */
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  /**
   * Handler de envio do formulário de login.
   * - previne o comportamento padrão do form
   * - limpa mensagem de erro anterior
   * - tenta autenticar via signIn
   * - em caso de sucesso redireciona para '/'
   * - em caso de erro, exibe mensagem apropriada
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // Tenta autenticar com as credenciais fornecidas
      await signIn(email, password);
      
      // Se der certo, navega para a página inicial
      navigate('/');
    } catch (err) {
      // Log do erro para diagnóstico em dev
      console.error('Erro no login:', err);
      
      // Atualiza estado de erro para feedback ao usuário
      setError('Email ou senha inválidos!');
    }
  };

  // Expõe todos os valores e handlers necessários ao componente de apresentação
  return {
    email,
    setEmail,
    password,
    setPassword,
    error,
    showPassword,
    togglePasswordVisibility,
    handleSubmit
  };
}
