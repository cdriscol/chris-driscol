import {
  AboutSection,
  BlogSection,
  BuiltWithSection,
  ContactSection,
  ExperienceSection,
  FooterSection,
  HeroSection,
  PortfolioSection,
  SkillsSection,
} from "@/pages/Landing";
import { SiteNav, SiteNavClickProvider, useSiteNav } from "@/ui";
import { useAppQuery } from "@/useAppQuery";
import { useSeoMeta } from "@/hooks";

export const App = () => {
  const { data, error } = useAppQuery();
  const chris = data?.chris ?? null;
  const { navSolid, navOpen, setNavOpen, activeSection, handleNavClick } = useSiteNav();

  useSeoMeta(chris);

  return (
    <SiteNavClickProvider value={handleNavClick}>
      <div className="bg-white">
        <SiteNav
          navSolid={navSolid}
          navOpen={navOpen}
          activeSection={activeSection}
          onToggle={() => setNavOpen((open) => !open)}
          social={chris?.social ?? null}
        />

        <main>
          <HeroSection error={error} />
          <AboutSection about={chris?.about} />
          <BuiltWithSection />
          <SkillsSection skills={chris?.skills} />
          <ExperienceSection experience={chris?.experience} />
          <PortfolioSection work={chris?.work ?? null} />
          <BlogSection />
          <ContactSection />

          <FooterSection social={chris?.social ?? null} />
        </main>
      </div>
    </SiteNavClickProvider>
  );
};
