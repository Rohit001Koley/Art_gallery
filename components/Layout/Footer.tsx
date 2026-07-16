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
    <footer 
      className="w-full flex flex-col mt-auto font-sans text-white bg-[#1B1712]"
    >
      <section 
        className="w-full bg-[#5D1414] py-8 md:py-12 px-6 lg:px-8 border-b border-[#B08442]/20"
        style={{ minHeight: "347px" }}
      >
        <div className="w-full h-full flex flex-col justify-between space-y-16">
          
          {/* Main Grid Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
            
            {/* Column 1: Visit The Gallery Info */}
            <div className="space-y-6 flex flex-col justify-between h-full">
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

              {/* Social Icons row */}
              <div className="flex items-center space-x-5 pt-6 border-t border-white/10 mt-6 max-w-[200px]">
                <a
                  href="https://facebook.com/aryanartgallery"
                  target="_blank"
                  rel="noreferrer"
                  className="text-white hover:opacity-80 transition-opacity"
                  aria-label="Facebook Link"
                >
                  <Facebook className="h-5 w-5" />
                </a>
                <a
                  href="https://instagram.com/aryanartgallery"
                  target="_blank"
                  rel="noreferrer"
                  className="text-white hover:opacity-80 transition-opacity"
                  aria-label="Instagram Link"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a
                  href="https://linkedin.com/company/aryanartgallery"
                  target="_blank"
                  rel="noreferrer"
                  className="text-white hover:opacity-80 transition-opacity"
                  aria-label="LinkedIn Link"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
                <a
                  href="https://youtube.com/aryanartgallery"
                  target="_blank"
                  rel="noreferrer"
                  className="text-white hover:opacity-80 transition-opacity"
                  aria-label="YouTube Link"
                >
                  <Youtube className="h-5 w-5" />
                </a>
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
            <div className="space-y-6 lg:max-w-md lg:self-end">
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

        </div>
      </section>

      {/* 2. Lower Footer Section */}
      <section 
        className="w-full bg-[#1B1712] border-t border-[#5C1414]/10 transition-colors duration-300 relative z-40 pt-0 pb-4 flex flex-col items-center"
      >
        {/* Top: Centered Logo & Subtitle */}
        <div className="w-full px-6 lg:px-8 flex flex-col items-center select-none text-center mb-2">
          <h2 
            className="font-serif font-semibold text-[#E2C293] leading-none"
            style={{
              fontSize: "clamp(22px, 3vw, 42px)",
              letterSpacing: "-0.01em",
              fontVariant: "small-caps"
            }}
          >
            Aryan Art Gallery
          </h2>
          <p 
            className="font-sans font-medium text-[#E2C293]/80 uppercase mt-1 tracking-[0.07em]"
            style={{
              fontSize: "clamp(9px, 0.9vw, 14px)",
              lineHeight: "1.2"
            }}
          >
            INDIAN OLD, MODERN & CONTEMPORARY ARTS
          </p>
        </div>

        {/* Golden horizontal line spanning truly 100% full width */}
        <div className="w-full h-[1px] bg-[#B08442]/30 my-2" />

        {/* Bottom: Centered Copyright */}
        <div className="w-full px-6 lg:px-8 text-center mt-1">
          <p className="font-sans font-normal text-[#E0E0E0] uppercase tracking-[0.07em] text-xs">
            &copy; 2026 ARYAN ART GALLERY &middot; ALL RIGHTS RESERVED
          </p>
        </div>
      </section>
    </footer>
  );
}
