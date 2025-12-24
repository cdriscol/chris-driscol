import { type FragmentType, useFragment } from "../../graphql/generated/fragment-masking";
import { PortfolioModalFragment } from "./PortfolioSection";
import { getVideoSrc } from "../../utils/getVideoSrc";
import { normalizeText } from "../../utils/normalizeText";
import { PrimaryButton } from "../ui/PrimaryButton";

type PortfolioModalProps = {
  activeWork: FragmentType<typeof PortfolioModalFragment>;
  onClose: () => void;
};

export const PortfolioModal = ({ activeWork, onClose }: PortfolioModalProps) => {
  const work = useFragment(PortfolioModalFragment, activeWork);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-white/[0.96] p-[40px_20px] max-[767px]:p-[24px_12px]"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative max-h-[calc(100vh-80px)] w-[min(900px,92vw)] max-w-[900px] overflow-y-auto bg-white p-10 text-center shadow-[0_16px_40px_rgba(0,0,0,0.08)] max-[767px]:max-h-[calc(100vh-48px)] max-[767px]:p-[24px_18px]">
        <button
          type="button"
          className="sticky top-3 ml-auto block cursor-pointer self-end border-none bg-transparent text-[32px]"
          aria-label="Close"
          onClick={onClose}
        >
          ✕
        </button>
        <h2 className="m-0 mb-[10px]">{work.title}</h2>
        {work.subTitle ? (
          <p className="italic text-muted">{normalizeText(work.subTitle)}</p>
        ) : null}
        {getVideoSrc(work.video) ? (
          <div className="relative my-[30px] w-full pb-[56.25%]">
            <iframe
              className="absolute inset-0 h-full w-full border-0"
              src={getVideoSrc(work.video) ?? ""}
              title={work.title ?? "Work video"}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        ) : work.imageUrl ? (
          <img
            src={work.imageUrl}
            alt={work.title ?? "Work"}
            className="mx-auto my-[30px] block max-w-full"
          />
        ) : null}
        {work.description?.length ? (
          <ul className="m-0 mb-5 list-none p-0 [&>li]:mb-3">
            {work.description.map((line) => {
              const normalized = normalizeText(line);
              // biome-ignore lint/security/noDangerouslySetInnerHtml: content is trusted
              return <li key={line} dangerouslySetInnerHTML={{ __html: normalized }} />;
            })}
          </ul>
        ) : null}
        {work.technologies?.length ? (
          <div>
            <h4 className="mb-2 mt-5">Technologies</h4>
            <p>{work.technologies.join(", ")}</p>
          </div>
        ) : null}
        <div className="my-6 flex flex-col gap-2 text-sm">
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
