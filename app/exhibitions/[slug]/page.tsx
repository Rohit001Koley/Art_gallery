import Link from "next/link";
import { notFound } from "next/navigation";
import { getExhibitionBySlug, getArtworks, getArtists } from "@/services/dbService";
import { ArrowLeft, Calendar, User, Images, Sparkles } from "lucide-react";
import { formatDate } from "@/lib/utils";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const exh = await getExhibitionBySlug(slug);
  if (!exh) return { title: "Exhibition Not Found" };

  return {
    title: `${exh.title} - Exhibitions`,
    description: exh.description,
  };
}

export default async function ExhibitionDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const exh = await getExhibitionBySlug(slug);

  if (!exh) {
    notFound();
  }

  // Fetch all artworks linked to this exhibition
  const allArtworks = await getArtworks();
  const artworks = allArtworks.filter((w) => exh.artworkIds.includes(w.id));

  // Fetch artists for display names
  const artists = await getArtists();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 font-sans">
      {/* Back navigation */}
      <Link
        href="/exhibitions"
        className="inline-flex items-center text-xs font-semibold uppercase tracking-luxury text-muted-foreground hover:text-primary transition-colors mb-12"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Exhibitions
      </Link>

      {/* Main Banner Block */}
      <div className="relative aspect-[21/9] w-full overflow-hidden rounded-sm border border-border bg-stone-900 shadow-md mb-12">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={exh.banner}
          alt={exh.title}
          className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
          <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-accent">
            Featured Curated Program
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold tracking-luxury leading-tight">
            {exh.title}
          </h1>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-1 text-xs text-stone-300">
            <span className="flex items-center">
              <Calendar className="h-4 w-4 mr-1.5 text-accent" />
              {formatDate(exh.startDate)} &ndash; {formatDate(exh.endDate)}
            </span>
            <span className="flex items-center">
              <User className="h-4 w-4 mr-1.5 text-accent" />
              Curated by {exh.curator}
            </span>
          </div>
        </div>
      </div>

      {/* Description Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16 items-start">
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-xs font-semibold uppercase tracking-luxury text-primary border-b border-border pb-2">
            Curator Statement
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed leading-7 whitespace-pre-line">
            {exh.description}
          </p>
        </div>

        {/* Installation snapshots */}
        {exh.galleryImages && exh.galleryImages.length > 0 && (
          <div className="lg:col-span-1 space-y-6 bg-stone-50 dark:bg-stone-900/20 border border-border p-6 rounded-sm">
            <div className="flex items-center space-x-2 border-b border-border pb-3">
              <Images className="h-4 w-4 text-primary" />
              <h3 className="text-xs font-semibold uppercase tracking-luxury text-foreground">
                Installation Views
              </h3>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {exh.galleryImages.map((img, idx) => (
                <div
                  key={idx}
                  className="aspect-square bg-muted rounded overflow-hidden border border-border/60 relative group cursor-pointer"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={img}
                    alt={`Installation View ${idx + 1}`}
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Exhibited Works list */}
      <div className="space-y-8 border-t border-border pt-16">
        <div className="flex items-center space-x-3">
          <Sparkles className="h-5 w-5 text-primary" />
          <h2 className="text-2xl font-serif font-light tracking-luxury text-foreground">
            Exhibited Artworks ({artworks.length})
          </h2>
        </div>

        {artworks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {artworks.map((work) => {
              const artist = artists.find((a) => a.id === work.artistId);
              return (
                <div
                  key={work.id}
                  className="group relative bg-card border border-border overflow-hidden rounded-sm flex flex-col h-full shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <Link href={`/artworks/${work.id}`} className="relative block aspect-[4/3] overflow-hidden bg-muted">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={work.image}
                      alt={work.title}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    {work.price && (
                      <div className="absolute top-4 right-4 bg-background/90 backdrop-blur-xs text-foreground text-xs font-semibold px-2.5 py-1 uppercase tracking-wider border border-border">
                        {work.price}
                      </div>
                    )}
                  </Link>

                  <div className="p-6 flex flex-col flex-grow space-y-2">
                    <div>
                      <Link
                        href={`/artworks/${work.id}`}
                        className="text-lg font-serif font-bold text-foreground hover:text-primary transition-colors block"
                      >
                        {work.title}
                      </Link>
                      {artist && (
                        <Link
                          href={`/artists/${artist.slug}`}
                          className="text-xs text-muted-foreground hover:text-primary transition-colors mt-0.5 block"
                        >
                          by {artist.name}
                        </Link>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">{work.medium}</p>
                    <div className="pt-4 mt-auto border-t border-border/60 flex items-center justify-between text-xs text-muted-foreground">
                      <span>{work.dimensions}</span>
                      <span>{work.year}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12 text-muted-foreground border border-dashed border-border rounded">
            <p className="text-sm">No artworks associated with this exhibition yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
