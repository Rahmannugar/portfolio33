export const projectQuery = `*[_type == "project"]| order(orderRank asc, _createdAt asc){
  _id,
  title,
  previewImage,
  description,
  highlights,
  link,
  images,
  technologies,
  _createdAt,
  _updatedAt
}`;

export const singleProjectQuery = `*[_type == "project" && _id == $id][0]{
  _id,
  title,
  previewImage,
  description,
  highlights,
  link,
  images,
  technologies,
  _createdAt,
  _updatedAt
}`;
