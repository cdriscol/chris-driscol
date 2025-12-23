import type { About } from "../../types/chris";
import { IconHeart } from "../icons/Icons";
import "../icons/icons.css";
import "./about.css";

type AboutSectionProps = {
  about?: About | null;
};

export const AboutSection = ({ about }: AboutSectionProps) => (
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
          {about?.description?.map((line) => {
            // biome-ignore lint/security/noDangerouslySetInnerHtml: content is trusted
            return <p key={line} className="large" dangerouslySetInnerHTML={{ __html: line }} />;
          }) ?? <p className="large">Loading biography...</p>}
        </div>
        <div className="about-profile">
          <div className="me">
            {about?.imageUrl ? (
              <img
                src={about.imageUrl}
                alt={about.imageTitle ?? "Chris Driscol"}
                className="about-avatar"
              />
            ) : null}
            <h1>{about?.imageTitle ?? "Chris Driscol"}</h1>
            <h2 className="text-muted">{about?.imageCaption ?? "VP of Engineering"}</h2>
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
);
