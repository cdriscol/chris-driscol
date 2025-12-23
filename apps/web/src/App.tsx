import {
  AboutSection,
  BuiltWithSection,
  ContactSection,
  ExperienceSection,
  FooterSection,
  HeroSection,
  PortfolioSection,
  SiteNav,
  SkillsSection,
} from "./components";
import { useChrisData, useSeoMeta, useSiteNav } from "./hooks";

export const App = () => {
  const { data, error } = useChrisData();
  const chris = data?.chris ?? null;
  const { navSolid, navOpen, setNavOpen, activeSection, handleNavClick } = useSiteNav();

  useSeoMeta(chris);

  return (
    <div className="bg-white">
      <SiteNav
        navSolid={navSolid}
        navOpen={navOpen}
        activeSection={activeSection}
        onToggle={() => setNavOpen((open) => !open)}
        onNavClick={handleNavClick}
        social={chris?.social ?? null}
      />

      <main>
        <HeroSection error={error} onNavClick={handleNavClick} />
        <AboutSection about={chris?.about} />
        <BuiltWithSection />
        <SkillsSection skills={chris?.skills} />
        <ExperienceSection experience={chris?.experience} onNavClick={handleNavClick} />
        <PortfolioSection work={chris?.work ?? null} />
        <ContactSection />

        <FooterSection social={chris?.social ?? null} />
      </main>
    </div>
  );
};
