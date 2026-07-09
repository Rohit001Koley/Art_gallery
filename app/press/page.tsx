import Link from "next/link";
import { getPress } from "@/services/dbService";
import { FileText, Download, ExternalLink, Calendar, Newspaper } from "lucide-react";
import { formatDate } from "@/lib/utils";

export const metadata = {
  title: "Press & Media",
  description: "Read recent press releases, media columns, and curatorial interviews covering exhibitions at Aryan Art Gallery.",
};

export default async function PressPage() {
  const press = await getPress();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 font-sans">
      {/* Page Header */}
      <div className="border-b border-border pb-8 mb-12">
        <span className="text-xs font-semibold uppercase tracking-luxury text-primary">Media Room</span>
        <h1 className="text-4xl sm:text-5xl font-serif tracking-luxury font-light text-foreground mt-1">
          Press &amp; News
        </h1>
        <p className="text-sm text-muted-foreground mt-2 max-w-xl">
          Archive of gallery statements, critical reviews, and media conversations with our exhibiting international artists.
        </p>
      </div>

      {/* Press items list */}
      <div className="space-y-8">
        {press.length > 0 ? (
          press.map((item) => (
            <div
              key={item.id}
              className="border border-border bg-card p-6 md:p-8 rounded-sm hover:shadow-sm transition-all flex flex-col md:flex-row md:items-start justify-between gap-6"
            >
              {/* Info group */}
              <div className="space-y-3 max-w-3xl">
                <div className="flex items-center text-xs text-primary font-semibold space-x-2">
                  <Newspaper className="h-4 w-4" />
                  <span>{item.source}</span>
                  <span className="text-muted-foreground">•</span>
                  <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                  <span>{formatDate(item.date)}</span>
                </div>

                <h3 className="text-2xl font-serif font-bold text-foreground hover:text-primary transition-colors">
                  {item.title}
                </h3>

                <p className="text-sm text-muted-foreground leading-relaxed leading-6">
                  {item.content}
                </p>
              </div>

              {/* Action Column */}
              <div className="flex flex-col sm:flex-row md:flex-col gap-3 min-w-[180px] self-start sm:self-auto md:self-start">
                {item.pdf && (
                  <a
                    href={item.pdf}
                    download
                    className="flex items-center justify-center px-4 py-2.5 bg-primary text-primary-foreground text-xs font-semibold uppercase tracking-luxury hover:bg-primary/95 transition-all rounded-sm shadow-xs cursor-pointer"
                  >
                    <Download className="h-3.5 w-3.5 mr-2" />
                    Download PDF
                  </a>
                )}
                {item.link && (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center px-4 py-2.5 border border-border text-foreground hover:bg-muted text-xs font-semibold uppercase tracking-luxury transition-all rounded-sm cursor-pointer"
                  >
                    <ExternalLink className="h-3.5 w-3.5 mr-2 text-primary" />
                    Read Article
                  </a>
                )}
                {!item.pdf && !item.link && (
                  <div className="flex items-center text-xs text-muted-foreground border border-border px-3 py-2 justify-center rounded bg-stone-50 dark:bg-stone-900/50">
                    <FileText className="h-4 w-4 mr-2 text-primary" />
                    Archive Record
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-16 text-muted-foreground border border-dashed border-border rounded">
            <p className="text-sm">No press releases currently in archive.</p>
          </div>
        )}
      </div>
    </div>
  );
}
