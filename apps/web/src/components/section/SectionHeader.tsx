import type { ReactNode } from "react";

type SectionHeaderProps = {
  children: ReactNode;
  className?: string;
};

export const SectionHeader = ({ children, className }: SectionHeaderProps) => {
  const combinedClassName = className ? `section-header ${className}` : "section-header";
  return <div className={combinedClassName}>{children}</div>;
};
