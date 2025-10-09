import { Blog } from "../types/blog";
import { client } from "./sanity";
import { blogQuery } from "../hooks/useBlog";

export const getBlogs = async (): Promise<Blog[]> => {
  try {
    const blogs = await client.fetch<Blog[]>(blogQuery);
    // console.log("Fetched blogs:", blogs);
    return blogs;
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return [];
  }
};
