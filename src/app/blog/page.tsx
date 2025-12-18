// src/app/blog/page.tsx
import { Suspense } from "react";
import { Navbar } from "@/components/blog/navbar";
import { getAllBlogPosts } from "@/lib/mdx";
import BlogClient from "./page-client";
import { BlogSkeleton } from "@/components/blog/BlogSkeleton";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | Erwin Wijaya",
  description: "Deep dives into cybersecurity, CTF writeups, and web development tricks. Explore articles on web security, penetration testing, and more.",
  keywords: ["cybersecurity", "CTF", "writeups", "web development", "security", "hacking", "penetration testing"],
  authors: [{ name: "Erwin Wijaya" }],
  openGraph: {
    title: "Blog | Erwin Wijaya",
    description: "Deep dives into cybersecurity, CTF writeups, and web development tricks.",
    type: "website",
    locale: "en_US",
    url: "https://erwinwijaya.com/blog",
    siteName: "Erwin Wijaya",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | Erwin Wijaya",
    description: "Deep dives into cybersecurity, CTF writeups, and web development tricks.",
  },
  alternates: {
    canonical: "https://erwinwijaya.com/blog",
  },
};

function BlogContent() {
  const allPosts = getAllBlogPosts();
  return <BlogClient allPosts={allPosts} />;
}

export default function BlogPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background pt-32 pb-20">
        <Suspense fallback={
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <div className="h-8 w-40 bg-muted rounded-full mx-auto mb-6" />
              <div className="h-16 w-64 bg-muted rounded-lg mx-auto mb-6" />
              <div className="h-6 w-96 bg-muted rounded mx-auto" />
            </div>
            <BlogSkeleton count={6} />
          </div>
        }>
          <BlogContent />
        </Suspense>
      </main>
    </>
  );
}