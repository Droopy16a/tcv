"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";

type TeamMember = {
  id: number;
  name: string;
  role: string;
  image: string;
};

const equipeDirigeante: TeamMember[] = [
  {
    id: 1,
    name: "Jerome ESTEVES",
    role: "Président",
    image: "/images/unk.png",
  },
  {
    id: 2,
    name: "Annick LEDUC",
    role: "Secrétaire Générale Trésorière Générale Adjointe",
    image: "/images/unk.png",
  },
  {
    id: 3,
    name: "Cecile GADREY",
    role: "Trésorière Générale",
    image: "/images/unk.png",
  },
  {
    id: 4,
    name: "Eric CHENOT",
    role: "Membre",
    image: "/images/unk.png",
  },
  {
    id: 5,
    name: "Gilles HOUDART",
    role: "Membre",
    image: "/images/unk.png",
  },
  {
    id: 6,
    name: "Eric TEYSSANDIER",
    role: "Président d'Honneur",
    image: "/images/unk.png",
  },
  {
    id: 13,
    name: "Sébastien ROYON",
    role: "Membre",
    image: "/images/unk.png",
  },
];

const equipePedagogique: TeamMember[] = [
  {
    id: 7,
    name: "Alice LEDUC",
    role: "DE JEPS\nDirectrice sportive\nEnseignante compétition & loisir école de tennis et adultes",
    image: "/images/unk.png",
  },
  {
    id: 8,
    name: "David GODARD",
    role: "BE 1\nEnseignant compétition école de tennis et adultes",
    image: "/images/unk.png",
  },
  {
    id: 9,
    name: "Jeremy PHILIPPE",
    role: "Initiateur 1\nEnseignant loisir adultes",
    image: "/images/unk.png",
  },
  {
    id: 10,
    name: "Naomy CHALA",
    role: "Stagiaire DE JEPS",
    image: "/images/unk.png",
  },
  {
    id: 11,
    name: "Kaïs LEBLOND",
    role: "CQP ET\nEnseignement loisir école de tennis",
    image: "/images/unk.png",
  },
  {
    id: 12,
    name: "François Sébastien OCZKOWSKI",
    role: "CQP ET\nEnseignant loisir école de tennis et adultes",
    image: "/images/unk.png",
  },
  {
    id: 13,
    name: "Liam Burnham",
    role: "Stagiaire CQP ET",
    image: "/images/unk.png",
  }
];

function SliderCarousel({ title, members }: { title: string; members: TeamMember[] }) {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const handleScroll = () => {
    if (sliderRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
      const maxScroll = scrollWidth - clientWidth;
      const progress = maxScroll > 0 ? (scrollLeft / maxScroll) * 100 : 0;
      setScrollProgress(progress);
    }
  };

  useEffect(() => {
    handleScroll();
    window.addEventListener("resize", handleScroll);
    return () => window.removeEventListener("resize", handleScroll);
  }, []);

  const scrollLeftBtn = () => {
    if (sliderRef.current) {
      const { clientWidth } = sliderRef.current;
      sliderRef.current.scrollBy({ left: -clientWidth * 0.8, behavior: "smooth" });
    }
  };

  const scrollRightBtn = () => {
    if (sliderRef.current) {
      const { clientWidth } = sliderRef.current;
      sliderRef.current.scrollBy({ left: clientWidth * 0.8, behavior: "smooth" });
    }
  };

  return (
    <div className="mb-24 last:mb-0">
      <div className="container mx-auto px-6 mb-8">
        <motion.h3 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-heading font-black text-2xl md:text-3xl text-accent uppercase tracking-tighter"
        >
          {title}
        </motion.h3>
      </div>

      <div className="relative pl-6 md:pl-0">
        {/* Slider Container */}
        <div 
          ref={sliderRef}
          onScroll={handleScroll}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-8 md:pl-[max(1.5rem,calc((100vw-88rem)/2))] pr-6 md:pr-[max(1.5rem,calc((100vw-88rem)/2))]"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {members.map((member, index) => (
            <motion.div 
              key={member.id}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "0px -50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="flex-none w-[280px] md:w-[350px] lg:w-[400px] snap-start group"
            >
              {/* Image Card */}
              <div className="relative aspect-[3/4] w-full overflow-hidden mb-6 cursor-pointer">
                <Image 
                  src={member.image} 
                  alt={member.name} 
                  fill 
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500"></div>
              </div>

              {/* Info */}
              <h4 className="font-heading font-black text-2xl md:text-3xl text-white uppercase tracking-tight mb-2">
                {member.name}
              </h4>
              <p className="text-gray-400 font-medium text-sm md:text-base border border-gray-800 inline-block px-3 py-1 whitespace-pre-wrap">
                {member.role}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Controls Container */}
      <div className="container mx-auto px-6 mt-4">
        <div className="flex items-center justify-between border-t border-gray-800 pt-8">
          
          {/* Progress Bar */}
          <div className="w-full h-[2px] bg-gray-800 relative">
            <div 
              className="absolute top-0 left-0 h-full bg-white transition-all duration-150 ease-out"
              style={{ width: `${scrollProgress}%` }}
            ></div>
          </div>

          {/* Navigation Arrows */}
          <div className="flex gap-4 ml-8">
            <button 
              onClick={scrollLeftBtn}
              className="w-12 h-12 rounded-full border border-gray-700 flex items-center justify-center hover:bg-white hover:text-black hover:border-white transition-all group shrink-0"
              aria-label="Scroll left"
            >
              <ArrowLeft size={20} className="text-gray-400 group-hover:text-black transition-colors" />
            </button>
            <button 
              onClick={scrollRightBtn}
              className="w-12 h-12 rounded-full border border-gray-700 flex items-center justify-center hover:bg-white hover:text-black hover:border-white transition-all group shrink-0"
              aria-label="Scroll right"
            >
              <ArrowRight size={20} className="text-gray-400 group-hover:text-black transition-colors" />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default function TeamSlider() {
  return (
    <section id="teams" className="bg-[#111] py-24 md:py-32 text-white overflow-hidden">
      <div className="container mx-auto px-6 mb-16">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="font-heading font-black text-4xl md:text-6xl uppercase tracking-tighter mb-4"
        >
          Notre Équipe
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-gray-400 text-lg md:text-xl font-light max-w-2xl"
        >
          Des passionnés expérimentés et diplômés pour vous faire progresser dans les meilleures conditions.
        </motion.p>
      </div>

      <SliderCarousel title="Notre équipe dirigeante" members={equipeDirigeante} />
      <SliderCarousel title="Notre équipe pédagogique" members={equipePedagogique} />
    </section>
  );
}
