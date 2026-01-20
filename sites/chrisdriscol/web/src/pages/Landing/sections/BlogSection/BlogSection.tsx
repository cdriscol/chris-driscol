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
    <Section id="blog" className="bg-[#f5f5f5]">
      <SiteContainer>
        <SectionHeader>
          <SectionTitle>Latest Thoughts</SectionTitle>
          <SectionTagline>From my blog, wearshortstowork.com</SectionTagline>
        </SectionHeader>

        <div className="grid gap-8 md:grid-cols-3">
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>

        <div className="mt-8 text-center">
          <a
            href="https://wearshortstowork.com/blog"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-[#337ab7] hover:underline font-medium"
          >
            View all posts
            <svg
              aria-hidden="true"
              className="ml-2 w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
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

  return (
    <a
      href={`https://wearshortstowork.com/blog/${post.slug}`}
      target="_blank"
      rel="noopener noreferrer"
      className="group block bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden"
    >
      <div className="p-6">
        <time className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
          {formattedDate}
        </time>
        <h3 className="mt-2 text-lg font-semibold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
          {post.title}
        </h3>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
          {post.description}
        </p>
        {post.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {post.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="inline-block px-2 py-1 text-xs font-medium text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </a>
  );
};
