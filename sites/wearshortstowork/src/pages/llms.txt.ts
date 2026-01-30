import { getCollection } from "astro:content";
import type { APIContext } from "astro";

export async function GET(context: APIContext) {
  const posts = await getCollection("blog");
  const sortedPosts = posts.sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
  );

  const allTags = [
    ...new Set(sortedPosts.flatMap((post) => post.data.tags ?? [])),
  ].sort();

  const siteUrl = context.site ?? "https://wearshortstowork.com";

  const lines = [
    "# Wear Shorts to Work",
    "",
    "## About",
    "",
    "A blog by Chris Driscol featuring short-form ideas and thoughts on technology, remote work, and life.",
    "",
    "Author: Chris Driscol",
    "Website: https://chrisdriscol.com",
    "Blog: " + siteUrl,
    "",
    "## Topics Covered",
    "",
    allTags.length > 0 ? allTags.join(", ") : "General topics",
    "",
    "## Recent Posts",
    "",
    ...sortedPosts.slice(0, 10).flatMap((post) => [
      `### ${post.data.title}`,
      `Published: ${post.data.pubDate.toISOString().split("T")[0]}`,
      `URL: ${siteUrl}/b/${post.id}/`,
      "",
      post.data.description,
      "",
    ]),
    "## Key Links",
    "",
    `- Home: ${siteUrl}`,
    `- All Posts: ${siteUrl}/b`,
    `- RSS Feed: ${siteUrl}/rss.xml`,
    `- Sitemap: ${siteUrl}/sitemap-index.xml`,
  ];

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
