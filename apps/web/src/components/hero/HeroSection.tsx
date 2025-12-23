import type { MouseEvent } from "react";
import { SiteContainer } from "../section/SiteContainer";
import { PrimaryButton } from "../ui/PrimaryButton";
import "./hero.css";

type HeroSectionProps = {
  error?: string | null;
  onNavClick: (id: string) => (event: MouseEvent<HTMLAnchorElement>) => void;
};

export const HeroSection = ({ error, onNavClick }: HeroSectionProps) => (
  <header id="top" className="hero">
    <SiteContainer>
      <div className="intro-text">
        <div className="intro-lead-in">Welcome To My Website!</div>
        <div className="intro-heading">It&apos;s Nice To Meet You</div>
        <div className="hero-actions">
          {/* biome-ignore lint/a11y/useValidAnchor: in-page navigation */}
          <PrimaryButton as="a" href="#aboutme" onClick={onNavClick("aboutme")}>
            Learn about me
          </PrimaryButton>
        </div>
        {error ? <p className="intro-body">Error: {error}</p> : null}
      </div>
    </SiteContainer>
  </header>
);
