
export interface Tool {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'finance' | 'health' | 'productivity' | 'kitchen' | 'ai';
  seoTitle?: string;
  seoDescription?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  image: string;
  slug: string;
}

export interface SearchResult {
  text: string;
  urls: { title: string; uri: string }[];
}

export enum ThemeColors {
  PRIMARY = 'bg-indigo-600',
  SECONDARY = 'bg-emerald-500',
  ACCENT = 'text-indigo-600',
  BG_SOFT = 'bg-slate-50',
}
