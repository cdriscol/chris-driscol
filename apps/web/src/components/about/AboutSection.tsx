import { graphql } from "../../generated/graphql";
import { type FragmentType, useFragment } from "../../generated/graphql/fragment-masking";
import { IconHeart } from "../icons/Icons";
import { SectionHeader } from "../section/SectionHeader";
import { Section } from "../section/Section";
import { SectionTagline } from "../section/SectionTagline";
import { SectionTitle } from "../section/SectionTitle";
import { SiteContainer } from "../section/SiteContainer";
import "./about.css";

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
    <Section id="aboutme" className="aboutme">
      <SiteContainer>
        <SectionHeader>
          <SectionTitle>About Me</SectionTitle>
          <SectionTagline className="text-muted">
            This should help you get to know more about me..
          </SectionTagline>
        </SectionHeader>
        <div className="about-row">
          <div className="about-description">
            {aboutData?.description?.map((line) => (
              // biome-ignore lint/security/noDangerouslySetInnerHtml: content is trusted
              <p key={line} className="text-[16px]" dangerouslySetInnerHTML={{ __html: line }} />
            )) ?? <p className="text-[16px]">Loading biography...</p>}
          </div>
          <div className="about-profile">
            <div className="me">
              {aboutData?.imageUrl ? (
                <img
                  src={aboutData.imageUrl}
                  alt={aboutData.imageTitle ?? "Chris Driscol"}
                  className="about-avatar"
                />
              ) : null}
              <h1>{aboutData?.imageTitle ?? "Chris Driscol"}</h1>
              <h2 className="text-muted">
                {aboutData?.imageCaption ?? "VP of Engineering"}
              </h2>
            </div>
          </div>
        </div>
        <div className="about-tag">
          <p className="text-[16px] text-muted">
            I <IconHeart /> working on <strong>Agile teams</strong> motivated by{" "}
            <strong>delivering customer value</strong> early and often.
          </p>
        </div>
      </SiteContainer>
    </Section>
  );
};
