export type User = {
  name: string;
  email: string;
};

export type Survey = {
  id?: number;
  image_url?: string | null | ArrayBuffer | undefined;
  image?: object | null | string;
  title: string;
  slug: string;
  status: boolean;
  description: string;
  created_at?: string;
  updated_at?: string;
  expire_date: string;
  questions: Question[];
};

export type Question = {
  id: number | string;
  type: QuestionType | null;
  question: string;
  description?: string | null;
  data?: {
    options?: Option[];
  };
};

export type Option = {
  uuid: string;
  text: string;
};
export type Link = {
  url?: string | null;
  label: string;
  active: boolean;
};

export type Meta = {
  current_page: number;
  from: number;
  last_page: number;
  links: Link[];
  path: string;
  per_page: number;
  to: number;
  total: number;
} | null;
export type QuestionType = string;

export type LatestSurvey = {
  answers: number;
  created_at: string;
  expire_date: string;
  id: number;
  image_url: string;
  questions: number;
  slug: string;
  status: boolean;
  title: string;
};

export type AllSurveys = {
  latestAnswer: number[];
  latestSurvey: LatestSurvey;
  totalAnswers: number;
  totalSurveys: number;
};
