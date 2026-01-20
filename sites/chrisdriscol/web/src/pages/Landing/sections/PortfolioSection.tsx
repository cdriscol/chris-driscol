import { useEffect, useState } from "react";
import { graphql } from "@/graphql/generated";
import { type FragmentType, useFragment } from "@/graphql/generated/fragment-masking";
import { SectionHeader, Section, SectionTagline, SectionTitle, SiteContainer } from "@/layout";
import { PortfolioModal } from "../components/PortfolioModal";

type PortfolioSectionProps = {
  work?: Array<
    FragmentType<typeof PortfolioCardFragment> & FragmentType<typeof PortfolioModalFragment>
  > | null;
};

export const PortfolioCardFragment = graphql(/* GraphQL */ `
  fragment PortfolioCard on Work {
    title
    subTitle
    location
    link
    date
    imageUrl
  }
`);

export const PortfolioModalFragment = graphql(/* GraphQL */ `
  fragment PortfolioModal on Work {
    title
    subTitle
    description
    location
    link
    video
    date
    imageUrl
    technologies
  }
`);

export const PortfolioSection = ({ work }: PortfolioSectionProps) => {
  const [activeWork, setActiveWork] = useState<FragmentType<typeof PortfolioModalFragment> | null>(
    null,
  );
  const cardItems = useFragment(PortfolioCardFragment, work);
  const items =
    cardItems?.map((card, index) => ({
      card,
      raw: work?.[index],
    })) ?? null;

  useEffect(() => {
    if (!activeWork) return undefined;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [activeWork]);

  return (
    <Section id="portfolio" className="bg-sand">
      <SiteContainer className="relative z-[2]">
        <SectionHeader>
          <SectionTitle>My Work</SectionTitle>
          <SectionTagline className="text-muted">
            These are just some of the things I have worked on over the years, some were done with
            the help of extremely talented colleagues.
          </SectionTagline>
        </SectionHeader>
        <div className="grid gap-[30px] grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {items?.map((item) => (
            <div key={`${item.card.title}-${item.card.date}`} className="mb-[30px]">
              <a
                className="group relative mx-auto block h-[215px] w-full max-w-[400px] cursor-pointer bg-white"
                href={item.card.link ?? "#"}
                rel={item.card.link ? "noreferrer" : undefined}
                target={item.card.link ? "_blank" : undefined}
                onClick={(event) => {
                  event.preventDefault();
                  if (item.raw) {
                    setActiveWork(item.raw);
                  }
                }}
              >
                <div className="absolute inset-0 bg-accent/90 opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100">
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center font-heading text-[48px] text-white">
                    +
                  </div>
                </div>
                {item.card.imageUrl ? (
                  <img
                    src={item.card.imageUrl}
                    alt={item.card.title ?? "Work"}
                    className="mx-auto block h-full max-h-[214px] w-full object-cover"
                  />
                ) : null}
              </a>
              <div className="mx-auto max-w-[400px] bg-white p-[25px] text-center">
                <h4 className="m-0 normal-case">{item.card.title}</h4>
                <p className="m-0 text-base italic text-muted">
                  {item.card.location ?? item.card.subTitle}
                </p>
              </div>
            </div>
          )) ?? <p className="text-sm text-muted">Loading work...</p>}
        </div>
      </SiteContainer>
      {activeWork ? (
        <PortfolioModal activeWork={activeWork} onClose={() => setActiveWork(null)} />
      ) : null}
    </Section>
  );
};
