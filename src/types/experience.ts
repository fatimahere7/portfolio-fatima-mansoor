export interface ExperienceItem {
  id: string;
  year: string;
  period: string;
  role: string;
  company: string;
  location: string;
  workType: string;
  description: string;
  technologies: string[];
  department?: string;
  deliverables?: string[];
  previewAccent?: string;
  verifiedUrl?: string;
}
