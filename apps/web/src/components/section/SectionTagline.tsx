import type { ReactNode } from "react";

type SectionTaglineProps = {
  children: ReactNode;
  className?: string;
};

export const SectionTagline = ({ children, className }: SectionTaglineProps) => {
  const combinedClassName = className ? `section-tagline ${className}` : "section-tagline";
  return <p className={combinedClassName}>{children}</p>;
};
