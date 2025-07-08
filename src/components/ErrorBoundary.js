import React from "react";
import ErrorFallback from "./ErrorFallback";
import { logError } from "../utils/errorLogger";

class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    // Atualiza state para renderizar fallback
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // Envia o erro para o logger
    logError(error.toString(), info);
  }

  handleReset = () => {
    // reset para tentar renderizar novamente
    this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError) {
      // Mostra nossa UI amigável
      return <ErrorFallback onReset={this.handleReset} />;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
