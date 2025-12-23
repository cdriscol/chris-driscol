import { useEffect, useState } from "react";
import {
  AboutSection,
  BuiltWithSection,
  ContactSection,
  ExperienceSection,
  FooterSection,
  HeroSection,
  PortfolioModal,
  PortfolioSection,
  SiteNav,
  SkillsSection,
} from "./components";
import { useChrisData, useSeoMeta, useSiteNav } from "./hooks";
import type { Work } from "./types/chris";

export const App = () => {
  const { chris, error } = useChrisData();
  const { navSolid, navOpen, setNavOpen, activeSection, handleNavClick } = useSiteNav();
  const [activeWork, setActiveWork] = useState<Work | null>(null);

  useSeoMeta(chris);

  useEffect(() => {
    if (!activeWork) return undefined;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [activeWork]);

  return (
    <div className="page">
      <SiteNav
        navSolid={navSolid}
        navOpen={navOpen}
        activeSection={activeSection}
        onToggle={() => setNavOpen((open) => !open)}
        onNavClick={handleNavClick}
        linkedIn={chris?.social.linkedIn}
        github={chris?.social.github}
      />

      <main>
        <HeroSection error={error} onNavClick={handleNavClick} />
        <AboutSection about={chris?.about} />
        <BuiltWithSection />
        <SkillsSection skills={chris?.skills} />
        <ExperienceSection experience={chris?.experience} onNavClick={handleNavClick} />
        <PortfolioSection work={chris?.work} onSelectWork={setActiveWork} />
        <ContactSection />

        {activeWork ? (
          <PortfolioModal activeWork={activeWork} onClose={() => setActiveWork(null)} />
        ) : null}

        <FooterSection social={chris?.social} />
      </main>
    </div>
  );
};
