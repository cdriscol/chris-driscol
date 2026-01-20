import { useCallback, useEffect, useState, type MouseEvent } from "react";

export const useSiteNav = () => {
  const [navSolid, setNavSolid] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const [navOpen, setNavOpen] = useState(false);

  const getNavOffset = useCallback(() => {
    const nav = document.querySelector(".site-nav") as HTMLElement | null;
    if (!nav) return 0;
    const styles = window.getComputedStyle(nav);
    const paddingTop = Number.parseFloat(styles.paddingTop) || 0;
    const paddingBottom = Number.parseFloat(styles.paddingBottom) || 0;
    const brand = nav.querySelector(".nav-brand") as HTMLElement | null;
    const toggle = nav.querySelector(".nav-toggle") as HTMLElement | null;
    const rowHeight = Math.max(
      brand?.getBoundingClientRect().height ?? 0,
      toggle?.getBoundingClientRect().height ?? 0,
    );
    const height = rowHeight + paddingTop + paddingBottom;
    document.documentElement.style.setProperty("--nav-offset", `${height}px`);
    return height;
  }, []);

  const scrollToSection = useCallback(
    (id: string) => {
      const section = document.getElementById(id);
      if (!section) return;
      setNavOpen(false);
      const nav = document.querySelector(".site-nav");
      nav?.classList.remove("is-open");
      requestAnimationFrame(() => {
        const offset = getNavOffset();
        const top = section.getBoundingClientRect().top + window.scrollY - offset + 1;
        window.scrollTo({ top, behavior: "smooth" });
      });
      window.history.replaceState(null, "", window.location.pathname);
    },
    [getNavOffset],
  );

  const handleNavClick = useCallback(
    (id: string) => (event: MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault();
      scrollToSection(id);
    },
    [scrollToSection],
  );

  useEffect(() => {
    const handleScroll = () => {
      setNavSolid(window.scrollY >= 300);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      getNavOffset();
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [getNavOffset]);

  useEffect(() => {
    const sectionIds = ["aboutme", "skills", "experience", "portfolio", "contactme"];
    const handleScroll = () => {
      const scrollPos = window.scrollY + getNavOffset() + 20;
      let current = "";
      for (const id of sectionIds) {
        const section = document.getElementById(id);
        if (section && scrollPos >= section.offsetTop) {
          current = id;
        }
      }
      setActiveSection(current);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [getNavOffset]);

  useEffect(() => {
    if (!window.location.hash) return;
    const id = window.location.hash.replace("#", "");
    setTimeout(() => scrollToSection(id), 0);
  }, [scrollToSection]);

  return {
    navSolid,
    navOpen,
    setNavOpen,
    activeSection,
    handleNavClick,
  };
};
