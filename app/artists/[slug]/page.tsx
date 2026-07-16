import Link from "next/link";
import { notFound } from "next/navigation";
import { getArtistBySlug, getArtworks } from "@/services/dbService";
import { ArrowLeft, Instagram, Globe, LayoutGrid } from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const artist = await getArtistBySlug(slug);
  if (!artist) return { title: "Artist Not Found" };

  return {
    title: `${artist.name} - Represented Artists`,
    description: `Explore the life, career, and artworks of ${artist.name} exhibiting at Aryan Art Gallery.`,
  };
}

export default async function ArtistDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const artist = await getArtistBySlug(slug);

  if (!artist) {
    notFound();
  }

  const artworks = await getArtworks({ artistId: artist.id });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 font-sans">
      {/* Back button */}
      <Link
        href="/artists"
        className="inline-flex items-center text-xs font-semibold uppercase tracking-luxury text-muted-foreground hover:text-primary transition-colors mb-12"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Artists
      </Link>

      {/* Artist Profile Header Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16 items-start">
        {/* Photo block */}
        <div className="aspect-square bg-muted border border-border overflow-hidden rounded-sm lg:col-span-1 shadow-sm group">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={artist.image}
            alt={artist.name}
            className="w-full h-full object-cover grayscale contrast-[1.15] brightness-[0.95] transition-all duration-500 group-hover:brightness-100"
          />
        </div>

        {/* Bio information block */}
        <div className="lg:col-span-2 space-y-6">
          <div className="space-y-2 border-b border-border pb-6">
            <h1 className="text-4xl sm:text-5xl font-serif font-light tracking-luxury text-foreground">
              {artist.name}
            </h1>
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-primary font-semibold mt-1">
              <span>{artist.nationality}</span>
              <span>•</span>
              <span>{artist.style}</span>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-luxury text-primary">Biography</h3>
            <p className="text-sm text-muted-foreground leading-relaxed leading-7 font-sans whitespace-pre-line">
              {artist.bio}
            </p>
          </div>

          {/* Social connections */}
          {(artist.instagram || artist.website) && (
            <div className="pt-4 border-t border-border flex items-center space-x-6 text-sm text-muted-foreground">
              <span className="text-xs font-semibold uppercase tracking-luxury text-primary">Connect:</span>
              {artist.instagram && (
                <a
                  href={`https://instagram.com/${artist.instagram}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center hover:text-primary transition-colors"
                >
                  <Instagram className="h-4 w-4 mr-2" />
                  @{artist.instagram}
                </a>
              )}
              {artist.website && (
                <a
                  href={artist.website}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center hover:text-primary transition-colors"
                >
                  <Globe className="h-4 w-4 mr-2" />
                  Official Website
                </a>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Artist Artworks Grid Section */}
      <div className="space-y-8 border-t border-border pt-16">
        <div className="flex items-center space-x-3">
          <LayoutGrid className="h-5 w-5 text-primary" />
          <h2 className="text-2xl font-serif font-light tracking-luxury text-foreground">
            Exhibited Works ({artworks.length})
          </h2>
        </div>

        {artworks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {artworks.map((work) => (
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
                  <Link
                    href={`/artworks/${work.id}`}
                    className="text-lg font-serif font-bold text-foreground hover:text-primary transition-colors block"
                  >
                    {work.title}
                  </Link>
                  <p className="text-xs text-muted-foreground">{work.medium}</p>
                  <div className="pt-4 mt-auto border-t border-border/60 flex items-center justify-between text-xs text-muted-foreground">
                    <span>{work.dimensions}</span>
                    <span>{work.year}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-muted-foreground border border-dashed border-border rounded">
            <p className="text-sm">No artworks currently listed for this artist.</p>
          </div>
        )}
      </div>
    </div>
  );
}
