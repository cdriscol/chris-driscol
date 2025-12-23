import type { MouseEvent } from "react";
import { graphql } from "../../generated/graphql";
import { type FragmentType, useFragment } from "../../generated/graphql/fragment-masking";
import { normalizeText } from "../../utils/normalizeText";
import { SectionHeader } from "../section/SectionHeader";
import { SectionTagline } from "../section/SectionTagline";
import { SectionTitle } from "../section/SectionTitle";
import { SiteContainer } from "../section/SiteContainer";
import "./experience.css";

type ExperienceSectionProps = {
  experience?: Array<FragmentType<typeof ExperienceItemFragment>> | null;
  onNavClick: (id: string) => (event: MouseEvent<HTMLAnchorElement>) => void;
};

export const ExperienceItemFragment = graphql(/* GraphQL */ `
  fragment ExperienceItem on Experience {
    duration
    title
    location
    description
    imageUrl
  }
`);

export const ExperienceSection = ({ experience, onNavClick }: ExperienceSectionProps) => {
  const items = useFragment(ExperienceItemFragment, experience);

  return (
    <section className="section" id="experience">
      <SiteContainer>
        <SectionHeader className="text-center">
          <SectionTitle>My Experience</SectionTitle>
          <SectionTagline>Here&apos;s what I&apos;ve been up to..</SectionTagline>
        </SectionHeader>
        <ol className="timeline">
          {items?.map((item, index) => {
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
                onClick={onNavClick("contactme")}
              >
                Want to hear more?
              </a>
            </div>
          </li>
        </ol>
      </SiteContainer>
    </section>
  );
};
