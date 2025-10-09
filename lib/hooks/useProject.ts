export const projectQuery = `*[_type == "project"]| order(_createdAt desc){
  _id,
title,
previewImage,
description,
highlights,
link,
images,
languages,
startDate,
endDate
}`;

export const singleProjectQuery = `*[_type == "project" && _id == $id][0]{
  _id,
title,
  previewImage,
  description,
  highlights,
  link,
  images,
  languages,
  startDate,
  endDate
}`;
