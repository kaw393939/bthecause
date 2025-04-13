'use server';

import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { PaperData } from '@/types/paper';
import markdownToHtml from './markdownToHtml';

// Define content directory with explicit normalization
const papersDirectory = path.resolve(process.cwd(), 'src', 'content', 'research');
console.log('Papers directory resolved to:', papersDirectory);

// Helper function to get all paper ids (filenames without .md)
export async function getAllPaperIds(): Promise<string[]> {
  try {
    console.log('Reading directory:', papersDirectory);
    
    // Check if directory exists
    try {
      await fs.access(papersDirectory, fs.constants.R_OK);
    } catch {
      console.error('Research papers directory does not exist or is not readable:', papersDirectory);
      return [];
    }
    
    const fileNames = await fs.readdir(papersDirectory);
    console.log('Files found in directory:', fileNames);
    
    const mdFiles = fileNames.filter(fileName => fileName.endsWith('.md'));
    console.log('Markdown files found:', mdFiles);
    
    return mdFiles.map(fileName => fileName.replace(/\.md$/, ''));
  } catch (error: unknown) {
    console.error('Error reading research papers directory:', error);
    return [];
  }
}

// Helper function to get data for a single paper by id
export async function getPaperData(id: string): Promise<PaperData | null> {
  const fullPath = path.join(papersDirectory, `${id}.md`);
  let matterResult: matter.GrayMatterFile<string>;

  try {
    const fileContents = await fs.readFile(fullPath, 'utf8');
    matterResult = matter(fileContents);
  } catch (error: unknown) {
    console.error(`Error reading or parsing file ${fullPath}:`, error);
    if (error instanceof Error) {
        console.error(`Error details: ${error.message}`);
    }
    return null; 
  }

  const frontmatter = matterResult.data || {};

  // Convert markdown content to HTML
  const contentHtml = await markdownToHtml(matterResult.content);

  const paperData: PaperData = {
    id,
    title: frontmatter.title ?? 'Untitled Paper',
    date: frontmatter.date ?? new Date().toISOString(),
    excerpt: frontmatter.excerpt ?? '',
    contentHtml: contentHtml,
    author: frontmatter.author,
    image: frontmatter.image ?? '/images/research/default-paper.jpg',
    tags: frontmatter.tags ?? [],
    pdfUrl: frontmatter.pdfUrl,
    citationStyle: frontmatter.citationStyle,
    abstract: frontmatter.abstract,
    institution: frontmatter.institution,
    doi: frontmatter.doi,
    featured: frontmatter.featured ?? false
  };

  return paperData;
}

// Helper function to get sorted data for all papers
export async function getSortedPapersData(): Promise<PaperData[]> {
  try {
    const allIds = await getAllPaperIds();
    console.log('All paper IDs found:', allIds);
    
    if (allIds.length === 0) {
      console.warn('No research papers found!');
      return [];
    }
    
    // Process each ID sequentially to avoid overwhelming the system
    const allPapersData: PaperData[] = [];
    
    for (const id of allIds) {
      const paperData = await getPaperData(id);
      if (paperData) {
        allPapersData.push(paperData);
      }
    }
    
    console.log(`Successfully processed ${allPapersData.length} out of ${allIds.length} papers`);
    
    // Sort papers by date (newest first)
    return allPapersData.sort((a, b) => {
      if (a.date < b.date) {
        return 1;
      } else {
        return -1;
      }
    });
  } catch (error: unknown) {
    console.error('Error getting sorted papers data:', error);
    return [];
  }
}

// Get all unique tags across all papers
export async function getAllPaperTags(): Promise<string[]> {
  const allPapersData = await getSortedPapersData();
  
  const allTags = allPapersData.reduce((tags: string[], paper: PaperData) => {
    if (paper.tags && Array.isArray(paper.tags)) {
      return [...tags, ...paper.tags];
    }
    return tags;
  }, []);
  
  // Return unique tags
  return Array.from(new Set(allTags));
}

// Get papers filtered by tag
export async function getPapersByTag(tag: string): Promise<PaperData[]> {
  const allPapersData = await getSortedPapersData();
  
  return allPapersData.filter(paper => 
    paper.tags && Array.isArray(paper.tags) && paper.tags.includes(tag)
  );
}
