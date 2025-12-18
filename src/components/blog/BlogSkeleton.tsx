"use client";

import { Skeleton } from "@/components/ui/skeleton";

interface BlogSkeletonProps {
  count?: number;
}

export function BlogSkeleton({ count = 6 }: BlogSkeletonProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="rounded-2xl border border-border bg-card overflow-hidden"
        >
          {/* Image skeleton */}
          <Skeleton className="w-full h-48 sm:h-56 rounded-none" />

          {/* Content skeleton */}
          <div className="p-6 space-y-4">
            {/* Tags */}
            <div className="flex gap-2">
              <Skeleton className="h-6 w-16 rounded-full" />
              <Skeleton className="h-6 w-20 rounded-full" />
            </div>

            {/* Title */}
            <div className="space-y-2">
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-3/4" />
            </div>

            {/* Summary */}
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
            </div>

            {/* Meta */}
            <div className="flex items-center justify-between pt-4 border-t border-border/50">
              <div className="flex gap-4">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-16" />
              </div>
              <Skeleton className="h-4 w-12" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
