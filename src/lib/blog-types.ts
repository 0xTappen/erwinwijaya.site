// src/lib/blog-types.ts
// Client-safe types and constants for blog functionality

export const PAGE_SIZE = 6;

export interface TagWithCount {
  tag: string;
  count: number;
}

export interface FilterParams {
  q?: string;
  tab?: 'all' | 'featured' | 'recent';
  tags?: string[];
  page?: number;
}

export interface FilterResult {
  posts: unknown[];
  totalPosts: number;
  totalPages: number;
  currentPage: number;
}
