"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, Loader2, ArrowRight } from "lucide-react";
import { useDebounce } from "@/hooks/useDebounce";

interface SearchResult {
  type: string;
  title: string;
  subtitle: string;
  slug: string;
  image?: string;
  id?: string;
}

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<"artists" | "subjects">("artists");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const debouncedQuery = useDebounce(query, 300);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      setQuery("");
      setResults([]);
    }
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  // Perform search fetch when debounced query or category changes
  useEffect(() => {
    if (!debouncedQuery) {
      setResults([]);
      return;
    }

    const performSearch = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/search?category=${category}&q=${encodeURIComponent(debouncedQuery)}`);
        const data = await res.json();
        setResults(data.results || []);
      } catch (err) {
        console.error("Search failed:", err);
      } finally {
        setIsLoading(false);
      }
    };

    performSearch();
  }, [debouncedQuery, category]);

  const handleSelectResult = (result: SearchResult) => {
    onClose();
    if (result.type === "artist") {
      router.push(`/artists/${result.slug}`);
    } else {
      router.push(`/artworks/${result.id}`);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 sm:px-6 md:pt-32">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-neutral-950/80 backdrop-blur-sm"
          />

          {/* Modal Box */}
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-2xl overflow-hidden rounded-xl bg-card border border-border shadow-2xl z-10"
          >
            {/* Search Input Area */}
            <div className="relative flex items-center border-b border-border px-5 py-4">
              <Search className="h-5 w-5 text-muted-foreground mr-3" />
              <input
                ref={inputRef}
                type="text"
                placeholder={`Search ${category === "artists" ? "artists by name or nationality" : "artworks by subject, title, or medium"}...`}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-transparent text-foreground placeholder:text-muted-foreground outline-none text-base font-sans"
              />
              <button
                onClick={onClose}
                className="p-1 rounded-md hover:bg-muted text-muted-foreground transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Category Toggle */}
            <div className="flex border-b border-border bg-muted/40 px-4 py-2 text-xs">
              <button
                onClick={() => setCategory("artists")}
                className={`px-3 py-1.5 rounded-md font-medium tracking-wide uppercase transition-colors cursor-pointer ${
                  category === "artists"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Artists
              </button>
              <button
                onClick={() => setCategory("subjects")}
                className={`ml-2 px-3 py-1.5 rounded-md font-medium tracking-wide uppercase transition-colors cursor-pointer ${
                  category === "subjects"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Subjects / Artworks
              </button>
            </div>

            {/* Content Area */}
            <div className="max-h-[350px] overflow-y-auto p-4 font-sans">
              {isLoading ? (
                <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
                  <Loader2 className="h-8 w-8 animate-spin text-primary mb-2" />
                  <span className="text-sm">Searching the gallery...</span>
                </div>
              ) : results.length > 0 ? (
                <div className="space-y-2">
                  <span className="text-xs font-semibold text-muted-foreground tracking-wider uppercase px-2">
                    Results ({results.length})
                  </span>
                  <div className="space-y-1">
                    {results.map((result) => (
                      <button
                        key={result.id || result.slug}
                        onClick={() => handleSelectResult(result)}
                        className="flex w-full items-center p-2 rounded-lg hover:bg-primary/5 border border-transparent hover:border-primary/10 transition-all text-left cursor-pointer group"
                      >
                        {result.image ? (
                          <div className="h-12 w-12 rounded bg-muted overflow-hidden flex-shrink-0 mr-4 border border-border">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={result.image}
                              alt={result.title}
                              className="h-full w-full object-cover transition-transform group-hover:scale-105"
                            />
                          </div>
                        ) : (
                          <div className="h-12 w-12 rounded bg-muted flex items-center justify-center text-muted-foreground mr-4 border border-border">
                            <Search className="h-5 w-5" />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-semibold text-foreground truncate group-hover:text-primary">
                            {result.title}
                          </h4>
                          <p className="text-xs text-muted-foreground truncate">{result.subtitle}</p>
                        </div>
                        <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:text-primary transition-all transform translate-x-[-10px] group-hover:translate-x-0" />
                      </button>
                    ))}
                  </div>
                </div>
              ) : query.trim() !== "" ? (
                <div className="py-12 text-center text-muted-foreground">
                  <p className="text-sm font-medium">No results found for &ldquo;{query}&rdquo;</p>
                  <p className="text-xs mt-1">Try searching for a different term or switching categories.</p>
                </div>
              ) : (
                <div className="py-12 text-center text-muted-foreground">
                  <Search className="h-10 w-10 mx-auto text-muted-foreground/30 mb-3" />
                  <p className="text-sm font-semibold">Start typing to search...</p>
                  <p className="text-xs mt-1">
                    Try &quot;Dubois&quot; for artists or &quot;Landscape&quot; for subjects.
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
