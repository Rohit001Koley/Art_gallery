"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, FileText, ExternalLink, Calendar, MapPin, Check } from "lucide-react";
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

const heroSlides = [
  {
    image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=1600",
    title: "Portrait of a Golden Shadow",
    artist: "Alexandre Dubois",
    year: "2025",
  },
  {
    image: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=1600",
    title: "The Silent Canopy",
    artist: "Elena Rostova",
    year: "2024",
  },
  {
    image: "https://images.unsplash.com/photo-1579783928621-7a13d66a62d1?q=80&w=1600",
    title: "Echoes of the River",
    artist: "Sofia Chen",
    year: "2025",
  },
];

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
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [selectedArtwork, setSelectedArtwork] = useState<ArtworkMock | null>(null);

  // Auto-scroll hero slideshow every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHeroIndex((prev) => (prev + 1) % heroSlides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

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

  const currentArtist = artists[0] || {
    name: "Alexandre Dubois",
    nationality: "French",
    style: "Neo-Classical Surrealism",
    bio: "Alexandre Dubois is a French neo-classical painter who merges traditional 18th-century portraiture techniques with contemporary surrealist elements.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400",
  };

  return (
    <div className="w-full bg-[#F5F1EA] text-[#000000] overflow-x-hidden font-sans selection:bg-[#5C1414] selection:text-white">
      
      {/* 1. Hero Section */}
      <section 
        className="relative w-full overflow-hidden bg-[#1B1712]"
        style={{ 
          height: "calc(100vh - 104px)",
          opacity: 1,
          transform: "rotate(0deg)"
        }}
      >
        {/* Background Slideshow */}
        {heroSlides.map((slide, idx) => (
          <div
            key={idx}
            className="absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out"
            style={{ opacity: idx === currentHeroIndex ? 1 : 0 }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover select-none pointer-events-none transform scale-102 transition-transform duration-4000 ease-out"
              style={{
                transform: idx === currentHeroIndex ? "scale(1)" : "scale(1.05)",
              }}
            />
          </div>
        ))}
        
        {/* Dimmer Overlay (rgba(0, 0, 0, 0.15)) */}
        <div className="absolute inset-0 bg-black/15 pointer-events-none z-10" />

        {/* Text Details overlay */}
        <div className="absolute bottom-12 left-6 md:left-16 z-20 text-white max-w-xl p-6 bg-black/35 backdrop-blur-xs border border-white/10 rounded-sm">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#B08442]">
            Featured Acquisition
          </span>
          <h2 className="text-2xl md:text-4xl font-serif font-semibold mt-1">
            {heroSlides[currentHeroIndex].title}
          </h2>
          <p className="text-sm text-stone-300 mt-1">
            by {heroSlides[currentHeroIndex].artist} ({heroSlides[currentHeroIndex].year})
          </p>
        </div>
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
          
          <div className="border-b border-[#5C1414]/15 pb-4">
            <h2 className="font-average font-normal text-[#5D1414] tracking-[0.07em] uppercase" style={{ fontSize: "35px" }}>
              ARTISTS
            </h2>
          </div>

          {/* Split Panel Layout (top 1843px, height 704px) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-stretch bg-white border border-stone-200/60 rounded shadow-md overflow-hidden min-h-[704px]">
            
            {/* Left Image (704x704px on large viewports) */}
            <div className="lg:col-span-6 relative bg-stone-100 min-h-[400px] lg:min-h-full">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={currentArtist.image}
                alt={currentArtist.name}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>

            {/* Right text details (width 516px space) */}
            <div className="lg:col-span-6 flex flex-col justify-center px-8 py-12 md:px-12 lg:px-16 space-y-12">
              
              {/* Block 1 */}
              <div className="flex flex-col space-y-2">
                <h3 className="font-sans font-medium text-black" style={{ fontSize: "24px" }}>
                  {currentArtist.name}
                </h3>
                <p className="font-sans font-normal text-[#828282] leading-relaxed" style={{ fontSize: "16px" }}>
                  Representing premium international mastery. Nationality: {currentArtist.nationality}. Style focus: {currentArtist.style}.
                </p>
              </div>

              {/* Block 2 */}
              <div className="flex flex-col space-y-2">
                <h3 className="font-sans font-medium text-black" style={{ fontSize: "24px" }}>
                  Curator&apos;s Review
                </h3>
                <p className="font-sans font-normal text-[#828282] leading-relaxed" style={{ fontSize: "16px" }}>
                  {currentArtist.bio}
                </p>
              </div>

              {/* Block 3 */}
              <div className="flex flex-col space-y-2">
                <h3 className="font-sans font-medium text-black" style={{ fontSize: "24px" }}>
                  Featured Galleries & Exhibitions
                </h3>
                <p className="font-sans font-normal text-[#828282] leading-relaxed" style={{ fontSize: "16px" }}>
                  Our curated roster of artists challenge visual limits and redefine spatial depth, offering collectors a sanctuary for quiet artistic reflection and long-term inheritance.
                </p>
              </div>

              <div className="pt-4">
                <Link
                  href={`/artists/${currentArtist.slug}`}
                  className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-[#5C1414] hover:text-[#802222] transition-colors border-b border-[#5C1414]/30 pb-1"
                >
                  <span>Explore Artist Profile</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

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
