"use client";

import { useState, useRef } from "react";
import { Facebook, Linkedin, Youtube, Instagram, Search, Menu as MenuIcon, ChevronLeft, ChevronRight, Calendar, Clock, MapPin, CheckCircle2, Ticket } from "lucide-react";

const galleryImage =
  "https://images.pexels.com/photos/35336001/pexels-photo-35336001.jpeg?auto=compress&cs=tinysrgb&w=1800";
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
  const [searchCategory, setSearchCategory] = useState<"all" | "artists" | "paintings">("all");
  const [searchFocused, setSearchFocused] = useState(false);
  const [rsvpSubmitted, setRsvpSubmitted] = useState<number[]>([]);

  const artistScrollRef = useRef<HTMLDivElement>(null);
  const exhibitionScrollRef = useRef<HTMLDivElement>(null);
  const eventScrollRef = useRef<HTMLDivElement>(null);

  const scrollArtistLeft = () => {
    if (artistScrollRef.current) {
      artistScrollRef.current.scrollBy({ left: -320, behavior: "smooth" });
    }
  };

  const scrollArtistRight = () => {
    if (artistScrollRef.current) {
      artistScrollRef.current.scrollBy({ left: 320, behavior: "smooth" });
    }
  };

  const scrollExhibitionLeft = () => {
    if (exhibitionScrollRef.current) {
      exhibitionScrollRef.current.scrollBy({ left: -360, behavior: "smooth" });
    }
  };

  const scrollExhibitionRight = () => {
    if (exhibitionScrollRef.current) {
      exhibitionScrollRef.current.scrollBy({ left: 360, behavior: "smooth" });
    }
  };

  const scrollEventLeft = () => {
    if (eventScrollRef.current) {
      eventScrollRef.current.scrollBy({ left: -360, behavior: "smooth" });
    }
  };

  const scrollEventRight = () => {
    if (eventScrollRef.current) {
      eventScrollRef.current.scrollBy({ left: 360, behavior: "smooth" });
    }
  };

  const handleRsvpToggle = (eventId: number) => {
    setRsvpSubmitted((prev) =>
      prev.includes(eventId) ? prev.filter((id) => id !== eventId) : [...prev, eventId]
    );
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
      <header className="fixed inset-x-0 top-0 z-40 flex h-[72px] items-center gap-2 border-b border-gallery-wine/10 bg-white px-2 sm:gap-3 sm:px-3 md:h-[92px] md:px-4 lg:px-6">
        <a href="#top" className="min-w-0 flex-1 overflow-hidden leading-none" aria-label="Aryan Art Gallery home">
          <span className="inline-flex max-w-full items-baseline whitespace-nowrap font-display text-[clamp(18px,5.5vw,29px)] tracking-[-0.045em] text-gallery-wine md:text-[35px]">
            <span className="text-[1.35em] align-baseline leading-none">A</span><span className="align-baseline">RYAN</span>
            <span className="mx-[0.25em]"></span>
            <span className="text-[1.35em] align-baseline leading-none">A</span><span className="align-baseline">RT</span>
            <span className="mx-[0.25em]"></span>
            <span className="text-[1.35em] align-baseline leading-none">G</span><span className="align-baseline">ALLERY</span>
          </span>
          <span className="mt-1 block truncate whitespace-nowrap font-sans text-[5px] font-medium tracking-[0.08em] text-gallery-wine min-[380px]:text-[6px] sm:text-[8px] sm:tracking-[0.15em] md:text-[10px]">
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
                  className="fixed left-3 right-3 top-[70px] z-50 mt-2 w-auto max-w-[calc(100vw-1.5rem)] rounded-xl border border-gallery-wine/20 bg-white p-3.5 shadow-2xl backdrop-blur-md md:absolute md:left-auto md:right-0 md:top-full md:w-80"
                >
                <div className="mb-3 flex items-center rounded-lg border border-gallery-wine/25 bg-gallery-stone/30 px-3 focus-within:border-gallery-wine focus-within:bg-white">
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

                {/* Category Selection Tabs */}
                <div className="mb-3 flex items-center gap-1 rounded-lg bg-gallery-stone/60 p-1 font-sans text-[11px] font-medium uppercase tracking-wider text-gallery-wine">
                  <button
                    type="button"
                    onClick={() => setSearchCategory("all")}
                    className={`flex-1 rounded py-1 transition ${searchCategory === "all"
                      ? "bg-white font-bold text-gallery-wine shadow-sm"
                      : "hover:text-gallery-ink"
                      }`}
                  >
                    All
                  </button>
                  <button
                    type="button"
                    onClick={() => setSearchCategory("artists")}
                    className={`flex-1 rounded py-1 transition ${searchCategory === "artists"
                      ? "bg-white font-bold text-gallery-wine shadow-sm"
                      : "hover:text-gallery-ink"
                      }`}
                  >
                    Artists
                  </button>
                  <button
                    type="button"
                    onClick={() => setSearchCategory("paintings")}
                    className={`flex-1 rounded py-1 transition ${searchCategory === "paintings"
                      ? "bg-white font-bold text-gallery-wine shadow-sm"
                      : "hover:text-gallery-ink"
                      }`}
                  >
                    Paintings
                  </button>
                </div>

                {/* Content / Results */}
                {searchQuery.trim() === "" ? (
                  <div className="py-2 font-sans text-xs text-gallery-wine/70">
                    <p className="mb-2 font-sans text-[10px] font-bold uppercase tracking-wider text-gallery-wine">
                      Categories
                    </p>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setSearchCategory("artists")}
                        className="rounded-md bg-gallery-stone/60 px-3 py-1.5 text-[11px] transition hover:bg-gallery-stone font-medium"
                      >
                        🎨 Artists ({sampleArtists.length})
                      </button>
                      <button
                        type="button"
                        onClick={() => setSearchCategory("paintings")}
                        className="rounded-md bg-gallery-stone/60 px-3 py-1.5 text-[11px] transition hover:bg-gallery-stone font-medium"
                      >
                        🖼️ Paintings ({samplePaintings.length})
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    {(searchCategory === "all" || searchCategory === "artists") && (
                      <div className="mb-3">
                        <p className="mb-1.5 border-b border-gallery-wine/10 pb-1 font-sans text-[9px] font-bold uppercase tracking-[0.15em] text-gallery-wine/60">
                          Artists
                        </p>
                        {filteredArtists.length > 0 ? (
                          filteredArtists.map((artist, idx) => (
                            <a
                              key={idx}
                              href="#artists"
                              className="block rounded px-2 py-1 font-sans text-xs text-gallery-ink hover:bg-gallery-stone/60"
                            >
                              {artist.name}
                            </a>
                          ))
                        ) : (
                          <p className="px-2 font-sans text-[11px] italic text-gallery-wine/50">
                            No matching artists
                          </p>
                        )}
                      </div>
                    )}

                    {(searchCategory === "all" || searchCategory === "paintings") && (
                      <div>
                        <p className="mb-1.5 border-b border-gallery-wine/10 pb-1 font-sans text-[9px] font-bold uppercase tracking-[0.15em] text-gallery-wine/60">
                          Paintings
                        </p>
                        {filteredPaintings.length > 0 ? (
                          filteredPaintings.map((painting, idx) => (
                            <a
                              key={idx}
                              href="#exhibitions"
                              className="block rounded px-2 py-1.5 font-sans text-xs text-gallery-ink hover:bg-gallery-stone/60"
                            >
                              <span className="font-medium">{painting.title}</span>
                              <span className="block text-[10px] text-gallery-wine/70">
                                by {painting.artist}
                              </span>
                            </a>
                          ))
                        ) : (
                          <p className="px-2 font-sans text-[11px] italic text-gallery-wine/50">
                            No matching paintings
                          </p>
                        )}
                      </div>
                    )}
                  </>
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
            className="relative flex h-full w-full max-w-[240px] flex-col justify-between bg-[#5D1414] p-5 text-white shadow-2xl transition-transform"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <div className="mb-4 flex items-center justify-between border-b border-white/20 pb-3">
                <span className="font-sans text-[11px] font-bold tracking-[0.2em] text-white/70">
                  MENU
                </span>
                <button
                  type="button"
                  onClick={() => setMenuOpen(false)}
                  className="p-1 text-sm font-bold text-white transition hover:text-white/70"
                  aria-label="Close menu"
                >
                  ✕
                </button>
              </div>
              <nav className="flex flex-col gap-2 font-display text-xs font-bold tracking-[0.18em] text-white/90">
                <a
                  href="#artists"
                  onClick={() => setMenuOpen(false)}
                  className="py-1.5 transition hover:translate-x-1 hover:text-white"
                >
                  ARTISTS
                </a>
                <a
                  href="#exhibitions"
                  onClick={() => setMenuOpen(false)}
                  className="py-1.5 transition hover:translate-x-1 hover:text-white"
                >
                  EXHIBITIONS
                </a>
                <a
                  href="#events"
                  onClick={() => setMenuOpen(false)}
                  className="py-1.5 transition hover:translate-x-1 hover:text-white"
                >
                  EVENTS
                </a>
                <a
                  href="#top"
                  onClick={() => setMenuOpen(false)}
                  className="py-1.5 transition hover:translate-x-1 hover:text-white"
                >
                  COLLECTION ONLINE
                </a>
                <a
                  href="#about"
                  onClick={() => setMenuOpen(false)}
                  className="py-1.5 transition hover:translate-x-1 hover:text-white"
                >
                  ABOUT US
                </a>
                <a
                  href="#press"
                  onClick={() => setMenuOpen(false)}
                  className="py-1.5 transition hover:translate-x-1 hover:text-white"
                >
                  PRESS
                </a>
                <a
                  href="#contact"
                  onClick={() => setMenuOpen(false)}
                  className="py-1.5 transition hover:translate-x-1 hover:text-white"
                >
                  CONTACT US
                </a>
              </nav>
            </div>

            <div className="mt-auto border-t border-white/20 pt-4">
              <div className="flex items-center justify-between text-white/80 px-2">
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
      )}

      <section id="top" className="relative mx-auto w-full max-w-[1540px] h-[651px] overflow-hidden opacity-100 rotate-0">
        <img src={galleryImage} alt="Contemporary artworks displayed in a light-filled gallery" className="h-full w-full object-cover object-center" />
      </section>

      <section id="events" className="gallery-section py-12 md:py-20 bg-stone-50/50">
        <p className="eyebrow">EVENTS</p>
        <div className="relative mt-8 md:mt-10">
          <button
            type="button"
            onClick={scrollEventLeft}
            className="absolute -left-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-gallery-wine shadow-lg backdrop-blur-xs transition hover:bg-gallery-wine hover:text-white md:-left-5"
            aria-label="Previous events"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <div
            ref={eventScrollRef}
            className="flex gap-5 overflow-x-auto scroll-smooth pb-4 no-scrollbar"
          >
            {eventProfiles.map((event) => {
              const isRsvped = rsvpSubmitted.includes(event.id);
              return (
                <article
                  key={event.id}
                  className="group flex w-[290px] shrink-0 flex-col overflow-hidden rounded-lg border border-gallery-wine/15 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md sm:w-[340px] md:w-[370px]"
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

                    <button
                      type="button"
                      onClick={() => handleRsvpToggle(event.id)}
                      className={`mt-5 flex items-center justify-center gap-2 rounded-md py-2.5 px-4 font-sans text-xs font-semibold uppercase tracking-wider transition ${
                        isRsvped
                          ? "bg-emerald-800 text-white"
                          : "bg-gallery-wine text-white hover:bg-gallery-wine/90"
                      }`}
                    >
                      {isRsvped ? (
                        <>
                          <CheckCircle2 className="h-4 w-4 shrink-0" />
                          RSVP Confirmed
                        </>
                      ) : (
                        <>
                          <Ticket className="h-4 w-4 shrink-0" />
                          Reserve a Spot
                        </>
                      )}
                    </button>
                  </div>
                </article>
              );
            })}
          </div>

          <button
            type="button"
            onClick={scrollEventRight}
            className="absolute -right-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-gallery-wine shadow-lg backdrop-blur-xs transition hover:bg-gallery-wine hover:text-white md:-right-5"
            aria-label="Next events"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </section>

      <section id="artists" className="bg-gallery-stone px-5 py-8 md:px-10 md:py-11 lg:px-16">
        <p className="eyebrow">Artists</p>
        <div className="relative mt-7 md:mt-9">
          <button
            type="button"
            onClick={scrollArtistLeft}
            className="absolute -left-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-gallery-wine shadow-lg backdrop-blur-xs transition hover:bg-gallery-wine hover:text-white md:-left-5"
            aria-label="Previous artists"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <div
            ref={artistScrollRef}
            className="flex gap-4 overflow-x-auto scroll-smooth pb-3 no-scrollbar"
          >
            {artistProfiles.map((artistProfile) => (
              <article key={artistProfile.name} className="group w-[210px] shrink-0 sm:w-[240px] md:w-[270px]">
                <div className="relative aspect-[.73] overflow-hidden bg-gallery-ink rounded-sm">
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

          <button
            type="button"
            onClick={scrollArtistRight}
            className="absolute -right-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-gallery-wine shadow-lg backdrop-blur-xs transition hover:bg-gallery-wine hover:text-white md:-right-5"
            aria-label="Next artists"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </section>

      <section id="exhibitions" className="gallery-section py-12 md:py-20">
        <p className="eyebrow">Exhibitions</p>
        <div className="relative mt-8 md:mt-10">
          <button
            type="button"
            onClick={scrollExhibitionLeft}
            className="absolute -left-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-gallery-wine shadow-lg backdrop-blur-xs transition hover:bg-gallery-wine hover:text-white md:-left-5"
            aria-label="Previous exhibitions"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <div
            ref={exhibitionScrollRef}
            className="flex gap-4 overflow-x-auto scroll-smooth pb-3 no-scrollbar"
          >
            {exhibitionProfiles.map((exhibition) => (
              <article key={exhibition.title} className="group w-[280px] shrink-0 sm:w-[340px] md:w-[380px]">
                <div className="aspect-[1.45] overflow-hidden bg-gallery-stone">
                  <img
                    src={exhibition.image}
                    alt={exhibition.title}
                    className="h-full w-full object-cover grayscale transition duration-500 group-hover:scale-105 group-hover:grayscale-0"
                  />
                </div>
                <div className="mt-3">
                  <p className="font-display text-base font-semibold text-gallery-wine">{exhibition.title}</p>
                  <p className="font-sans text-xs text-gallery-ink/70">{exhibition.subtitle}</p>
                  <p className="font-sans text-[10px] text-gallery-wine/60 uppercase tracking-wider mt-0.5">{exhibition.date}</p>
                </div>
              </article>
            ))}
          </div>

          <button
            type="button"
            onClick={scrollExhibitionRight}
            className="absolute -right-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-gallery-wine shadow-lg backdrop-blur-xs transition hover:bg-gallery-wine hover:text-white md:-right-5"
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
        <p className="font-display text-[22px] italic tracking-wide text-gallery-wine/55 md:text-[24px]">“A painting begins with a problem for which it is a solution.”</p>
        <a href="#contact" className="mt-4 inline-block border border-gallery-wine/30 px-4 py-2 font-display text-[19px] uppercase tracking-[0.17em] text-gallery-wine transition hover:bg-gallery-wine hover:text-white">Enquire about a work</a>
      </section>

      <footer id="contact" className="relative bg-gallery-wine text-white">
        <div className="grid px-5 py-9 md:min-h-[336px] md:grid-cols-[1.75fr_0.55fr_0.55fr] md:grid-rows-[auto_auto] md:gap-x-16 md:px-10 md:pb-7 md:pt-10 lg:px-[42px]">
          <div className="md:row-span-2">
            <p className="font-sans text-[10px] font-bold uppercase tracking-[0.12em] text-white/85">Visit the gallery</p>
            <h2 className="mt-7 font-display text-[23px] leading-[1.2] tracking-[0.04em] text-white/80">D-33 Defence Colony,<br /><span className="italic text-[#B08442]">New Delhi 110024</span></h2>
            <p className="mt-9 max-w-[390px] font-sans text-[11px] leading-[2] tracking-[0.04em] text-white/60">Walk-ins are welcome during opening hours. For private viewings,<br className="hidden lg:block" /> valuation or works currently in the viewing room, we recommend<br className="hidden lg:block" /> an appointment.</p>
          </div>
          <div className="mt-8 font-sans text-[11px] leading-[1.15] tracking-[0.06em] text-white/75 md:mt-0">
            <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.13em] text-white/85">Hours</p>
            <p>Monday - Saturday</p>
            <p>10pm - 5pm</p>
            <p className="mb-3 mt-6 text-[10px] font-bold uppercase tracking-[0.13em] text-white/85">Email</p>
            <p><a href="mailto:aryanartgallery@gmail.com" className="underline underline-offset-4 hover:text-white">aryanartgallery@gmail.com</a></p>
          </div>
          <div className="mt-8 font-sans text-[11px] leading-[1.15] tracking-[0.06em] text-white/75 md:mt-0">
            <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.13em] text-white/85">Telephone</p>
            <p>011-41551277</p>
            <p>011-41550709</p>
            <p className="mb-3 mt-6 text-[10px] font-bold uppercase tracking-[0.13em] text-white/85">Appointments</p>
            <p className="underline underline-offset-4">Request a private viewing</p>
            <div className="mt-5 flex items-center gap-5 text-white">
              <a href="#" aria-label="Facebook" className="transition hover:opacity-80"><Facebook className="h-[15px] w-[15px] fill-white stroke-[2.5]" /></a>
              <a href="#" aria-label="LinkedIn" className="transition hover:opacity-80"><Linkedin className="h-[15px] w-[15px] fill-white stroke-[2.5]" /></a>
              <a href="#" aria-label="YouTube" className="transition hover:opacity-80"><Youtube className="h-[15px] w-[15px] fill-white stroke-[2.5]" /></a>
              <a href="#" aria-label="Instagram" className="transition hover:opacity-80"><Instagram className="h-[15px] w-[15px] stroke-[2.5]" /></a>
            </div>
          </div>

          <div className="mt-10 md:col-span-2 md:col-start-2 md:mt-0 md:self-end">
            <p className="font-sans text-[9px] font-medium uppercase tracking-[0.18em] text-[#B08442]">
              JOIN OUR MAILING LIST
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="mt-1 flex h-[25px] w-full max-w-[345px] overflow-hidden">
              <input
                type="email"
                placeholder="Enter your email address"
                className="min-w-0 flex-1 bg-[#F9F5EC] px-7 font-sans text-[9px] tracking-[0.08em] text-[#222] placeholder:text-[#777] focus:outline-none"
              />
              <button
                type="submit"
                aria-label="Submit email"
                className="w-[77px] bg-[#B08442] transition hover:bg-[#9E7437]"
              />
            </form>
            <p className="mt-1 font-sans text-[7px] uppercase tracking-[0.13em] text-white/80">
              STAY UPDATED WITH EVENTS, EXHIBITIONS AND NEWS
            </p>
          </div>
        </div>
        <div className="flex h-[72px] flex-col items-center justify-center bg-[#1B1712] font-display text-[#B08442]">
          <div className="flex flex-col items-center">
            <span className="inline-flex items-baseline text-[20px] tracking-[0.04em] md:text-[23px]">
              <span className="text-[1.35em] align-baseline leading-none">A</span><span className="align-baseline">RYAN</span>
              <span className="mx-[0.25em]"></span>
              <span className="text-[1.35em] align-baseline leading-none">A</span><span className="align-baseline">RT</span>
              <span className="mx-[0.25em]"></span>
              <span className="text-[1.35em] align-baseline leading-none">G</span><span className="align-baseline">ALLERY</span>
            </span>
            <span className="-mt-1 block font-sans text-[8px] font-medium uppercase tracking-[0.13em] text-[#B08442]/85">
              INDIAN OLD, MODERN &amp; CONTEMPORARY ARTS
            </span>
          </div>
          <div className="mt-2 h-px w-full bg-[#B08442]/75" />
          <span className="mt-1 block font-sans text-[9px] font-normal uppercase tracking-[0.07em] text-white/55">
            © 2026 ARYAN ART GALLERY &nbsp;·&nbsp; ALL RIGHTS RESERVED
          </span>
        </div>
      </footer>
    </main>
  );
}
