import Blog from "@/components/blog-page/Blog";
import { getBlog } from "@/lib/services/blog";

export const revalidate = 86400; // Revalidate every 24 hours
const blogArticles = await getBlog();

const BlogPage = async () => {
  return (
    <main>
      <Blog blogArticles={blogArticles} />
    </main>
  );
};
export default BlogPage;

export const generateMetadata = () => {
  return {
    title: "Blog",
    description: "News and Articles from Rahman Nugar",
  };
};
