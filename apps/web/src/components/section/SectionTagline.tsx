import type { ReactNode } from "react";

type SectionTaglineProps = {
  children: ReactNode;
  className?: string;
};

export const SectionTagline = ({ children, className }: SectionTaglineProps) => {
  const baseClassName =
    "mx-auto max-w-[680px] text-[16px] italic text-[var(--muted)] [font-family:\"Droid Serif\",\"Helvetica Neue\",Helvetica,Arial,sans-serif]";
  const combinedClassName = className ? `${baseClassName} ${className}` : baseClassName;
  return <p className={combinedClassName}>{children}</p>;
};
