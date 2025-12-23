export type Skills = {
  languages: string[];
  technologies: string[];
  tools: string[];
  loves: string[];
};

export type Experience = {
  duration?: string | null;
  title?: string | null;
  location?: string | null;
  description?: string | null;
  imageUrl?: string | null;
};

export type Work = {
  title?: string | null;
  subTitle?: string | null;
  description: string[];
  location?: string | null;
  link?: string | null;
  video?: string | null;
  date?: string | null;
  imageUrl?: string | null;
  technologies: string[];
};

export type About = {
  description: string[];
  imageUrl?: string | null;
  imageCaption?: string | null;
  imageTitle?: string | null;
  tagLine?: string | null;
};

export type Social = {
  linkedIn: string;
  github: string;
  email: string;
};

export type Chris = {
  id: string;
  title: string;
  description: string;
  skills: Skills;
  experience: Experience[];
  about: About;
  work: Work[];
  social: Social;
};

export type QueryResponse = {
  data?: {
    chris: Chris;
  };
};
