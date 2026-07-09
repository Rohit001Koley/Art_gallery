import Link from "next/link";
import { getExhibitions } from "@/services/dbService";
import { Calendar, User, ArrowRight } from "lucide-react";
import { formatDate } from "@/lib/utils";

export const metadata = {
  title: "Exhibitions",
  description: "View current and upcoming contemporary art exhibitions curated at Aryan Art Gallery.",
};

export default async function ExhibitionsPage() {
  const exhibitions = await getExhibitions();
  const now = new Date();

  // Split into current and past/upcoming for clarity
  const currentExhibitions = exhibitions.filter((e) => {
    const start = new Date(e.startDate);
    const end = new Date(e.endDate);
    return now >= start && now <= end;
  });

  const otherExhibitions = exhibitions.filter((e) => {
    const start = new Date(e.startDate);
    const end = new Date(e.endDate);
    return now < start || now > end;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 font-sans">
      {/* Page Header */}
      <div className="border-b border-border pb-8 mb-12">
        <span className="text-xs font-semibold uppercase tracking-luxury text-primary">Gallery Program</span>
        <h1 className="text-4xl sm:text-5xl font-serif tracking-luxury font-light text-foreground mt-1">
          Exhibitions
        </h1>
        <p className="text-sm text-muted-foreground mt-2 max-w-xl">
          Discover our curated seasonal program, exhibiting solo retrospectives and thematic group shows that examine modern identity.
        </p>
      </div>

      {/* Current Exhibitions Section */}
      {currentExhibitions.length > 0 && (
        <div className="mb-16 space-y-8">
          <div className="flex items-center space-x-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <h2 className="text-xs font-semibold uppercase tracking-widest text-emerald-500">Current Exhibition</h2>
          </div>

          <div className="space-y-12">
            {currentExhibitions.map((exh) => (
              <div
                key={exh.id}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 border border-border bg-card rounded-sm overflow-hidden p-6 lg:p-8 hover:shadow-md transition-shadow"
              >
                {/* Banner Column */}
                <Link
                  href={`/exhibitions/${exh.slug}`}
                  className="lg:col-span-7 aspect-[16/10] overflow-hidden bg-muted relative rounded border border-border"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={exh.banner}
                    alt={exh.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-102"
                  />
                </Link>

                {/* Details Column */}
                <div className="lg:col-span-5 flex flex-col justify-between py-2 space-y-4">
                  <div className="space-y-4">
                    <h3 className="text-3xl font-serif font-bold text-foreground hover:text-primary transition-colors leading-tight">
                      <Link href={`/exhibitions/${exh.slug}`}>{exh.title}</Link>
                    </h3>
                    <div className="space-y-2 text-xs text-muted-foreground">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-primary flex-shrink-0" />
                        <span>
                          {formatDate(exh.startDate)} &ndash; {formatDate(exh.endDate)}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-2 text-primary flex-shrink-0" />
                        <span>Curated by {exh.curator}</span>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed leading-6 font-sans">
                      {exh.description}
                    </p>
                  </div>

                  <Link
                    href={`/exhibitions/${exh.slug}`}
                    className="w-full sm:w-auto text-center px-6 py-3 bg-primary hover:bg-primary/95 text-primary-foreground text-xs font-semibold uppercase tracking-luxury rounded transition-all inline-block"
                  >
                    View Exhibition &amp; Artworks
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Other Exhibitions (Upcoming/Past) Section */}
      {otherExhibitions.length > 0 && (
        <div className="space-y-8">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-primary border-b border-border pb-2">
            Upcoming &amp; Past Program
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {otherExhibitions.map((exh) => {
              const isUpcoming = new Date(exh.startDate) > now;
              return (
                <div
                  key={exh.id}
                  className="border border-border bg-card hover:shadow-md transition-all rounded-sm overflow-hidden flex flex-col h-full"
                >
                  <Link
                    href={`/exhibitions/${exh.slug}`}
                    className="relative aspect-[16/10] overflow-hidden bg-muted block"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={exh.banner}
                      alt={exh.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-103"
                    />
                    <div className="absolute top-4 left-4 bg-background/90 backdrop-blur-xs text-[10px] font-semibold px-2 py-0.5 uppercase tracking-wider border border-border">
                      {isUpcoming ? "Upcoming" : "Past"}
                    </div>
                  </Link>

                  <div className="p-6 flex flex-col flex-grow space-y-3">
                    <h3 className="text-xl font-serif font-bold text-foreground hover:text-primary transition-colors">
                      <Link href={`/exhibitions/${exh.slug}`}>{exh.title}</Link>
                    </h3>
                    <div className="flex items-center text-xs text-muted-foreground space-x-2">
                      <Calendar className="h-3.5 w-3.5 text-primary" />
                      <span>
                        {formatDate(exh.startDate)} &ndash; {formatDate(exh.endDate)}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                      {exh.description}
                    </p>

                    <div className="pt-4 mt-auto border-t border-border/60 flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">Curator: {exh.curator}</span>
                      <Link
                        href={`/exhibitions/${exh.slug}`}
                        className="text-xs font-semibold uppercase tracking-luxury text-primary hover:text-primary-light flex items-center transition-colors group"
                      >
                        Explore Show
                        <ArrowRight className="h-3.5 w-3.5 ml-1.5 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
