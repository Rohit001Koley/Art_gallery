"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import SearchModal from "../SearchModal";

export default function Navbar() {
  const pathname = usePathname();
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Artists", href: "/artists" },
    { name: "Exhibitions", href: "/exhibitions" },
    { name: "Events", href: "/events" },
    { name: "Press", href: "/press" },
    { name: "Publications", href: "/publications" },
    { name: "About Us", href: "/about" },
  ];

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  return (
    <>
      <header
        className="w-full bg-[#F5F2EB] dark:bg-[#1A1817] border-b border-[#5C1414]/10 transition-colors duration-300 relative z-40"
        style={{ height: "104px" }}
      >
        <div className="w-full h-full px-6 lg:px-8 flex items-center justify-between relative">
          
          {/* Left Side: Logo & Subtitle */}
          <div className="flex flex-col justify-center h-full py-4 select-none">
            <Link href="/" className="group block">
              <h1 
                className="font-serif font-semibold text-[#5C1414] dark:text-[#E2C293] leading-none transition-all group-hover:opacity-90"
                style={{
                  fontSize: "clamp(28px, 4vw, 64px)",
                  letterSpacing: "-0.02em",
                  fontVariant: "small-caps"
                }}
              >
                Aryan Art Gallery
              </h1>
            </Link>
            <p 
              className="font-sans font-medium text-[#5C1414]/90 dark:text-[#E2C293]/80 uppercase mt-2 tracking-[0.07em]"
              style={{
                fontSize: "clamp(10px, 1.2vw, 21px)",
                lineHeight: "1.2"
              }}
            >
              INDIAN OLD, MODERN & CONTEMPORARY ARTS
            </p>
          </div>

          {/* Right Side: Actions & Triggers */}
          <div className="flex items-center space-x-6 md:space-x-12">
            
            {/* Theme Toggle (subtle, elegant) */}
            {mounted && (
              <button
                onClick={toggleTheme}
                className="text-[#5C1414] dark:text-[#E2C293] hover:opacity-80 transition-opacity cursor-pointer p-1"
                aria-label="Toggle theme"
              >
                {resolvedTheme === "dark" ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </button>
            )}

            {/* SEARCH trigger (Small Search Bar on desktop, Icon on mobile) */}
            <div
              onClick={() => setIsSearchOpen(true)}
              className="hidden md:flex items-center gap-2 bg-[#5C1414]/5 dark:bg-[#E2C293]/5 border border-[#5C1414]/10 dark:border-[#E2C293]/10 hover:border-[#5C1414]/20 dark:hover:border-[#E2C293]/20 rounded-full px-3 py-1.5 cursor-pointer hover:bg-[#5C1414]/10 dark:hover:bg-[#E2C293]/10 transition-all text-xs text-[#5C1414]/70 dark:text-[#E2C293]/70 font-sans tracking-[0.05em] uppercase w-44 select-none"
            >
              <Search className="h-3.5 w-3.5 text-[#5C1414] dark:text-[#E2C293] stroke-[1.5]" />
              <span className="opacity-30">Search...</span>
            </div>

            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex md:hidden items-center text-[#5C1414] dark:text-[#E2C293] hover:opacity-85 transition-opacity cursor-pointer bg-transparent border-none p-1"
              aria-label="Search"
            >
              <Search className="h-5 w-5 stroke-[1.5]" />
            </button>

            {/* MENU trigger (Icon only) */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="flex items-center text-[#5C1414] dark:text-[#E2C293] hover:opacity-85 transition-opacity cursor-pointer bg-transparent border-none p-1"
              aria-label="Menu"
            >
              <Menu className="h-5 w-5 stroke-[1.5]" />
            </button>
          </div>
        </div>
      </header>

      {/* Drawer Overlay Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex justify-end font-sans">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity duration-300"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Drawer panel */}
          <div className="relative w-full max-w-md h-full bg-[#F5F2EB] dark:bg-[#1A1817] shadow-2xl p-8 flex flex-col justify-between z-10 border-l border-[#5C1414]/20 transition-transform duration-300">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-6 border-b border-[#5C1414]/15">
                <span className="font-serif text-2xl font-semibold text-[#5C1414] dark:text-[#E2C293]">
                  ARYAN ART
                </span>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1 rounded-full text-[#5C1414] dark:text-[#E2C293] hover:bg-[#5C1414]/5 cursor-pointer bg-transparent border-none"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="flex flex-col space-y-6 pt-10">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`text-xl font-medium tracking-[0.05em] uppercase hover:text-[#5C1414]/80 transition-colors ${
                        isActive ? "text-[#5C1414] dark:text-[#E2C293] font-bold border-l-2 border-[#5C1414] pl-3" : "text-[#78716C] dark:text-stone-300"
                      }`}
                    >
                      {link.name}
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Footer / Contact Details inside menu */}
            <div className="border-t border-[#5C1414]/15 pt-6 space-y-4">
              {/* Mobile Search Button */}
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsSearchOpen(true);
                }}
                className="w-full flex items-center justify-center gap-2 py-3 bg-[#5C1414] hover:bg-[#5C1414]/90 text-[#F5F2EB] text-sm font-semibold uppercase tracking-wider rounded transition-colors cursor-pointer border-none"
              >
                <Search className="h-4 w-4" />
                Search Gallery
              </button>

              <div className="text-xs text-[#78716C] dark:text-stone-400 space-y-1">
                <p className="font-semibold text-[#5C1414] dark:text-[#E2C293]">Aryan Art Gallery</p>
                <p>D-33 Defence Colony, New Delhi 110024</p>
                <p>Email: info@aryanartgallery.com</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
