// src/app/tags/page.tsx
import { Suspense } from "react";
import { Navbar } from "@/components/blog/navbar";
import TagsClient from "./tags-client";
import { getAllTags, getAllBlogPosts } from "@/lib/mdx";
import { getPostsForTag } from "@/lib/posts";
import { Skeleton } from "@/components/ui/skeleton";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tags | Erwin Wijaya",
  description: "Browse all blog tags and discover articles on cybersecurity, CTF writeups, web development, and more.",
  keywords: ["tags", "categories", "cybersecurity", "CTF", "writeups", "web development"],
  authors: [{ name: "Erwin Wijaya" }],
  openGraph: {
    title: "Tags | Erwin Wijaya",
    description: "Browse all blog tags and discover articles on cybersecurity and more.",
    type: "website",
    locale: "en_US",
    url: "https://erwinwijaya.com/tags",
    siteName: "Erwin Wijaya",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tags | Erwin Wijaya",
    description: "Browse all blog tags and discover articles.",
  },
  alternates: {
    canonical: "https://erwinwijaya.com/tags",
  },
};

interface TagWithPosts {
  tag: string;
  count: number;
  posts: { title: string; slug: string }[];
}

function TagsContent() {
  const allTags = getAllTags();
  const allPosts = getAllBlogPosts();
  
  // Enrich tags with preview posts
  const tagsWithPosts: TagWithPosts[] = allTags.map(({ tag, count }) => ({
    tag,
    count,
    posts: getPostsForTag(tag, 3),
  }));

  return <TagsClient allTags={tagsWithPosts} totalPosts={allPosts.length} />;
}

export default function TagsPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background pt-32 pb-20">
        <Suspense fallback={
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Skeleton className="h-8 w-40 mx-auto mb-6 rounded-full" />
              <Skeleton className="h-16 w-48 mx-auto mb-6 rounded-lg" />
              <Skeleton className="h-6 w-80 mx-auto rounded" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 9 }).map((_, i) => (
                <Skeleton key={i} className="h-48 rounded-2xl" />
              ))}
            </div>
          </div>
        }>
          <TagsContent />
        </Suspense>
      </main>
    </>
  );
}
