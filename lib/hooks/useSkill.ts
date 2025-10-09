export const skillQuery = `*[_type == "skill"]| order(_createdAt desc){
  _id,
  skill,
  imageUrl
}`;
