import { createContext, use, type MouseEvent } from "react";

export type NavClickHandler = (id: string) => (event: MouseEvent<HTMLAnchorElement>) => void;

const SiteNavClickContext = createContext<NavClickHandler | null>(null);

export const SiteNavClickProvider = SiteNavClickContext.Provider;

export const useNavClick = () => {
  const navClick = use(SiteNavClickContext);
  if (!navClick) {
    throw new Error("useNavClick must be used within a SiteNavClickProvider");
  }
  return navClick;
};
