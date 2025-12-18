"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Github, Linkedin, Mail, Heart, Tag, Search, TrendingUp, Clock, X, ArrowRight } from "lucide-react";
import Link from "next/link";

import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import BlogCard from "@/components/blog/BlogCard";
import { BlogPagination } from "@/components/blog/BlogPagination";
import { BlogEmptyState } from "@/components/blog/BlogEmptyState";
import { PAGE_SIZE } from "@/lib/blog-types";
import type { BlogPost } from "@/lib/mdx";

interface BlogContentProps {
  allPosts: BlogPost[];
}

// Client-side filter function (without tags)
function filterPostsClient(
  posts: BlogPost[],
  params: {
    q?: string;
    tab?: "all" | "featured" | "recent";
    page?: number;
  }
) {
  const { q, tab = "all", page = 1 } = params;
  let filtered = [...posts];

  // Filter by tab
  if (tab === "featured") {
    filtered = filtered.filter((p) => p.frontmatter.featured);
  } else if (tab === "recent") {
    // Recent is just first 12 posts
    filtered = filtered.slice(0, 12);
  }

  // Filter by search query
  if (q && q.trim()) {
    const query = q.toLowerCase().trim();
    filtered = filtered.filter((post) => {
      const titleMatch = post.frontmatter.title.toLowerCase().includes(query);
      const summaryMatch = post.frontmatter.summary.toLowerCase().includes(query);
      return titleMatch || summaryMatch;
    });
  }

  const totalPosts = filtered.length;
  const totalPages = Math.max(1, Math.ceil(totalPosts / PAGE_SIZE));

  // Clamp page to valid range
  const currentPage = Math.min(Math.max(1, page), totalPages);

  // Paginate
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const paginatedPosts = filtered.slice(startIndex, startIndex + PAGE_SIZE);

  return {
    posts: paginatedPosts,
    totalPosts,
    totalPages,
    currentPage,
  };
}

