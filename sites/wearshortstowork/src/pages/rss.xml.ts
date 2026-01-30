import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import type { APIContext } from "astro";

export async function GET(context: APIContext) {
  const posts = await getCollection(
    "blog",
    ({ data }) => !data.draft
  );
  const sortedPosts = posts.sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
  );

  return rss({
    title: "Wear Shorts to Work",
    description: "Writing about tech, AI, motorsports, and life.",
    site: context.site ?? "https://wearshortstowork.com",
    items: sortedPosts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      link: `/b/${post.id}/`,
    })),
  });
}
