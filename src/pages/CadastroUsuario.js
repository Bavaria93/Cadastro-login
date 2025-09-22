import { Container, Paper, Stepper, Step, StepLabel, Box, Button } from "@mui/material";
import StepDadosUsuario from "../steps/StepDadosUsuario";
import StepAssociarPerfis from "../steps/StepAssociarPerfis";
import StepConfirmacao from "../steps/StepConfirmacao";
import FeedbackDialog from "../components/FeedbackDialog";
import useCadastroUsuario from "../hooks/useCadastroUsuario";

export default function CadastroUsuario() {
  const steps = ["Dados do Usuário", "Associação de Perfis", "Confirmação"];
  const state = useCadastroUsuario(steps);

  const stepComponents = [
    <StepDadosUsuario {...state} />,
    <StepAssociarPerfis {...state} />,
    <StepConfirmacao {...state} />
  ];

  return (
    <Container maxWidth="sm" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Stepper activeStep={state.activeStep} alternativeLabel>
          {steps.map(label => <Step key={label}><StepLabel>{label}</StepLabel></Step>)}
        </Stepper>

        {stepComponents[state.activeStep]}

        <Box display="flex" justifyContent="space-between" mt={4}>
          <Button onClick={state.prevStep} disabled={state.activeStep === 0}>Voltar</Button>
          <Button variant="contained" onClick={state.handleNext}>
            {state.isLast ? "Concluir" : "Próximo"}
          </Button>
        </Box>
      </Paper>

      <FeedbackDialog
        dialog={state.dialog}
        onClose={() => state.setDialog(d => ({ ...d, open: false }))}
      />
    </Container>
  );
}
