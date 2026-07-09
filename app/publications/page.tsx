import { getPublications } from "@/services/dbService";
import { BookOpen, Download, Calendar, ArrowUpRight } from "lucide-react";

export const metadata = {
  title: "Publications",
  description: "Browse academic monographs, catalogs, and brochures published by Aryan Art Gallery.",
};

export default async function PublicationsPage() {
  const publications = await getPublications();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 font-sans">
      {/* Page Header */}
      <div className="border-b border-border pb-8 mb-12">
        <span className="text-xs font-semibold uppercase tracking-luxury text-primary">Gallery Editions</span>
        <h1 className="text-4xl sm:text-5xl font-serif tracking-luxury font-light text-foreground mt-1">
          Publications
        </h1>
        <p className="text-sm text-muted-foreground mt-2 max-w-xl">
          Academic monographs, exhibition catalogs, and literature published in collaboration with artists and curatorial partners.
        </p>
      </div>

      {/* Publications Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {publications.length > 0 ? (
          publications.map((pub) => (
            <div
              key={pub.id}
              className="flex flex-col sm:flex-row border border-border bg-card p-6 rounded-sm hover:shadow-md transition-shadow gap-6"
            >
              {/* Cover Column */}
              <div className="w-full sm:w-32 aspect-[3/4] sm:h-44 overflow-hidden border border-border rounded shadow-sm bg-muted flex-shrink-0 relative group">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={pub.coverImage}
                  alt={pub.title}
                  className="w-full h-full object-cover transition-transform group-hover:scale-103 duration-500"
                />
              </div>

              {/* Info Column */}
              <div className="flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center text-xs text-primary font-semibold space-x-1.5">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>Published in {pub.year}</span>
                  </div>

                  <h3 className="text-xl font-serif font-bold text-foreground leading-snug">
                    {pub.title}
                  </h3>

                  {pub.description && (
                    <p className="text-xs text-muted-foreground leading-relaxed leading-5">
                      {pub.description}
                    </p>
                  )}
                </div>

                <div className="pt-4 border-t border-border/60 flex items-center justify-between">
                  <a
                    href={pub.pdf}
                    download
                    className="flex items-center text-xs font-semibold text-primary hover:text-primary-light uppercase tracking-luxury transition-colors"
                  >
                    <Download className="h-3.5 w-3.5 mr-2" />
                    Download Catalogue
                  </a>
                  <span className="text-[10px] uppercase font-semibold text-muted-foreground tracking-wider bg-stone-100 dark:bg-stone-850 px-2 py-0.5 border border-border">
                    PDF Edition
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-2 text-center py-16 text-muted-foreground border border-dashed border-border rounded">
            <p className="text-sm">No publications currently available.</p>
          </div>
        )}
      </div>
    </div>
  );
}
