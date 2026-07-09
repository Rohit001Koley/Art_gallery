"use client";

import { useState } from "react";
import Link from "next/link";
import { MapPin, Mail, Phone, Clock, Send, Facebook, Instagram } from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;
    setSubscribed(true);
    setEmail("");
  };

  const handleMapClick = () => {
    const mapUrl =
      process.env.NEXT_PUBLIC_GOOGLE_MAPS_URL ||
      "https://maps.google.com/?q=Aryan+Art+Gallery+Mayfair+London";
    window.open(mapUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <footer className="bg-black border-t border-stone-900 mt-auto font-sans text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Gallery Info & Contact Card */}
          <div className="space-y-6">
            <div>
              <Link href="/" className="flex items-baseline">
                <span className="font-serif text-amber-500">
                  <span className="text-2xl font-bold">A</span>
                  <span className="text-sm font-light tracking-[0.05em]">RYAN</span>
                </span>
                <span className="font-serif text-white ml-1">
                  <span className="text-2xl font-bold">A</span>
                  <span className="text-sm font-light tracking-[0.05em]">RT</span>
                </span>
                <span className="font-serif text-white ml-1">
                  <span className="text-2xl font-bold">G</span>
                  <span className="text-sm font-light tracking-[0.05em]">ALLERY</span>
                </span>
              </Link>
              <p className="text-xs text-amber-500/80 mt-1 tracking-luxury uppercase font-semibold">
                Luxury Fine Art Gallery
              </p>
            </div>
            <p className="text-sm text-stone-300 leading-relaxed">
              Exhibiting masterworks of neoclassical surrealism, textured expressionist abstraction, and structural minimalism since 2012.
            </p>
            <div className="space-y-3 text-sm text-stone-200">
              <div className="flex items-start">
                <MapPin className="h-4.5 w-4.5 text-amber-500 mr-3 mt-0.5 flex-shrink-0" />
                <button
                  onClick={handleMapClick}
                  className="text-left hover:text-amber-400 transition-colors cursor-pointer leading-tight font-medium"
                >
                  12 Mayfair Gardens, London, W1S 4NS, UK
                </button>
              </div>
              <div className="flex items-center">
                <Phone className="h-4 w-4 text-amber-500 mr-3 flex-shrink-0" />
                <a href="tel:+442079460192" className="hover:text-amber-400 transition-colors font-medium">
                  +44 (20) 7946 0192
                </a>
              </div>
              <div className="flex items-center">
                <Mail className="h-4 w-4 text-amber-500 mr-3 flex-shrink-0" />
                <a href="mailto:info@aryanartgallery.com" className="hover:text-amber-400 transition-colors font-medium">
                  info@aryanartgallery.com
                </a>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-luxury text-white">
              The Gallery
            </h4>
            <ul className="space-y-2 text-sm text-stone-400">
              <li>
                <Link href="/artists" className="hover:text-amber-400 transition-colors">
                  Artists &amp; Roster
                </Link>
              </li>
              <li>
                <Link href="/exhibitions" className="hover:text-amber-400 transition-colors">
                  Exhibitions
                </Link>
              </li>
              <li>
                <Link href="/events" className="hover:text-amber-400 transition-colors">
                  Calendar &amp; Events
                </Link>
              </li>
              <li>
                <Link href="/press" className="hover:text-amber-400 transition-colors">
                  Press Releases
                </Link>
              </li>
              <li>
                <Link href="/publications" className="hover:text-amber-400 transition-colors">
                  Publications &amp; Catalogs
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-amber-400 transition-colors">
                  About Us &amp; Team
                </Link>
              </li>
            </ul>
          </div>

          {/* Gallery Hours */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-luxury text-white">
              Visiting Hours
            </h4>
            <div className="space-y-3 text-sm text-stone-400">
              <div className="flex items-start">
                <Clock className="h-4.5 w-4.5 text-amber-500 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-white">Monday – Friday</p>
                  <p className="text-xs">10:00 AM – 6:00 PM</p>
                </div>
              </div>
              <div className="flex items-start">
                <Clock className="h-4.5 w-4.5 text-amber-500 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-white">Saturday</p>
                  <p className="text-xs">11:00 AM – 5:00 PM</p>
                </div>
              </div>
              <div className="flex items-start">
                <Clock className="h-4.5 w-4.5 text-stone-600 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-stone-500">Sunday</p>
                  <p className="text-xs">Closed (Private Viewings Only)</p>
                </div>
              </div>
            </div>
          </div>

          {/* Newsletter Subscription */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-luxury text-white">
              Newsletter
            </h4>
            <p className="text-sm text-stone-400">
              Subscribe to receive exclusive invitations to exhibition openings, catalogue releases, and private acquisitions.
            </p>
            {subscribed ? (
              <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded text-amber-400 text-xs font-semibold">
                Thank you for subscribing to our mailing list.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  required
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-stone-900 border border-stone-800 rounded px-3 py-2 text-sm text-white placeholder-stone-500 outline-none w-full focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                />
                <button
                  type="submit"
                  className="bg-amber-500 hover:bg-amber-600 text-black p-2 rounded flex items-center justify-center transition-all cursor-pointer flex-shrink-0"
                  aria-label="Subscribe"
                >
                  <Send className="h-4 w-4" />
                </button>
              </form>
            )}
            {/* Social icons */}
            <div className="pt-4 flex items-center space-x-4">
              <a
                href="https://facebook.com/aryanartgallery"
                target="_blank"
                rel="noreferrer"
                className="text-stone-400 hover:text-amber-400 transition-colors"
                aria-label="Facebook Link"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://instagram.com/aryanartgallery"
                target="_blank"
                rel="noreferrer"
                className="text-stone-400 hover:text-amber-400 transition-colors"
                aria-label="Instagram Link"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="mailto:info@aryanartgallery.com"
                className="text-stone-400 hover:text-amber-400 transition-colors"
                aria-label="Send Email"
              >
                <Mail className="h-5 w-5" />
              </a>
              <button
                onClick={handleMapClick}
                className="text-stone-400 hover:text-amber-400 transition-colors cursor-pointer"
                aria-label="Open Gallery Map"
              >
                <MapPin className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Copyright info */}
        <div className="mt-16 pt-8 border-t border-stone-900 flex flex-col md:flex-row items-center justify-between text-xs text-stone-500 space-y-4 md:space-y-0">
          <p>&copy; {new Date().getFullYear()} Aryan Art Gallery. All rights reserved.</p>
          <div className="flex space-x-6">
            <Link href="/about" className="hover:text-amber-400 transition-colors">
              Visitor Information
            </Link>
            <Link href="/about#contact" className="hover:text-amber-400 transition-colors">
              Acquisition Inquiries
            </Link>
            <button onClick={handleMapClick} className="hover:text-amber-400 transition-colors cursor-pointer">
              Interactive Map
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
