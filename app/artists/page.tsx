import Link from "next/link";
import { getArtists } from "@/services/dbService";
import { ArrowRight, Instagram, Globe } from "lucide-react";

export const metadata = {
  title: "Artists",
  description: "Explore the international roster of neoclassical surrealist, abstract expressionist, and minimalist artists represented by Aryan Art Gallery.",
};

export default async function ArtistsPage() {
  const artists = await getArtists();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 font-sans">
      {/* Page Header */}
      <div className="border-b border-border pb-8 mb-12">
        <span className="text-xs font-semibold uppercase tracking-luxury text-primary">Aryan Art Gallery Roster</span>
        <h1 className="text-4xl sm:text-5xl font-serif tracking-luxury font-light text-foreground mt-1">
          Represented Artists
        </h1>
        <p className="text-sm text-muted-foreground mt-2 max-w-xl">
          We work closely with pioneering voices from around the world to present collections that bridge neoclassical heritage with minimalist sensibilities.
        </p>
      </div>

      {/* Roster Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {artists.map((artist) => (
          <div
            key={artist.id}
            className="flex flex-col sm:flex-row border border-border bg-card hover:shadow-md transition-all duration-300 rounded-sm overflow-hidden"
          >
            {/* Image Column */}
            <Link
              href={`/artists/${artist.slug}`}
              className="w-full sm:w-48 h-64 bg-muted overflow-hidden relative group block"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={artist.image}
                alt={artist.name}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </Link>

            {/* Info Column */}
            <div className="p-6 flex flex-col flex-1 space-y-4">
              <div>
                <Link
                  href={`/artists/${artist.slug}`}
                  className="text-2xl font-serif font-bold text-foreground hover:text-primary transition-colors block"
                >
                  {artist.name}
                </Link>
                <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-primary font-semibold mt-1">
                  <span>{artist.nationality}</span>
                  <span>•</span>
                  <span>{artist.style}</span>
                </div>
              </div>

              <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
                {artist.bio}
              </p>

              <div className="pt-4 mt-auto border-t border-border/40 flex items-center justify-between">
                {/* Socials */}
                <div className="flex items-center space-x-3">
                  {artist.instagram && (
                    <a
                      href={`https://instagram.com/${artist.instagram}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors"
                      title="Instagram Profile"
                    >
                      <Instagram className="h-4 w-4" />
                    </a>
                  )}
                  {artist.website && (
                    <a
                      href={artist.website}
                      target="_blank"
                      rel="noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors"
                      title="Artist Website"
                    >
                      <Globe className="h-4 w-4" />
                    </a>
                  )}
                </div>

                <Link
                  href={`/artists/${artist.slug}`}
                  className="text-xs font-semibold tracking-luxury uppercase text-primary hover:text-primary-light flex items-center transition-colors group"
                >
                  View Profile
                  <ArrowRight className="h-3.5 w-3.5 ml-1.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
