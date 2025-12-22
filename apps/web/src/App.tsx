import { useCallback, useEffect, useState } from "react";
import { ReactTyped } from "react-typed";
import { graphqlUrl } from "./lib/api";

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
  const [navSolid, setNavSolid] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const [navOpen, setNavOpen] = useState(false);
  const [activeWork, setActiveWork] = useState<Work | null>(null);
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
        const response = await fetch(graphqlUrl, {
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

  useEffect(() => {
    if (!chris) return;
    const baseUrl = window.location.origin;
    const canonicalUrl = `${baseUrl}${window.location.pathname}`;
    const description = chris.description;
    const title = chris.title;
    const imageUrl = `${baseUrl}/images/header-bg.jpg`;
    const imageAlt = `${title} hero image`;
    const twitterHandle = (() => {
      try {
        const handle = new URL(chris.social.github).pathname
          .split("/")
          .filter(Boolean)[0];
        return handle ? `@${handle}` : null;
      } catch {
        return null;
      }
    })();

    const ensureMeta = (selector: string, attrs: Record<string, string>) => {
      let element = document.head.querySelector(selector) as HTMLMetaElement | null;
      if (!element) {
        element = document.createElement("meta");
        Object.entries(attrs).forEach(([key, value]) => {
          element?.setAttribute(key, value);
        });
        document.head.appendChild(element);
      } else {
        Object.entries(attrs).forEach(([key, value]) => {
          element?.setAttribute(key, value);
        });
      }
    };

    const ensureMetaWithMedia = (attrs: Record<string, string>) => {
      const media = attrs.media;
      const name = attrs.name;
      if (!media || !name) return;
      const selector = `meta[name="${name}"][media="${media}"]`;
      ensureMeta(selector, attrs);
    };

    const ensureLink = (rel: string, href: string) => {
      let element = document.head.querySelector(
        `link[rel="${rel}"]`,
      ) as HTMLLinkElement | null;
      if (!element) {
        element = document.createElement("link");
        element.rel = rel;
        document.head.appendChild(element);
      }
      element.href = href;
    };

    const ensureScript = (id: string, json: Record<string, unknown>) => {
      let element = document.head.querySelector(
        `script#${id}`,
      ) as HTMLScriptElement | null;
      if (!element) {
        element = document.createElement("script");
        element.id = id;
        element.type = "application/ld+json";
        document.head.appendChild(element);
      }
      element.textContent = JSON.stringify(json);
    };

    document.title = title;
    ensureMeta('meta[name="robots"]', { name: "robots", content: "index,follow" });
    ensureMeta('meta[name="color-scheme"]', { name: "color-scheme", content: "light dark" });
    ensureMetaWithMedia({
      name: "theme-color",
      media: "(prefers-color-scheme: light)",
      content: "#ffffff",
    });
    ensureMetaWithMedia({
      name: "theme-color",
      media: "(prefers-color-scheme: dark)",
      content: "#09141d",
    });
    ensureMeta('meta[name="description"]', { name: "description", content: description });
    ensureMeta('meta[property="og:site_name"]', {
      property: "og:site_name",
      content: title,
    });
    ensureMeta('meta[property="og:title"]', { property: "og:title", content: title });
    ensureMeta('meta[property="og:description"]', {
      property: "og:description",
      content: description,
    });
    ensureMeta('meta[property="og:url"]', {
      property: "og:url",
      content: baseUrl,
    });
    ensureMeta('meta[property="og:image"]', {
      property: "og:image",
      content: imageUrl,
    });
    ensureMeta('meta[property="og:image:alt"]', {
      property: "og:image:alt",
      content: imageAlt,
    });
    ensureMeta('meta[property="og:image:width"]', {
      property: "og:image:width",
      content: "1200",
    });
    ensureMeta('meta[property="og:image:height"]', {
      property: "og:image:height",
      content: "630",
    });
    ensureMeta('meta[property="og:type"]', {
      property: "og:type",
      content: "website",
    });
    ensureMeta('meta[name="twitter:card"]', {
      name: "twitter:card",
      content: "summary_large_image",
    });
    ensureMeta('meta[name="twitter:title"]', {
      name: "twitter:title",
      content: title,
    });
    ensureMeta('meta[name="twitter:description"]', {
      name: "twitter:description",
      content: description,
    });
    ensureMeta('meta[name="twitter:url"]', {
      name: "twitter:url",
      content: baseUrl,
    });
    ensureMeta('meta[name="twitter:image"]', {
      name: "twitter:image",
      content: imageUrl,
    });
    if (twitterHandle) {
      ensureMeta('meta[name="twitter:site"]', {
        name: "twitter:site",
        content: twitterHandle,
      });
      ensureMeta('meta[name="twitter:creator"]', {
        name: "twitter:creator",
        content: twitterHandle,
      });
    }
    ensureLink("canonical", canonicalUrl);

    const personName = chris.about?.imageTitle ?? "Chris Driscol";
    const jobTitle = chris.about?.imageCaption ?? chris.title;
    const sameAs = [chris.social.linkedIn, chris.social.github].filter(Boolean);
    ensureScript("ld-json-person", {
      "@context": "https://schema.org",
      "@type": "Person",
      name: personName,
      url: baseUrl,
      jobTitle,
      image: chris.about?.imageUrl ? `${baseUrl}${chris.about.imageUrl}` : imageUrl,
      sameAs,
    });
    ensureScript("ld-json-website", {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: title,
      url: baseUrl,
    });
  }, [chris]);

  const getNavOffset = useCallback(() => {
    const nav = document.querySelector(".site-nav") as HTMLElement | null;
    if (!nav) return 0;
    const styles = window.getComputedStyle(nav);
    const paddingTop = Number.parseFloat(styles.paddingTop) || 0;
    const paddingBottom = Number.parseFloat(styles.paddingBottom) || 0;
    const brand = nav.querySelector(".nav-brand") as HTMLElement | null;
    const toggle = nav.querySelector(".nav-toggle") as HTMLElement | null;
    const rowHeight = Math.max(
      brand?.getBoundingClientRect().height ?? 0,
      toggle?.getBoundingClientRect().height ?? 0,
    );
    const height = rowHeight + paddingTop + paddingBottom;
    document.documentElement.style.setProperty("--nav-offset", `${height}px`);
    return height;
  }, []);

  const scrollToSection = useCallback((id: string) => {
    const section = document.getElementById(id);
    if (!section) return;
    setNavOpen(false);
    const nav = document.querySelector(".site-nav");
    nav?.classList.remove("is-open");
    requestAnimationFrame(() => {
      const offset = getNavOffset();
      const top = section.getBoundingClientRect().top + window.scrollY - offset + 1;
      window.scrollTo({ top, behavior: "smooth" });
    });
    window.history.replaceState(null, "", window.location.pathname);
  }, [getNavOffset]);

  const handleNavClick =
    (id: string) => (event: React.MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault();
      scrollToSection(id);
    };

  useEffect(() => {
    const handleScroll = () => {
      setNavSolid(window.scrollY >= 300);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      getNavOffset();
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [getNavOffset]);

  useEffect(() => {
    const sectionIds = ["aboutme", "skills", "experience", "portfolio", "contactme"];
    const handleScroll = () => {
      const scrollPos = window.scrollY + getNavOffset() + 20;
      let current = "";
      for (const id of sectionIds) {
        const section = document.getElementById(id);
        if (section && scrollPos >= section.offsetTop) {
          current = id;
        }
      }
      setActiveSection(current);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [getNavOffset]);

  useEffect(() => {
    if (!activeWork) return undefined;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [activeWork]);

  useEffect(() => {
    if (!window.location.hash) return;
    const id = window.location.hash.replace("#", "");
    setTimeout(() => scrollToSection(id), 0);
  }, [scrollToSection]);

  const handleContactSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setContactError(null);
    if (!validateContact()) return;

    try {
      const response = await fetch(graphqlUrl, {
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

  const normalizeText = (value?: string | null) =>
    value
      ?.replaceAll("â€“", "-")
      .replaceAll("â€”", "-")
      .replaceAll("â€™", "'")
      .replaceAll("â€œ", "\"")
      .replaceAll("â€�", "\"")
      .replaceAll("Â", "") ?? "";

  const getVideoSrc = (value?: string | null) => {
    if (!value) return null;
    if (value.startsWith("http")) return value;
    return `https://www.youtube.com/embed/${value}`;
  };


  const IconLinkedIn = () => (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="nav-icon">
      <path
        fill="currentColor"
        d="M4.98 3.5C4.98 4.88 3.86 6 2.49 6 1.12 6 0 4.88 0 3.5 0 2.12 1.12 1 2.49 1c1.37 0 2.49 1.12 2.49 2.5zM.5 8h3.98v12.5H.5V8zm7.5 0h3.82v1.7h.05c.53-1 1.82-2.05 3.74-2.05 4 0 4.74 2.63 4.74 6.05V20.5h-3.98v-5.9c0-1.41-.03-3.23-1.97-3.23-1.97 0-2.27 1.54-2.27 3.13v6H8V8z"
      />
    </svg>
  );

  const IconGitHub = () => (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="nav-icon">
      <path
        fill="currentColor"
        d="M12 .5C5.73.5.75 5.58.75 11.98c0 5.2 3.43 9.6 8.2 11.16.6.12.82-.26.82-.58 0-.28-.01-1.02-.02-2-3.34.74-4.04-1.66-4.04-1.66-.54-1.4-1.32-1.77-1.32-1.77-1.08-.76.08-.74.08-.74 1.2.09 1.83 1.26 1.83 1.26 1.06 1.86 2.78 1.32 3.46 1 .11-.8.41-1.32.74-1.62-2.66-.31-5.46-1.36-5.46-6.03 0-1.33.46-2.41 1.22-3.26-.12-.31-.53-1.56.12-3.25 0 0 1-.33 3.3 1.24a11.2 11.2 0 0 1 6 0c2.3-1.57 3.3-1.24 3.3-1.24.65 1.69.24 2.94.12 3.25.76.85 1.22 1.93 1.22 3.26 0 4.68-2.8 5.72-5.48 6.02.42.37.8 1.1.8 2.23 0 1.61-.02 2.9-.02 3.3 0 .32.22.7.83.58 4.76-1.56 8.19-5.96 8.19-11.16C23.25 5.58 18.27.5 12 .5z"
      />
    </svg>
  );

  const IconHeart = () => (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="heart-icon">
      <path
        fill="currentColor"
        d="M12 21s-6.5-4.35-9.3-7.95C.9 11.2 1.3 7.7 4.1 6.1c2.1-1.2 4.6-.6 5.9 1.2 1.3-1.8 3.8-2.4 5.9-1.2 2.8 1.6 3.2 5.1 1.4 7-2.8 3.6-9.3 7.9-9.3 7.9z"
      />
    </svg>
  );

  return (
    <div className="page">
      <nav className={`site-nav ${navSolid ? "is-solid" : ""} ${navOpen ? "is-open" : ""}`}>
        <div className="site-container nav-inner">
          <h1 className="nav-brand">
            {/* biome-ignore lint/a11y/useValidAnchor: in-page navigation */}
            <a href="#top" onClick={handleNavClick("top")}>
              Chris Driscol
            </a>
          </h1>
          <button
            type="button"
            className="nav-toggle"
            aria-expanded={navOpen}
            aria-label="Toggle navigation"
            onClick={() => setNavOpen((open) => !open)}
          >
            <span />
            <span />
            <span />
          </button>
          <ul className="nav-links">
            <li>
              {/* biome-ignore lint/a11y/useValidAnchor: in-page navigation */}
              <a
                href="#aboutme"
                className={activeSection === "aboutme" ? "active" : undefined}
                onClick={handleNavClick("aboutme")}
              >
                About me
              </a>
            </li>
            <li>
              {/* biome-ignore lint/a11y/useValidAnchor: in-page navigation */}
              <a
                href="#skills"
                className={activeSection === "skills" ? "active" : undefined}
                onClick={handleNavClick("skills")}
              >
                Skills
              </a>
            </li>
            <li>
              {/* biome-ignore lint/a11y/useValidAnchor: in-page navigation */}
              <a
                href="#experience"
                className={activeSection === "experience" ? "active" : undefined}
                onClick={handleNavClick("experience")}
              >
                Experience
              </a>
            </li>
            <li>
              {/* biome-ignore lint/a11y/useValidAnchor: in-page navigation */}
              <a
                href="#portfolio"
                className={activeSection === "portfolio" ? "active" : undefined}
                onClick={handleNavClick("portfolio")}
              >
                My work
              </a>
            </li>
            <li>
              {/* biome-ignore lint/a11y/useValidAnchor: in-page navigation */}
              <a
                href="#contactme"
                className={activeSection === "contactme" ? "active" : undefined}
                onClick={handleNavClick("contactme")}
              >
                Say hi
              </a>
            </li>
          </ul>
          <ul className="nav-social">
            <li>
              <a
                href={chris?.social.linkedIn ?? "#"}
                rel="noreferrer"
                target="_blank"
                title="LinkedIn"
              >
                <IconLinkedIn />
                <span className="sr-only">LinkedIn</span>
              </a>
            </li>
            <li>
              <a
                href={chris?.social.github ?? "#"}
                rel="noreferrer"
                target="_blank"
                title="Github"
              >
                <IconGitHub />
                <span className="sr-only">GitHub</span>
              </a>
            </li>
          </ul>
        </div>
      </nav>

      <main>
        <header id="top" className="hero">
          <div className="site-container">
            <div className="intro-text">
              <div className="intro-lead-in">Welcome To My Website!</div>
              <div className="intro-heading">It&apos;s Nice To Meet You</div>
              <div className="hero-actions">
                {/* biome-ignore lint/a11y/useValidAnchor: in-page navigation */}
                <a href="#aboutme" onClick={handleNavClick("aboutme")} className="btn btn-xl btn-primary">
                  Learn about me
                </a>
              </div>
              {error ? <p className="intro-body">Error: {error}</p> : null}
            </div>
          </div>
        </header>

        <section className="section aboutme" id="aboutme">
          <div className="site-container">
            <div className="section-header">
              <h2 className="section-title">About Me</h2>
              <p className="section-tagline text-muted">
                This should help you get to know more about me..
              </p>
            </div>
            <div className="about-row">
              <div className="about-description">
                {chris?.about?.description?.map((line) => {
                  // biome-ignore lint/security/noDangerouslySetInnerHtml: content is trusted
                  return <p key={line} className="large" dangerouslySetInnerHTML={{ __html: line }} />;
                }) ?? <p className="large">Loading biography...</p>}
              </div>
              <div className="about-profile">
                <div className="me">
                  {chris?.about.imageUrl ? (
                    <img
                      src={chris.about.imageUrl}
                      alt={chris.about.imageTitle ?? "Chris Driscol"}
                      className="about-avatar"
                    />
                  ) : null}
                  <h1>{chris?.about.imageTitle ?? "Chris Driscol"}</h1>
                  <h2 className="text-muted">
                    {chris?.about.imageCaption ?? "VP of Engineering"}
                  </h2>
                </div>
              </div>
            </div>
            <div className="about-tag">
              <p className="large text-muted">
                I <IconHeart /> working on <strong>Agile teams</strong> motivated by{" "}
                <strong>delivering customer value</strong> early and often.
              </p>
            </div>
          </div>
        </section>

        <section className="built-with" id="builtWith">
          <div className="site-container">
            <p className="text-muted">
              This site is powered by GraphQL, you can query all this sites data (and more) by using
              my{" "}
              <a title="GraphiQL Explorer" href="/resume" target="_blank" rel="noreferrer">
                GraphiQL Explorer
              </a>
              .
            </p>
          </div>
        </section>

        <section className="section skills" id="skills">
          <div className="site-container">
            <div className="section-header">
              <h2 className="section-title">My Skills</h2>
              <p className="section-tagline text-muted">
                These are some things I&apos;ve picked up over the years..
              </p>
            </div>
            {chris?.skills ? (
              <div className="skills-row">
                <div className="skills-block">
                  <h3 className="card-title">languages</h3>
                  <p>{chris.skills.languages.join(", ")}</p>
                </div>
                <div className="skills-block">
                  <h3 className="card-title">technologies</h3>
                  <p>{chris.skills.technologies.join(", ")}</p>
                </div>
                <div className="skills-block">
                  <h3 className="card-title">tools</h3>
                  <p>{chris.skills.tools.join(", ")}</p>
                </div>
              </div>
            ) : (
              <p className="text-muted">Loading skills...</p>
            )}
            <div className="skills-love">
              I <IconHeart />{" "}
              <ReactTyped
                className="skills-love-text"
                strings={chris?.skills.loves ?? ["Agile teams"]}
                typeSpeed={100}
                backSpeed={40}
                loop
              />
            </div>
          </div>
        </section>

        <section className="section" id="experience">
          <div className="site-container">
            <div className="section-header text-center">
              <h2 className="section-title">My Experience</h2>
              <p className="section-tagline">Here&apos;s what I&apos;ve been up to..</p>
            </div>
            <ol className="timeline">
              {chris?.experience.map((item, index) => {
                const duration = normalizeText(item.duration);
                const location = normalizeText(item.location);
                const title = normalizeText(item.title) || location || "Experience";
                const locationLine = item.title ? location : "";
                const description = normalizeText(item.description ?? "");
                // biome-ignore lint/security/noDangerouslySetInnerHtml: content is trusted
                const body = <p dangerouslySetInnerHTML={{ __html: description }} />;
                return (
                  <li
                    key={`${item.duration}-${item.title}`}
                    className={`timeline-item ${index % 2 === 1 ? "timeline-inverted" : ""}`}
                  >
                    <div className="timeline-image">
                      {item.imageUrl ? (
                        <img
                          src={item.imageUrl}
                          alt={item.title ?? item.location ?? "Experience"}
                        />
                      ) : (
                        <span className="timeline-dot" />
                      )}
                    </div>
                    <div className="timeline-panel">
                      <div className="timeline-heading">
                        <h4 className="timeline-year">{duration}</h4>
                        <h4 className="subheading">{title}</h4>
                        {locationLine ? <p className="text-muted">{locationLine}</p> : null}
                      </div>
                      <div className="timeline-body">{body}</div>
                    </div>
                  </li>
                );
              }) ?? <p className="text-sm text-[var(--muted)]">Loading experience...</p>}
              <li className="timeline-item timeline-final timeline-inverted">
                <div className="timeline-image">
                  {/* biome-ignore lint/a11y/useValidAnchor: in-page navigation */}
                  <a
                    href="#contactme"
                    className="timeline-final-link"
                    onClick={handleNavClick("contactme")}
                  >
                    Want to hear more?
                  </a>
                </div>
              </li>
            </ol>
          </div>
        </section>

        <section className="section portfolio" id="portfolio">
          <div className="site-container">
            <div className="section-header">
              <h2 className="section-title">My Work</h2>
              <p className="section-tagline text-muted">
                These are just some of the things I have worked on over the years, some were done
                with the help of extremely talented colleagues.
              </p>
            </div>
            <div className="portfolio-grid">
              {chris?.work.map((item) => (
                <div key={`${item.title}-${item.date}`} className="portfolio-item">
                  <a
                    className="portfolio-link"
                    href={item.link ?? "#"}
                    rel={item.link ? "noreferrer" : undefined}
                    target={item.link ? "_blank" : undefined}
                    onClick={(event) => {
                      event.preventDefault();
                      setActiveWork(item);
                    }}
                  >
                    <div className="portfolio-hover">
                      <div className="portfolio-hover-content">+</div>
                    </div>
                    {item.imageUrl ? (
                      <img src={item.imageUrl} alt={item.title ?? "Work"} />
                    ) : null}
                  </a>
                  <div className="portfolio-caption">
                    <h4 className="portfolio-title">{item.title}</h4>
                    <p className="text-muted">{item.location ?? item.subTitle}</p>
                  </div>
                </div>
              )) ?? <p className="text-sm text-[var(--muted)]">Loading work...</p>}
            </div>
          </div>
        </section>

        <section className="section contact" id="contactme">
          <div className="site-container">
            <div className="section-header text-center">
              <h2 className="section-title">{contactSent ? "Thank you" : "Contact Me"}</h2>
              <p className="section-tagline">
                {contactSent
                ? "I will respond to you as soon as possible."
                : "I would love to hear from you!"}
              </p>
            </div>
            <div className="contact-panel mt-8">
              {!contactSent ? (
                <form onSubmit={handleContactSubmit} className="contact-form">
                  <div className="contact-column">
                    <div className="form-group">
                      <label htmlFor="contact-email" className="sr-only">
                        Your email
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        className="form-control"
                        placeholder="your email *"
                        value={contactForm.from}
                        onChange={(event) =>
                          setContactForm((prev) => ({ ...prev, from: event.target.value }))
                        }
                      />
                      {contactErrors.from ? (
                        <p className="help-block text-danger">{contactErrors.from}</p>
                      ) : null}
                    </div>
                    <div className="form-group">
                      <label htmlFor="contact-name" className="sr-only">
                        Your name
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        className="form-control"
                        placeholder="your name *"
                        value={contactForm.name}
                        onChange={(event) =>
                          setContactForm((prev) => ({ ...prev, name: event.target.value }))
                        }
                      />
                      {contactErrors.name ? (
                        <p className="help-block text-danger">{contactErrors.name}</p>
                      ) : null}
                    </div>
                    <div className="form-group">
                      <label htmlFor="contact-subject" className="sr-only">
                        Subject
                      </label>
                      <input
                        id="contact-subject"
                        type="text"
                        className="form-control"
                        placeholder="subject *"
                        value={contactForm.subject}
                        onChange={(event) =>
                          setContactForm((prev) => ({ ...prev, subject: event.target.value }))
                        }
                      />
                      {contactErrors.subject ? (
                        <p className="help-block text-danger">{contactErrors.subject}</p>
                      ) : null}
                    </div>
                  </div>
                  <div className="contact-column">
                    <div className="form-group">
                      <label htmlFor="contact-message" className="sr-only">
                        Message
                      </label>
                      <textarea
                        id="contact-message"
                        rows={9}
                        className="form-control"
                        placeholder="this is where you say something.. *"
                        value={contactForm.body}
                        onChange={(event) =>
                          setContactForm((prev) => ({ ...prev, body: event.target.value }))
                        }
                      />
                      {contactErrors.body ? (
                        <p className="help-block text-danger">{contactErrors.body}</p>
                      ) : null}
                    </div>
                  </div>
                  <div className="contact-actions">
                    <button type="submit" className="btn btn-xl btn-primary">
                      Send Message
                    </button>
                    {contactError ? (
                      <p className="help-block text-danger">{contactError}</p>
                    ) : null}
                  </div>
                </form>
              ) : null}
            </div>
          </div>
        </section>

        {activeWork ? (
          <div className="portfolio-modal" role="dialog" aria-modal="true">
            <div className="portfolio-modal-content">
              <button
                type="button"
                className="portfolio-modal-close"
                aria-label="Close"
                onClick={() => setActiveWork(null)}
              >
                ×
              </button>
              <h2>{activeWork.title}</h2>
              {activeWork.subTitle ? (
                <p className="modal-subtitle">{normalizeText(activeWork.subTitle)}</p>
              ) : null}
              {getVideoSrc(activeWork.video) ? (
                <div className="modal-video">
                  <iframe
                    src={getVideoSrc(activeWork.video) ?? ""}
                    title={activeWork.title ?? "Work video"}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                </div>
              ) : activeWork.imageUrl ? (
                <img src={activeWork.imageUrl} alt={activeWork.title ?? "Work"} />
              ) : null}
              {activeWork.description?.length ? (
                <ul className="modal-description">
                  {activeWork.description.map((line) => (
                    <li key={line}>{normalizeText(line)}</li>
                  ))}
                </ul>
              ) : null}
              {activeWork.technologies?.length ? (
                <div className="modal-technologies">
                  <h4>Technologies</h4>
                  <p>{activeWork.technologies.join(", ")}</p>
                </div>
              ) : null}
              <div className="modal-meta">
                {activeWork.date ? <span>Date: {activeWork.date}</span> : null}
                {activeWork.location ? <span>{activeWork.location}</span> : null}
                {activeWork.link ? (
                  <a href={activeWork.link} target="_blank" rel="noreferrer">
                    {activeWork.link}
                  </a>
                ) : null}
              </div>
              <button
                type="button"
                className="btn btn-xl btn-primary"
                onClick={() => setActiveWork(null)}
              >
                Close
              </button>
            </div>
          </div>
        ) : null}

        <footer className="footer">
          <div className="site-container">
            <div className="footer-row">
              <span className="copyright">
                Copyright &copy; <strong>Chris Driscol</strong> {new Date().getFullYear()}
              </span>
              <ul className="social-buttons">
                <li>
                  <a href={chris?.social.linkedIn ?? "#"} rel="noreferrer" target="_blank">
                    <IconLinkedIn />
                    <span className="sr-only">LinkedIn</span>
                  </a>
                </li>
                <li>
                  <a href={chris?.social.github ?? "#"} rel="noreferrer" target="_blank">
                    <IconGitHub />
                    <span className="sr-only">GitHub</span>
                  </a>
                </li>
              </ul>
              <ul className="quicklinks">
                <li>
                  <a href={chris?.social.email ? `mailto:${chris.social.email}` : "#"}>
                    {chris?.social.email ?? "chris@driscolsoftware.com"}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
