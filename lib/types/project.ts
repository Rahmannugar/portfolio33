export interface Project {
  _id: string;
  title: string;
  previewImage: string;
  description: string;
  highlights: string[];
  link: string;
  images: string[];
  languages: string[];
  startDate: string;
  currentlyWorking: boolean;
  endDate: string;
}
