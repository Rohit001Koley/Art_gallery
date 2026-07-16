"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Menu, X } from "lucide-react";
import SearchModal from "../SearchModal";

export default function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Artists", href: "/artists" },
    { name: "Exhibitions", href: "/exhibitions" },
    { name: "Events", href: "/events" },
    { name: "Press", href: "/press" },
    { name: "Publications", href: "/publications" },
    { name: "About Us", href: "/about" },
  ];



  return (
    <>
      <header
        className="w-full bg-[#F5F2EB] border-b border-[#5C1414]/10 relative z-40"
        style={{ height: "104px" }}
      >
        <div className="w-full h-full px-6 lg:px-8 flex items-center justify-between relative">
          
          {/* Left Side: Logo & Subtitle */}
          <div className="flex flex-col justify-center h-full py-4 select-none">
            <Link href="/" className="group block">
              <h1 
                className="font-serif font-semibold text-[#5C1414] leading-none transition-all group-hover:opacity-90"
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
              className="font-sans font-medium text-[#5C1414]/90 uppercase mt-2 tracking-[0.07em]"
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
            {/* SEARCH trigger (Small Search Bar on desktop, Icon on mobile) */}
            <div
              onClick={() => setIsSearchOpen(true)}
              className="hidden md:flex items-center gap-2 bg-[#5C1414]/5 border border-[#5C1414]/10 hover:border-[#5C1414]/20 rounded-full px-3 py-1.5 cursor-pointer hover:bg-[#5C1414]/10 transition-all text-xs text-[#5C1414]/70 font-sans tracking-[0.05em] uppercase w-44 select-none"
            >
              <Search className="h-3.5 w-3.5 text-[#5C1414] stroke-[1.5]" />
              <span className="opacity-30">Search...</span>
            </div>

            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex md:hidden items-center text-[#5C1414] hover:opacity-85 transition-opacity cursor-pointer bg-transparent border-none p-1"
              aria-label="Search"
            >
              <Search className="h-5 w-5 stroke-[1.5]" />
            </button>

            {/* MENU trigger (Icon only) */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="flex items-center text-[#5C1414] hover:opacity-85 transition-opacity cursor-pointer bg-transparent border-none p-1"
              aria-label="Menu"
            >
              <Menu className="h-5 w-5 stroke-[1.5]" />
            </button>
          </div>
        </div>
      </header>

      {/* Floating Compact Menu Panel */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex justify-end font-sans pointer-events-none">
          {/* Transparent Backdrop to close on click outside */}
          <div
            className="fixed inset-0 pointer-events-auto bg-black/5"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Compressed menu container */}
          <div className="relative pointer-events-auto w-64 h-auto max-h-[calc(100vh-140px)] bg-[#F5F2EB] shadow-2xl p-5 z-10 border border-[#5C1414]/15 rounded mt-[108px] mr-6 md:mr-8 flex flex-col space-y-4 overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-[#5C1414]/15">
              <span className="font-serif text-sm font-semibold text-[#5C1414] tracking-wide">
                Menu
              </span>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-1 rounded-full text-[#5C1414] hover:bg-[#5C1414]/5 cursor-pointer bg-transparent border-none"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Navigation Links */}
            <nav className="flex flex-col space-y-3">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`text-xs font-semibold tracking-wider uppercase hover:text-[#5C1414] transition-colors ${
                      isActive ? "text-[#5C1414] font-bold border-l-2 border-[#5C1414] pl-2" : "text-[#78716C]"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>

            {/* Footer / Search Button in menu */}
            <div className="border-t border-[#5C1414]/15 pt-4 flex flex-col space-y-3">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsSearchOpen(true);
                }}
                className="w-full flex items-center justify-center gap-1.5 py-2 bg-[#5C1414] hover:bg-[#5C1414]/90 text-[#F5F2EB] text-xs font-semibold uppercase tracking-wider rounded transition-colors cursor-pointer border-none"
              >
                <Search className="h-3.5 w-3.5" />
                Search Gallery
              </button>

              <div className="text-[10px] text-[#78716C] leading-normal">
                <p className="font-semibold text-[#5C1414]">Aryan Art Gallery</p>
                <p>New Delhi 110024</p>
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
