import { type FragmentType, useFragment } from "../../graphql/generated/fragment-masking";
import { PortfolioModalFragment } from "./PortfolioSection";
import { getVideoSrc } from "../../utils/getVideoSrc";
import { normalizeText } from "../../utils/normalizeText";
import { PrimaryButton } from "../ui/PrimaryButton";
import "./portfolio.css";

type PortfolioModalProps = {
  activeWork: FragmentType<typeof PortfolioModalFragment>;
  onClose: () => void;
};

export const PortfolioModal = ({ activeWork, onClose }: PortfolioModalProps) => {
  const work = useFragment(PortfolioModalFragment, activeWork);

  return (
    <div className="portfolio-modal" role="dialog" aria-modal="true">
      <div className="portfolio-modal-content">
        <button
          type="button"
          className="portfolio-modal-close"
          aria-label="Close"
          onClick={onClose}
        >
          A-
        </button>
        <h2>{work.title}</h2>
        {work.subTitle ? <p className="modal-subtitle">{normalizeText(work.subTitle)}</p> : null}
        {getVideoSrc(work.video) ? (
          <div className="modal-video">
            <iframe
              src={getVideoSrc(work.video) ?? ""}
              title={work.title ?? "Work video"}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        ) : work.imageUrl ? (
          <img src={work.imageUrl} alt={work.title ?? "Work"} />
        ) : null}
        {work.description?.length ? (
          <ul className="modal-description">
            {work.description.map((line) => {
              const normalized = normalizeText(line);
              // biome-ignore lint/security/noDangerouslySetInnerHtml: content is trusted
              return <li key={line} dangerouslySetInnerHTML={{ __html: normalized }} />;
            })}
          </ul>
        ) : null}
        {work.technologies?.length ? (
          <div className="modal-technologies">
            <h4>Technologies</h4>
            <p>{work.technologies.join(", ")}</p>
          </div>
        ) : null}
        <div className="modal-meta">
          {work.date ? <span>Date: {work.date}</span> : null}
          {work.location ? <span>{work.location}</span> : null}
          {work.link ? (
            <a href={work.link} target="_blank" rel="noreferrer">
              {work.link}
            </a>
          ) : null}
        </div>
        <PrimaryButton type="button" onClick={onClose}>
          Close
        </PrimaryButton>
      </div>
    </div>
  );
};
