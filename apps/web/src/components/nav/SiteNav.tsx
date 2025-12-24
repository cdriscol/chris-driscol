import { graphql } from "../../graphql/generated";
import { type FragmentType, useFragment } from "../../graphql/generated/fragment-masking";
import { useNavClick } from "../../context/siteNavClickContext";
import { IconGitHub, IconLinkedIn } from "../icons/Icons";
import { SiteContainer } from "../section/SiteContainer";

type SiteNavProps = {
  navSolid: boolean;
  navOpen: boolean;
  activeSection: string;
  onToggle: () => void;
  social?: FragmentType<typeof SiteNavSocialFragment> | null;
};

export const SiteNavSocialFragment = graphql(/* GraphQL */ `
  fragment SiteNavSocial on Social {
    linkedIn
    github
  }
`);

const navLinkClass =
  "px-2 py-[5px] font-bold text-white no-underline transition-colors duration-200 ease-in-out hover:text-accent-strong";
const navLinkActiveClass =
  "rounded-[3px] bg-accent px-3 py-[6px] text-white hover:bg-accent-strong hover:text-white focus:bg-accent-strong";
const navListClass =
  "m-0 flex list-none flex-wrap items-center gap-4 p-0 font-heading text-[0.85rem] uppercase tracking-[1px] max-[767px]:hidden max-[767px]:w-full max-[767px]:flex-col max-[767px]:items-start max-[767px]:gap-[10px] max-[767px]:py-[10px] max-[767px]:pb-5";

export const SiteNav = ({
  navSolid,
  navOpen,
  activeSection,
  onToggle,
  social,
}: SiteNavProps) => {
  const socialData = useFragment(SiteNavSocialFragment, social);
  const onNavClick = useNavClick();

  return (
    <nav
      className={`site-nav fixed inset-x-0 top-0 z-50 border-0 py-[25px] transition-[background] duration-300 ease-in-out max-[767px]:bg-[#222] max-[767px]:py-[12px] ${navSolid ? "bg-deep is-solid" : "bg-transparent"} ${navOpen ? "is-open" : ""}`}
    >
      <SiteContainer className="flex flex-wrap items-center justify-between gap-4 max-[767px]:flex-row max-[767px]:items-center">
        <h1 className="nav-brand m-0 font-brand text-[32px] font-normal normal-case max-[767px]:text-[18px]">
          {/* biome-ignore lint/a11y/useValidAnchor: in-page navigation */}
          <a
            href="#top"
            onClick={onNavClick("top")}
            className={`text-accent no-underline transition-[color,font-size] duration-300 ease-in-out ${navSolid ? "text-[24px] max-[767px]:text-[18px]" : ""}`}
          >
            Chris Driscol
          </a>
        </h1>
        <button
          type="button"
          className="nav-toggle hidden h-10 w-12 cursor-pointer flex-col items-center justify-center gap-1 rounded-[3px] border-none bg-accent p-[8px_10px] max-[767px]:inline-flex"
          aria-expanded={navOpen}
          aria-label="Toggle navigation"
          onClick={onToggle}
        >
          <span className="block h-[3px] w-6 rounded-[2px] bg-white" />
          <span className="block h-[3px] w-6 rounded-[2px] bg-white" />
          <span className="block h-[3px] w-6 rounded-[2px] bg-white" />
        </button>
        <ul className={`${navListClass} ${navOpen ? "max-[767px]:flex" : ""}`}>
            <li>
              {/* biome-ignore lint/a11y/useValidAnchor: in-page navigation */}
              <a
                href="#aboutme"
                className={`${navLinkClass} ${activeSection === "aboutme" ? navLinkActiveClass : ""}`}
                onClick={onNavClick("aboutme")}
              >
                About me
              </a>
            </li>
            <li>
              {/* biome-ignore lint/a11y/useValidAnchor: in-page navigation */}
              <a
                href="#skills"
                className={`${navLinkClass} ${activeSection === "skills" ? navLinkActiveClass : ""}`}
                onClick={onNavClick("skills")}
              >
                Skills
              </a>
            </li>
            <li>
              {/* biome-ignore lint/a11y/useValidAnchor: in-page navigation */}
              <a
                href="#experience"
                className={`${navLinkClass} ${activeSection === "experience" ? navLinkActiveClass : ""}`}
                onClick={onNavClick("experience")}
              >
                Experience
              </a>
            </li>
            <li>
              {/* biome-ignore lint/a11y/useValidAnchor: in-page navigation */}
              <a
                href="#portfolio"
                className={`${navLinkClass} ${activeSection === "portfolio" ? navLinkActiveClass : ""}`}
                onClick={onNavClick("portfolio")}
              >
                My work
              </a>
            </li>
            <li>
              {/* biome-ignore lint/a11y/useValidAnchor: in-page navigation */}
              <a
                href="#contactme"
                className={`${navLinkClass} ${activeSection === "contactme" ? navLinkActiveClass : ""}`}
                onClick={onNavClick("contactme")}
              >
                Say hi
              </a>
            </li>
          </ul>
        <ul className={`${navListClass} ${navOpen ? "max-[767px]:flex" : ""}`}>
          <li>
            <a
              href={socialData?.linkedIn ?? "#"}
              rel="noreferrer"
              target="_blank"
              title="LinkedIn"
              className={navLinkClass}
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
              className={navLinkClass}
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
