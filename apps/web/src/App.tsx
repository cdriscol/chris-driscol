import { Container, Stack, Typography } from "@mui/material";

export default function App() {
  return (
    <div className="min-h-screen bg-sand">
      <header className="home-section" id="top">
        <Container maxWidth="md">
          <Stack spacing={2} alignItems="flex-start">
            <Typography variant="overline" letterSpacing={2}>
              Modernization Scaffold
            </Typography>
            <Typography variant="h3" component="h1">
              Chris Driscol
            </Typography>
            <Typography variant="body1" color="text.secondary">
              A refreshed Vite + React + Tailwind + MUI foundation that will
              inherit the legacy layout and styling.
            </Typography>
            <Typography variant="body2" color="text.secondary">
              GraphQL endpoint: /graphql
            </Typography>
          </Stack>
        </Container>
      </header>

      <section className="home-section" id="about">
        <Container maxWidth="md">
          <Typography className="section-heading" variant="h4">
            About
          </Typography>
          <Typography className="section-subheading">
            Legacy styling is now loaded (fonts, headings, buttons, sections).
          </Typography>
        </Container>
      </section>

      <section className="home-section" id="work">
        <Container maxWidth="md">
          <Typography className="section-heading" variant="h4">
            Work
          </Typography>
          <Typography className="section-subheading">
            Portfolio data is available from the Rust GraphQL API.
          </Typography>
        </Container>
      </section>
    </div>
  );
}
