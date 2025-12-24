import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

type ButtonProps<E extends ElementType> = {
  as?: E;
  children: ReactNode;
  className?: string;
} & Omit<ComponentPropsWithoutRef<E>, "as" | "className">;

const baseClassName =
  "inline-flex items-center justify-center rounded-[3px] border border-accent bg-accent px-[40px] py-[20px] text-[18px] font-bold uppercase text-[white] no-underline transition-colors duration-200 ease-in-out font-heading hover:border-[#f6bf01] hover:bg-accent-strong focus:border-[#f6bf01] focus:bg-accent-strong";

export const Button = <E extends ElementType = "button">({
  as,
  children,
  className,
  ...rest
}: ButtonProps<E>) => {
  const Component = (as ?? "button") as ElementType;
  const combinedClassName = className ? `${baseClassName} ${className}` : baseClassName;
  return (
    <Component className={combinedClassName} {...rest}>
      {children}
    </Component>
  );
};
