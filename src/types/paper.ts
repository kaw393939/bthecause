export interface PaperData {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  author: string;
  tags: string[];
  image: string;
  contentHtml: string;
  pdfUrl?: string;
  citationStyle?: 'apa' | 'mla' | 'chicago' | 'harvard';
  abstract?: string;
  institution?: string;
  doi?: string;
  featured?: boolean;
}
