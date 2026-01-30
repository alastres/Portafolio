export interface Project {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  link?: string;
  github?: string;
  image?: string;
  // Extended fields
  problem?: string;
  solution?: string;
  stackDetails?: {
    frontend: string;
    backend: string;
    database: string;
    infrastructure: string;
  };
  challenges?: string[];
  learnings?: string[];
}

export interface SeoConfig {
  title: string;
  description: string;
  url?: string;
  image?: string;
}
