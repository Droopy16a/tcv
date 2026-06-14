"use client";

import { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { calendarEvents, EventCategory } from "./data";

const fadeIn: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const monthNames: Record<number, string> = {
  1: "Septembre 2026",
  2: "Octobre 2026",
  3: "Novembre 2026",
  4: "Décembre 2026",
  5: "Janvier 2027",
  6: "Février 2027",
  7: "Mars 2027",
  8: "Avril 2027",
  9: "Mai 2027",
  10: "Juin 2027",
  11: "Juillet 2027",
  12: "Août 2027",
};

export default function CalendrierPage() {
  const [activeFilter, setActiveFilter] = useState<EventCategory | "Tous">("Tous");

  const filters: (EventCategory | "Tous")[] = ["Tous", "Stages", "Événements", "Tournois", "Interclubs", "Informations"];

  // Filtrer et trier les événements
  const filteredEvents = calendarEvents
    .filter((event) => activeFilter === "Tous" || event.category === activeFilter)
    .sort((a, b) => a.sortOrder - b.sortOrder);

  // Grouper par mois
  const groupedEvents = filteredEvents.reduce((acc, event) => {
    if (!acc[event.sortOrder]) {
      acc[event.sortOrder] = [];
    }
    acc[event.sortOrder].push(event);
    return acc;
  }, {} as Record<number, typeof calendarEvents>);

  // Couleurs par catégorie
  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Stages": return "bg-green-100 text-green-800 border-green-200";
      case "Événements": return "bg-blue-100 text-blue-800 border-blue-200";
      case "Tournois": return "bg-orange-100 text-orange-800 border-orange-200";
      case "Interclubs": return "bg-purple-100 text-purple-800 border-purple-200";
      case "Informations": return "bg-gray-100 text-gray-800 border-gray-200";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="bg-[#FAFAFA] min-h-screen pt-32 pb-24">
      <div className="container mx-auto px-6 max-w-5xl">
        
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2 
            initial="hidden" animate="visible" variants={fadeIn}
            className="text-[#DF6436] font-bold uppercase tracking-widest text-sm mb-4"
          >
            Saison 2026 - 2027
          </motion.h2>
          <motion.h1 
            initial="hidden" animate="visible" variants={fadeIn}
            transition={{ delay: 0.1 }}
            className="font-heading font-black text-5xl md:text-7xl uppercase tracking-tighter text-black"
          >
            Le Calendrier
          </motion.h1>
          <motion.p 
            initial="hidden" animate="visible" variants={fadeIn}
            transition={{ delay: 0.2 }}
            className="mt-6 text-xl font-light text-gray-500 max-w-2xl mx-auto"
          >
            Retrouvez toutes les dates importantes de la saison : événements, tournois, stages et interclubs du TC Vernouillet.
          </motion.p>
        </div>

        {/* Filtres */}
        <motion.div 
          initial="hidden" animate="visible" variants={fadeIn}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap justify-center gap-3 mb-16 sticky top-24 z-10 bg-[#FAFAFA]/90 backdrop-blur-md py-4"
        >
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-6 py-3 font-bold uppercase tracking-widest text-xs transition-all border ${
                activeFilter === filter
                  ? "bg-black text-white border-black"
                  : "bg-white text-gray-500 border-gray-200 hover:border-[#DF6436] hover:text-[#DF6436]"
              }`}
            >
              {filter}
            </button>
          ))}
        </motion.div>

        {/* Timeline */}
        <div className="space-y-16">
          {Object.keys(groupedEvents).length === 0 ? (
            <div className="text-center py-20 text-gray-400 font-light text-xl">
              Aucun événement trouvé pour cette catégorie.
            </div>
          ) : (
            Object.keys(groupedEvents)
              .map(Number)
              .sort((a, b) => a - b)
              .map((monthKey) => (
                <div key={monthKey} className="relative">
                  
                  {/* Ligne verticale de la timeline (visible sur desktop) */}
                  <div className="hidden md:block absolute left-48 top-0 bottom-0 w-px bg-gray-200 -z-10"></div>

                  <h3 className="font-heading w-full font-black text-3xl uppercase tracking-tight text-black mb-8 md:sticky md:top-48 bg-[#FAFAFA] py-2 inline-block z-1">
                    {monthNames[monthKey]}
                  </h3>
                  
                  <div className="space-y-6">
                    <AnimatePresence>
                      {groupedEvents[monthKey].map((event) => (
                        <div
                          key={event.id}
                          className="bg-white border border-gray-100 shadow-sm hover:shadow-md hover:border-[#DF6436]/30 transition-all group flex flex-col md:flex-row overflow-hidden"
                        >
                          {/* Date Block */}
                          <div className="bg-gray-50 border-b md:border-b-0 md:border-r border-gray-100 p-6 flex flex-col justify-center items-center md:w-48 shrink-0 group-hover:bg-[#DF6436]/5 transition-colors">
                            <span className="font-heading font-black text-2xl text-[#DF6436] text-center uppercase leading-tight">
                              {event.dateString}
                            </span>
                          </div>
                          
                          {/* Info Block */}
                          <div className="p-6 flex-grow flex flex-col justify-center">
                            <div className="flex items-start justify-between gap-4 mb-2">
                              <h4 className="font-bold text-xl text-black group-hover:text-[#DF6436] transition-colors">
                                {event.title}
                              </h4>
                              <span className={`px-3 py-1 text-[10px] font-bold uppercase tracking-widest border rounded-sm whitespace-nowrap ${getCategoryColor(event.category)}`}>
                                {event.category}
                              </span>
                            </div>
                            <p className="font-light text-gray-600 text-lg">
                              {event.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </AnimatePresence>
                  </div>
                </div>
              ))
          )}
        </div>

      </div>
    </div>
  );
}
