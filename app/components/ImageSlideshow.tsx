"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface ImageSlideshowProps {
  images: { src: string; alt: string }[];
  /** Tailwind height class, e.g. "h-[600px]" */
  heightClass?: string;
  /** Auto-play interval in ms. Set to 0 to disable. */
  interval?: number;
  /** Accent color for dots and controls */
  dark?: boolean;
  btn?: boolean;
}

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] as const },
  },
  exit: (direction: number) => ({
    x: direction > 0 ? "-100%" : "100%",
    opacity: 0,
    transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] as const },
  }),
};

export default function ImageSlideshow({
  images,
  heightClass = "h-[600px]",
  interval = 4000,
  dark = false,
  btn = true,
}: ImageSlideshowProps) {
  const [[current, direction], setCurrent] = useState([0, 0]);

  const goTo = useCallback(
    (next: number, dir: number) => {
      setCurrent([(next + images.length) % images.length, dir]);
    },
    [images.length]
  );

  const next = useCallback(() => goTo(current + 1, 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1, -1), [current, goTo]);

  // Touch / swipe support
  const touchStartX = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 40) {
      delta < 0 ? next() : prev();
    }
    touchStartX.current = null;
  };

  useEffect(() => {
    if (!interval || images.length < 2) return;
    const id = setInterval(next, interval);
    return () => clearInterval(id);
  }, [interval, next, images.length]);

  if (!images.length) return null;

  const dotActive = dark ? "bg-white" : "bg-black";
  const dotInactive = dark ? "bg-white/30" : "bg-black/20";
  const btnBase = dark
    ? "border-white/30 text-white hover:bg-white hover:text-black"
    : "border-black/20 text-black hover:bg-black hover:text-white";

  return (
    <div
      className={`relative w-full ${heightClass} overflow-hidden group`}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <AnimatePresence initial={false} custom={direction} mode="sync">
        <motion.div
          key={current}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute inset-0"
        >
          <Image
            src={images[current].src}
            alt={images[current].alt}
            fill
            className="object-cover"
            priority
          />
        </motion.div>
      </AnimatePresence>

      {/* Gradient overlay bottom */}
      <div className={`absolute inset-0 bg-gradient-to-t ${dark ? "from-[#111]/60" : "from-white/30"} to-transparent pointer-events-none`} />

      {/* Arrow controls – visible on hover */}
      {images.length > 1 && btn && (
        <>
          <button
            onClick={prev}
            aria-label="Image précédente"
            className={`absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 ${btnBase}`}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
          </button>
          <button
            onClick={next}
            aria-label="Image suivante"
            className={`absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 ${btnBase}`}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
          </button>
        </>
      )}

      {/* Dot indicators */}
      {images.length > 1 && btn && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i, i > current ? 1 : -1)}
              aria-label={`Slide ${i + 1}`}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${i === current ? `${dotActive} w-6` : dotInactive}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
