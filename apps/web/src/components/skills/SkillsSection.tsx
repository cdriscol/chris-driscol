import { ReactTyped } from "react-typed";
import type { Skills } from "../../types/chris";
import { IconHeart } from "../icons/Icons";
import "../icons/icons.css";
import "./skills.css";

type SkillsSectionProps = {
  skills?: Skills | null;
};

export const SkillsSection = ({ skills }: SkillsSectionProps) => (
  <section className="section skills" id="skills">
    <div className="site-container">
      <div className="section-header">
        <h2 className="section-title">My Skills</h2>
        <p className="section-tagline text-muted">
          These are some things I&apos;ve picked up over the years..
        </p>
      </div>
      {skills ? (
        <div className="skills-row">
          <div className="skills-block">
            <h3 className="card-title">languages</h3>
            <p>{skills.languages.join(", ")}</p>
          </div>
          <div className="skills-block">
            <h3 className="card-title">technologies</h3>
            <p>{skills.technologies.join(", ")}</p>
          </div>
          <div className="skills-block">
            <h3 className="card-title">tools</h3>
            <p>{skills.tools.join(", ")}</p>
          </div>
        </div>
      ) : (
        <p className="text-muted">Loading skills...</p>
      )}
      <div className="skills-love">
        I <IconHeart />{" "}
        <ReactTyped
          className="skills-love-text"
          strings={skills?.loves ?? ["Agile teams"]}
          typeSpeed={100}
          backSpeed={40}
          loop
        />
      </div>
    </div>
  </section>
);
