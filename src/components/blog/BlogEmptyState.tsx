"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, Tags, X } from "lucide-react";
import { motion } from "framer-motion";

interface BlogEmptyStateProps {
  searchQuery?: string;
  selectedTags?: string[];
  onClearFilters: () => void;
}

export function BlogEmptyState({
  searchQuery,
  selectedTags = [],
  onClearFilters,
}: BlogEmptyStateProps) {
  const hasSearch = !!searchQuery?.trim();
  const hasTags = selectedTags.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-md mx-auto"
    >
      <Card className="border-dashed">
        <CardContent className="flex flex-col items-center justify-center py-12 px-6 text-center">
          {/* Icon */}
          <div className="w-16 h-16 mb-6 rounded-full bg-muted flex items-center justify-center">
            {hasSearch ? (
              <Search className="w-8 h-8 text-muted-foreground" />
            ) : hasTags ? (
              <Tags className="w-8 h-8 text-muted-foreground" />
            ) : (
              <Search className="w-8 h-8 text-muted-foreground" />
            )}
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold mb-2">No posts found</h3>

          {/* Description */}
          <p className="text-muted-foreground mb-6 text-sm leading-relaxed">
            {hasSearch && hasTags ? (
              <>
                No articles match <span className="font-medium text-foreground">&quot;{searchQuery}&quot;</span> with the selected tags.
              </>
            ) : hasSearch ? (
              <>
                No articles match <span className="font-medium text-foreground">&quot;{searchQuery}&quot;</span>.
              </>
            ) : hasTags ? (
              <>
                No articles found with the selected {selectedTags.length === 1 ? "tag" : "tags"}: {" "}
                <span className="font-medium text-foreground">
                  {selectedTags.join(", ")}
                </span>.
              </>
            ) : (
              <>Try adjusting your filters to find what you&apos;re looking for.</>
            )}
          </p>

          {/* Suggestions */}
          <div className="space-y-2 text-sm text-muted-foreground mb-6">
            <p>💡 Suggestions:</p>
            <ul className="list-none space-y-1">
              <li>• Try different keywords</li>
              <li>• Select fewer tags</li>
              <li>• Check the &quot;All&quot; tab</li>
            </ul>
          </div>

          {/* Clear Button */}
          <Button onClick={onClearFilters} className="gap-2">
            <X className="w-4 h-4" />
            Clear all filters
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}