export default function BlogClient({ allPosts }: BlogContentProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Parse URL params (ignore tags param if present)
  const urlQuery = searchParams.get("q") || "";
  const urlTab = (searchParams.get("tab") as "all" | "featured" | "recent") || "all";
  const urlPage = parseInt(searchParams.get("page") || "1", 10) || 1;

  // Local state synced with URL
  const [searchQuery, setSearchQuery] = useState(urlQuery);
  const [activeTab, setActiveTab] = useState<"all" | "featured" | "recent">(urlTab);
  const [currentPage, setCurrentPage] = useState(urlPage);
  const [localSearch, setLocalSearch] = useState(urlQuery);

  // Sync state with URL on mount and URL changes
  useEffect(() => {
    setSearchQuery(urlQuery);
    setLocalSearch(urlQuery);
    setActiveTab(urlTab);
    setCurrentPage(urlPage);
  }, [urlQuery, urlTab, urlPage]);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (localSearch !== searchQuery) {
        setSearchQuery(localSearch);
        setCurrentPage(1);
        updateUrl({ q: localSearch, tab: activeTab, page: 1 });
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [localSearch]);

  // Update URL when filter state changes
  const updateUrl = useCallback((params: {
    q?: string;
    tab?: string;
    page?: number;
  }) => {
    const newParams = new URLSearchParams();
    
    if (params.q) newParams.set("q", params.q);
    if (params.tab && params.tab !== "all") newParams.set("tab", params.tab);
    if (params.page && params.page > 1) newParams.set("page", params.page.toString());

    const queryString = newParams.toString();
    router.push(queryString ? `${pathname}?${queryString}` : pathname, { scroll: false });
  }, [router, pathname]);

  // Filter and paginate posts
  const { posts: filteredPosts, totalPosts, totalPages, currentPage: actualPage } = useMemo(() => {
    return filterPostsClient(allPosts, {
      q: searchQuery,
      tab: activeTab,
      page: currentPage,
    });
  }, [allPosts, searchQuery, activeTab, currentPage]);

  // Stats
  const featuredCount = useMemo(() => allPosts.filter(p => p.frontmatter.featured).length, [allPosts]);

  // Handlers
  const handleTabChange = useCallback((tab: "all" | "featured" | "recent") => {
    setActiveTab(tab);
    setCurrentPage(1);
    updateUrl({ q: searchQuery, tab, page: 1 });
  }, [searchQuery, updateUrl]);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
    updateUrl({ q: searchQuery, tab: activeTab, page });
    window.scrollTo({ top: 400, behavior: "smooth" });
  }, [searchQuery, activeTab, updateUrl]);

  const handleClearFilters = useCallback(() => {
    setSearchQuery("");
    setLocalSearch("");
    setActiveTab("all");
    setCurrentPage(1);
    updateUrl({});
  }, [updateUrl]);

  const hasActiveFilters = searchQuery || activeTab !== "all";

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <div className="container mx-auto px-4 pb-20 flex-1">
        {/* ====== HERO ====== */}
        <section className="text-center max-w-4xl mx-auto mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6"
          >
            <Sparkles className="w-4 h-4" />
            <span>{allPosts.length} Articles & Counting</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent"
          >
            Blogs
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-muted-foreground mb-6 leading-relaxed"
          >
            Deep dives into cybersecurity, CTF writeups, and web development tricks.
          </motion.p>
        </section>

        {/* ====== FILTERS ====== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="sticky top-20 z-30 py-4 -mx-4 px-4 bg-background/95 backdrop-blur-xl border-b border-border/50 mb-6"
        >
          {/* Search and Actions Row */}
          <div className="flex flex-col sm:flex-row gap-3 mb-4">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              <Input
                type="text"
                placeholder="Search articles..."
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                className="pl-10 pr-10 h-10"
                aria-label="Search articles"
              />
              {localSearch && (
                <button
                  onClick={() => {
                    setLocalSearch("");
                    setSearchQuery("");
                    updateUrl({ tab: activeTab, page: 1 });
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded hover:bg-muted transition-colors"
                  aria-label="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Explore Tags Button */}
            <Link href="/tags">
              <Button variant="outline" className="flex items-center gap-2">
                <Tag className="w-4 h-4" />
                Explore Tags
              </Button>
            </Link>

            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClearFilters}
                className="flex items-center gap-1.5 text-destructive hover:text-destructive"
              >
                <X className="w-3.5 h-3.5" />
                Clear
              </Button>
            )}
          </div>

          {/* Tabs */}
          <Tabs 
            value={activeTab} 
            onValueChange={(v) => handleTabChange(v as typeof activeTab)}
          >
            <TabsList className="grid w-full max-w-md grid-cols-3 mx-auto">
              <TabsTrigger value="all" className="flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5" />
                All
              </TabsTrigger>
              <TabsTrigger value="featured" className="flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5" />
                Featured
              </TabsTrigger>
              <TabsTrigger value="recent" className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                Recent
              </TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Helper text */}
          <p className="text-center text-xs text-muted-foreground mt-3">
            Browse topics via the <Link href="/tags" className="text-primary hover:underline">Tags page</Link>.
          </p>
        </motion.div>

        {/* ====== RESULTS INFO ====== */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center justify-between mb-6 text-sm text-muted-foreground"
        >
          <span>
            Showing {filteredPosts.length} of {totalPosts} {totalPosts === 1 ? "article" : "articles"}
            {totalPages > 1 && ` (Page ${actualPage} of ${totalPages})`}
          </span>
        </motion.div>

        {/* ====== POSTS GRID ====== */}
        <AnimatePresence mode="wait">
          {filteredPosts.length > 0 ? (
            <motion.div
              key="posts-grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredPosts.map((post, index) => (
                <BlogCard key={post.slug} post={post} index={index} />
              ))}
            </motion.div>
          ) : (
            <BlogEmptyState
              searchQuery={searchQuery}
              onClearFilters={handleClearFilters}
            />
          )}
        </AnimatePresence>

        {/* ====== PAGINATION ====== */}
        <BlogPagination
          currentPage={actualPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />

        {/* ====== STATS ====== */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-20 pt-12 border-t border-border"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold mb-1">{allPosts.length}</div>
              <div className="text-sm text-muted-foreground">Total Posts</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-1">{featuredCount}</div>
              <div className="text-sm text-muted-foreground">Featured</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-1">{PAGE_SIZE}</div>
              <div className="text-sm text-muted-foreground">Per Page</div>
            </div>
            <div>
              <Link href="/tags" className="block hover:text-primary transition-colors">
                <div className="text-3xl font-bold mb-1">→</div>
                <div className="text-sm text-muted-foreground">Explore Tags</div>
              </Link>
            </div>
          </div>
        </motion.section>
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
                  <a href="https://github.com/Romm31" target="_blank" rel="noopener noreferrer"
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
                  Browse all tags and discover more content.
                </p>
                <Link
                  href="/tags"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
                >
                  <Tag className="w-4 h-4" />
                  View All Tags
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
