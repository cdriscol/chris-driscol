import { graphql } from "@/graphql/generated";
import { type FragmentType, useFragment } from "@/graphql/generated/fragment-masking";
import { useNavClick } from "@/context/siteNavClickContext";
import { normalizeText } from "@/utils/normalizeText";
import { SectionHeader, Section, SectionTagline, SectionTitle, SiteContainer } from "@/layout";

type ExperienceSectionProps = {
  experience?: Array<FragmentType<typeof ExperienceItemFragment>> | null;
};

export const ExperienceItemFragment = graphql(/* GraphQL */ `
  fragment ExperienceItem on Experience {
    duration
    title
    location
    description
    imageUrl
  }
`);

// Timeline vertical line and item base
const timelineClass =
  "relative list-none p-0 pt-[60px] before:absolute before:bottom-0 before:left-[50px] before:top-[60px] before:w-[2px] before:bg-sand before:content-[''] md:before:left-1/2 md:before:-ml-[1px]";

// Timeline item with clearfix
const timelineItemClass =
  "relative mb-[50px] min-h-[50px] before:table before:content-[' '] after:clear-both after:table after:content-[' '] last:mb-0 md:mb-[100px] md:min-h-[100px] lg:min-h-[150px] xl:min-h-[170px]";

// Timeline panel (text content) - default left side on desktop
const timelinePanelClass =
  "relative z-10 float-right w-full pl-[120px] pr-5 text-left md:float-left md:w-[41%] md:py-0 md:pb-5 md:pl-[30px] md:pr-5 md:text-right";

// Timeline panel inverted (right side on desktop)
const timelinePanelInvertedClass =
  "relative z-10 float-right w-full pl-[120px] pr-5 text-left md:float-right md:w-[41%] md:py-0 md:pb-5 md:pl-5 md:pr-[30px] md:text-left";

// Timeline circular image container
const timelineImageClass =
  "absolute left-0 z-10 ml-0 h-[100px] w-[100px] overflow-hidden rounded-full border-[7px] border-sand bg-accent text-center text-white md:left-1/2 md:h-[120px] md:w-[120px] md:-ml-[60px] lg:h-[150px] lg:w-[150px] lg:-ml-[75px] xl:h-[170px] xl:w-[170px] xl:-ml-[85px]";

export const ExperienceSection = ({ experience }: ExperienceSectionProps) => {
  const items = useFragment(ExperienceItemFragment, experience);
  const onNavClick = useNavClick();

  return (
    <Section id="experience">
      <SiteContainer>
        <SectionHeader className="text-center">
          <SectionTitle>My Experience</SectionTitle>
          <SectionTagline>Here&apos;s what I&apos;ve been up to..</SectionTagline>
        </SectionHeader>
        <ol className={timelineClass}>
          {items?.map((item, index) => {
            const duration = normalizeText(item.duration);
            const location = normalizeText(item.location);
            const title = normalizeText(item.title) || location || "Experience";
            const locationLine = item.title ? location : "";
            const description = normalizeText(item.description ?? "");
            // biome-ignore lint/security/noDangerouslySetInnerHtml: content is trusted
            const body = <p className="text-sm" dangerouslySetInnerHTML={{ __html: description }} />;
            const isInverted = index % 2 === 1;
            return (
              <li key={`${item.duration}-${item.title}`} className={timelineItemClass}>
                <div className={timelineImageClass}>
                  {item.imageUrl ? (
                    <img
                      src={item.imageUrl}
                      alt={item.title ?? item.location ?? "Experience"}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span className="mx-auto mt-[30px] block h-3 w-3 rounded-full bg-white/80" />
                  )}
                </div>
                <div className={isInverted ? timelinePanelInvertedClass : timelinePanelClass}>
                  <div>
                    <h4 className="m-0 mb-[6px]">{duration}</h4>
                    <h4 className="m-0 mb-[6px] normal-case">{title}</h4>
                    {locationLine ? <p className="m-0 mb-3 text-sm text-muted">{locationLine}</p> : null}
                  </div>
                  <div className="[&>p]:mb-0">{body}</div>
                </div>
              </li>
            );
          }) ?? <p className="text-sm text-muted">Loading experience...</p>}
          <li className={timelineItemClass}>
            <div className={`${timelineImageClass} flex items-center justify-center`}>
              {/* biome-ignore lint/a11y/useValidAnchor: in-page navigation */}
              <a
                href="#contactme"
                className="p-3 text-center font-heading text-sm font-bold uppercase leading-[1.4] text-white no-underline hover:text-white focus:text-white"
                onClick={onNavClick("contactme")}
              >
                Want to hear more?
              </a>
            </div>
          </li>
        </ol>
      </SiteContainer>
    </Section>
  );
};
