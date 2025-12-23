import type { MouseEvent } from "react";
import type { Experience } from "../../types/chris";
import { normalizeText } from "../../utils/normalizeText";
import "./experience.css";

type ExperienceSectionProps = {
  experience?: Experience[] | null;
  onNavClick: (id: string) => (event: MouseEvent<HTMLAnchorElement>) => void;
};

export const ExperienceSection = ({ experience, onNavClick }: ExperienceSectionProps) => (
  <section className="section" id="experience">
    <div className="site-container">
      <div className="section-header text-center">
        <h2 className="section-title">My Experience</h2>
        <p className="section-tagline">Here&apos;s what I&apos;ve been up to..</p>
      </div>
      <ol className="timeline">
        {experience?.map((item, index) => {
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
    </div>
  </section>
);
