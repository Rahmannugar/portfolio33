import Blog from "@/components/blog-page/Blog";
import { getBlog } from "@/lib/services/blog";

const BlogPage = async () => {
  const blogArticles = await getBlog();
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
