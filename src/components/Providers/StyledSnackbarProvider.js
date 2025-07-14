import { styled } from "@mui/material/styles";
import { SnackbarProvider } from "notistack";

export default styled(SnackbarProvider)({
  // Quando o container estiver bottomCenter, force coluna normal
  "& .notistack-container-bottomCenter": {
    flexDirection: "column"
  }
});
