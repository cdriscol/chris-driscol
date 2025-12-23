import type { MouseEvent } from "react";
import "./hero.css";

type HeroSectionProps = {
  error?: string | null;
  onNavClick: (id: string) => (event: MouseEvent<HTMLAnchorElement>) => void;
};

export const HeroSection = ({ error, onNavClick }: HeroSectionProps) => (
  <header id="top" className="hero">
    <div className="site-container">
      <div className="intro-text">
        <div className="intro-lead-in">Welcome To My Website!</div>
        <div className="intro-heading">It&apos;s Nice To Meet You</div>
        <div className="hero-actions">
          {/* biome-ignore lint/a11y/useValidAnchor: in-page navigation */}
          <a href="#aboutme" onClick={onNavClick("aboutme")} className="btn btn-xl btn-primary">
            Learn about me
          </a>
        </div>
        {error ? <p className="intro-body">Error: {error}</p> : null}
      </div>
    </div>
  </header>
);
