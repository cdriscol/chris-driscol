import { readdir, readFile, writeFile, mkdir } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const BLOG_CONTENT_DIR = join(
  __dirname,
  "../../../wearshortstowork/src/content/blog"
);
const OUTPUT_FILE = join(__dirname, "../src/data/blogPosts.json");

async function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return null;

  const frontmatter = {};
  const lines = match[1].split("\n");

  for (const line of lines) {
    const colonIndex = line.indexOf(":");
    if (colonIndex === -1) continue;

    const key = line.slice(0, colonIndex).trim();
    let value = line.slice(colonIndex + 1).trim();

    // Remove quotes if present
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    // Parse arrays
    if (value.startsWith("[") && value.endsWith("]")) {
      value = value
        .slice(1, -1)
        .split(",")
        .map((item) => item.trim().replace(/^["']|["']$/g, ""));
    }

    frontmatter[key] = value;
  }

  return frontmatter;
}

async function generateBlogData() {
  try {
    const files = await readdir(BLOG_CONTENT_DIR);
    const mdxFiles = files.filter((f) => f.endsWith(".mdx"));

    const posts = await Promise.all(
      mdxFiles.map(async (file) => {
        const content = await readFile(join(BLOG_CONTENT_DIR, file), "utf-8");
        const frontmatter = await parseFrontmatter(content);
        if (!frontmatter) return null;

        const slug = file.replace(/\.mdx$/, "");
        return {
          slug,
          title: frontmatter.title,
          description: frontmatter.description,
          pubDate: frontmatter.pubDate,
          tags: frontmatter.tags || [],
        };
      })
    );

    const validPosts = posts
      .filter(Boolean)
      .sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate))
      .slice(0, 3);

    await mkdir(dirname(OUTPUT_FILE), { recursive: true });
    await writeFile(OUTPUT_FILE, JSON.stringify(validPosts, null, 2));

    console.log(`Generated blog data with ${validPosts.length} posts`);
  } catch (error) {
    // If blog directory doesn't exist yet, create empty array
    if (error.code === "ENOENT") {
      await mkdir(dirname(OUTPUT_FILE), { recursive: true });
      await writeFile(OUTPUT_FILE, JSON.stringify([]));
      console.log("No blog posts found, created empty blog data file");
    } else {
      throw error;
    }
  }
}

generateBlogData();
