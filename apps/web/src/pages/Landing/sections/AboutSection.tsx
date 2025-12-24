import { graphql } from "@/graphql/generated";
import { type FragmentType, useFragment } from "@/graphql/generated/fragment-masking";
import { IconHeart } from "@/ui";
import { SectionHeader, Section, SectionTagline, SectionTitle, SiteContainer } from "@/layout";

type AboutSectionProps = {
  about?: FragmentType<typeof AboutSectionFragment> | null;
};

export const AboutSectionFragment = graphql(/* GraphQL */ `
  fragment AboutSection on About {
    description
    imageUrl
    imageCaption
    imageTitle
    tagLine
  }
`);

export const AboutSection = ({ about }: AboutSectionProps) => {
  const aboutData = useFragment(AboutSectionFragment, about);

  return (
    <Section id="aboutme" className="bg-sand">
      <SiteContainer>
        <SectionHeader>
          <SectionTitle>About Me</SectionTitle>
          <SectionTagline className="text-muted">
            This should help you get to know more about me..
          </SectionTagline>
        </SectionHeader>
        <div className="grid items-start gap-8 grid-cols-[repeat(auto-fit,minmax(260px,1fr))] md:grid-cols-[2fr_1fr]">
          <div className="leading-[1.75] text-ink-soft [&>p]:m-0 [&>p]:mb-[18px] [&>p:last-child]:mb-0">
            {aboutData?.description?.map((line) => (
              // biome-ignore lint/security/noDangerouslySetInnerHtml: content is trusted
              <p key={line} className="text-base" dangerouslySetInnerHTML={{ __html: line }} />
            )) ?? <p className="text-base">Loading biography...</p>}
          </div>
          <div className="flex justify-center max-[767px]:-order-1">
            <div className="mb-[50px] text-center">
              {aboutData?.imageUrl ? (
                <img
                  src={aboutData.imageUrl}
                  alt={aboutData.imageTitle ?? "Chris Driscol"}
                  className="mx-auto block h-60 w-60 rounded-full border-[7px] border-white object-cover"
                />
              ) : null}
              <h1 className="mb-[10px] mt-[10px] text-[18px] font-bold uppercase leading-[1.1] font-heading">
                {aboutData?.imageTitle ?? "Chris Driscol"}
              </h1>
              <h2 className="m-0 mb-[10px] text-[1.4rem] font-normal normal-case leading-[1.75] text-muted">
                {aboutData?.imageCaption ?? "VP of Engineering"}
              </h2>
            </div>
          </div>
        </div>
        <div className="mt-[100px] text-center">
          <p className="inline whitespace-nowrap text-lg leading-[1.4] text-muted max-[767px]:whitespace-normal">
            I <IconHeart /> working on <strong>Agile teams</strong> motivated by{" "}
            <strong>delivering customer value</strong> early and often.
          </p>
        </div>
      </SiteContainer>
    </Section>
  );
};
