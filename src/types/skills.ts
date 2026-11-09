export type SkillCategory =
  | 'ALL'
  | 'BLOCKCHAIN'
  | 'BACKEND'
  | 'DATABASE'
  | 'FRONTEND'
  | 'AI / DATA';

export interface SkillItem {
  id: string;
  name: string;
  category: 'BLOCKCHAIN' | 'BACKEND' | 'DATABASE' | 'FRONTEND' | 'AI / DATA';
  type: string;
  ecosystem: string;
  use: string;
  related: string[];
  // Desktop constellation normalized coordinates (in percentage 0-100)
  x: number;
  y: number;
  level: 'primary' | 'secondary' | 'core';
  tag?: string;
  codeSnippet?: string;
}

export interface SkillConnection {
  from: string;
  to: string;
  type?: 'direct' | 'cross-layer' | 'core';
}

export interface SkillGroup {
  category: 'BLOCKCHAIN' | 'BACKEND' | 'DATABASE' | 'FRONTEND' | 'AI / DATA';
  label: string;
  description: string;
  items: SkillItem[];
}
