import { createTheme } from "@mui/material/styles";

const snackbarTheme = createTheme({
  components: {
    // Override do Alert (usado dentro do Snackbar)
    MuiAlert: {
      styleOverrides: {
        filledSuccess: {
          backgroundColor: "#4caf50",
          color: "#fff",
        },
        filledError: {
          backgroundColor: "#f44336",
          color: "#fff",
        },
        filledWarning: {
          backgroundColor: "#ff9800",
          color: "#fff",
        },
        filledInfo: {
          backgroundColor: "#2196f3",
          color: "#fff",
        },
      },
    },
    // Se quiser ajustar posicionamento ou margem do Snackbar em si:
    MuiSnackbar: {
      styleOverrides: {
        root: {
          bottom: 20,    // afasta 20px do rodapé
          // você pode adicionar mais overrides aqui
        },
      },
    },
  },
});

export default snackbarTheme;
