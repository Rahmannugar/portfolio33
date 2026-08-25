export interface Project {
  _id: string;
  order: number;
  title: string;
  previewImage: string;
  description: string;
  highlights: string[];
  link: string;
  images?: string[];
  technologies: string[];
  _createdAt: string;
  _updatedAt: string;
}
