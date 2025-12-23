import { graphql } from "../../generated/graphql";
import { type FragmentType, useFragment } from "../../generated/graphql/fragment-masking";
import "./portfolio.css";

type PortfolioSectionProps = {
  work?: Array<
    FragmentType<typeof PortfolioCardFragment> & FragmentType<typeof PortfolioModalFragment>
  > | null;
  onSelectWork: (item: FragmentType<typeof PortfolioModalFragment>) => void;
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

export const PortfolioSection = ({ work, onSelectWork }: PortfolioSectionProps) => {
  const cardItems = useFragment(PortfolioCardFragment, work);
  const items =
    cardItems?.map((card, index) => ({
      card,
      raw: work?.[index],
    })) ?? null;

  return (
    <section className="section portfolio" id="portfolio">
      <div className="site-container">
        <div className="section-header">
          <h2 className="section-title">My Work</h2>
          <p className="section-tagline text-muted">
            These are just some of the things I have worked on over the years, some were done with
            the help of extremely talented colleagues.
          </p>
        </div>
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
                    onSelectWork(item.raw);
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
                <p className="text-muted">{item.card.location ?? item.card.subTitle}</p>
              </div>
            </div>
          )) ?? <p className="text-sm text-[var(--muted)]">Loading work...</p>}
        </div>
      </div>
    </section>
  );
};
