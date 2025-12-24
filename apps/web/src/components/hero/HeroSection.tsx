import { useNavClick } from "../../context/siteNavClickContext";
import { SiteContainer } from "../section/SiteContainer";
import { PrimaryButton } from "../ui/PrimaryButton";
import "./hero.css";

type HeroSectionProps = {
  error?: string | null;
};

export const HeroSection = ({ error }: HeroSectionProps) => {
  const onNavClick = useNavClick();

  return (
    <header id="top" className="hero">
      <SiteContainer>
        <div className="intro-text">
          <div className="intro-lead-in">Welcome To My Website!</div>
          <div className="intro-heading">It&apos;s Nice To Meet You</div>
          <div className="hero-actions">
            <PrimaryButton as="a" href="#aboutme" onClick={onNavClick("aboutme")}>
              Learn about me
            </PrimaryButton>
          </div>
          {error ? <p className="intro-body">Error: {error}</p> : null}
        </div>
      </SiteContainer>
    </header>
  );
};
