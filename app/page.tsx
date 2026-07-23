"use client";

import { useState, useRef } from "react";
import { Facebook, Linkedin, Youtube, Instagram, Search, Menu as MenuIcon, ChevronLeft, ChevronRight, Calendar, Clock, MapPin } from "lucide-react";

const galleryImage = "/gallery-banner.jpg";
const portraitImage =
  "https://images.pexels.com/photos/6669746/pexels-photo-6669746.jpeg?auto=compress&cs=tinysrgb&w=900";
const exhibitionImage =
  "https://images.pexels.com/photos/11000394/pexels-photo-11000394.jpeg?auto=compress&cs=tinysrgb&w=1200";

const sampleArtists = [
  { name: "Riyas Komu", category: "artists" },
  { name: "Jitish Kallat", category: "artists" },
  { name: "Atul Dodiya", category: "artists" },
  { name: "Vivan Sundaram", category: "artists" },
  { name: "M.F. Husain", category: "artists" },
  { name: "S.H. Raza", category: "artists" },
  { name: "F.N. Souza", category: "artists" },
  { name: "Tyeb Mehta", category: "artists" },
  { name: "Jamini Roy", category: "artists" },
];

const samplePaintings = [
  { title: "Untitled (Horse & Figure)", artist: "M.F. Husain", category: "paintings" },
  { title: "Bindu Series (Saurashtra)", artist: "S.H. Raza", category: "paintings" },
  { title: "Head of a Man", artist: "F.N. Souza", category: "paintings" },
  { title: "Diagonal Series", artist: "Tyeb Mehta", category: "paintings" },
  { title: "Three Pujarins", artist: "Jamini Roy", category: "paintings" },
  { title: "Metamorphosis", artist: "Riyas Komu", category: "paintings" },
  { title: "Autobiography", artist: "Atul Dodiya", category: "paintings" },
];

