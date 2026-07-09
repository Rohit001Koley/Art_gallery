"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, MessageSquare, Info, ShieldCheck, Truck, Scale } from "lucide-react";
import ImageZoom from "../ImageZoom";
import EnquiryModal from "../EnquiryModal";
import { ArtistMock, ArtworkMock } from "@/lib/mockData";

interface ArtworkDetailClientProps {
  artwork: ArtworkMock;
  artist: ArtistMock | null;
}

export default function ArtworkDetailClient({ artwork, artist }: ArtworkDetailClientProps) {
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 font-sans">
      {/* Back button */}
      <Link
        href={artist ? `/artists/${artist.slug}` : "/artists"}
        className="inline-flex items-center text-xs font-semibold uppercase tracking-luxury text-muted-foreground hover:text-primary transition-colors mb-12"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to {artist ? `${artist.name} Collection` : "Artists"}
      </Link>

      {/* Detail Showcase Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
        {/* Left Column: Image Zoom Viewer */}
        <div className="lg:col-span-7 w-full shadow-md rounded overflow-hidden">
          <ImageZoom
            src={artwork.image}
            alt={artwork.title}
            className="aspect-[4/3] w-full"
          />
        </div>

        {/* Right Column: Work Details Specification Sheet */}
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-3 border-b border-border pb-6">
            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-foreground leading-tight">
              {artwork.title}
            </h1>
            {artist ? (
              <Link
                href={`/artists/${artist.slug}`}
                className="text-lg font-serif font-semibold text-primary hover:text-primary-light transition-colors mt-0.5 inline-block"
              >
                by {artist.name}
              </Link>
            ) : (
              <p className="text-sm text-muted-foreground mt-0.5">Unknown Artist</p>
            )}

            {artwork.price && (
              <div className="text-2xl font-serif text-foreground font-bold mt-2">
                {artwork.price}
              </div>
            )}
          </div>

          {/* Core Specs Grid */}
          <div className="grid grid-cols-2 gap-4 text-sm py-2 border-b border-border/60">
            <div>
              <p className="text-xs uppercase font-semibold text-muted-foreground tracking-wider">Medium</p>
              <p className="font-semibold text-foreground mt-0.5">{artwork.medium}</p>
            </div>
            <div>
              <p className="text-xs uppercase font-semibold text-muted-foreground tracking-wider">Year Created</p>
              <p className="font-semibold text-foreground mt-0.5">{artwork.year}</p>
            </div>
            <div className="mt-2">
              <p className="text-xs uppercase font-semibold text-muted-foreground tracking-wider">Dimensions</p>
              <p className="font-semibold text-foreground mt-0.5">{artwork.dimensions}</p>
            </div>
            <div className="mt-2">
              <p className="text-xs uppercase font-semibold text-muted-foreground tracking-wider">Subject Classification</p>
              <p className="font-semibold text-foreground mt-0.5">{artwork.subject}</p>
            </div>
          </div>

          {/* Description text */}
          <div className="space-y-2">
            <h3 className="text-xs font-semibold uppercase tracking-luxury text-primary flex items-center">
              <Info className="h-4 w-4 mr-1.5" />
              Description &amp; Context
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed leading-6">
              {artwork.description}
            </p>
          </div>

          {/* Enquiry Button CTA */}
          <button
            onClick={() => setIsEnquiryOpen(true)}
            className="w-full flex items-center justify-center py-4 bg-primary text-primary-foreground hover:bg-primary/95 text-xs font-semibold uppercase tracking-luxury rounded-sm transition-all duration-300 shadow-md cursor-pointer"
          >
            <MessageSquare className="h-4 w-4 mr-2" />
            Enquiry About This Work
          </button>

          {/* Trust points card */}
          <div className="p-4 border border-border rounded bg-stone-50 dark:bg-stone-900/10 text-xs text-muted-foreground space-y-2">
            <div className="flex items-center">
              <ShieldCheck className="h-4 w-4 text-emerald-500 mr-2.5 flex-shrink-0" />
              <span>Certificate of authenticity signed by {artist?.name || "the artist"}.</span>
            </div>
            <div className="flex items-center">
              <Truck className="h-4 w-4 text-primary mr-2.5 flex-shrink-0" />
              <span>Worldwide museum-grade insured shipping options available.</span>
            </div>
            <div className="flex items-center">
              <Scale className="h-4 w-4 text-primary mr-2.5 flex-shrink-0" />
              <span>Secure acquisition processes. Condition reports provided.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Enquiry Modal sheet */}
      <EnquiryModal
        isOpen={isEnquiryOpen}
        onClose={() => setIsEnquiryOpen(false)}
        artworkId={artwork.id}
        artworkTitle={artwork.title}
        artistName={artist?.name || "Unknown Artist"}
      />
    </div>
  );
}
