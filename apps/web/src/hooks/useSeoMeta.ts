import { useEffect } from "react";
import { AboutSectionFragment } from "../components/about/AboutSection";
import { SiteNavSocialFragment } from "../components/nav/SiteNav";
import { useFragment } from "../graphql/generated/fragment-masking";
import type { AppQueryQuery } from "../graphql/generated/graphql";

type SeoChris = AppQueryQuery["chris"];

export const useSeoMeta = (chris: SeoChris | null) => {
  const about = useFragment(AboutSectionFragment, chris?.about ?? null);
  const social = useFragment(SiteNavSocialFragment, chris?.social ?? null);

  useEffect(() => {
    if (!chris) return;
    const baseUrl = window.location.origin;
    const canonicalUrl = `${baseUrl}${window.location.pathname}`;
    const description = chris.description;
    const title = chris.title;
    const imageUrl = `${baseUrl}/images/header-bg.jpg`;
    const imageAlt = `${title} hero image`;
    const twitterHandle = (() => {
      try {
        const handle = new URL(social?.github ?? "").pathname
          .split("/")
          .filter(Boolean)[0];
        return handle ? `@${handle}` : null;
      } catch {
        return null;
      }
    })();

    const ensureMeta = (selector: string, attrs: Record<string, string>) => {
      let element = document.head.querySelector(selector) as HTMLMetaElement | null;
      if (!element) {
        element = document.createElement("meta");
        Object.entries(attrs).forEach(([key, value]) => {
          element?.setAttribute(key, value);
        });
        document.head.appendChild(element);
      } else {
        Object.entries(attrs).forEach(([key, value]) => {
          element?.setAttribute(key, value);
        });
      }
    };

    const ensureMetaWithMedia = (attrs: Record<string, string>) => {
      const media = attrs.media;
      const name = attrs.name;
      if (!media || !name) return;
      const selector = `meta[name="${name}"][media="${media}"]`;
      ensureMeta(selector, attrs);
    };

    const ensureLink = (rel: string, href: string) => {
      let element = document.head.querySelector(
        `link[rel="${rel}"]`,
      ) as HTMLLinkElement | null;
      if (!element) {
        element = document.createElement("link");
        element.rel = rel;
        document.head.appendChild(element);
      }
      element.href = href;
    };

    const ensureScript = (id: string, json: Record<string, unknown>) => {
      let element = document.head.querySelector(
        `script#${id}`,
      ) as HTMLScriptElement | null;
      if (!element) {
        element = document.createElement("script");
        element.id = id;
        element.type = "application/ld+json";
        document.head.appendChild(element);
      }
      element.textContent = JSON.stringify(json);
    };

    document.title = title;
    ensureMeta('meta[name="robots"]', { name: "robots", content: "index,follow" });
    ensureMeta('meta[name="color-scheme"]', { name: "color-scheme", content: "light dark" });
    ensureMetaWithMedia({
      name: "theme-color",
      media: "(prefers-color-scheme: light)",
      content: "#ffffff",
    });
    ensureMetaWithMedia({
      name: "theme-color",
      media: "(prefers-color-scheme: dark)",
      content: "#09141d",
    });
    ensureMeta('meta[name="description"]', { name: "description", content: description });
    ensureMeta('meta[property="og:site_name"]', {
      property: "og:site_name",
      content: title,
    });
    ensureMeta('meta[property="og:title"]', { property: "og:title", content: title });
    ensureMeta('meta[property="og:description"]', {
      property: "og:description",
      content: description,
    });
    ensureMeta('meta[property="og:url"]', {
      property: "og:url",
      content: baseUrl,
    });
    ensureMeta('meta[property="og:image"]', {
      property: "og:image",
      content: imageUrl,
    });
    ensureMeta('meta[property="og:image:alt"]', {
      property: "og:image:alt",
      content: imageAlt,
    });
    ensureMeta('meta[property="og:image:width"]', {
      property: "og:image:width",
      content: "1200",
    });
    ensureMeta('meta[property="og:image:height"]', {
      property: "og:image:height",
      content: "630",
    });
    ensureMeta('meta[property="og:type"]', {
      property: "og:type",
      content: "website",
    });
    ensureMeta('meta[name="twitter:card"]', {
      name: "twitter:card",
      content: "summary_large_image",
    });
    ensureMeta('meta[name="twitter:title"]', {
      name: "twitter:title",
      content: title,
    });
    ensureMeta('meta[name="twitter:description"]', {
      name: "twitter:description",
      content: description,
    });
    ensureMeta('meta[name="twitter:url"]', {
      name: "twitter:url",
      content: baseUrl,
    });
    ensureMeta('meta[name="twitter:image"]', {
      name: "twitter:image",
      content: imageUrl,
    });
    if (twitterHandle) {
      ensureMeta('meta[name="twitter:site"]', {
        name: "twitter:site",
        content: twitterHandle,
      });
      ensureMeta('meta[name="twitter:creator"]', {
        name: "twitter:creator",
        content: twitterHandle,
      });
    }
    ensureLink("canonical", canonicalUrl);

    const personName = about?.imageTitle ?? "Chris Driscol";
    const jobTitle = about?.imageCaption ?? chris.title;
    const sameAs = [social?.linkedIn, social?.github].filter(Boolean);
    ensureScript("ld-json-person", {
      "@context": "https://schema.org",
      "@type": "Person",
      name: personName,
      url: baseUrl,
      jobTitle,
      image: about?.imageUrl ? `${baseUrl}${about.imageUrl}` : imageUrl,
      sameAs,
    });
    ensureScript("ld-json-website", {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: title,
      url: baseUrl,
    });
  }, [
    chris,
    about?.imageCaption,
    about?.imageTitle,
    about?.imageUrl,
    social?.github,
    social?.linkedIn,
  ]);
};
