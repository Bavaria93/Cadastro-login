import { Box, Avatar, Button, TextField } from "@mui/material";

export default function StepDadosUsuario({
  name, setName,
  email, setEmail,
  password, setPassword,
  errors, selectedPhoto,
  previewPhoto, onPhotoChange
}) {
  return (
    <Box mt={3}>
      <Box display="flex" flexDirection="column" alignItems="center" mb={2}>
        <Avatar
          src={previewPhoto || "/default-avatar.png"}
          sx={{ width: 100, height: 100, mb: 1 }}
        />
        <Button variant="outlined" component="label">
          Atualizar Foto
          <input
            type="file"
            accept="image/*"
            hidden
            onChange={onPhotoChange}
          />
        </Button>
      </Box>
      <TextField
        label="Nome Completo"
        value={name}
        onChange={(e) => setName(e.target.value)}
        fullWidth
        error={!!errors.name}
        helperText={errors.name}
      />
      <TextField
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
        sx={{ mt: 2 }}
        error={!!errors.email}
        helperText={errors.email}
      />
      <TextField
        label="Senha"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
        sx={{ mt: 2 }}
        error={!!errors.password}
        helperText={errors.password}
      />
    </Box>
  );
}
