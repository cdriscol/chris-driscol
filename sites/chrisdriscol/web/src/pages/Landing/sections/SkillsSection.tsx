import { ReactTyped } from "react-typed";
import { graphql } from "@/graphql/generated";
import { type FragmentType, useFragment } from "@/graphql/generated/fragment-masking";
import { IconHeart } from "@/ui";
import { SectionHeader, Section, SectionTagline, SectionTitle, SiteContainer } from "@/layout";

type SkillsSectionProps = {
  skills?: FragmentType<typeof SkillsSectionFragment> | null;
};

export const SkillsSectionFragment = graphql(/* GraphQL */ `
  fragment SkillsSection on Skills {
    languages
    technologies
    tools
    loves
  }
`);

export const SkillsSection = ({ skills }: SkillsSectionProps) => {
  const skillsData = useFragment(SkillsSectionFragment, skills);

  return (
    <Section id="skills" className="bg-[#2a2a2a]">
      <SiteContainer>
        <SectionHeader>
          <SectionTitle className="text-[white]">My Skills</SectionTitle>
          <SectionTagline className="!text-[#bbb]">
            These are some things I&apos;ve picked up over the years..
          </SectionTagline>
        </SectionHeader>
        {skillsData ? (
          <div className="grid gap-6 grid-cols-[repeat(auto-fit,minmax(220px,1fr))]">
            <div className="text-center">
              <h3 className="mb-[10px] text-[18px] font-bold uppercase tracking-[1px] text-white">
                languages
              </h3>
              <p className="text-[1.1em] text-[#bbb] font-[Roboto,Helvetica,Arial,sans-serif]">
                {skillsData.languages.join(", ")}
              </p>
            </div>
            <div className="text-center">
              <h3 className="mb-[10px] text-[18px] font-bold uppercase tracking-[1px] text-white">
                technologies
              </h3>
              <p className="text-[1.1em] text-[#bbb] font-[Roboto,Helvetica,Arial,sans-serif]">
                {skillsData.technologies.join(", ")}
              </p>
            </div>
            <div className="text-center">
              <h3 className="mb-[10px] text-[18px] font-bold uppercase tracking-[1px] text-white">
                tools
              </h3>
              <p className="text-[1.1em] text-[#bbb] font-[Roboto,Helvetica,Arial,sans-serif]">
                {skillsData.tools.join(", ")}
              </p>
            </div>
          </div>
        ) : (
          <p className="!text-[#bbb]">Loading skills...</p>
        )}
        <div className="inline-flex w-full flex-wrap items-center justify-center gap-2 pt-[30px] text-[32px] leading-[38.4px] text-white md:flex-nowrap md:whitespace-nowrap">
          I{" "}
          <span className="text-[pink]">
            <IconHeart />
          </span>{" "}
          <ReactTyped
            className="inline-block"
            strings={skillsData?.loves ?? ["Agile teams"]}
            typeSpeed={100}
            backSpeed={40}
            loop
          />
        </div>
      </SiteContainer>
    </Section>
  );
};
