"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Search, Hash, ArrowRight, Sparkles, TrendingUp, FileText, Github, Linkedin, Mail, Heart, Tag } from "lucide-react";

interface TagWithPosts {
  tag: string;
  count: number;
  posts: { title: string; slug: string }[];
}

interface TagsClientProps {
  allTags: TagWithPosts[];
  totalPosts: number;
}

export default function TagsClient({ allTags, totalPosts }: TagsClientProps) {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter tags based on search
  const filteredTags = useMemo(() => {
    if (!searchQuery.trim()) return allTags;
    const q = searchQuery.toLowerCase().trim();
    return allTags.filter((t) => t.tag.toLowerCase().includes(q));
  }, [allTags, searchQuery]);

  // Top tags (top 5 by count)
  const topTags = useMemo(() => allTags.slice(0, 5), [allTags]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <div className="container mx-auto px-4 pb-20 flex-1">
        {/* ====== HERO ====== */}
        <section className="text-center max-w-4xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6"
          >
            <Hash className="w-4 h-4" />
            <span>{allTags.length} Tags</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent"
          >
            Tags
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-muted-foreground mb-8 leading-relaxed"
          >
            Browse {totalPosts} articles organized by topic.
          </motion.p>

          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative max-w-md mx-auto"
          >
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
            <Input
              type="text"
              placeholder="Search tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-12 text-base rounded-xl"
              aria-label="Search tags"
            />
          </motion.div>
        </section>

        {/* ====== TOP TAGS ====== */}
        {!searchQuery && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-12"
          >
            <div className="flex items-center gap-2 mb-6">
              <TrendingUp className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-bold">Top Tags</h2>
            </div>
            <div className="flex flex-wrap gap-3">
              {topTags.map(({ tag, count }, index) => (
                <motion.div
                  key={tag}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <Link href="/blog">
                    <Badge
                      variant="default"
                      className="px-4 py-2 text-sm cursor-pointer hover:shadow-lg transition-all"
                    >
                      <Sparkles className="w-3.5 h-3.5 mr-1.5" />
                      <span className="capitalize">{tag}</span>
                      <span className="ml-2 opacity-70">({count})</span>
                    </Badge>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        <Separator className="mb-8" />

        {/* ====== ALL TAGS GRID ====== */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">
              {searchQuery ? `Search Results (${filteredTags.length})` : "All Tags"}
            </h2>
          </div>

          <AnimatePresence mode="wait">
            {filteredTags.length > 0 ? (
              <motion.div
                key="tags-grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {filteredTags.map(({ tag, count, posts }, index) => (
                  <motion.div
                    key={tag}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                  >
                    <Link href="/blog" className="block group">
                      <Card className="h-full overflow-hidden border-border hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5">
                        <CardHeader className="pb-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                                <Hash className="w-5 h-5 text-primary" />
                              </div>
                              <div>
                                <h3 className="font-bold capitalize text-lg group-hover:text-primary transition-colors">
                                  {tag}
                                </h3>
                                <p className="text-xs text-muted-foreground">
                                  {count} {count === 1 ? "article" : "articles"}
                                </p>
                              </div>
                            </div>
                            <ArrowRight className="w-5 h-5 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                          </div>
                        </CardHeader>
                        
                        {posts.length > 0 && (
                          <CardContent className="pt-0">
                            <Separator className="mb-3" />
                            <div className="space-y-2">
                              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                Recent articles
                              </p>
                              <ul className="space-y-1.5">
                                {posts.map((post) => (
                                  <li
                                    key={post.slug}
                                    className="flex items-start gap-2 text-sm text-muted-foreground"
                                  >
                                    <FileText className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                                    <span className="line-clamp-1">{post.title}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </CardContent>
                        )}
                      </Card>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="no-tags"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="text-center py-16"
              >
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
                  <Search className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-bold mb-2">No tags found</h3>
                <p className="text-muted-foreground mb-6">
                  No tags match &quot;{searchQuery}&quot;
                </p>
                <button
                  onClick={() => setSearchQuery("")}
                  className="px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                  Clear search
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* ====== BACK TO BLOG ====== */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-16 text-center"
        >
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors font-medium"
          >
            <ArrowRight className="w-4 h-4 rotate-180" />
            Back to Blog
          </Link>
        </motion.div>
      </div>

      {/* ====== FOOTER ====== */}
      <footer className="relative w-full border-t border-border/40 bg-gradient-to-b from-background/95 to-background backdrop-blur-xl pt-16 pb-8 mt-20">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
              {/* About */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="space-y-4"
              >
                <h4 className="text-xl font-black tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                  Erwin Wijaya
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Cyber Security Enthusiast & CTF Player. Passionate about web security and sharing knowledge.
                </p>
                <div className="flex gap-3 pt-2">
                  <a href="https://github.com/0xTappen" target="_blank" rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-primary/10 hover:bg-primary/20 flex items-center justify-center border border-primary/20 hover:border-primary/40 transition-all">
                    <Github className="w-4 h-4" />
                  </a>
                  <a href="https://linkedin.com/in/erwinwijaya" target="_blank" rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-blue-500/10 hover:bg-blue-500/20 flex items-center justify-center border border-blue-500/20 hover:border-blue-500/40 transition-all">
                    <Linkedin className="w-4 h-4 text-blue-600" />
                  </a>
                  <a href="mailto:contact@erwinwijaya.com"
                    className="w-10 h-10 rounded-full bg-red-500/10 hover:bg-red-500/20 flex items-center justify-center border border-red-500/20 hover:border-red-500/40 transition-all">
                    <Mail className="w-4 h-4 text-red-500" />
                  </a>
                </div>
              </motion.div>

              {/* Quick Links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="space-y-4"
              >
                <h4 className="text-lg font-bold tracking-tight">Quick Links</h4>
                <ul className="space-y-3">
                  {[
                    { href: "/", label: "Home" },
                    { href: "/blog", label: "Blog" },
                    { href: "/tags", label: "Tags" },
                    { href: "/#contact", label: "Contact" },
                  ].map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-2"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-primary/50" />
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Explore */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="space-y-4"
              >
                <h4 className="text-lg font-bold tracking-tight">Explore</h4>
                <p className="text-sm text-muted-foreground">
                  Check out the blog for in-depth articles and writeups.
                </p>
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
                >
                  <Tag className="w-4 h-4" />
                  View All Posts
                </Link>
              </motion.div>

              {/* Stay Updated */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="space-y-4"
              >
                <h4 className="text-lg font-bold tracking-tight">Stay Updated</h4>
                <p className="text-sm text-muted-foreground">
                  Check back often for new articles and writeups.
                </p>
                <Link
                  href="/blog?tab=recent"
                  className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
                >
                  View Recent Posts
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            </div>

            {/* Copyright */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mt-12 pt-8 border-t border-border/40 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground"
            >
              <div className="flex items-center gap-2">
                <span>© {new Date().getFullYear()} Erwin Wijaya.</span>
                <span className="hidden md:inline">•</span>
                <span className="flex items-center gap-1">
                  Made with <Heart className="w-3 h-3 text-red-500 fill-red-500" /> and ☕
                </span>
              </div>
              <div className="flex items-center gap-4 text-xs">
                <Link href="/" className="hover:text-primary transition-colors">Privacy</Link>
                <span>•</span>
                <Link href="/" className="hover:text-primary transition-colors">Terms</Link>
              </div>
            </motion.div>
          </div>
        </div>
      </footer>
    </div>
  );
}
