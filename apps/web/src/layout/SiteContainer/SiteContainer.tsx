import type { ReactNode } from "react";

type SiteContainerProps = {
  children: ReactNode;
  className?: string;
};

export const SiteContainer = ({ children, className }: SiteContainerProps) => {
  const baseClassName = "mx-auto w-[min(1170px,92vw)]";
  const combinedClassName = className ? `${baseClassName} ${className}` : baseClassName;
  return <div className={combinedClassName}>{children}</div>;
};