const artistProfiles = [
  {
    name: "Riyas Komu",
    image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    name: "Jitish Kallat",
    image: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    name: "Atul Dodiya",
    image: "https://images.pexels.com/photos/3777943/pexels-photo-3777943.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    name: "Vivan Sundaram",
    image: "https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    name: "M.F. Husain",
    image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    name: "S.H. Raza",
    image: "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    name: "F.N. Souza",
    image: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    name: "Tyeb Mehta",
    image: "https://images.pexels.com/photos/837358/pexels-photo-837358.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    name: "Jamini Roy",
    image: "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    name: "Amrita Sher-Gil",
    image: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
];

const exhibitionProfiles = [
  {
    title: "A Sense of Place",
    subtitle: "Modern Masters of India",
    date: "12 Oct – 15 Nov 2026",
    image: "https://images.pexels.com/photos/11000394/pexels-photo-11000394.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
  {
    title: "Dreams in Transit",
    subtitle: "Contemporary Explorations",
    date: "01 Dec – 20 Jan 2027",
    image: "https://images.pexels.com/photos/1839919/pexels-photo-1839919.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
  {
    title: "Lines of Flight",
    subtitle: "Sculpture & Form",
    date: "10 Feb – 28 Mar 2027",
    image: "https://images.pexels.com/photos/1570779/pexels-photo-1570779.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
  {
    title: "Echoes of Silence",
    subtitle: "Retrospective in Oil & Canvas",
    date: "05 Apr – 18 May 2027",
    image: "https://images.pexels.com/photos/164455/pexels-photo-164455.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
  {
    title: "Visions of Geometry",
    subtitle: "Abstract Traditions",
    date: "01 Jun – 15 Jul 2027",
    image: "https://images.pexels.com/photos/288100/pexels-photo-288100.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
  {
    title: "The Golden Horizon",
    subtitle: "Indian Heritage Art",
    date: "01 Aug – 30 Sep 2027",
    image: "https://images.pexels.com/photos/1269968/pexels-photo-1269968.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
];

const eventProfiles = [
  {
    id: 1,
    title: "Indian Modernism: Memory & Form",
    category: "PANEL DISCUSSION",
    date: "18 Nov 2026",
    time: "5:30 PM – 7:30 PM",
    location: "Main Gallery, New Delhi",
    image: "https://images.pexels.com/photos/2833389/pexels-photo-2833389.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: "An engaging panel discussion with leading art historians and curators exploring post-independence Indian modern art movements.",
  },
  {
    id: 2,
    title: "VIP Preview: Masters of Canvas",
    category: "GALLERY PREVIEW",
    date: "25 Nov 2026",
    time: "6:00 PM – 9:00 PM",
    location: "South Wing, Aryan Gallery",
    image: "https://images.pexels.com/photos/1579708/pexels-photo-1579708.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: "An exclusive opening reception featuring private viewing of rare works by S.H. Raza and Tyeb Mehta with live classical music.",
  },
  {
    id: 3,
    title: "Pigment & Parchment Masterclass",
    category: "WORKSHOP",
    date: "05 Dec 2026",
    time: "11:00 AM – 2:00 PM",
    location: "Atelier Studio",
    image: "https://images.pexels.com/photos/102127/pexels-photo-102127.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: "Hands-on studio masterclass on traditional natural pigments, tempera preparation, and canvas priming led by senior conservators.",
  },
  {
    id: 4,
    title: "Monograph Launch & Walkthrough",
    category: "BOOK RELEASE",
    date: "12 Dec 2026",
    time: "4:00 PM – 6:00 PM",
    location: "Main Gallery Hall",
    image: "https://images.pexels.com/photos/20967/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=800",
    description: "Release of the new retrospective publication 'Lines of Flight', followed by a guided exhibition tour by the author.",
  },
  {
    id: 5,
    title: "South Asian Art Market Trends",
    category: "COLLECTOR ROUNDTABLE",
    date: "15 Jan 2027",
    time: "5:00 PM – 7:00 PM",
    location: "Executive Salon",
    image: "https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: "Insightful roundtable for emerging and seasoned collectors on provenance, authentication, and market dynamics in modern Indian art.",
  },
];

const artists = artistProfiles.map((a) => a.name);

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);

  const artistScrollRef = useRef<HTMLDivElement>(null);
  const exhibitionScrollRef = useRef<HTMLDivElement>(null);
  const eventScrollRef = useRef<HTMLDivElement>(null);

  const scrollArtistLeft = () => {
    if (artistScrollRef.current) {
      artistScrollRef.current.scrollBy({
        left: -artistScrollRef.current.clientWidth,
        behavior: "smooth",
      });
    }
  };

  const scrollArtistRight = () => {
    if (artistScrollRef.current) {
      artistScrollRef.current.scrollBy({
        left: artistScrollRef.current.clientWidth,
        behavior: "smooth",
      });
    }
  };

  const scrollExhibitionLeft = () => {
    if (exhibitionScrollRef.current) {
      exhibitionScrollRef.current.scrollBy({
        left: -exhibitionScrollRef.current.clientWidth,
        behavior: "smooth",
      });
    }
  };

  const scrollExhibitionRight = () => {
    if (exhibitionScrollRef.current) {
      exhibitionScrollRef.current.scrollBy({
        left: exhibitionScrollRef.current.clientWidth,
        behavior: "smooth",
      });
    }
  };

  const scrollEventLeft = () => {
    if (eventScrollRef.current) {
      eventScrollRef.current.scrollBy({
        left: -eventScrollRef.current.clientWidth,
        behavior: "smooth",
      });
    }
  };

  const scrollEventRight = () => {
    if (eventScrollRef.current) {
      eventScrollRef.current.scrollBy({
        left: eventScrollRef.current.clientWidth,
        behavior: "smooth",
      });
    }
  };

  const filteredArtists = sampleArtists.filter((a) =>
    a.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const filteredPaintings = samplePaintings.filter(
    (p) =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.artist.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="overflow-hidden bg-white text-gallery-ink">
      <header className="fixed inset-x-0 top-0 z-40 flex h-[72px] items-center gap-2 border-b border-gallery-wine/10 bg-[#F5F2EB] px-2 sm:gap-3 sm:px-3 md:h-[92px] md:px-4 lg:px-6">
        <a href="#top" className="min-w-0 flex-1 overflow-hidden leading-none" aria-label="Aryan Art Gallery home">
          <span className="inline-flex max-w-full items-baseline whitespace-nowrap font-wordmark text-[clamp(15px,4.8vw,26px)] font-medium tracking-[-0.045em] text-gallery-wine md:text-[32px]">
            <span className="text-[1.35em] align-baseline leading-none">A</span><span className="align-baseline">RYAN</span>
            <span className="mx-[0.25em]"></span>
            <span className="text-[1.35em] align-baseline leading-none">A</span><span className="align-baseline">RT</span>
            <span className="mx-[0.25em]"></span>
            <span className="text-[1.35em] align-baseline leading-none">G</span><span className="align-baseline">ALLERY</span>
          </span>
          <span className="mt-1 block truncate whitespace-nowrap font-inter text-[7px] font-medium tracking-[0.08em] text-gallery-wine min-[380px]:text-[8px] sm:text-[10px] sm:tracking-[0.15em] md:text-[11px]">
            INDIAN OLD, MODERN &amp; CONTEMPORARY ARTS
          </span>
        </a>

        <div className="flex shrink-0 items-center gap-1 text-gallery-wine sm:gap-2 md:gap-5">
          <div className="relative">
            <button
              type="button"
              onClick={() => setSearchFocused((open) => !open)}
              className="flex h-9 w-9 items-center justify-center rounded-full text-gallery-wine transition hover:bg-gallery-stone focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gallery-wine/40"
              aria-label="Search the gallery"
              aria-expanded={searchFocused}
            >
              <Search className="h-5 w-5 stroke-[2]" />
            </button>

            {/* Category Selection & Search Panel on Click/Focus */}
            {searchFocused && (
              <>
                <button
                  type="button"
                  className="fixed inset-0 z-40 cursor-default"
                  onClick={() => setSearchFocused(false)}
                  aria-label="Close search"
                />
                <div
                  className="fixed left-3 right-3 top-[70px] z-50 mt-2 w-auto max-w-[calc(100vw-1.5rem)] md:absolute md:left-auto md:right-0 md:top-full md:w-80"
                >
                <div className="flex items-center overflow-hidden rounded-full border border-gallery-wine/25 bg-white px-3 shadow-lg focus-within:border-gallery-wine">
                  <Search className="h-4 w-4 shrink-0 text-gallery-wine/60" />
                  <input
                    type="text"
                    placeholder="Search artists and paintings..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    autoFocus
                    className="h-10 min-w-0 flex-1 bg-transparent px-2 font-sans text-xs text-gallery-ink placeholder:text-gallery-wine/50 focus:outline-none"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery("")}
                      className="p-1 text-xs text-gallery-wine/50 hover:text-gallery-wine"
                      aria-label="Clear search"
                    >
                      ✕
                    </button>
                  )}
                </div>

                {searchQuery.trim() !== "" && (
                  <div className="mt-2 max-h-64 overflow-y-auto rounded-xl bg-white p-2 shadow-xl">
                    {filteredArtists.map((artist, idx) => (
                      <a
                        key={`artist-${idx}`}
                        href="#artists"
                        onClick={() => setSearchFocused(false)}
                        className="block rounded px-2 py-2 font-sans text-xs text-gallery-ink hover:bg-gallery-stone/60"
                      >
                        {artist.name}
                      </a>
                    ))}
                    {filteredPaintings.map((painting, idx) => (
                      <a
                        key={`painting-${idx}`}
                        href="#exhibitions"
                        onClick={() => setSearchFocused(false)}
                        className="block rounded px-2 py-2 font-sans text-xs text-gallery-ink hover:bg-gallery-stone/60"
                      >
                        <span className="font-medium">{painting.title}</span>
                        <span className="block text-[10px] text-gallery-wine/70">by {painting.artist}</span>
                      </a>
                    ))}
                    {filteredArtists.length === 0 && filteredPaintings.length === 0 && (
                      <p className="px-2 py-2 font-sans text-[11px] italic text-gallery-wine/50">
                        No matching results
                      </p>
                    )}
                  </div>
                )}
                </div>
              </>
            )}
          </div>
          <button
            type="button"
            className="flex items-center justify-center p-1 text-gallery-wine transition hover:opacity-80"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-label="Toggle navigation menu"
          >
            <MenuIcon className="h-6 w-6 stroke-[2]" />
          </button>
        </div>
      </header>
      <div className="h-[72px] md:h-[92px]" aria-hidden="true" />

      {menuOpen && (
        <div
          className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-xs transition-opacity"
          onClick={() => setMenuOpen(false)}
        >
          <div
            className="relative flex h-full w-full max-w-[240px] flex-col items-center justify-center bg-[#5D1414] p-5 text-center text-[#B08442] shadow-2xl transition-transform"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              className="absolute right-5 top-5 p-1 text-sm font-bold text-[#B08442] transition hover:text-[#C69A55]"
              aria-label="Close menu"
            >
              ✕
            </button>

            <div className="flex w-full flex-col items-center justify-center gap-12">
              <nav className="flex flex-col items-center gap-5 font-display text-xs font-bold tracking-[0.18em] text-[#B08442] sm:gap-6">
                <a
                  href="#artists"
                  onClick={() => setMenuOpen(false)}
                  className="transition hover:scale-105 hover:text-white"
                >
                  ARTISTS
                </a>
                <a
                  href="#exhibitions"
                  onClick={() => setMenuOpen(false)}
                  className="transition hover:scale-105 hover:text-white"
                >
                  EXHIBITIONS
                </a>
                <a
                  href="#events"
                  onClick={() => setMenuOpen(false)}
                  className="transition hover:scale-105 hover:text-white"
                >
                  EVENTS
                </a>
                <a
                  href="#top"
                  onClick={() => setMenuOpen(false)}
                  className="transition hover:scale-105 hover:text-white"
                >
                  COLLECTION ONLINE
                </a>
                <a
                  href="#contact"
                  onClick={() => setMenuOpen(false)}
                  className="transition hover:scale-105 hover:text-white"
                >
                  ABOUT US
                </a>
                <a
                  href="#press"
                  onClick={() => setMenuOpen(false)}
                  className="transition hover:scale-105 hover:text-white"
                >
                  PRESS
                </a>
                <a
                  href="#contact"
                  onClick={() => setMenuOpen(false)}
                  className="transition hover:scale-105 hover:text-white"
                >
                  CONTACT US
                </a>
              </nav>

              <div className="w-full max-w-[180px] border-t border-[#B08442]/40 pt-6">
                <div className="flex items-center justify-center gap-7 text-[#B08442]">
                <a href="#" aria-label="Instagram" className="transition hover:text-white hover:scale-110">
                  <Instagram className="h-[18px] w-[18px] stroke-[2]" />
                </a>
                <a href="#" aria-label="Facebook" className="transition hover:text-white hover:scale-110">
                  <Facebook className="h-[18px] w-[18px] stroke-[2]" />
                </a>
                <a href="#" aria-label="YouTube" className="transition hover:text-white hover:scale-110">
                  <Youtube className="h-[18px] w-[18px] stroke-[2]" />
                </a>
                <a href="#" aria-label="LinkedIn" className="transition hover:text-white hover:scale-110">
                  <Linkedin className="h-[18px] w-[18px] stroke-[2]" />
                </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <section id="top" className="relative mx-auto aspect-[4/5] w-full max-w-[1540px] overflow-hidden sm:aspect-[4/3] md:aspect-auto md:h-[651px]">
        <img src={galleryImage} alt="Contemporary artworks displayed in a light-filled gallery" className="h-full w-full object-cover object-center sm:object-center" />
      </section>

      <section id="events" className="gallery-section py-12 md:py-20 bg-stone-50/50">
        <p className="eyebrow">EVENTS</p>
        <div className="relative mx-6 mt-8 md:mx-8 md:mt-10 lg:mx-0">
          <button
            type="button"
            onClick={scrollEventLeft}
            className="absolute -left-11 top-[25%] z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-gallery-wine/20 bg-white text-gallery-wine shadow-[0_6px_18px_rgba(93,20,20,0.32)] transition hover:bg-gallery-wine hover:text-white hover:shadow-[0_8px_22px_rgba(93,20,20,0.42)] md:-left-12"
            aria-label="Previous events"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <div
            ref={eventScrollRef}
            className="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-4 no-scrollbar"
          >
            {Array.from({ length: Math.ceil(eventProfiles.length / 3) }, (_, setIndex) => (
              <div
                key={setIndex}
                className="grid w-full shrink-0 snap-start grid-cols-1 gap-5 sm:grid-cols-3"
              >
                {eventProfiles.slice(setIndex * 3, setIndex * 3 + 3).map((event) => (
                  <article
                    key={event.id}
                    className="group flex min-w-0 flex-col overflow-hidden rounded-lg border border-gallery-wine/15 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                  >
                  <div className="relative aspect-[1.65] overflow-hidden bg-gallery-stone">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                    <span className="absolute left-3 top-3 rounded bg-gallery-wine/90 px-2.5 py-1 font-sans text-[10px] font-bold uppercase tracking-widest text-white backdrop-blur-xs">
                      {event.category}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col justify-between p-5">
                    <div>
                      <h3 className="font-display text-lg font-semibold leading-snug text-gallery-wine transition group-hover:text-gallery-ink">
                        {event.title}
                      </h3>
                      <p className="mt-2 font-sans text-xs leading-relaxed text-gallery-ink/75">
                        {event.description}
                      </p>

                      <div className="mt-4 flex flex-col gap-1.5 border-t border-gallery-wine/10 pt-3.5 font-sans text-[11px] text-gallery-ink/80">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-3.5 w-3.5 text-gallery-wine shrink-0" />
                          <span className="font-medium">{event.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-3.5 w-3.5 text-gallery-wine shrink-0" />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-3.5 w-3.5 text-gallery-wine shrink-0" />
                          <span>{event.location}</span>
                        </div>
                      </div>
                    </div>

                  </div>
                  </article>
                ))}
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={scrollEventRight}
            className="absolute -right-11 top-[25%] z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-gallery-wine/20 bg-white text-gallery-wine shadow-[0_6px_18px_rgba(93,20,20,0.32)] transition hover:bg-gallery-wine hover:text-white hover:shadow-[0_8px_22px_rgba(93,20,20,0.42)] md:-right-12"
            aria-label="Next events"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </section>

      <section id="artists" className="gallery-section bg-gallery-stone py-8 md:py-11">
        <p className="eyebrow">Artists</p>
        <div className="relative mx-6 mt-7 md:mx-8 md:mt-9 lg:mx-0">
          <button
            type="button"
            onClick={scrollArtistLeft}
            className="absolute -left-11 top-[45%] z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-gallery-wine/20 bg-white text-gallery-wine shadow-[0_6px_18px_rgba(93,20,20,0.32)] transition hover:bg-gallery-wine hover:text-white hover:shadow-[0_8px_22px_rgba(93,20,20,0.42)] md:-left-12"
            aria-label="Previous artists"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <div
            ref={artistScrollRef}
            className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-3 no-scrollbar"
          >
            {Array.from({ length: Math.ceil(artistProfiles.length / 4) }, (_, setIndex) => (
              <div
                key={setIndex}
                className="grid w-full shrink-0 snap-start grid-cols-1 justify-items-center gap-4 sm:grid-cols-2 xl:grid-cols-4"
              >
                {artistProfiles.slice(setIndex * 4, setIndex * 4 + 4).map((artistProfile) => (
                  <article key={artistProfile.name} className="group w-full max-w-[306.14px]">
                    <div className="relative aspect-[306.14/414] w-full overflow-hidden rounded-sm bg-gallery-ink xl:h-[414px] xl:w-[306.14px]">
                      <img
                        src={artistProfile.image}
                        alt={artistProfile.name}
                        className="h-full w-full object-cover grayscale transition duration-500 group-hover:scale-105 group-hover:grayscale-0"
                      />
                    </div>
                    <div className="mt-3 text-center">
                      <p className="font-display text-base font-semibold text-gallery-wine transition group-hover:text-gallery-ink">
                        {artistProfile.name}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={scrollArtistRight}
            className="absolute -right-11 top-[45%] z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-gallery-wine/20 bg-white text-gallery-wine shadow-[0_6px_18px_rgba(93,20,20,0.32)] transition hover:bg-gallery-wine hover:text-white hover:shadow-[0_8px_22px_rgba(93,20,20,0.42)] md:-right-12"
            aria-label="Next artists"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </section>

      <section id="exhibitions" className="gallery-section py-12 md:py-20">
        <p className="font-wordmark text-[25px] uppercase tracking-[0.06em] text-gallery-wine md:text-[27px]">Exhibitions</p>
        <div className="relative mx-6 mt-8 md:mx-8 md:mt-10 lg:mx-0">
          <button
            type="button"
            onClick={scrollExhibitionLeft}
            className="absolute -left-11 top-[30%] z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-gallery-wine/20 bg-white text-gallery-wine shadow-[0_6px_18px_rgba(93,20,20,0.32)] transition hover:bg-gallery-wine hover:text-white hover:shadow-[0_8px_22px_rgba(93,20,20,0.42)] md:-left-12"
            aria-label="Previous exhibitions"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <div
            ref={exhibitionScrollRef}
            className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-3 no-scrollbar"
          >
            {Array.from({ length: Math.ceil(exhibitionProfiles.length / 3) }, (_, setIndex) => (
              <div
                key={setIndex}
                className="grid w-full shrink-0 snap-start grid-cols-1 gap-4 sm:grid-cols-3"
              >
                {exhibitionProfiles.slice(setIndex * 3, setIndex * 3 + 3).map((exhibition) => (
                  <article key={exhibition.title} className="group min-w-0">
                    <div className="aspect-[1.37] overflow-hidden bg-gallery-stone">
                      <img
                        src={exhibition.image}
                        alt={exhibition.title}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="bg-[#F5F2EA] px-4 py-4 md:px-5 md:py-5">
                      <p className="font-inter text-[10px] font-medium uppercase tracking-[0.08em] text-[#B08442] md:text-[11px]">
                        Gallery Exhibition
                      </p>
                      <p className="mt-1.5 font-wordmark text-[20px] font-semibold uppercase leading-[1.08] text-gallery-wine md:text-[22px]">
                        {exhibition.title}
                      </p>
                      <p className="mt-2 font-inter text-[11px] tracking-[0.04em] md:text-xs">
                        <span className="font-medium uppercase text-[#B08442]">{exhibition.subtitle}</span>{" "}
                        <span className="font-medium text-gallery-wine">{exhibition.date}</span>
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={scrollExhibitionRight}
            className="absolute -right-11 top-[30%] z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-gallery-wine/20 bg-white text-gallery-wine shadow-[0_6px_18px_rgba(93,20,20,0.32)] transition hover:bg-gallery-wine hover:text-white hover:shadow-[0_8px_22px_rgba(93,20,20,0.42)] md:-right-12"
            aria-label="Next exhibitions"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </section>

      <section className="bg-gallery-stone px-5 py-8 md:px-10 md:py-11 lg:px-16">
        <p className="eyebrow">Catalogues and publications</p>
        <p className="py-10 text-center font-display text-sm uppercase tracking-[0.1em] text-gallery-wine md:py-14 md:text-base">Press and media</p>
      </section>

      <section className="px-5 py-8 text-center md:py-11">
        <p className="font-wordmark text-[22px] italic tracking-wide text-[#B08442] md:text-[24px]">“A painting bought well is a pleasure for season. A painting kept well is an Inheritance.”</p>
        <a href="#contact" className="mt-4 inline-block border border-gallery-wine/30 px-4 py-2 font-display text-[19px] uppercase tracking-[0.17em] text-gallery-wine transition hover:bg-gallery-wine hover:text-white">ENQUIRE</a>
      </section>

      <footer id="contact" className="relative bg-gallery-wine text-white">
        <div className="grid font-inter px-5 py-9 md:min-h-[336px] md:grid-cols-[1.75fr_0.55fr_0.55fr] md:grid-rows-[auto_auto] md:gap-x-16 md:px-10 md:pb-7 md:pt-10 lg:px-[42px]">
          <div className="md:row-span-2">
            <p className="font-sans text-[10px] font-bold uppercase tracking-[0.12em] text-white/85">Visit the gallery</p>
            <h2 className="mt-7 font-wordmark text-[27px] font-bold leading-[1.2] tracking-[0.04em] text-white/80">D-33 Defence Colony,<br /><span className="italic text-[#B08442]">New Delhi 110024</span></h2>
            <p className="mt-9 max-w-[600px] text-[12px] leading-[2] tracking-[0.04em] text-white/60">
              <span className="lg:block lg:whitespace-nowrap">Walk-ins are welcome during opening hours. For private viewings,</span>{" "}
              <span className="lg:block lg:whitespace-nowrap">valuation or works currently in the viewing room, we recommend</span>{" "}
              <span className="lg:block lg:whitespace-nowrap">an appointment.</span>
            </p>
          </div>
          <div className="mt-8 text-[12px] leading-[1.15] tracking-[0.06em] text-white/75 md:mt-0">
            <p className="mb-3 font-sans text-[10px] font-bold uppercase tracking-[0.13em] text-white/85">Hours</p>
            <p>Monday - Saturday</p>
            <p>10pm - 5pm</p>
            <p className="mb-3 mt-6 font-sans text-[10px] font-bold uppercase tracking-[0.13em] text-white/85">Email</p>
            <p><a href="mailto:aryanartgallery@gmail.com" className="underline underline-offset-4 hover:text-white">aryanartgallery@gmail.com</a></p>
          </div>
          <div className="mt-8 text-[12px] leading-[1.15] tracking-[0.06em] text-white/75 md:mt-0">
            <p className="mb-3 font-sans text-[10px] font-bold uppercase tracking-[0.13em] text-white/85">Telephone</p>
            <p>011-41551277</p>
            <p>011-41550709</p>
            <p className="mb-3 mt-6 font-sans text-[10px] font-bold uppercase tracking-[0.13em] text-white/85">Appointments</p>
            <p className="underline underline-offset-4">Request a private viewing</p>
            <div className="mt-5 flex items-center gap-5 text-white">
              <a href="#" aria-label="Facebook" className="transition hover:opacity-80"><Facebook className="h-[15px] w-[15px] fill-white stroke-[2.5]" /></a>
              <a href="#" aria-label="LinkedIn" className="transition hover:opacity-80"><Linkedin className="h-[15px] w-[15px] fill-white stroke-[2.5]" /></a>
              <a href="#" aria-label="YouTube" className="transition hover:opacity-80"><Youtube className="h-[15px] w-[15px] fill-white stroke-[2.5]" /></a>
              <a href="#" aria-label="Instagram" className="transition hover:opacity-80"><Instagram className="h-[15px] w-[15px] stroke-[2.5]" /></a>
            </div>
          </div>

          <div className="mt-10 md:col-span-2 md:col-start-2 md:mt-0 md:self-end">
            <p className="font-inter text-[10px] font-medium uppercase tracking-[0.18em] text-[#B08442]">
              JOIN OUR MAILING LIST
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="mt-1 flex h-[25px] w-full max-w-[345px] overflow-hidden">
              <input
                type="email"
                placeholder="Enter your email address"
                className="min-w-0 flex-1 bg-[#F9F5EC] px-7 font-inter text-[10px] tracking-[0.08em] text-[#222] placeholder:text-[#777] focus:outline-none"
              />
              <button
                type="submit"
                aria-label="Submit email"
                className="w-[77px] bg-[#B08442] transition hover:bg-[#9E7437]"
              />
            </form>
            <p className="mt-1 font-inter text-[8px] uppercase tracking-[0.13em] text-white/80">
              STAY UPDATED WITH EVENTS, EXHIBITIONS AND NEWS
            </p>
          </div>
        </div>
        <div className="flex h-[72px] flex-col items-center justify-center bg-[#1B1712] text-[#B08442]">
          <div className="relative top-[3px] flex flex-col items-center">
            <span className="inline-flex items-baseline whitespace-nowrap font-wordmark text-[21px] font-bold tracking-[0.04em] md:text-[24px]">
              <span className="text-[1.35em] align-baseline leading-none">A</span><span className="align-baseline">RYAN</span>
              <span className="mx-[0.25em]"></span>
              <span className="text-[1.35em] align-baseline leading-none">A</span><span className="align-baseline">RT</span>
              <span className="mx-[0.25em]"></span>
              <span className="text-[1.35em] align-baseline leading-none">G</span><span className="align-baseline">ALLERY</span>
            </span>
            <span className="relative -left-[8px] -mt-[4px] block max-w-full truncate whitespace-nowrap font-inter text-[5.5px] font-bold tracking-[0.08em] [word-spacing:-0.12em] text-[#B08442]/85 min-[380px]:text-[6.5px] sm:text-[8.5px] sm:tracking-[0.15em] md:text-[9.5px]">
              INDIAN OLD, MODERN &amp; CONTEMPORARY ARTS
            </span>
          </div>
          <div className="mt-2 h-px w-full shrink-0 bg-[#B08442]" aria-hidden="true" />
          <span className="mt-1 block font-sans text-[9px] font-normal uppercase tracking-[0.07em] text-white/55">
            © 2026 ARYAN ART GALLERY &nbsp;·&nbsp; ALL RIGHTS RESERVED
          </span>
        </div>
      </footer>
    </main>
  );
}
