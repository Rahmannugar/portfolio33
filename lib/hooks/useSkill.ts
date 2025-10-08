export const skillQuery = `*[_type == "skill"]| order(_createdAt asc){
  _id,
  skill,
  imageUrl
}`;
