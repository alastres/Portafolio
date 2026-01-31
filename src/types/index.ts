export interface Project {
  slug: string;
  title: string;
  description: string;
  version?: string;
  tags: string[];
  link?: string;
  github?: string;
  image?: string;

  // Metadata for Sidebar
  timeline?: string;
  role?: string;

  // Extended Content
  problem?: {
    description: string;
    painPoints: string[];
  };
  solution?: {
    description: string;
    features: {
      title: string;
      description: string;
      details?: string[];
      icon?: string;
    }[];
  };

  // Tech Stack (Array for Cards)
  techStack?: {
    name: string;
    icon?: string;
    category: string; // "Frontend", "Styling"
  }[];

  challenges?: {
    title: string;
    description: string;
    codeSnippet?: {
      language: string;
      code: string;
      fileName?: string;
    };
  }[];
}

export interface SeoConfig {
  title: string;
  description: string;
  url?: string;
  image?: string;
}
