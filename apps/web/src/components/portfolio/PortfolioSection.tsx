import { useEffect, useState } from "react";
import { graphql } from "../../generated/graphql";
import { type FragmentType, useFragment } from "../../generated/graphql/fragment-masking";
import { SectionHeader } from "../section/SectionHeader";
import { Section } from "../section/Section";
import { SectionTagline } from "../section/SectionTagline";
import { SectionTitle } from "../section/SectionTitle";
import { SiteContainer } from "../section/SiteContainer";
import { PortfolioModal } from "./PortfolioModal";
import "./portfolio.css";

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
    <Section id="portfolio" className="portfolio">
      <SiteContainer>
        <SectionHeader>
          <SectionTitle>My Work</SectionTitle>
          <SectionTagline className="text-[var(--muted)]">
            These are just some of the things I have worked on over the years, some were done with
            the help of extremely talented colleagues.
          </SectionTagline>
        </SectionHeader>
        <div className="portfolio-grid">
          {items?.map((item) => (
            <div key={`${item.card.title}-${item.card.date}`} className="portfolio-item">
              <a
                className="portfolio-link"
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
                <div className="portfolio-hover">
                  <div className="portfolio-hover-content">+</div>
                </div>
                {item.card.imageUrl ? (
                  <img src={item.card.imageUrl} alt={item.card.title ?? "Work"} />
                ) : null}
              </a>
              <div className="portfolio-caption">
                <h4 className="portfolio-title">{item.card.title}</h4>
                <p className="text-[var(--muted)]">{item.card.location ?? item.card.subTitle}</p>
              </div>
            </div>
          )) ?? <p className="text-sm text-[var(--muted)]">Loading work...</p>}
        </div>
      </SiteContainer>
      {activeWork ? (
        <PortfolioModal activeWork={activeWork} onClose={() => setActiveWork(null)} />
      ) : null}
    </Section>
  );
};
