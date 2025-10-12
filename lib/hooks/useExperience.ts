export const experienceQuery = `*[_type == "experience"]| order(_createdAt desc){
  _id,
  position,
  company,
  image,
  location,
  startDate,
  endDate,
  summary,
  highlights,
  _createdAt,
  _updatedAt
}`;

export const singleExperienceQuery = `*[_type == "experience" && _id == $id][0]{
  _id,
  company,
  image,
  location,
  startDate,
  endDate,
  summary,
  highlights,
  _createdAt,
  _updatedAt
}`;
