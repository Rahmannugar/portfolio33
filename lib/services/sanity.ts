import { createClient } from "next-sanity";

const date = new Date();

export const client = createClient({
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  apiVersion: date.toISOString().split("T")[0],
  useCdn: false,
});
