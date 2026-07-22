export const experienceQuery = `*[_type == "experience"]| order(startDate desc){
  _id,
  position,
  company,
  companyUrl,
  image,
  location,
  startDate,
  currentlyWorking,
  endDate,
  summary,
  highlights,
  _createdAt,
  _updatedAt
}`;

export const singleExperienceQuery = `*[_type == "experience" && _id == $id][0]{
  _id,
  position,
  company,
  companyUrl,
  image,
  location,
  startDate,
  currentlyWorking,
  endDate,
  summary,
  highlights,
  _createdAt,
  _updatedAt
}`;
