import { Blog } from "../types/blog";
import { sanityFetch } from "@/sanity/lib/live";
import { blogQuery } from "../hooks/useBlog";

export const getBlog = async (): Promise<Blog[]> => {
  try {
    const { data: blogs } = await sanityFetch({ query: blogQuery });
    // console.log("Fetched blogs:", blogs);
    return blogs;
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return [];
  }
};
