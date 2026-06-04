"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function Home() {
  const fadeIn: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  return (
    <>
      {/* 1. HERO SECTION */}
      <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?q=80&w=2000&auto=format&fit=crop"
            alt="Courts de tennis"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
        </div>

        <div className="container relative z-10 mx-auto px-6 text-center mt-20">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="font-heading font-black text-white text-5xl md:text-7xl lg:text-8xl uppercase tracking-tighter leading-none mb-6"
          >
            Tennis Club<br />Vernouillet
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-lg md:text-2xl text-gray-200 mb-12 max-w-2xl mx-auto font-light"
          >
            Une expérience tennistique unique dans les Yvelines
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mt-12"
          >
            <Link 
              href="#inscription"
              className="bg-accent text-white font-bold uppercase tracking-widest text-sm px-12 py-5 hover:bg-white hover:text-black transition-all w-full sm:w-auto"
            >
              Rejoindre le club
            </Link>
            <Link 
              href="#reservation"
              className="bg-transparent border border-white text-white font-bold uppercase tracking-widest text-sm px-12 py-5 hover:bg-white hover:text-black transition-all w-full sm:w-auto"
            >
              Réserver un court
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 2. TAGLINE & INTRO */}
      <section className="bg-white py-24 md:py-32">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <motion.h2 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeIn}
            className="text-gray-400 font-bold uppercase tracking-widest text-sm mb-6"
          >
            Le club de référence des Yvelines
          </motion.h2>
          <motion.p 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeIn}
            className="font-heading font-light text-3xl md:text-5xl leading-tight text-black mb-12"
          >
            Reconnu depuis sa création en 1974, le TC Vernouillet incarne l'excellence sportive dans un cadre convivial.
          </motion.p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-gray-200 pt-12">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
              <div className="font-heading font-black text-5xl text-accent mb-2">50</div>
              <div className="text-gray-500 font-medium uppercase tracking-wider text-xs">Ans d'histoire</div>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} transition={{ delay: 0.1 }}>
              <div className="font-heading font-black text-5xl text-accent mb-2">480+</div>
              <div className="text-gray-500 font-medium uppercase tracking-wider text-xs">Joueurs</div>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} transition={{ delay: 0.2 }}>
              <div className="font-heading font-black text-5xl text-accent mb-2">7</div>
              <div className="text-gray-500 font-medium uppercase tracking-wider text-xs">Courts</div>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} transition={{ delay: 0.3 }}>
              <div className="font-heading font-black text-5xl text-accent mb-2">20</div>
              <div className="text-gray-500 font-medium uppercase tracking-wider text-xs">Équipes</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. NOS ACTIVITÉS (DARK SECTION) */}
      <section className="bg-[#111] py-24 md:py-32 text-white">
        <div className="container mx-auto px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="mb-16">
            <h2 className="font-heading font-black text-4xl md:text-6xl uppercase tracking-tighter mb-4">Nos programmes</h2>
            <p className="text-gray-400 text-lg md:text-xl font-light max-w-2xl">
              Chaque âge, chaque niveau, chaque semaine de l'année. Un accompagnement sur-mesure pour atteindre vos objectifs.
            </p>
          </motion.div>

          <motion.div 
            variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {/* Jeunes */}
            <motion.div variants={fadeIn} className="group relative overflow-hidden h-[500px] cursor-pointer">
              <Image src="https://images.unsplash.com/photo-1554068865-24cecd4e34b8?q=80&w=800&auto=format&fit=crop" alt="Jeunes" fill className="object-cover group-hover:scale-105 transition-transform duration-1000 ease-out opacity-80 group-hover:opacity-100" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-8 w-full">
                <div className="text-accent font-bold text-xs uppercase tracking-widest mb-3">École de Tennis</div>
                <h3 className="font-heading font-black text-4xl uppercase tracking-tight text-white mb-4">Jeunes</h3>
                <div className="flex items-center text-white text-sm font-bold uppercase tracking-wider group-hover:text-accent transition-colors">
                  Découvrir le programme <ArrowRight size={16} className="ml-2 transform group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </motion.div>

            {/* Adultes */}
            <motion.div variants={fadeIn} className="group relative overflow-hidden h-[500px] cursor-pointer">
              <Image src="https://images.unsplash.com/photo-1622279457486-69d73ce88701?q=80&w=800&auto=format&fit=crop" alt="Adultes" fill className="object-cover group-hover:scale-105 transition-transform duration-1000 ease-out opacity-80 group-hover:opacity-100" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-8 w-full">
                <div className="text-accent font-bold text-xs uppercase tracking-widest mb-3">Cours & Loisir</div>
                <h3 className="font-heading font-black text-4xl uppercase tracking-tight text-white mb-4">Adultes</h3>
                <div className="flex items-center text-white text-sm font-bold uppercase tracking-wider group-hover:text-accent transition-colors">
                  Découvrir le programme <ArrowRight size={16} className="ml-2 transform group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 4. INFRASTRUCTURES (MINIMALIST) */}
      <section className="py-24 md:py-32 bg-gray-50">
        <div className="container mx-auto px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="max-w-2xl">
              <h2 className="font-heading font-black text-4xl md:text-6xl uppercase tracking-tighter text-black mb-4">Infrastructures</h2>
              <p className="text-gray-600 text-xl font-light">
                Le campus dispose d'un complexe exceptionnel doté d'installations de pointe pour vous permettre de jouer toute l'année.
              </p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="col-span-1 md:col-span-2 relative h-[500px] group cursor-pointer overflow-hidden">
              <Image src="https://images.unsplash.com/photo-1589487391730-58f20eb2c308?q=80&w=1200&auto=format&fit=crop" alt="Extérieur" fill className="object-cover group-hover:scale-105 transition-transform duration-1000" />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500"></div>
              <div className="absolute bottom-8 left-8">
                <h3 className="font-heading font-black text-3xl uppercase text-white tracking-tight">5 Terrains Extérieurs</h3>
              </div>
            </motion.div>
            
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} transition={{ delay: 0.2 }} className="col-span-1 relative h-[500px] group cursor-pointer overflow-hidden bg-black">
              <Image src="https://images.unsplash.com/photo-1530915365347-23087af369d7?q=80&w=800&auto=format&fit=crop" alt="Intérieur" fill className="object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000" />
              <div className="absolute bottom-8 left-8">
                <h3 className="font-heading font-black text-3xl uppercase text-white tracking-tight">2 Terrains Couverts</h3>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 5. CTA PUSH */}
      <section className="bg-accent py-24">
        <div className="container mx-auto px-6 text-center">
          <motion.h2 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}
            className="font-heading font-black text-3xl md:text-5xl uppercase tracking-tighter text-black mb-8"
          >
            Prêt à fouler les courts ?
          </motion.h2>
          <motion.p 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} transition={{ delay: 0.1 }}
            className="text-black/80 font-medium text-lg mb-10 max-w-xl mx-auto"
          >
            Notre équipe est disponible 7j/7 pour répondre à vos questions et vous accompagner dans votre inscription.
          </motion.p>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} transition={{ delay: 0.2 }}>
            <Link 
              href="#contact"
              className="inline-block bg-black text-white font-bold uppercase tracking-widest text-sm px-14 py-6 hover:bg-secondary hover:text-black transition-colors"
            >
              Contactez-nous
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
