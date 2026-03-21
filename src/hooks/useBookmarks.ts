"use client";
import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "aitoolshub_bookmarks";

export function useBookmarks() {
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setBookmarks(JSON.parse(stored));
    } catch {
      setBookmarks([]);
    }
  }, []);

  const toggle = useCallback((slug: string) => {
    setBookmarks((prev) => {
      const next = prev.includes(slug)
        ? prev.filter((s) => s !== slug)
        : [...prev, slug];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const isBookmarked = useCallback(
    (slug: string) => bookmarks.includes(slug),
    [bookmarks]
  );

  return { bookmarks, toggle, isBookmarked, mounted };
}
