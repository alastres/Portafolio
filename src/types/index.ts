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
      icon?: string;
    }[];
  };

  // Tech Stack (Array for Cards)
  techStack?: {
    name: string;
    icon?: any; // We'll handle icons in component mapping
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
