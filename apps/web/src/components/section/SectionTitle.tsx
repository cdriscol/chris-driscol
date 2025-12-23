import type { ReactNode } from "react";

type SectionTitleProps = {
  children: ReactNode;
  className?: string;
};

export const SectionTitle = ({ children, className }: SectionTitleProps) => {
  const combinedClassName = className ? `section-title ${className}` : "section-title";
  return <h2 className={combinedClassName}>{children}</h2>;
};
