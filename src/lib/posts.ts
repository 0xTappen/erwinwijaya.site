// src/lib/posts.ts
// Server-only post utilities - DO NOT import in client components
import "server-only";
import { getAllBlogPosts, getAllTags as getMdxTags } from './mdx';
import type { BlogPost } from './mdx';

export const PAGE_SIZE = 6;

export interface TagWithCount {
  tag: string;
  count: number;
}

/**
 * Get all posts (cached at module level for performance)
 */
export function getAllPosts(): BlogPost[] {
  return getAllBlogPosts();
}

/**
 * Get all tags with their counts, sorted by count descending
 */
export function getAllTagsWithCount(): TagWithCount[] {
  return getMdxTags();
}

/**
 * Get posts for a specific tag with preview titles
 */
export function getPostsForTag(tag: string, limit = 3): { title: string; slug: string }[] {
  const allPosts = getAllPosts();
  return allPosts
    .filter(post => 
      post.frontmatter.tags.some(t => t.toLowerCase() === tag.toLowerCase())
    )
    .slice(0, limit)
    .map(post => ({
      title: post.frontmatter.title,
      slug: post.slug
    }));
}
