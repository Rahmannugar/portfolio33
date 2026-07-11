import { Blog } from "../types/blog";
import { client } from "@/sanity/lib/client";
import { blogQuery } from "../hooks/useBlog";

export const getBlog = async (): Promise<Blog[]> => {
  try {
    return await client.fetch<Blog[]>(blogQuery, {}, { cache: "no-store" });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return [];
  }
};
