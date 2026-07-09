"use client";

import { useState, useRef, MouseEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Maximize2, X, ZoomIn, ZoomOut } from "lucide-react";

interface ImageZoomProps {
  src: string;
  alt: string;
  className?: string;
}

export default function ImageZoom({ src, alt, className = "" }: ImageZoomProps) {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [lensPosition, setLensPosition] = useState({ x: 0, y: 0 });
  const [showLens, setShowLens] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setLensPosition({ x, y });
  };

  const handleToggleLightbox = () => {
    setIsLightboxOpen(!isLightboxOpen);
    setZoomLevel(1); // Reset zoom level on close/open
  };

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 0.5, 3));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 0.5, 1));

  return (
    <>
      {/* Detail Page Hover-Magnifier View */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setShowLens(true)}
        onMouseLeave={() => setShowLens(false)}
        onClick={handleToggleLightbox}
        className={`relative overflow-hidden cursor-zoom-in group select-none border border-border bg-muted/20 ${className}`}
      >
        {/* Main Image */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Hover overlay hint */}
        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="bg-black/75 text-white p-3 rounded-full flex items-center justify-center scale-90 group-hover:scale-100 transition-transform duration-300 shadow-lg">
            <Maximize2 className="h-5 w-5" />
          </div>
        </div>

        {/* Magnifying Lens Detail Panel (Shown on hover) */}
        {showLens && (
          <div
            className="absolute pointer-events-none border border-white/20 shadow-2xl rounded-full w-40 h-40 hidden md:block overflow-hidden"
            style={{
              left: `calc(${lensPosition.x}% - 80px)`,
              top: `calc(${lensPosition.y}% - 80px)`,
              background: `url(${src})`,
              backgroundSize: "800% 800%",
              backgroundPosition: `${lensPosition.x}% ${lensPosition.y}%`,
              backgroundRepeat: "no-repeat",
              boxShadow: "0 0 0 8px rgba(255,255,255,0.1), 0 20px 25px -5px rgba(0,0,0,0.5)",
            }}
          />
        )}
      </div>

      {/* Lightbox / Full-Screen Viewer */}
      <AnimatePresence>
        {isLightboxOpen && (
          <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/95 backdrop-blur-md">
            {/* Header controls */}
            <div className="absolute top-0 inset-x-0 h-16 flex items-center justify-between px-6 bg-gradient-to-b from-black/50 to-transparent text-white font-sans">
              <span className="text-sm font-medium tracking-luxury uppercase">{alt}</span>
              <div className="flex items-center space-x-4">
                <button
                  onClick={handleZoomIn}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors cursor-pointer"
                  title="Zoom In"
                >
                  <ZoomIn className="h-5 w-5" />
                </button>
                <button
                  onClick={handleZoomOut}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors cursor-pointer"
                  disabled={zoomLevel === 1}
                  title="Zoom Out"
                >
                  <ZoomOut className="h-5 w-5 disabled:opacity-30" />
                </button>
                <button
                  onClick={handleToggleLightbox}
                  className="p-2 bg-white/10 hover:bg-white/25 rounded-full transition-colors cursor-pointer"
                  title="Close"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Click backdrop to close */}
            <div className="absolute inset-0 -z-10" onClick={handleToggleLightbox} />

            {/* Zoomable Image Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="max-w-[90vw] max-h-[80vh] flex items-center justify-center overflow-hidden"
            >
              <motion.img
                src={src}
                alt={alt}
                style={{ scale: zoomLevel }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="max-w-full max-h-[80vh] object-contain rounded shadow-2xl cursor-grab active:cursor-grabbing select-none"
                drag={zoomLevel > 1}
                dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
              />
            </motion.div>

            {/* Subtext info */}
            <div className="absolute bottom-6 text-center text-white/60 text-xs font-sans">
              {zoomLevel > 1 ? (
                <span>Drag to pan around the artwork. Current magnification: {zoomLevel}x</span>
              ) : (
                <span>Click outside or press ESC to close.</span>
              )}
            </div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
