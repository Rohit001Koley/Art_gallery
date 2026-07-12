"use client";

import { useState } from "react";
import Link from "next/link";
import { Facebook, Instagram, Linkedin, Youtube, ArrowRight, MapPin, Phone, Mail, Clock } from "lucide-react";

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
      "https://maps.google.com/?q=Aryan+Art+Gallery+Defence+Colony+New+Delhi";
    window.open(mapUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <footer className="w-full flex flex-col mt-auto font-sans text-white">
      <section 
        className="w-full bg-[#1B1712] py-16 md:py-24 px-6 lg:px-8 border-b border-[#B08442]/20"
        style={{ minHeight: "626px" }}
      >
        <div className="max-w-7xl mx-auto flex flex-col justify-between h-full space-y-16">
          
          {/* Main Grid Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
            
            {/* Column 1: Visit The Gallery Info */}
            <div className="space-y-6">
              <h3 className="font-sans font-bold text-xl uppercase tracking-[0.07em] text-white">
                VISIT THE GALLERY
              </h3>
              <div 
                className="font-sans font-medium text-white/90 space-y-3 leading-relaxed tracking-[0.07em]"
                style={{ fontSize: "16px" }}
              >
                <button
                  onClick={handleMapClick}
                  className="text-left hover:text-[#B08442] transition-colors font-medium flex items-start gap-2"
                >
                  <MapPin className="h-5 w-5 mt-1 flex-shrink-0 text-[#B08442]" />
                  <span>D-33 Defence Colony, New Delhi 110024</span>
                </button>
                <p className="pl-7">Walk-ins are welcome during opening hours.</p>
                <p className="pl-7">
                  For private viewings, valuation or works currently in the viewing room, we recommend an appointment.
                </p>
              </div>
            </div>

            {/* Column 2: Telephone / Appointments / Hours / Email */}
            <div className="space-y-10">
              {/* Telephone & Appointments */}
              <div className="space-y-4">
                <h3 className="font-sans font-bold text-lg uppercase tracking-[0.07em] text-[#BFBFBF]">
                  CONTACT & VIEWINIGS
                </h3>
                <div 
                  className="font-sans font-medium text-[#BFBFBF] space-y-2 leading-relaxed tracking-[0.07em]"
                  style={{ fontSize: "16px" }}
                >
                  <p className="flex items-center gap-2">
                    <Phone className="h-4.5 w-4.5 text-[#B08442]" />
                    <span>011-41551277 / 011-41550709</span>
                  </p>
                  <p className="pt-2 font-semibold text-white">APPOINTMENTS</p>
                  <p className="text-white/80">Request a private viewing</p>
                </div>
              </div>

              {/* Hours & Email */}
              <div className="space-y-4">
                <h3 className="font-sans font-bold text-lg uppercase tracking-[0.07em] text-[#BFBFBF]">
                  GALLERY HOURS
                </h3>
                <div 
                  className="font-sans font-medium text-[#BFBFBF] space-y-2 leading-relaxed tracking-[0.07em]"
                  style={{ fontSize: "16px" }}
                >
                  <p className="flex items-center gap-2">
                    <Clock className="h-4.5 w-4.5 text-[#B08442]" />
                    <span>Monday - Saturday 10am - 5pm</span>
                  </p>
                  <p className="pt-2 font-semibold text-white">EMAIL</p>
                  <a 
                    href="mailto:aryanartgallery@gmail.com" 
                    className="hover:text-[#B08442] transition-colors flex items-center gap-2"
                  >
                    <Mail className="h-4.5 w-4.5 text-[#B08442]" />
                    <span>aryanartgallery@gmail.com</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Column 3: Mailing List Subscription */}
            <div className="space-y-6 lg:max-w-md">
              <h3 className="font-sans font-medium text-lg uppercase tracking-[0.2em] text-[#B08442]">
                JOIN OUR MAILING LIST
              </h3>

              {subscribed ? (
                <div className="p-4 bg-emerald-950/40 border border-emerald-500/30 rounded text-emerald-300 text-sm font-medium">
                  Thank you for subscribing to our mailing list.
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="space-y-4">
                  <div className="flex flex-col sm:flex-row gap-2 items-stretch">
                    <input
                      type="email"
                      required
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-[#F5F1EA] text-[#000000] border-none px-4 py-3 text-sm placeholder-stone-600 outline-none w-full focus:ring-2 focus:ring-[#B08442] font-sans tracking-[0.1em]"
                    />
                    <button
                      type="submit"
                      className="bg-[#B08442] hover:bg-[#966d33] text-white px-6 py-3 flex items-center justify-center transition-all cursor-pointer flex-shrink-0"
                      aria-label="Subscribe"
                    >
                      <ArrowRight className="h-5 w-5" />
                    </button>
                  </div>
                  <p className="text-white text-xs md:text-sm tracking-[0.1em] uppercase leading-relaxed font-sans mt-2">
                    STAY UPDATED WITH EVENTS, EXHIBITIONS AND NEWS
                  </p>
                </form>
              )}
            </div>

          </div>

          {/* Social Icons row (placed absolutely near bottom right on desktop) */}
          <div className="flex items-center space-x-3 pt-8 border-t border-white/10">
            <a
              href="https://facebook.com/aryanartgallery"
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 flex items-center justify-center rounded bg-stone-900/30 hover:bg-stone-900/50 text-[#828282] hover:text-white transition-all"
              aria-label="Facebook Link"
            >
              <Facebook className="h-5 w-5" />
            </a>
            <a
              href="https://instagram.com/aryanartgallery"
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 flex items-center justify-center rounded bg-stone-900/30 hover:bg-stone-900/50 text-[#828282] hover:text-white transition-all"
              aria-label="Instagram Link"
            >
              <Instagram className="h-5 w-5" />
            </a>
            <a
              href="https://linkedin.com/company/aryanartgallery"
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 flex items-center justify-center rounded bg-stone-900/30 hover:bg-stone-900/50 text-[#828282] hover:text-white transition-all"
              aria-label="LinkedIn Link"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a
              href="https://youtube.com/aryanartgallery"
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 flex items-center justify-center rounded bg-stone-900/30 hover:bg-stone-900/50 text-[#828282] hover:text-white transition-all"
              aria-label="YouTube Link"
            >
              <Youtube className="h-5 w-5" />
            </a>
          </div>

        </div>
      </section>

      {/* 2. Lower Footer Section (Dark Slate Brown) */}
      <section 
        className="w-full bg-[#1B1712] py-8 px-6 lg:px-8 flex flex-col items-center justify-center text-center space-y-4"
        style={{ minHeight: "153px" }}
      >
        <div className="w-full max-w-5xl flex flex-col items-center space-y-2">
          
          <h2 className="font-serif font-medium text-[#B08442] tracking-normal leading-none" style={{ fontSize: "clamp(24px, 4vw, 50px)" }}>
            ARYAN ART GALLERY
          </h2>
          
          <p className="font-sans font-light text-[#B08442] uppercase tracking-[0.07em] leading-normal" style={{ fontSize: "clamp(12px, 2vw, 21px)" }}>
            INDIAN OLD, MODERN & CONTEMPORARY ARTS
          </p>

          <div className="w-full max-w-4xl h-[1px] bg-[#B08442]/30 my-2" />

          <p className="font-sans font-light text-[#E0E0E0] uppercase tracking-[0.07em] leading-normal" style={{ fontSize: "clamp(10px, 1.5vw, 18px)" }}>
            &copy; 2026 ARYAN ART GALLERY &middot; ALL RIGHTS RESERVED
          </p>

        </div>
      </section>
    </footer>
  );
}
