"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, FileText, ExternalLink, Calendar, MapPin, Check, ChevronLeft, ChevronRight } from "lucide-react";
import { ArtistMock, ArtworkMock, ExhibitionMock, EventMock, PublicationMock, mockPress } from "@/lib/mockData";
import { formatDate } from "@/lib/utils";
import EnquiryModal from "@/components/EnquiryModal";

interface HomeClientProps {
  artists: ArtistMock[];
  artworks: ArtworkMock[];
  exhibitions: ExhibitionMock[];
  events: EventMock[];
  publications: PublicationMock[];
}


const testimonials = [
  {
    quote: "“A terrific piece of praise”",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=120&auto=format&fit=crop",
    name: "A. Sharma",
    description: "Art Collector",
    widthClass: "lg:w-[262px]",
  },
  {
    quote: "“A fantastic bit of feedback”",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=120&auto=format&fit=crop",
    name: "R. Koley",
    description: "Gallery Patron",
    widthClass: "lg:w-[317px]",
  },
  {
    quote: "“A genuinely glowing review”",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=120&auto=format&fit=crop",
    name: "S. Jenkins",
    description: "Curator",
    widthClass: "lg:w-[249px]",
  },
  {
    quote: "“A genuinely glowing review”",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=120&auto=format&fit=crop",
    name: "M. Vance",
    description: "Art Critic",
    widthClass: "lg:w-[255px]",
  },
];

