import React from "react";
import ErrorFallback from "./ErrorFallback";
import { logError } from "../utils/errorLogger";

class ErrorBoundary extends React.Component {
  state = {
    hasError: false,
    error: null,
    errorInfo: null,
  };

  static getDerivedStateFromError(/* error */) {
    // Atualiza apenas a flag para exibir o fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Salva o erro e suas informações no state
    this.setState({ error, errorInfo });
    // Continua logando normalmente
    logError(error.toString(), errorInfo);
  }

  handleReset = () => {
    // Reseta tudo e tenta renderizar novamente
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  render() {
    if (this.state.hasError) {
      // Passa `error` e `errorInfo` para o fallback
      return (
        <ErrorFallback
          error={this.state.error}
          errorInfo={this.state.errorInfo}
          onReset={this.handleReset}
        />
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
