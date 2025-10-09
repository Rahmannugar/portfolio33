export const blogQuery = `*[_type == "blog"]| order(_createdAt desc){
  _id,
  title,
  image,
  summary,
  link,
  publishedAt,
}`;