export default function HomeClient({
  artists,
  artworks,
  exhibitions,
  events,
  publications,
}: HomeClientProps) {

  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [selectedArtwork, setSelectedArtwork] = useState<ArtworkMock | null>(null);



  // Trigger inquiry modal helper
  const handleOpenGeneralEnquiry = () => {
    // Fallback to first artwork or a placeholder if none exists
    const defaultArtwork = artworks[0] || {
      id: "general",
      title: "General Portfolio Inquiry",
      artistId: "gallery",
    };
    const artist = artists.find(a => a.id === defaultArtwork.artistId);
    setSelectedArtwork({
      ...defaultArtwork,
      artistId: defaultArtwork.artistId,
      title: defaultArtwork.title,
      id: defaultArtwork.id,
      year: "2026",
      medium: "Various",
      subject: "Gallery",
      dimensions: "N/A",
      image: "",
      description: "",
      featured: false,
    });
    setIsEnquiryOpen(true);
  };

  const sliderRef = useRef<HTMLDivElement>(null);

  const handlePrevArtist = () => {
    if (sliderRef.current) {
      const cardWidth = sliderRef.current.firstElementChild?.getBoundingClientRect().width || 400;
      sliderRef.current.scrollBy({
        left: -(cardWidth + 32), // card width + gap
        behavior: "smooth",
      });
    }
  };

  const handleNextArtist = () => {
    if (sliderRef.current) {
      const cardWidth = sliderRef.current.firstElementChild?.getBoundingClientRect().width || 400;
      sliderRef.current.scrollBy({
        left: cardWidth + 32, // card width + gap
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="w-full bg-[#F5F1EA] text-[#000000] overflow-x-hidden font-sans selection:bg-[#5C1414] selection:text-white">
      
      {/* 1. Hero Section */}
      <section className="relative w-full aspect-[16/9] md:max-h-[650px] overflow-hidden bg-[#1B1712]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1552084117-56a987666449?q=80&w=1600"
          alt="Aryan Art Gallery Interior"
          className="w-full h-full object-cover select-none pointer-events-none"
        />
        {/* Dimmer Overlay (very subtle) */}
        <div className="absolute inset-0 bg-black/5 pointer-events-none z-10" />
      </section>

      {/* 2. Exhibitions Section */}
      <section className="w-full py-20 px-6 lg:px-8 max-w-7xl mx-auto flex flex-col space-y-12">
        <div className="border-b border-[#5C1414]/15 pb-4">
          <h2 className="font-average font-normal text-[#5C1414] tracking-[0.07em] uppercase" style={{ fontSize: "35px" }}>
            EXHIBITIONS
          </h2>
        </div>

        {/* 3 cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
          {exhibitions.slice(0, 3).map((exh, index) => (
            <div key={exh.id || index} className="flex flex-col space-y-6 max-w-[405px] w-full mx-auto group">
              {/* Image Container 1:1 Aspect Ratio (405x405px) */}
              <Link 
                href={`/exhibitions/${exh.slug}`} 
                className="w-full aspect-square bg-[#D9D9D9]/50 overflow-hidden relative border border-[#5C1414]/10 rounded shadow-xs"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={exh.banner}
                  alt={exh.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-103"
                />
              </Link>

              {/* Copy Container */}
              <div className="flex flex-col space-y-2">
                <Link 
                  href={`/exhibitions/${exh.slug}`}
                  className="font-sans font-medium text-black hover:text-[#5C1414] transition-colors"
                  style={{ fontSize: "24px", lineHeight: "1.5" }}
                >
                  {exh.title}
                </Link>
                <p 
                  className="font-sans font-normal text-[#828282] line-clamp-3 leading-relaxed" 
                  style={{ fontSize: "16px" }}
                >
                  {exh.description}
                </p>
                <p className="text-xs font-semibold text-[#5C1414]/80 tracking-wide uppercase pt-1">
                  Curated by {exh.curator}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Artists Section */}
      <section className="w-full py-20 px-6 lg:px-8 bg-[#F5F2EB]/50">
        <div className="max-w-7xl mx-auto flex flex-col space-y-12">
          
          <div className="border-b border-[#5C1414]/15 pb-4 flex items-center justify-between">
            <h2 className="font-average font-normal text-[#5D1414] tracking-[0.07em] uppercase" style={{ fontSize: "35px" }}>
              ARTISTS
            </h2>
            <div className="flex items-center space-x-3">
              <button
                onClick={handlePrevArtist}
                className="w-10 h-10 rounded-full border border-[#5C1414]/25 flex items-center justify-center text-[#5C1414] hover:bg-[#5C1414] hover:text-white transition-all cursor-pointer"
                aria-label="Previous artist"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={handleNextArtist}
                className="w-10 h-10 rounded-full border border-[#5C1414]/25 flex items-center justify-center text-[#5C1414] hover:bg-[#5C1414] hover:text-white transition-all cursor-pointer"
                aria-label="Next artist"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="relative w-full">
            <div 
              ref={sliderRef}
              className="flex gap-8 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-4"
            >
              {artists.map((artist) => (
                <div 
                  key={artist.id}
                  className="flex-none w-full sm:w-[calc(50%-16px)] lg:w-[calc(33.333%-21.3px)] snap-start group bg-white border border-[#E6E6E6] hover:border-[#5C1414]/20 hover:shadow-lg transition-all duration-500 rounded-sm overflow-hidden flex flex-col h-[540px]"
                >
                  {/* Photo Container */}
                  <div className="relative h-[280px] w-full overflow-hidden bg-stone-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={artist.image}
                      alt={artist.name}
                      className="w-full h-full object-cover grayscale contrast-[1.15] brightness-[0.95] transition-all duration-700 ease-out group-hover:scale-105 group-hover:brightness-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1B1712]/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>

                  {/* Copy content */}
                  <div className="p-6 flex flex-col flex-1 justify-between">
                    <div className="space-y-3">
                      <div>
                        <span className="text-xs font-semibold tracking-[0.1em] uppercase text-[#B08442]">
                          {artist.nationality}
                        </span>
                        <h3 className="font-sans font-medium text-black group-hover:text-[#5C1414] transition-colors mt-0.5" style={{ fontSize: "22px" }}>
                          {artist.name}
                        </h3>
                      </div>
                      <div className="text-[#828282] font-semibold text-xs uppercase tracking-wide">
                        Style Focus: {artist.style}
                      </div>
                      <p className="font-sans font-normal text-[#828282] leading-relaxed line-clamp-3 text-sm">
                        {artist.bio}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-stone-100 mt-auto flex items-center justify-between">
                      <Link
                        href={`/artists/${artist.slug}`}
                        className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#5C1414] hover:text-[#802222] transition-colors group/btn"
                      >
                        <span>Explore Artist Profile</span>
                        <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* 4. Press and Media Section */}
      <section className="w-full py-20 px-6 lg:px-8 max-w-7xl mx-auto flex flex-col space-y-12">
        <div className="border-b border-[#5C1414]/15 pb-4">
          <h2 className="font-average font-normal text-[#5D1414] tracking-[0.07em] uppercase" style={{ fontSize: "35px" }}>
            PRESS AND MEDIA
          </h2>
        </div>

        {/* 2 cards row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {mockPress.slice(0, 2).map((press, index) => (
            <div key={press.id || index} className="flex flex-col space-y-6 w-full max-w-[624.5px] mx-auto group">
              
              {/* Image Container (624.5 x 341px) */}
              <div className="w-full aspect-[16/9] bg-[#D9D9D9]/50 overflow-hidden relative border border-[#5C1414]/10 rounded shadow-xs">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={index === 0 
                    ? "https://images.unsplash.com/photo-1552084117-56a987666449?q=80&w=800" 
                    : "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=800"
                  }
                  alt={press.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-102"
                />
              </div>

              {/* Copy Container */}
              <div className="flex flex-col space-y-2">
                <h3 className="font-sans font-medium text-black group-hover:text-[#5C1414] transition-colors" style={{ fontSize: "24px", lineHeight: "1.4" }}>
                  {press.title}
                </h3>
                <p className="font-sans font-normal text-[#828282] line-clamp-3 leading-relaxed" style={{ fontSize: "16px" }}>
                  {press.content}
                </p>
                <div className="flex items-center justify-between pt-2 text-xs font-semibold text-[#5C1414] uppercase tracking-wider">
                  <span>Source: {press.source}</span>
                  <span>{formatDate(press.date)}</span>
                </div>
              </div>

            </div>
          ))}
        </div>
      </section>

      {/* 5. Catalogues and Publications Section */}
      <section className="w-full py-20 px-6 lg:px-8 bg-[#E6E2D8]/45 relative">
        <div className="max-w-7xl mx-auto flex flex-col space-y-12">
          
          <div className="border-b border-[#5C1414]/15 pb-4">
            <h2 className="font-average font-normal text-[#5C1414] tracking-[0.07em] uppercase" style={{ fontSize: "35px" }}>
              CATALOGUES AND PUBLICATIONS
            </h2>
          </div>

          {/* Review quotes cards layout */}
          <div className="flex flex-col lg:flex-row flex-wrap gap-8 items-start justify-between">
            {testimonials.map((test, index) => (
              <div 
                key={index}
                className={`w-full ${test.widthClass} min-h-[368px] bg-white border border-[#E6E6E6] rounded-xl p-8 flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow`}
              >
                {/* Quote Text */}
                <p 
                  className="font-sans font-medium text-black leading-relaxed"
                  style={{ fontSize: "24px" }}
                >
                  {test.quote}
                </p>

                {/* Avatar block */}
                <div className="flex items-center gap-4 pt-8">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={test.avatar}
                    alt={test.name}
                    className="w-[45px] h-[45px] rounded-full object-cover border border-[#E6E6E6]"
                  />
                  <div className="flex flex-col">
                    <span className="font-sans font-medium text-black text-base leading-none">
                      {test.name}
                    </span>
                    <span className="font-sans font-medium text-[#828282] text-sm mt-1 leading-none">
                      {test.description}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 6. Inquiry / Quote Section */}
      <section className="w-full py-24 px-6 lg:px-8 bg-transparent flex flex-col items-center justify-center text-center space-y-12 max-w-5xl mx-auto">
        
        {/* Cormorant Quote */}
        <p className="font-serif italic font-normal text-[#B08442] tracking-[0.07em] leading-relaxed max-w-4xl" style={{ fontSize: "29px" }}>
          &ldquo;A painting bought well is a pleasure for season. A painting kept well is an Inheritance.&rdquo;
        </p>

        {/* Enquiry Bordered Box Button */}
        <button
          onClick={handleOpenGeneralEnquiry}
          className="w-full max-w-[406px] h-[50px] flex items-center justify-center border-2 border-[#B08442] bg-transparent hover:bg-[#5C1414] hover:border-[#5C1414] text-[#5C1414] hover:text-white transition-all duration-300 font-sans font-medium text-xl tracking-[0.2em] uppercase cursor-pointer"
        >
          ENQUIRE ABOUT A WORK
        </button>

      </section>

      {/* Enquiry Modal */}
      {selectedArtwork && (
        <EnquiryModal
          isOpen={isEnquiryOpen}
          onClose={() => setIsEnquiryOpen(false)}
          artworkId={selectedArtwork.id}
          artworkTitle={selectedArtwork.title}
          artistName={
            artists.find(a => a.id === selectedArtwork.artistId)?.name || "Aryan Art Gallery"
          }
        />
      )}

    </div>
  );
}
