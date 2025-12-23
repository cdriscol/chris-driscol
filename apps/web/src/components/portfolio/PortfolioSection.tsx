import type { Work } from "../../types/chris";
import "./portfolio.css";

type PortfolioSectionProps = {
  work?: Work[] | null;
  onSelectWork: (item: Work) => void;
};

export const PortfolioSection = ({ work, onSelectWork }: PortfolioSectionProps) => (
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
        {work?.map((item) => (
          <div key={`${item.title}-${item.date}`} className="portfolio-item">
            <a
              className="portfolio-link"
              href={item.link ?? "#"}
              rel={item.link ? "noreferrer" : undefined}
              target={item.link ? "_blank" : undefined}
              onClick={(event) => {
                event.preventDefault();
                onSelectWork(item);
              }}
            >
              <div className="portfolio-hover">
                <div className="portfolio-hover-content">+</div>
              </div>
              {item.imageUrl ? <img src={item.imageUrl} alt={item.title ?? "Work"} /> : null}
            </a>
            <div className="portfolio-caption">
              <h4 className="portfolio-title">{item.title}</h4>
              <p className="text-muted">{item.location ?? item.subTitle}</p>
            </div>
          </div>
        )) ?? <p className="text-sm text-[var(--muted)]">Loading work...</p>}
      </div>
    </div>
  </section>
);
