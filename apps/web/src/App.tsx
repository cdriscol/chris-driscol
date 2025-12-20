import { Container, Stack, Typography } from "@mui/material";

export default function App() {
  return (
    <div className="min-h-screen bg-sand">
      <Container maxWidth="md" className="py-16">
        <Stack spacing={2}>
          <Typography variant="overline" letterSpacing={2}>
            Modernization Scaffold
          </Typography>
          <Typography variant="h3" component="h1">
            Chris Driscol
          </Typography>
          <Typography variant="body1" color="text.secondary">
            This is a placeholder shell for the Vite + React + Tailwind + MUI
            migration. Legacy content remains in the legacy folder for reference.
          </Typography>
          <Typography variant="body2" color="text.secondary">
            The GraphQL endpoint is always /graphql.
          </Typography>
        </Stack>
      </Container>
    </div>
  );
}
