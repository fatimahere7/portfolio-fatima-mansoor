export interface ProjectMetric {
  label: string;
  value: string;
  delta?: string;
}

export interface ArchitectureNode {
  name: string;
  role: string;
  latency?: string;
  status?: string;
}

export interface CodeSpecimen {
  filename: string;
  language: string;
  code: string;
  description: string;
  highlights?: string[];
}

export interface TechCategoryGroup {
  categoryName: string;
  items: string[];
}

export interface CaseStudyData {
  challenge: {
    summary: string;
    bottlenecks: string[];
    constraints: string[];
  };
  objectives: string[];
  roleAndContributions: {
    roleTitle: string;
    summary: string;
    personalContributions: string[];
  };
  technicalImplementation: {
    overview: string;
    workflowSteps: Array<{ step: string; title: string; description: string }>;
    architecturalHighlights: string[];
  };
  mainFeatures: string[];
  techCategories: TechCategoryGroup[];
  architecture: {
    overview: string;
    flowSteps: Array<{ step: string; title: string; description: string }>;
    nodes: ArchitectureNode[];
  };
  codeSpecimen?: CodeSpecimen;
  futureRoadmap?: string[];
}

export type ProjectCategoryGroup =
  | 'ALL'
  | 'BACKEND & FINTECH'
  | 'BLOCKCHAIN & WEB3'
  | 'AI & INTELLIGENT SYSTEMS'
  | 'FULL-STACK APPLICATIONS';

export interface ProjectItem {
  id: string;
  number: string;
  title: string;
  subtitle?: string;
  category: string;
  primaryGroup: 'BACKEND & FINTECH' | 'BLOCKCHAIN & WEB3' | 'AI & INTELLIGENT SYSTEMS' | 'FULL-STACK APPLICATIONS';
  introduction: string;
  description: string;
  problemStatement: string;
  objectives: string[];
  roleAndContributions: {
    roleTitle: string;
    summary: string;
    personalContributions: string[];
  };
  technicalImplementation: {
    overview: string;
    workflowSteps: Array<{ step: string; title: string; description: string }>;
    architecturalHighlights: string[];
  };
  mainFeatures: string[];
  technologies: string[];
  techCategories?: TechCategoryGroup[];
  image?: string;
  visualType?: 'fintech' | 'staking' | 'nlp' | 'rag' | 'hrms' | 'scheduler' | 'ecommerce';
  github?: string;
  githubClient?: string;
  githubServer?: string;
  live?: string;
  caseStudyUrl?: string;
  featured?: boolean;
  priorityOrder: number;
  role?: string;
  year?: string;
  status?: string;
  futureRoadmap?: string[];
  caseStudy?: CaseStudyData;
}
