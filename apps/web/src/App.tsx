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

type ContactErrors = {
  name?: string;
  from?: string;
  subject?: string;
  body?: string;
};

const contactMutation = `
  mutation ContactMe($input: ContactMeInput!) {
    contactMe(input: $input) {
      success
    }
  }
`;

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
  const [contactSent, setContactSent] = useState(false);
  const [contactError, setContactError] = useState<string | null>(null);
  const [contactForm, setContactForm] = useState({
    name: "",
    from: "",
    subject: "",
    body: "",
  });
  const [contactErrors, setContactErrors] = useState<ContactErrors>({});

  const validateContact = () => {
    const nextErrors: ContactErrors = {};
    if (!contactForm.name.trim()) nextErrors.name = "Please enter your name.";
    if (!contactForm.from.trim()) nextErrors.from = "Please enter your email.";
    if (
      contactForm.from.trim() &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactForm.from)
    ) {
      nextErrors.from = "Please enter a valid email.";
    }
    if (!contactForm.subject.trim()) nextErrors.subject = "Please enter a subject.";
    if (!contactForm.body.trim()) nextErrors.body = "Please enter a message.";
    setContactErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

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

  const handleContactSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setContactError(null);
    if (!validateContact()) return;

    try {
      const response = await fetch("/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: contactMutation,
          variables: {
            input: {
              name: contactForm.name,
              from: contactForm.from,
              subject: contactForm.subject,
              body: contactForm.body,
            },
          },
        }),
      });
      const json = (await response.json()) as {
        data?: { contactMe?: { success?: boolean } };
        errors?: Array<{ message: string }>;
      };
      if (json.errors?.length) {
        throw new Error(json.errors[0]?.message ?? "There was an error sending your email.");
      }
      if (!json.data?.contactMe?.success) {
        throw new Error("There was an error sending your email.");
      }
      setContactSent(true);
      setContactForm({ name: "", from: "", subject: "", body: "" });
    } catch (err) {
      setContactError(err instanceof Error ? err.message : "There was an error sending your email.");
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <nav className="fixed left-0 top-0 z-50 w-full border-b border-slate-200 bg-white/90 backdrop-blur">
        <Container maxWidth="lg" className="flex flex-wrap items-center justify-between gap-4 py-4">
          <a href="#top" className="font-display text-lg font-semibold uppercase tracking-wide text-slate-900">
            Chris Driscol
          </a>
          <div className="flex flex-wrap items-center gap-4 text-xs font-semibold uppercase tracking-[0.2em] text-slate-600 sm:text-sm">
            <a href="#aboutme" className="hover:text-amber-600">
              About me
            </a>
            <a href="#skills" className="hover:text-amber-600">
              Skills
            </a>
            <a href="#experience" className="hover:text-amber-600">
              Experience
            </a>
            <a href="#portfolio" className="hover:text-amber-600">
              My work
            </a>
            <a href="#contactme" className="hover:text-amber-600">
              Say hi
            </a>
          </div>
          <div className="flex items-center gap-4 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 sm:text-sm">
            <a
              href={chris?.social.linkedIn ?? "#"}
              className="hover:text-amber-600"
              rel="noreferrer"
              target="_blank"
            >
              LinkedIn
            </a>
            <a
              href={chris?.social.github ?? "#"}
              className="hover:text-amber-600"
              rel="noreferrer"
              target="_blank"
            >
              GitHub
            </a>
          </div>
        </Container>
      </nav>
      <main className="pt-20">
      <header
        id="top"
        className="relative bg-slate-900 text-white"
        style={{ backgroundImage: "url(/images/header-bg.jpg)" }}
      >
        <div className="absolute inset-0 bg-black/60" />
        <Container maxWidth="md" className="relative py-24 sm:py-32">
          <Stack spacing={2} alignItems="flex-start">
            <Typography variant="overline" letterSpacing={2} className="text-xs font-semibold tracking-[0.3em]">
              Welcome to my website
            </Typography>
            <Typography
              variant="h3"
              component="h1"
              className="font-display text-4xl font-bold uppercase tracking-wide text-white"
            >
              {chris?.title ?? "Chris Driscol"}
            </Typography>
            <Typography variant="h5" className="font-display text-2xl uppercase tracking-wide text-white/90">
              It is nice to meet you
            </Typography>
            <Typography variant="body1" className="max-w-xl text-base leading-7 text-white/80">
              {chris?.description ?? "Loading profile details..."}
            </Typography>
            <a
              href="#aboutme"
              className="inline-flex items-center rounded-md bg-amber-400 px-5 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-slate-900 transition hover:bg-amber-300"
            >
              Learn about me
            </a>
            {error ? (
              <Typography variant="body2" className="text-sm text-amber-200">
                {error}
              </Typography>
            ) : null}
          </Stack>
        </Container>
      </header>

      <section className="py-20" id="aboutme">
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
                        {item.duration} - {item.location}
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

      <section className="bg-slate-900 py-10 text-white" id="builtWith">
        <Container maxWidth="md">
          <Stack spacing={2}>
            <Typography className="text-sm uppercase tracking-[0.3em] text-amber-300">Built with</Typography>
            <Typography className="text-base text-white/80">
              This site is built with React + Vite + Tailwind + MUI on the frontend, Rust + Axum + async-graphql on the
              backend, and AWS Lambda + CloudFront + CDK for infrastructure. The API lives at <span className="font-semibold">/graphql</span>.
            </Typography>
            <div className="flex flex-wrap gap-2 text-xs uppercase tracking-[0.2em] text-white/70">
              {[
                "React",
                "Vite",
                "Tailwind",
                "MUI",
                "Rust",
                "Axum",
                "async-graphql",
                "Lambda",
                "CloudFront",
                "CDK",
                "SES",
              ].map((item) => (
                <span key={item} className="rounded-full border border-white/20 px-3 py-1">
                  {item}
                </span>
              ))}
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

      <section className="bg-slate-50 py-20" id="portfolio">
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
                      {item.date} - {item.location}
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

      <section
        className="bg-[#222] bg-[url('/images/map-image.png')] bg-cover bg-center py-20"
        id="contactme"
      >
        <Container maxWidth="md">
          <Stack spacing={2}>
            <Typography variant="h4" className="font-display text-3xl uppercase tracking-wide text-white">
              {contactSent ? "Thank you" : "Contact Me"}
            </Typography>
            <Typography className="font-serif text-base italic text-white/70">
              {contactSent
                ? "I will respond to you as soon as possible."
                : "I would love to hear from you!"}
            </Typography>
            {!contactSent ? (
              <form onSubmit={handleContactSubmit} className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <div>
                    <label htmlFor="contact-email" className="sr-only">
                      Your email
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      className="w-full rounded-md border border-white/10 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/60 focus:border-amber-400 focus:outline-none"
                      placeholder="your email *"
                      value={contactForm.from}
                      onChange={(event) =>
                        setContactForm((prev) => ({ ...prev, from: event.target.value }))
                      }
                    />
                    {contactErrors.from ? (
                      <p className="mt-1 text-sm text-red-300">{contactErrors.from}</p>
                    ) : null}
                  </div>
                  <div>
                    <label htmlFor="contact-name" className="sr-only">
                      Your name
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      className="w-full rounded-md border border-white/10 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/60 focus:border-amber-400 focus:outline-none"
                      placeholder="your name *"
                      value={contactForm.name}
                      onChange={(event) =>
                        setContactForm((prev) => ({ ...prev, name: event.target.value }))
                      }
                    />
                    {contactErrors.name ? (
                      <p className="mt-1 text-sm text-red-300">{contactErrors.name}</p>
                    ) : null}
                  </div>
                  <div>
                    <label htmlFor="contact-subject" className="sr-only">
                      Subject
                    </label>
                    <input
                      id="contact-subject"
                      type="text"
                      className="w-full rounded-md border border-white/10 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/60 focus:border-amber-400 focus:outline-none"
                      placeholder="subject *"
                      value={contactForm.subject}
                      onChange={(event) =>
                        setContactForm((prev) => ({ ...prev, subject: event.target.value }))
                      }
                    />
                    {contactErrors.subject ? (
                      <p className="mt-1 text-sm text-red-300">{contactErrors.subject}</p>
                    ) : null}
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="contact-message" className="sr-only">
                      Message
                    </label>
                    <textarea
                      id="contact-message"
                      rows={9}
                      className="w-full rounded-md border border-white/10 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/60 focus:border-amber-400 focus:outline-none"
                      placeholder="this is where you say something.. *"
                      value={contactForm.body}
                      onChange={(event) =>
                        setContactForm((prev) => ({ ...prev, body: event.target.value }))
                      }
                    />
                    {contactErrors.body ? (
                      <p className="mt-1 text-sm text-red-300">{contactErrors.body}</p>
                    ) : null}
                  </div>
                  <button
                    type="submit"
                    className="inline-flex w-full items-center justify-center rounded-md bg-amber-400 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-slate-900 transition hover:bg-amber-300"
                  >
                    Send Message
                  </button>
                  {contactError ? (
                    <p className="text-sm font-semibold text-red-300">{contactError}</p>
                  ) : null}
                </div>
              </form>
            ) : null}
            <div className="grid gap-2 text-sm text-white/70 sm:grid-cols-3">
              <div>Email: {chris?.social.email ?? "Loading..."}</div>
              <div>GitHub: {chris?.social.github ?? "Loading..."}</div>
              <div>LinkedIn: {chris?.social.linkedIn ?? "Loading..."}</div>
            </div>
          </Stack>
        </Container>
      </section>
      <footer className="border-t border-slate-200 bg-white py-8">
        <Container maxWidth="lg" className="flex flex-col gap-4 text-sm text-slate-600 md:flex-row md:items-center md:justify-between">
          <span>
            Copyright &copy; <strong>Chris Driscol</strong> {new Date().getFullYear()}
          </span>
          <div className="flex items-center gap-4">
            <a
              href={chris?.social.linkedIn ?? "#"}
              className="font-semibold uppercase tracking-[0.2em] text-slate-600 hover:text-amber-600"
              rel="noreferrer"
              target="_blank"
            >
              LinkedIn
            </a>
            <a
              href={chris?.social.github ?? "#"}
              className="font-semibold uppercase tracking-[0.2em] text-slate-600 hover:text-amber-600"
              rel="noreferrer"
              target="_blank"
            >
              GitHub
            </a>
            <a
              href={chris?.social.email ? `mailto:${chris.social.email}` : "#"}
              className="font-semibold uppercase tracking-[0.2em] text-slate-600 hover:text-amber-600"
            >
              {chris?.social.email ?? "Email"}
            </a>
          </div>
        </Container>
      </footer>
      </main>
    </div>
  );
}
