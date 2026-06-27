"use client";

import Image from "next/image";
import { motion, Variants } from "framer-motion";

export default function TerrainsPage() {
  const fadeIn: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <div className="bg-[#FAFAFA] min-h-screen pt-32 pb-24">
      {/* Hero Section */}
      <div className="container mx-auto px-6 max-w-6xl text-center mb-24">
        <motion.h2 
          initial="hidden" animate="visible" variants={fadeIn}
          className="text-[#DF6436] font-bold uppercase tracking-widest text-sm mb-4"
        >
          Infrastructures
        </motion.h2>
        <motion.h1 
          initial="hidden" animate="visible" variants={fadeIn} transition={{ delay: 0.1 }}
          className="font-heading font-black text-5xl md:text-7xl uppercase tracking-tighter text-black"
        >
          Nos Terrains
        </motion.h1>
        <motion.p 
          initial="hidden" animate="visible" variants={fadeIn} transition={{ delay: 0.2 }}
          className="mt-6 text-xl font-light text-gray-500 max-w-2xl mx-auto"
        >
          Découvrez des installations exceptionnelles, conçues pour vous offrir la meilleure expérience de jeu, tout au long de l'année.
        </motion.p>
      </div>

      {/* Section Extérieurs */}
      <section id="exterieurs" className="py-24 bg-white border-t border-gray-100 scroll-mt-24">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            
            {/* Image (Extérieurs) */}
            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeIn}
              className="w-full lg:w-1/2 relative h-[400px] md:h-[600px] overflow-hidden"
            >
              <Image 
                src="/images/terrains_haut.png" 
                alt="Terrains Extérieurs" 
                fill 
                className="object-cover hover:scale-105 transition-transform duration-1000" 
              />
            </motion.div>

            {/* Texte (Extérieurs) */}
            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
              className="w-full lg:w-1/2"
            >
              <motion.div variants={fadeIn} className="flex items-center gap-4 mb-6">
                <span className="text-[#DF6436] font-heading font-black text-6xl">5</span>
                <h2 className="font-heading font-black text-4xl uppercase tracking-tight text-black">
                  Terrains<br />Extérieurs
                </h2>
              </motion.div>
              
              <motion.p variants={fadeIn} className="font-light text-gray-600 text-lg mb-8 leading-relaxed">
                Profitez des beaux jours sur nos terrains extérieurs de haute qualité. Nichés dans un écrin de verdure, ils offrent des conditions de jeu idéales pour les compétiteurs comme pour les joueurs loisirs.
              </motion.p>

              <motion.ul variants={staggerContainer} className="space-y-6">
                <motion.li variants={fadeIn} className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center shrink-0 mt-1">
                    <svg className="w-4 h-4 text-[#DF6436]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-black">Surface...</h4>
                    <p className="font-light text-gray-500">Un rebond franc et régulier, avec un revêtement permettant de jouer très rapidement après la pluie.</p>
                  </div>
                </motion.li>
                <motion.li variants={fadeIn} className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center shrink-0 mt-1">
                    <svg className="w-4 h-4 text-[#DF6436]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-black">Éclairage de pointe</h4>
                    <p className="font-light text-gray-500">Jouez jusqu'à ...h avec une visibilité parfaite et sans éblouissement grâce à notre système basse consommation.</p>
                  </div>
                </motion.li>
                <motion.li variants={fadeIn} className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center shrink-0 mt-1">
                    <svg className="w-4 h-4 text-[#DF6436]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-black">Cadre Verdoyant</h4>
                    <p className="font-light text-gray-500">Des espaces arborés autour des courts pour des moments de détente uniques après le match.</p>
                  </div>
                </motion.li>
              </motion.ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section Couverts */}
      <section id="couverts" className="py-24 bg-[#111] text-white scroll-mt-24">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="flex flex-col-reverse lg:flex-row gap-16 items-center">
            
            {/* Texte (Couverts) */}
            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
              className="w-full lg:w-1/2"
            >
              <motion.div variants={fadeIn} className="flex items-center gap-4 mb-6">
                <span className="text-[#DF6436] font-heading font-black text-6xl">3</span>
                <h2 className="font-heading font-black text-4xl uppercase tracking-tight text-white">
                  Terrains<br />Couverts
                </h2>
              </motion.div>
              
              <motion.p variants={fadeIn} className="font-light text-gray-400 text-lg mb-8 leading-relaxed">
                Ne laissez plus la météo dicter votre passion. Nos infrastructures indoor ultra-modernes vous garantissent une pratique du tennis 365 jours par an, dans un confort absolu.
              </motion.p>

              <motion.ul variants={staggerContainer} className="space-y-6">
                <motion.li variants={fadeIn} className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0 mt-1">
                    <svg className="w-4 h-4 text-[#DF6436]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-white">Surface GreenSet®</h4>
                    <p className="font-light text-gray-400">Le revêtement officiel des plus grands tournois indoor. Un jeu rapide, confortable, et très doux pour les articulations.</p>
                  </div>
                </motion.li>
                <motion.li variants={fadeIn} className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0 mt-1">
                    <svg className="w-4 h-4 text-[#DF6436]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-white">Isolation Thermique & Chauffage</h4>
                    <p className="font-light text-gray-400">Des bulles/halls parfaitement isolés et chauffés en hiver pour jouer en t-shirt même en plein mois de décembre.</p>
                  </div>
                </motion.li>
                <motion.li variants={fadeIn} className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0 mt-1">
                    <svg className="w-4 h-4 text-[#DF6436]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-white">Luminosité Optimisée</h4>
                    <p className="font-light text-gray-400">Un éclairage LED puissant et uniforme pour un confort visuel équivalent à la lumière du jour.</p>
                  </div>
                </motion.li>
              </motion.ul>
            </motion.div>

            {/* Image (Couverts) */}
            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeIn}
              className="w-full lg:w-1/2 relative h-[400px] md:h-[600px] overflow-hidden"
            >
              <Image 
                src="/images/terrains_couverts.jpeg" 
                alt="Terrains Couverts" 
                fill 
                className="object-cover hover:scale-105 transition-transform duration-1000 opacity-80" 
              />
            </motion.div>

          </div>
        </div>
      </section>

    </div>
  );
}
