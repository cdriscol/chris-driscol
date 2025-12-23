import type { Work } from "../../types/chris";
import { getVideoSrc } from "../../utils/getVideoSrc";
import { normalizeText } from "../../utils/normalizeText";
import "./portfolio.css";

type PortfolioModalProps = {
  activeWork: Work;
  onClose: () => void;
};

export const PortfolioModal = ({ activeWork, onClose }: PortfolioModalProps) => (
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
      <h2>{activeWork.title}</h2>
      {activeWork.subTitle ? (
        <p className="modal-subtitle">{normalizeText(activeWork.subTitle)}</p>
      ) : null}
      {getVideoSrc(activeWork.video) ? (
        <div className="modal-video">
          <iframe
            src={getVideoSrc(activeWork.video) ?? ""}
            title={activeWork.title ?? "Work video"}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
      ) : activeWork.imageUrl ? (
        <img src={activeWork.imageUrl} alt={activeWork.title ?? "Work"} />
      ) : null}
      {activeWork.description?.length ? (
        <ul className="modal-description">
          {activeWork.description.map((line) => (
            <li key={line}>{normalizeText(line)}</li>
          ))}
        </ul>
      ) : null}
      {activeWork.technologies?.length ? (
        <div className="modal-technologies">
          <h4>Technologies</h4>
          <p>{activeWork.technologies.join(", ")}</p>
        </div>
      ) : null}
      <div className="modal-meta">
        {activeWork.date ? <span>Date: {activeWork.date}</span> : null}
        {activeWork.location ? <span>{activeWork.location}</span> : null}
        {activeWork.link ? (
          <a href={activeWork.link} target="_blank" rel="noreferrer">
            {activeWork.link}
          </a>
        ) : null}
      </div>
      <button type="button" className="btn btn-xl btn-primary" onClick={onClose}>
        Close
      </button>
    </div>
  </div>
);
