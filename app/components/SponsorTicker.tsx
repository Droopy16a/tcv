"use client";

/**
 * SponsorTicker — infinite horizontal marquee of sponsor logos.
 * Replace the placeholder items with <img> tags pointing to real logo files
 * once you have them (e.g. /images/sponsors/babolat.svg).
 */

const sponsors = [
  { name: "EcoSport", logo: "images/ecosport.png" },
  { name: "New Protech", logo: "images/protect.png" },
  { name: "ACS Plus", logo: "images/acs.png" },
  { name: "FFT", logo: "images/fft.png" },
  { name: "Yvelines", logo: "images/comite.png" },
];

export default function SponsorTicker() {
  const items = [...sponsors, ...sponsors];

  return (
    <div className="pt-10 mt-12 overflow-hidden w-full">
      <p className="text-center text-xs font-bold uppercase tracking-widest text-gray-300 mb-6">
        Nos Partenaires
      </p>
      <div className="relative flex w-full">
        {/* Fade masks on edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-white to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-white to-transparent pointer-events-none" />

        {/* Scrolling track */}
        <div
          className="flex w-max pr-16 gap-16 items-center animate-ticker whitespace-nowrap"
          style={{ willChange: "transform" }}
        >
          {items.map((sponsor, i) => (
            <div
              key={i}
              className="flex items-center gap-2 shrink-0 opacity-30 hover:opacity-60 transition-opacity duration-500"
            >
              {sponsor.logo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={sponsor.logo}
                  alt={sponsor.name}
                  className="h-30 w-auto object-contain grayscale"
                />
              ) : (
                <span className="font-heading font-black text-xl uppercase tracking-widest text-gray-400 select-none">
                  {sponsor.name}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
