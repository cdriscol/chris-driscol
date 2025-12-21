import { Container, Stack, Typography } from "@mui/material";

export default function App() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,#ffffff_0%,#f5f5f5_55%,#ededed_100%)]">
      <header className="py-24 sm:py-32" id="top">
        <Container maxWidth="md">
          <Stack spacing={2} alignItems="flex-start">
            <Typography variant="overline" letterSpacing={2} className="text-xs font-semibold tracking-[0.3em]">
              Modernization Scaffold
            </Typography>
            <Typography
              variant="h3"
              component="h1"
              className="font-display text-4xl font-bold uppercase tracking-wide text-slate-900"
            >
              Chris Driscol
            </Typography>
            <Typography variant="body1" color="text.secondary" className="max-w-xl text-base leading-7">
              A refreshed Vite + React + Tailwind + MUI foundation that will
              inherit the legacy layout and styling.
            </Typography>
            <Typography variant="body2" color="text.secondary" className="text-sm">
              GraphQL endpoint: /graphql
            </Typography>
          </Stack>
        </Container>
      </header>

      <section className="py-24 sm:py-32" id="about">
        <Container maxWidth="md">
          <Typography variant="h4" className="font-display text-3xl uppercase tracking-wide">
            About
          </Typography>
          <Typography className="font-serif text-base italic text-slate-600">
            Legacy styling is now mapped into Tailwind utilities.
          </Typography>
        </Container>
      </section>

      <section className="py-24 sm:py-32" id="work">
        <Container maxWidth="md">
          <Typography variant="h4" className="font-display text-3xl uppercase tracking-wide">
            Work
          </Typography>
          <Typography className="font-serif text-base italic text-slate-600">
            Portfolio data is available from the Rust GraphQL API.
          </Typography>
        </Container>
      </section>
    </div>
  );
}
