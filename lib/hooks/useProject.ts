export const projectQuery = `*[_type == "project"]| order(order asc, _createdAt asc){
  _id,
  order,
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
  order,
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
