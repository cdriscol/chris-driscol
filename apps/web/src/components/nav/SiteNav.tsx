import type { MouseEvent } from "react";
import { graphql } from "../../generated/graphql";
import { type FragmentType, useFragment } from "../../generated/graphql/fragment-masking";
import { IconGitHub, IconLinkedIn } from "../icons/Icons";
import { SiteContainer } from "../section/SiteContainer";
import "../icons/icons.css";
import "./nav.css";

type SiteNavProps = {
  navSolid: boolean;
  navOpen: boolean;
  activeSection: string;
  onToggle: () => void;
  onNavClick: (id: string) => (event: MouseEvent<HTMLAnchorElement>) => void;
  social?: FragmentType<typeof SiteNavSocialFragment> | null;
};

export const SiteNavSocialFragment = graphql(/* GraphQL */ `
  fragment SiteNavSocial on Social {
    linkedIn
    github
  }
`);

export const SiteNav = ({
  navSolid,
  navOpen,
  activeSection,
  onToggle,
  onNavClick,
  social,
}: SiteNavProps) => {
  const socialData = useFragment(SiteNavSocialFragment, social);

  return (
    <nav className={`site-nav ${navSolid ? "is-solid" : ""} ${navOpen ? "is-open" : ""}`}>
      <SiteContainer className="nav-inner">
        <h1 className="nav-brand">
          {/* biome-ignore lint/a11y/useValidAnchor: in-page navigation */}
          <a href="#top" onClick={onNavClick("top")}>
            Chris Driscol
          </a>
        </h1>
        <button
          type="button"
          className="nav-toggle"
          aria-expanded={navOpen}
          aria-label="Toggle navigation"
          onClick={onToggle}
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
              onClick={onNavClick("aboutme")}
            >
              About me
            </a>
          </li>
          <li>
            {/* biome-ignore lint/a11y/useValidAnchor: in-page navigation */}
            <a
              href="#skills"
              className={activeSection === "skills" ? "active" : undefined}
              onClick={onNavClick("skills")}
            >
              Skills
            </a>
          </li>
          <li>
            {/* biome-ignore lint/a11y/useValidAnchor: in-page navigation */}
            <a
              href="#experience"
              className={activeSection === "experience" ? "active" : undefined}
              onClick={onNavClick("experience")}
            >
              Experience
            </a>
          </li>
          <li>
            {/* biome-ignore lint/a11y/useValidAnchor: in-page navigation */}
            <a
              href="#portfolio"
              className={activeSection === "portfolio" ? "active" : undefined}
              onClick={onNavClick("portfolio")}
            >
              My work
            </a>
          </li>
          <li>
            {/* biome-ignore lint/a11y/useValidAnchor: in-page navigation */}
            <a
              href="#contactme"
              className={activeSection === "contactme" ? "active" : undefined}
              onClick={onNavClick("contactme")}
            >
              Say hi
            </a>
          </li>
        </ul>
        <ul className="nav-social">
          <li>
            <a
              href={socialData?.linkedIn ?? "#"}
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
              href={socialData?.github ?? "#"}
              rel="noreferrer"
              target="_blank"
              title="Github"
            >
              <IconGitHub />
              <span className="sr-only">GitHub</span>
            </a>
          </li>
        </ul>
      </SiteContainer>
    </nav>
  );
};
