"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, MapPin, Menu, X, Sun, Moon, PhoneCall } from "lucide-react";
import { useTheme } from "next-themes";
import SearchModal from "../SearchModal";

export default function Navbar() {
  const pathname = usePathname();
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Sync mounting to prevent hydration mismatches
  useEffect(() => {
    setMounted(true);

    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on page change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Artists", href: "/artists" },
    { name: "Exhibitions", href: "/exhibitions" },
    { name: "Events", href: "/events" },
    { name: "Press", href: "/press" },
    { name: "Publications", href: "/publications" },
    { name: "About Us", href: "/about" },
  ];

  const handleMapClick = () => {
    const mapUrl =
      process.env.NEXT_PUBLIC_GOOGLE_MAPS_URL ||
      "https://maps.google.com/?q=Aryan+Art+Gallery+Mayfair+London";
    window.open(mapUrl, "_blank", "noopener,noreferrer");
  };

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? "border-b border-stone-700/50 shadow-sm py-3"
            : "py-5"
        }`}
        style={{
          backgroundColor: "rgb(92, 20, 20)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-baseline group">
            <span className="font-serif text-amber-300 transition-all duration-300">
              <span className="text-2xl md:text-3xl font-bold">A</span>
              <span className="text-sm md:text-lg font-light tracking-[0.05em]">RYAN</span>
            </span>
            <span className="font-serif text-white transition-all duration-300 group-hover:text-amber-200 ml-1">
              <span className="text-2xl md:text-3xl font-bold">A</span>
              <span className="text-sm md:text-lg font-light tracking-[0.05em]">RT</span>
            </span>
            <span className="font-serif text-white transition-all duration-300 group-hover:text-amber-200 hidden sm:inline ml-1">
              <span className="text-2xl md:text-3xl font-bold">G</span>
              <span className="text-sm md:text-lg font-light tracking-[0.05em]">ALLERY</span>
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-8 text-white">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-xs font-semibold tracking-luxury uppercase transition-all relative py-1 ${
                    isActive
                      ? "text-amber-300 font-bold"
                      : "text-stone-100 hover:text-amber-200"
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-amber-300 rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2 md:space-x-4 text-white">
            {/* Search Toggle */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-stone-100 hover:text-amber-200 hover:bg-white/10 rounded-full transition-colors cursor-pointer"
              aria-label="Search site"
            >
              <Search className="h-4.5 w-4.5" />
            </button>

            {/* Google Maps External Trigger */}
            <button
              onClick={handleMapClick}
              className="p-2 text-stone-100 hover:text-amber-200 hover:bg-white/10 rounded-full transition-colors cursor-pointer"
              aria-label="View gallery location on Google Maps"
            >
              <MapPin className="h-4.5 w-4.5" />
            </button>

            {/* Theme Toggle */}
            {mounted && (
              <button
                onClick={toggleTheme}
                className="p-2 text-stone-100 hover:text-amber-200 hover:bg-white/10 rounded-full transition-colors cursor-pointer"
                aria-label="Toggle visual theme"
              >
                {resolvedTheme === "dark" ? (
                  <Sun className="h-4.5 w-4.5 text-amber-300" />
                ) : (
                  <Moon className="h-4.5 w-4.5 text-stone-100" />
                )}
              </button>
            )}

            {/* Contact CTA */}
            <Link
              href="/about#contact"
              className="hidden sm:flex items-center px-4 py-2 border border-white hover:bg-white hover:text-stone-900 text-white transition-all duration-300 text-xs font-semibold uppercase tracking-luxury rounded-sm"
            >
              <PhoneCall className="h-3.5 w-3.5 mr-2" />
              Contact
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 lg:hidden text-stone-100 hover:text-amber-200 hover:bg-white/10 rounded-full transition-colors cursor-pointer"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-30 lg:hidden font-sans">
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-neutral-950/60 backdrop-blur-xs"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Drawer Box */}
          <nav 
            className="fixed top-[65px] right-0 bottom-0 w-3/4 max-w-xs border-l border-stone-700/50 shadow-2xl flex flex-col p-6 space-y-4 text-white"
            style={{
              backgroundColor: "rgb(92, 20, 20)",
            }}
          >
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-semibold tracking-luxury uppercase py-2 border-b border-stone-500/40 transition-colors ${
                    isActive ? "text-amber-300 font-bold" : "text-stone-100 hover:text-amber-200"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
            <div className="pt-4 flex flex-col space-y-3">
              <Link
                href="/about#contact"
                className="w-full flex items-center justify-center py-2.5 bg-amber-500 hover:bg-amber-600 text-black text-xs font-semibold uppercase tracking-luxury transition-all text-center rounded-sm shadow-md"
              >
                <PhoneCall className="h-3.5 w-3.5 mr-2" />
                Contact Us
              </Link>
              <button
                onClick={handleMapClick}
                className="w-full flex items-center justify-center py-2.5 border border-white text-white hover:bg-white/10 text-xs font-semibold uppercase tracking-luxury transition-all text-center rounded-sm cursor-pointer"
              >
                <MapPin className="h-3.5 w-3.5 mr-2 text-amber-300" />
                Gallery Map
              </button>
            </div>
          </nav>
        </div>
      )}

      {/* Keyboard-accessible Search modal popup */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
