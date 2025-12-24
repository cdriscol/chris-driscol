import type { ReactNode } from "react";

type SectionProps = {
  children: ReactNode;
  className?: string;
  id?: string;
};

export const Section = ({ children, className, id }: SectionProps) => {
  const baseClassName = "py-[150px] max-[767px]:py-[100px] scroll-mt-[var(--nav-offset,110px)]";
  const combinedClassName = className ? `${baseClassName} ${className}` : baseClassName;
  return (
    <section id={id} className={combinedClassName}>
      {children}
    </section>
  );
};
