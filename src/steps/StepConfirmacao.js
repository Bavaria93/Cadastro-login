import { Box, Avatar, Typography } from "@mui/material";

export default function StepConfirmacao({
  draftUser,
  selectedProfiles,
  profiles,
  previewPhoto
}) {
  return (
    <Box mt={3}>
      <Typography variant="h6" gutterBottom>Confirmação </Typography>
      {previewPhoto && (
        <Box mt={2}>
          <Typography variant="body2">Foto selecionada:</Typography>
          <Avatar src={previewPhoto} sx={{ width: 80, height: 80 }} />
        </Box>
      )}
      <Typography><strong>Nome:</strong> {draftUser?.name}</Typography>
      <Typography><strong>Email:</strong> {draftUser?.email}</Typography>
      <Typography>
        <strong>Perfis:</strong>{" "}
        {profiles.length > 0
          ? selectedProfiles.join(", ")
          : "Nenhum"}
      </Typography>

    </Box>
  );
}
