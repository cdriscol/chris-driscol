import type { ReactNode } from "react";

type SectionTitleProps = {
  children: ReactNode;
  className?: string;
};

export const SectionTitle = ({ children, className }: SectionTitleProps) => {
  const baseClassName =
    "mb-[15px] mt-0 text-[40px] font-bold uppercase font-heading";
  const combinedClassName = className ? `${baseClassName} ${className}` : baseClassName;
  return <h2 className={combinedClassName}>{children}</h2>;
};
