import { Container, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";

type Skills = {
  languages: string[];
  technologies: string[];
  tools: string[];
  loves: string[];
};

type Experience = {
  duration?: string | null;
  title?: string | null;
  location?: string | null;
  description?: string | null;
  imageUrl?: string | null;
};

type Work = {
  title?: string | null;
  subTitle?: string | null;
  description: string[];
  location?: string | null;
  link?: string | null;
  video?: string | null;
  date?: string | null;
  imageUrl?: string | null;
  technologies: string[];
};

type About = {
  description: string[];
  imageUrl?: string | null;
  imageCaption?: string | null;
  imageTitle?: string | null;
  tagLine?: string | null;
};

type Social = {
  linkedIn: string;
  github: string;
  email: string;
};

type Chris = {
  id: string;
  title: string;
  description: string;
  skills: Skills;
  experience: Experience[];
  about: About;
  work: Work[];
  social: Social;
};

type QueryResponse = {
  data?: {
    chris: Chris;
  };
};

const query = `
  query AppQuery {
    chris {
      id
      title
      description
      about {
        description
        imageUrl
        imageCaption
        imageTitle
        tagLine
      }
      experience {
        duration
        title
        location
        description
        imageUrl
      }
      skills {
        languages
        technologies
        tools
        loves
      }
      work {
        title
        subTitle
        description
        location
        link
        video
        date
        imageUrl
        technologies
      }
      social {
        linkedIn
        github
        email
      }
    }
  }
`;

export default function App() {
  const [chris, setChris] = useState<Chris | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    const load = async () => {
      try {
        const response = await fetch("/graphql", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ query }),
        });
        const json = (await response.json()) as QueryResponse;
        if (!active) return;
        setChris(json.data?.chris ?? null);
      } catch (err) {
        if (!active) return;
        setError(err instanceof Error ? err.message : "Failed to load data.");
      }
    };
    load();
    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <header
        id="top"
        className="relative bg-slate-900 text-white"
        style={{ backgroundImage: "url(/images/header-bg.jpg)" }}
      >
        <div className="absolute inset-0 bg-black/60" />
        <Container maxWidth="md" className="relative py-24 sm:py-32">
          <Stack spacing={2} alignItems="flex-start">
            <Typography variant="overline" letterSpacing={2} className="text-xs font-semibold tracking-[0.3em]">
              Portfolio
            </Typography>
            <Typography
              variant="h3"
              component="h1"
              className="font-display text-4xl font-bold uppercase tracking-wide text-white"
            >
              {chris?.title ?? "Chris Driscol"}
            </Typography>
            <Typography variant="body1" className="max-w-xl text-base leading-7 text-white/80">
              {chris?.description ?? "Loading profile details..."}
            </Typography>
            {error ? (
              <Typography variant="body2" className="text-sm text-amber-200">
                {error}
              </Typography>
            ) : null}
          </Stack>
        </Container>
      </header>

      <section className="py-20" id="about">
        <Container maxWidth="md">
          <Stack spacing={2}>
            <Typography variant="h4" className="font-display text-3xl uppercase tracking-wide">
              About
            </Typography>
            <Typography className="font-serif text-base italic text-slate-600">
              {chris?.about.tagLine ?? "Loading summary..."}
            </Typography>
            <div className="grid gap-6 md:grid-cols-[180px_1fr]">
              {chris?.about.imageUrl ? (
                <figure className="text-center">
                  <img
                    src={chris.about.imageUrl}
                    alt={chris.about.imageTitle ?? "Chris Driscol"}
                    className="h-44 w-44 rounded-full object-cover shadow-md"
                  />
                  <figcaption className="mt-2 text-sm text-slate-500">
                    {chris.about.imageCaption}
                  </figcaption>
                </figure>
              ) : null}
              <div className="space-y-4 text-sm leading-7 text-slate-700">
                {chris?.about.description.map((line) => (
                  <p key={line} dangerouslySetInnerHTML={{ __html: line }} />
                )) ?? <p>Loading biography...</p>}
              </div>
            </div>
          </Stack>
        </Container>
      </section>

      <section className="bg-slate-50 py-20" id="experience">
        <Container maxWidth="md">
          <Stack spacing={3}>
            <Typography variant="h4" className="font-display text-3xl uppercase tracking-wide">
              Experience
            </Typography>
            <div className="space-y-6">
              {chris?.experience.map((item) => (
                <div key={`${item.duration}-${item.title}`} className="rounded-lg border border-slate-200 bg-white p-6">
                  <div className="flex flex-col gap-4 md:flex-row md:items-center">
                    {item.imageUrl ? (
                      <img
                        src={item.imageUrl}
                        alt={item.title ?? item.location ?? "Experience"}
                        className="h-20 w-20 rounded-full object-cover"
                      />
                    ) : null}
                    <div>
                      <Typography className="font-display text-lg uppercase tracking-wide">
                        {item.title ?? item.location ?? "Experience"}
                      </Typography>
                      <Typography className="text-sm text-slate-500">
                        {item.duration} · {item.location}
                      </Typography>
                      <Typography className="mt-2 text-sm leading-6 text-slate-700">
                        {item.description}
                      </Typography>
                    </div>
                  </div>
                </div>
              )) ?? <p className="text-sm text-slate-500">Loading experience...</p>}
            </div>
          </Stack>
        </Container>
      </section>

      <section className="py-20" id="skills">
        <Container maxWidth="md">
          <Stack spacing={3}>
            <Typography variant="h4" className="font-display text-3xl uppercase tracking-wide">
              Skills
            </Typography>
            <div className="grid gap-6 md:grid-cols-2">
              {chris?.skills ? (
                <>
                  <div>
                    <Typography className="font-display uppercase tracking-wide text-slate-700">Languages</Typography>
                    <ul className="mt-2 flex flex-wrap gap-2 text-sm">
                      {chris.skills.languages.map((skill) => (
                        <li key={skill} className="rounded-full bg-slate-100 px-3 py-1">
                          {skill}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <Typography className="font-display uppercase tracking-wide text-slate-700">Technologies</Typography>
                    <ul className="mt-2 flex flex-wrap gap-2 text-sm">
                      {chris.skills.technologies.map((skill) => (
                        <li key={skill} className="rounded-full bg-slate-100 px-3 py-1">
                          {skill}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <Typography className="font-display uppercase tracking-wide text-slate-700">Tools</Typography>
                    <ul className="mt-2 flex flex-wrap gap-2 text-sm">
                      {chris.skills.tools.map((skill) => (
                        <li key={skill} className="rounded-full bg-slate-100 px-3 py-1">
                          {skill}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <Typography className="font-display uppercase tracking-wide text-slate-700">Loves</Typography>
                    <ul className="mt-2 flex flex-wrap gap-2 text-sm">
                      {chris.skills.loves.map((skill) => (
                        <li key={skill} className="rounded-full bg-slate-100 px-3 py-1">
                          {skill}
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              ) : (
                <p className="text-sm text-slate-500">Loading skills...</p>
              )}
            </div>
          </Stack>
        </Container>
      </section>

      <section className="bg-slate-50 py-20" id="work">
        <Container maxWidth="lg">
          <Stack spacing={3}>
            <Typography variant="h4" className="font-display text-3xl uppercase tracking-wide">
              Work
            </Typography>
            <div className="grid gap-6 md:grid-cols-2">
              {chris?.work.map((item) => (
                <div key={`${item.title}-${item.date}`} className="rounded-lg border border-slate-200 bg-white p-6">
                  {item.imageUrl ? (
                    <img
                      src={item.imageUrl}
                      alt={item.title ?? "Work"}
                      className="h-44 w-full rounded-md object-cover"
                    />
                  ) : null}
                  <div className="mt-4 space-y-2">
                    <Typography className="font-display text-lg uppercase tracking-wide">
                      {item.title}
                    </Typography>
                    <Typography className="text-sm text-slate-500">
                      {item.date} · {item.location}
                    </Typography>
                    <Typography className="text-sm text-slate-700">{item.subTitle}</Typography>
                    <ul className="list-disc space-y-1 pl-5 text-sm text-slate-600">
                      {item.description.map((line) => (
                        <li key={line} dangerouslySetInnerHTML={{ __html: line }} />
                      ))}
                    </ul>
                    <div className="flex flex-wrap gap-2 text-xs text-slate-500">
                      {item.technologies.map((tech) => (
                        <span key={tech} className="rounded-full bg-slate-100 px-2 py-1">
                          {tech}
                        </span>
                      ))}
                    </div>
                    {item.link ? (
                      <a
                        href={item.link}
                        className="inline-flex items-center text-sm font-semibold text-amber-600 hover:text-amber-500"
                        rel="noreferrer"
                        target="_blank"
                      >
                        Visit project
                      </a>
                    ) : null}
                  </div>
                </div>
              )) ?? <p className="text-sm text-slate-500">Loading work...</p>}
            </div>
          </Stack>
        </Container>
      </section>

      <section className="py-20" id="contact">
        <Container maxWidth="md">
          <Stack spacing={2}>
            <Typography variant="h4" className="font-display text-3xl uppercase tracking-wide">
              Contact
            </Typography>
            <Typography className="text-sm text-slate-600">
              Email: {chris?.social.email ?? "Loading..."}
            </Typography>
            <Typography className="text-sm text-slate-600">
              GitHub: {chris?.social.github ?? "Loading..."}
            </Typography>
            <Typography className="text-sm text-slate-600">
              LinkedIn: {chris?.social.linkedIn ?? "Loading..."}
            </Typography>
          </Stack>
        </Container>
      </section>
    </div>
  );
}
