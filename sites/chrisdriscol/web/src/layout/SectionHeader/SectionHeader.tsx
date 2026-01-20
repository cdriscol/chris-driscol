import type { ReactNode } from "react";

type SectionHeaderProps = {
  children: ReactNode;
  className?: string;
};

export const SectionHeader = ({ children, className }: SectionHeaderProps) => {
  const baseClassName = "mb-[75px] text-center";
  const combinedClassName = className ? `${baseClassName} ${className}` : baseClassName;
  return <div className={combinedClassName}>{children}</div>;
};
