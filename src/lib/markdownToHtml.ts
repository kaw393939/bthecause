import { remark } from 'remark';
import html from 'remark-html';
import remarkGfm from 'remark-gfm';

/**
 * Converts markdown string to HTML string
 * @param markdown The markdown content to convert
 * @returns HTML string
 */
export default async function markdownToHtml(markdown: string): Promise<string> {
  const result = await remark()
    .use(remarkGfm) // Support GitHub Flavored Markdown features like tables
    .use(html, { sanitize: false }) // Set sanitize: false to allow HTML in markdown
    .process(markdown);
  
  return result.toString();
}
