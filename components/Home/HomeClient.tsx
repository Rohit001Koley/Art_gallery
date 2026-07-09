"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, MapPin, Download, BookOpen, ExternalLink } from "lucide-react";
import { ArtistMock, ArtworkMock, ExhibitionMock, EventMock, PublicationMock } from "@/lib/mockData";
import { formatDate } from "@/lib/utils";

const heroPaintings = [
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

interface HomeClientProps {
  artists: ArtistMock[];
  artworks: ArtworkMock[];
  exhibitions: ExhibitionMock[];
  events: EventMock[];
  publications: PublicationMock[];
}

function SpiralBindingDivider() {
  const rings = Array.from({ length: 42 });

  return (
    <div className="relative w-full h-10 flex items-center justify-between overflow-hidden bg-transparent z-25 pointer-events-none select-none my-[-20px]">
      {/* 3D Page valley fold crease shadow */}
      <div className="absolute inset-x-0 h-6 bg-gradient-to-b from-stone-950/45 via-transparent to-stone-950/45 blur-[1.5px] z-0" />
      
      {/* Central sheet split cut line */}
      <div className="absolute inset-x-0 h-[1.5px] bg-stone-950/70 z-0 border-t border-black/20" />

      <div className="absolute inset-0 flex justify-around px-6 z-10">
        {rings.map((_, idx) => (
          <div key={idx} className="relative w-8 h-12 flex flex-col items-center justify-center">
            {/* Realistic rectangular page-punch slots */}
            <div className="absolute top-1.5 w-2 h-3.5 bg-stone-950 rounded-xs shadow-inner border border-white/5" />
            <div className="absolute bottom-1.5 w-2 h-3.5 bg-stone-950 rounded-xs shadow-inner border border-white/5" />
            
            {/* 3D Cast Shadow on paper under the wire loop */}
            <div 
              className="absolute w-3 h-9 rounded-full bg-black/40 blur-[1px]"
              style={{
                transform: "rotate(-18deg) translate(2.5px, 2px)",
              }}
            />

            {/* Premium 3D Metallic Coil Loop */}
            <div 
              className="absolute w-3 h-9 rounded-full border-[2.5px] border-t-white/95 border-r-stone-300 border-b-stone-600 border-l-stone-100/40 shadow-inner"
              style={{
                background: "linear-gradient(135deg, #f2f2f2 0%, #ffffff 25%, #999999 75%, #4d4d4d 100%)",
                transform: "rotate(-18deg) translateY(-0.5px)",
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function HomeClient({
  artists,
  artworks,
  exhibitions,
  events,
  publications,
}: HomeClientProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [miniGalleryIndex, setMiniGalleryIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroPaintings.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setMiniGalleryIndex((prev) => (prev + 1) % artworks.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [artworks.length]);

  // Animation presets
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-100px" },
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  };

  const stagger = {
    animate: { transition: { staggerChildren: 0.1 } },
  };

  const currentExhibition = exhibitions[0];

  return (
    <div className="flex flex-col w-full overflow-hidden">
      {/* 1. Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center text-white bg-stone-950 overflow-hidden pt-28 pb-16">
        {/* Background Slideshow of Paintings */}
        {heroPaintings.map((painting, index) => (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            key={index}
            src={painting.image}
            alt={painting.title}
            className="absolute inset-0 w-full h-full object-cover pointer-events-none transition-opacity duration-1000 ease-in-out"
            style={{
              opacity: index === currentSlide ? 1.0 : 0,
              transform: index === currentSlide ? "scale(1.02)" : "scale(1.05)",
              transition: "opacity 1000ms ease-in-out, transform 3000ms ease-out",
            }}
          />
        ))}
        {/* Soft dark overlay for color richness and contrast */}
        <div className="absolute inset-0 bg-black/60 z-0" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8 z-10">
          <motion.div
            initial={mounted ? { opacity: 0, y: 20 } : false}
            animate={mounted ? { opacity: 1, y: 0 } : false}
            transition={{ duration: 0.8 }}
            className="space-y-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
          >
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-accent">
              Welcome to Aryan Art Gallery
            </span>
            <div className="w-16 h-[1px] bg-accent mx-auto mt-2" />
          </motion.div>

          <motion.h2
            initial={mounted ? { opacity: 0, y: 20 } : false}
            animate={mounted ? { opacity: 1, y: 0 } : false}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-3xl sm:text-5xl md:text-7xl font-serif italic font-light tracking-[0.02em] leading-tight max-w-4xl mx-auto text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)]"
          >
            &ldquo;A painting bought well is a pleasure for season.&rdquo;
          </motion.h2>

          <motion.div
            initial={mounted ? { opacity: 0, y: 20 } : false}
            animate={mounted ? { opacity: 1, y: 0 } : false}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6"
          >
            <a
              href="#collection"
              className="w-full sm:w-auto px-8 py-4 bg-primary text-primary-foreground hover:bg-primary/95 text-xs font-semibold uppercase tracking-luxury rounded-sm shadow-lg transition-all duration-300"
            >
              Explore Collection
            </a>
            {currentExhibition && (
              <Link
                href={`/exhibitions/${currentExhibition.slug}`}
                className="w-full sm:w-auto px-8 py-4 border border-white hover:bg-white hover:text-stone-900 text-white text-xs font-semibold uppercase tracking-luxury rounded-sm transition-all duration-300 backdrop-blur-xs"
              >
                Current Exhibition
              </Link>
            )}
          </motion.div>

          {/* Active slide metadata label display */}
          <motion.div
            initial={mounted ? { opacity: 0 } : false}
            animate={mounted ? { opacity: 0.85 } : false}
            transition={{ delay: 0.6 }}
            className="pt-6 text-[10px] sm:text-xs uppercase tracking-[0.15em] text-stone-200 font-medium drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]"
          >
            Currently Showing: <span className="text-white font-semibold">{heroPaintings[currentSlide].title}</span> by {heroPaintings[currentSlide].artist} ({heroPaintings[currentSlide].year})
          </motion.div>
        </div>
      </section>

      <SpiralBindingDivider />

      {/* Gallery Highlights & Featured Collection Unified Background Wrapper */}
      <div className="relative overflow-hidden border-b border-border/40">
        {/* Unified Painting Background Image */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1579783928621-7a13d66a62d1?q=80&w=1600"
          alt="Background Landscape Painting"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none z-0"
        />
        {/* Dark blackish overlay spanning both blocks */}
        <div className="absolute inset-0 bg-black/45 dark:bg-black/65 pointer-events-none z-0" />

        {/* 2. Gallery Highlights (Philosophy) */}
        <section className="relative py-24 bg-transparent z-10">
          <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
            <motion.span {...fadeInUp} className="inline-block px-4 py-1.5 bg-[#6b1d2f] dark:bg-[#d97706] text-white dark:text-black text-xs font-extrabold uppercase tracking-[0.2em] rounded-full shadow-md mb-2">
              Curatorial Statement
            </motion.span>
            <motion.h3
              {...fadeInUp}
              className="text-3xl sm:text-4xl font-serif tracking-luxury font-bold text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)] mt-1"
            >
              Preserving History, Inspiring Identity
            </motion.h3>
            <motion.p
              {...fadeInUp}
              className="text-stone-200 font-sans leading-relaxed text-base max-w-2xl mx-auto drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]"
            >
              Aryan Art Gallery showcases contemporary masterworks that bridge classical technique with modern abstraction.
              We represent a curated roster of international artists who challenge visual limits and redefine spatial depth.
              Our museum-inspired halls offer collectors and enthusiasts a sanctuary for quiet artistic reflection.
            </motion.p>
          </div>
        </section>

        {/* 3. Featured Artworks Grid */}
        <section id="collection" className="relative py-24 border-t border-border/40 bg-transparent z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-baseline justify-between mb-12 border-b border-border pb-6">
              <div>
                <span className="inline-block px-4 py-1.5 bg-[#6b1d2f] dark:bg-[#d97706] text-white dark:text-black text-xs font-extrabold uppercase tracking-[0.2em] rounded-full shadow-md mb-2">Featured Selection</span>
                <h3 className="text-3xl font-serif tracking-luxury font-bold text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)] mt-2">
                  Acquisition Collection
                </h3>
              </div>
              <Link
                href="/artists"
                className="text-xs font-semibold tracking-luxury uppercase text-primary hover:text-primary-light flex items-center mt-4 md:mt-0 transition-colors group border-b border-primary/20 pb-0.5"
              >
                View All Artworks
                <ArrowRight className="h-3.5 w-3.5 ml-2 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            <motion.div
              variants={stagger}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {artworks.slice(0, 3).map((work) => {
                const artist = artists.find((a) => a.id === work.artistId);
                return (
                  <motion.div
                    key={work.id}
                    variants={fadeInUp}
                    className="group relative bg-[#161413]/90 dark:bg-[#161413]/90 border border-stone-800/80 overflow-hidden rounded-sm flex flex-col h-full shadow-lg hover:shadow-xl transition-all duration-300 text-white"
                  >
                    <Link href={`/artworks/${work.id}`} className="relative block aspect-[4/3] overflow-hidden bg-stone-900 border-b border-stone-800">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={work.image}
                        alt={work.title}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                      {work.price && (
                        <div className="absolute top-4 right-4 bg-stone-950/90 backdrop-blur-xs text-amber-500 text-xs font-semibold px-2.5 py-1 uppercase tracking-wider border border-stone-800">
                          {work.price}
                        </div>
                      )}
                    </Link>

                    <div className="p-6 flex flex-col flex-grow space-y-2">
                      <div>
                        <Link
                          href={`/artworks/${work.id}`}
                          className="text-lg font-serif font-bold text-white hover:text-amber-400 transition-colors block"
                        >
                          {work.title}
                        </Link>
                        {artist && (
                          <Link
                            href={`/artists/${artist.slug}`}
                            className="text-xs text-stone-400 hover:text-amber-400 transition-colors block mt-0.5"
                          >
                            by {artist.name}
                          </Link>
                        )}
                      </div>
                      <p className="text-xs text-stone-300 font-sans line-clamp-2 mt-2 leading-relaxed">
                        {work.description}
                      </p>
                      <div className="pt-4 mt-auto border-t border-stone-800/60 flex items-center justify-between text-xs text-stone-400">
                        <span>{work.medium}</span>
                        <span>{work.year}</span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>
      </div>

      <SpiralBindingDivider />

      {/* 3.5 Mini Gallery Walk Carousel */}
      <section className="relative py-24 bg-stone-950 text-white overflow-hidden border-t border-border/20">
        {/* Subtle Carbon Canvas Texture watermark */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-[0.03] pointer-events-none mix-blend-overlay z-0"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1549887534-1541e9326642?q=80&w=1200')",
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-2 mb-16">
            <span className="text-xs font-semibold uppercase tracking-luxury text-accent">Virtual Spotlight</span>
            <h3 className="text-3xl sm:text-4xl font-serif tracking-luxury font-light text-white">
              The Mini Gallery Walk
            </h3>
            <p className="text-xs text-stone-400 font-sans tracking-luxury uppercase">
              Current Masterworks on Rotation
            </p>
            <div className="w-12 h-[1px] bg-accent mx-auto mt-3" />
          </div>

          {artworks.length > 0 && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Left Column: Image with crossfade transition */}
              <div className="lg:col-span-7 flex justify-center">
                <div className="relative w-full aspect-[4/3] max-w-2xl bg-stone-900 border border-stone-800 p-4 rounded shadow-2xl flex items-center justify-center overflow-hidden group">
                  {artworks.map((work, idx) => (
                    <div
                      key={work.id}
                      className="absolute inset-4 transition-opacity duration-1000 ease-in-out flex items-center justify-center bg-stone-900"
                      style={{
                        opacity: idx === miniGalleryIndex ? 1 : 0,
                        zIndex: idx === miniGalleryIndex ? 1 : 0,
                      }}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={work.image}
                        alt={work.title}
                        className="max-w-full max-h-full object-contain shadow-md rounded-xs border border-stone-800 transition-transform duration-700 ease-out group-hover:scale-103"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Text Metadata Info with slide transition */}
              <div className="lg:col-span-5 space-y-6 flex flex-col justify-center min-h-[300px]">
                {artworks.map((work, idx) => {
                  if (idx !== miniGalleryIndex) return null;
                  const artist = artists.find((a) => a.id === work.artistId);
                  return (
                    <motion.div
                      key={work.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.5 }}
                      className="space-y-6"
                    >
                      <div className="space-y-2">
                        <span className="text-xs font-semibold text-accent uppercase tracking-widest">
                          {work.medium}
                        </span>
                        <h4 className="text-3xl font-serif font-light text-white leading-tight">
                          {work.title}
                        </h4>
                        {artist && (
                          <Link
                            href={`/artists/${artist.slug}`}
                            className="text-sm text-stone-400 hover:text-accent transition-colors font-medium inline-block"
                          >
                            by {artist.name}
                          </Link>
                        )}
                      </div>

                      <p className="text-sm text-stone-300 leading-relaxed font-sans min-h-[70px]">
                        {work.description}
                      </p>

                      <div className="border-t border-stone-800 pt-4 grid grid-cols-2 gap-4 text-xs font-sans text-stone-400 uppercase tracking-wider">
                        <div>
                          <p className="text-[10px] text-stone-500 font-semibold">Dimensions</p>
                          <p className="text-stone-200 mt-1">{work.dimensions}</p>
                        </div>
                        <div>
                          <p className="text-[10px] text-stone-500 font-semibold">Year Created</p>
                          <p className="text-stone-200 mt-1">{work.year}</p>
                        </div>
                      </div>

                      <div className="pt-4 flex items-center justify-between border-t border-stone-800">
                        {work.price && (
                          <div>
                            <span className="text-[10px] text-stone-500 uppercase tracking-widest font-semibold block">Est. Value</span>
                            <span className="text-xl font-serif text-accent font-semibold">{work.price}</span>
                          </div>
                        )}
                        <Link
                          href={`/artworks/${work.id}`}
                          className="px-5 py-2.5 bg-primary hover:bg-primary/95 text-white font-semibold text-xs uppercase tracking-luxury rounded-sm transition-all"
                        >
                          View Artwork Details
                        </Link>
                      </div>
                    </motion.div>
                  );
                })}

                {/* Slideshow Selector Dots */}
                <div className="flex space-x-2 pt-6">
                  {artworks.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setMiniGalleryIndex(idx)}
                      className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                        idx === miniGalleryIndex ? "w-6 bg-accent" : "w-1.5 bg-stone-700 hover:bg-stone-500"
                      }`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <SpiralBindingDivider />

      {/* 4. Exhibitions Banner Banner */}
      {currentExhibition && (
        <section className="relative py-24 border-y border-border overflow-hidden">
          {/* Abstract Ink/Fine Art Background Painting */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1547891654-e66ed7edd96c?q=80&w=1600"
            alt="Exhibition Background Painting"
            className="absolute inset-0 w-full h-full object-cover pointer-events-none z-0"
          />
          {/* Dark blackish overlay inside this section for text contrast */}
          <div className="absolute inset-0 bg-black/45 dark:bg-black/65 pointer-events-none z-0" />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={mounted ? { opacity: 0, x: -30 } : false}
                animate={mounted ? { opacity: 1, x: 0 } : false}
                transition={{ duration: 0.6 }}
                className="aspect-[16/10] overflow-hidden rounded-sm border border-stone-800 shadow-lg bg-stone-900"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={currentExhibition.banner}
                  alt={currentExhibition.title}
                  className="w-full h-full object-cover hover:scale-102 transition-transform duration-500"
                />
              </motion.div>
              <motion.div
                initial={mounted ? { opacity: 0, x: 30 } : false}
                animate={mounted ? { opacity: 1, x: 0 } : false}
                transition={{ duration: 0.6 }}
                className="space-y-6"
              >
                <div className="space-y-1">
                  <span className="inline-block px-4 py-1.5 bg-[#6b1d2f] dark:bg-[#d97706] text-white dark:text-black text-xs font-extrabold uppercase tracking-[0.2em] rounded-full shadow-md mb-2">
                    Current Exhibition
                  </span>
                  <h3 className="text-3xl font-serif tracking-luxury font-bold text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
                    {currentExhibition.title}
                  </h3>
                  <div className="flex items-center text-xs text-stone-300 mt-2 space-x-4">
                    <span className="flex items-center">
                      <Calendar className="h-3.5 w-3.5 mr-1.5 text-amber-500" />
                      {formatDate(currentExhibition.startDate)} &ndash; {formatDate(currentExhibition.endDate)}
                    </span>
                    <span>•</span>
                    <span>Curated by {currentExhibition.curator}</span>
                  </div>
                </div>
                <p className="text-sm text-stone-200 leading-relaxed leading-7 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                  {currentExhibition.description}
                </p>
                <div className="pt-4 flex space-x-4">
                  <Link
                    href={`/exhibitions/${currentExhibition.slug}`}
                    className="px-6 py-3 bg-amber-500 text-black hover:bg-amber-600 text-xs font-semibold uppercase tracking-luxury rounded-sm transition-all shadow-md"
                  >
                    View Exhibition Details
                  </Link>
                  <Link
                    href="/exhibitions"
                    className="px-6 py-3 border border-stone-700 hover:bg-white/10 text-stone-200 hover:text-white text-xs font-semibold uppercase tracking-luxury rounded-sm transition-all"
                  >
                    All Exhibitions
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      )}

      <SpiralBindingDivider />

      {/* 5. Featured Artists Section */}
      <section className="relative py-24 border-t border-border overflow-hidden">
        {/* Classical Portrait Painting Background Texture (Girl Painting) */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=1600"
          alt="Background Portrait Painting"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none z-0"
        />
        {/* Dark blackish overlay inside this section for text contrast */}
        <div className="absolute inset-0 bg-black/45 dark:bg-black/65 pointer-events-none z-0" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-2 mb-16">
            <span className="inline-block px-4 py-1.5 bg-[#6b1d2f] dark:bg-[#d97706] text-white dark:text-black text-xs font-extrabold uppercase tracking-[0.2em] rounded-full shadow-md mb-2">
              Roster of Masters
            </span>
            <h3 className="text-3xl sm:text-4xl font-serif tracking-luxury font-bold text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)] mt-1">
              Featured Gallery Artists
            </h3>
            <div className="w-16 h-[1.5px] bg-amber-500 mx-auto mt-3 shadow-sm" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {artists.slice(0, 4).map((artist) => (
              <Link
                key={artist.id}
                href={`/artists/${artist.slug}`}
                className="group flex flex-col items-center text-center space-y-4"
              >
                <div className="relative w-48 h-48 rounded-full overflow-hidden border border-border bg-muted shadow-sm transition-all duration-500 group-hover:scale-105 group-hover:shadow-md">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={artist.image}
                    alt={artist.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="space-y-1 bg-[#161413]/90 dark:bg-[#161413]/90 border border-stone-800/80 px-4 py-2.5 rounded shadow-lg backdrop-blur-xs text-white max-w-[200px]">
                  <h4 className="font-serif font-bold text-base text-white group-hover:text-amber-400 transition-colors">
                    {artist.name}
                  </h4>
                  <p className="text-[10px] text-stone-300 font-semibold uppercase tracking-wider">
                    {artist.nationality}
                  </p>
                  <p className="text-xs text-amber-500 font-medium tracking-wide">
                    {artist.style}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <SpiralBindingDivider />

      {/* 6. Upcoming Events & Publications Grid */}
      <section className="relative py-24 border-t border-border overflow-hidden">
        {/* Wave Oil Painting Background Texture */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=1600"
          alt="Background Wave Painting"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none z-0"
        />
        {/* Dark blackish overlay inside this section for text contrast */}
        <div className="absolute inset-0 bg-black/45 dark:bg-black/65 pointer-events-none z-0" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Events Column */}
            <div className="space-y-8">
              <div className="border-b border-border/40 pb-4 flex justify-between items-baseline">
                <h3 className="text-2xl font-serif tracking-luxury font-bold text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
                  Calendar Events
                </h3>
                <Link
                  href="/events"
                  className="text-xs uppercase tracking-luxury font-extrabold text-amber-500 hover:text-amber-400 drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)] transition-colors"
                >
                  Full Calendar
                </Link>
              </div>

              <div className="space-y-6">
                {events.slice(0, 2).map((ev) => (
                  <div
                    key={ev.id}
                    className="flex bg-[#161413]/90 border border-stone-800/80 p-5 rounded-sm hover:shadow-md transition-all flex-col sm:flex-row gap-4 text-white shadow-lg"
                  >
                    {ev.image && (
                      <div className="w-full sm:w-28 aspect-[4/3] sm:aspect-square overflow-hidden rounded bg-stone-900 border border-stone-800 flex-shrink-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={ev.image}
                          alt={ev.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="space-y-2 flex-grow">
                      <div className="flex items-center text-xs text-amber-500 font-semibold space-x-2">
                        <Calendar className="h-3.5 w-3.5" />
                        <span>{formatDate(ev.eventDate)}</span>
                      </div>
                      <h4 className="font-serif font-bold text-white text-base">
                        {ev.title}
                      </h4>
                      <p className="text-xs text-stone-300 line-clamp-2">
                        {ev.description}
                      </p>
                      <div className="flex items-center text-xs text-stone-400 pt-1 space-x-2">
                        <MapPin className="h-3.5 w-3.5 text-amber-500" />
                        <span className="truncate">{ev.location}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Publications Column */}
            <div className="space-y-8">
              <div className="border-b border-border/40 pb-4 flex justify-between items-baseline">
                <h3 className="text-2xl font-serif tracking-luxury font-bold text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
                  Publications
                </h3>
                <Link
                  href="/publications"
                  className="text-xs uppercase tracking-luxury font-extrabold text-amber-500 hover:text-amber-400 drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)] transition-colors"
                >
                  All Catalogs
                </Link>
              </div>

              <div className="space-y-6">
                {publications.slice(0, 2).map((pub) => (
                  <div
                    key={pub.id}
                    className="flex bg-[#161413]/90 border border-stone-800/80 p-5 rounded-sm hover:shadow-md transition-all gap-5 text-white shadow-lg"
                  >
                    <div className="w-16 h-22 overflow-hidden border border-stone-800 rounded-sm shadow-sm bg-stone-900 flex-shrink-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={pub.coverImage}
                        alt={pub.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="space-y-2 flex-grow flex flex-col">
                      <div>
                        <h4 className="font-serif font-bold text-white text-sm">
                          {pub.title}
                        </h4>
                        <p className="text-xs text-stone-400 mt-0.5">Catalog ({pub.year})</p>
                      </div>
                      {pub.description && (
                        <p className="text-xs text-stone-300 line-clamp-2 leading-relaxed">
                          {pub.description}
                        </p>
                      )}
                      <a
                        href={pub.pdf}
                        download
                        className="mt-auto pt-2 inline-flex items-center text-xs font-semibold text-amber-500 hover:text-amber-400 uppercase tracking-luxury"
                      >
                        <Download className="h-3.5 w-3.5 mr-1.5" />
                        Download PDF
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
