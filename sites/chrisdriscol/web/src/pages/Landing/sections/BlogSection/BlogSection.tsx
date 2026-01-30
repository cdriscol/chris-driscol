import { Section, SectionHeader, SectionTagline, SectionTitle, SiteContainer } from "@/layout";
import blogPosts from "@/data/blogPosts.json";

interface BlogPost {
  slug: string;
  title: string;
  description: string;
  pubDate: string;
  tags: string[];
}

const posts = blogPosts as BlogPost[];

export const BlogSection = () => {
  if (posts.length === 0) return null;

  return (
    <Section id="blog" className="bg-[#2a2a2a]">
      <SiteContainer className="relative z-[2]">
        <SectionHeader>
          <SectionTitle className="text-white">Latest Thoughts</SectionTitle>
          <SectionTagline className="!text-[#bbb]">
            Short-form ideas from{" "}
            <a
              href="https://wearshortstowork.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-inherit no-underline hover:underline"
            >
              wearshortstowork.com
            </a>
          </SectionTagline>
        </SectionHeader>

        <div className="grid gap-[30px] grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>

        <div className="mt-[50px] text-center">
          <a
            href="https://wearshortstowork.com/b"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-[3px] bg-accent px-6 py-3 font-heading text-[0.85rem] uppercase tracking-[1px] text-white no-underline transition-colors duration-200 hover:bg-accent-strong"
          >
            View all posts
            <svg
              aria-hidden="true"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </a>
        </div>
      </SiteContainer>
    </Section>
  );
};

const BlogCard = ({ post }: { post: BlogPost }) => {
  const formattedDate = new Date(post.pubDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const postUrl = `https://wearshortstowork.com/b/${post.slug}`;

  return (
    <div className="mb-[30px]">
      <a
        href={postUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative mx-auto block w-full max-w-[400px] cursor-pointer bg-white"
      >
        <div className="bg-accent p-6 text-white">
          <p className="m-0 font-heading text-xs uppercase tracking-[1px] opacity-80">
            {formattedDate}
          </p>
          <h4 className="m-0 mt-2 text-xl normal-case group-hover:underline">
            {post.title}
          </h4>
        </div>
        <div className="p-[25px]">
          <p className="m-0 text-base text-muted">
            {post.description}
          </p>
          {post.tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {post.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="inline-block rounded-[3px] bg-[#f5f5f5] px-2 py-1 font-heading text-xs uppercase tracking-[0.5px] text-muted"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </a>
    </div>
  );
};
