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
import type { FragmentType } from "./generated/graphql/fragment-masking";
import type { PortfolioModalFragment } from "./components/portfolio/PortfolioSection";

export const App = () => {
  const { data, error } = useChrisData();
  const chris = data?.chris ?? null;
  const { navSolid, navOpen, setNavOpen, activeSection, handleNavClick } = useSiteNav();
  const [activeWork, setActiveWork] = useState<FragmentType<typeof PortfolioModalFragment> | null>(
    null,
  );

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
        social={chris?.social ?? null}
      />

      <main>
        <HeroSection error={error} onNavClick={handleNavClick} />
        <AboutSection about={chris?.about} />
        <BuiltWithSection />
        <SkillsSection skills={chris?.skills} />
        <ExperienceSection experience={chris?.experience} onNavClick={handleNavClick} />
        <PortfolioSection work={chris?.work ?? null} onSelectWork={setActiveWork} />
        <ContactSection />

        {activeWork ? (
          <PortfolioModal activeWork={activeWork} onClose={() => setActiveWork(null)} />
        ) : null}

        <FooterSection social={chris?.social ?? null} />
      </main>
    </div>
  );
};
