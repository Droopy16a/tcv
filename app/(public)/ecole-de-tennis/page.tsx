"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import ImageSlideshow from "@/app/components/ImageSlideshow";

export default function EcoleDeTennisPage() {
  const fadeIn: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  return (
    <div className="bg-[#FAFAFA] min-h-screen pt-32 pb-0">
      
      {/* Hero Section */}
      <div className="container mx-auto px-6 max-w-6xl text-center mb-20">
        <motion.h2 
          initial="hidden" animate="visible" variants={fadeIn}
          className="text-[#DF6436] font-bold uppercase tracking-widest text-sm mb-4"
        >
          Nos Programmes
        </motion.h2>
        <motion.h1 
          initial="hidden" animate="visible" variants={fadeIn} transition={{ delay: 0.1 }}
          className="font-heading font-black text-5xl md:text-7xl uppercase tracking-tighter text-black"
        >
          L'École de Tennis
        </motion.h1>
        <motion.p 
          initial="hidden" animate="visible" variants={fadeIn} transition={{ delay: 0.2 }}
          className="mt-6 text-xl font-light text-gray-500 max-w-2xl mx-auto"
        >
          Des plus petits aux adultes, en loisir comme en compétition, nous proposons un accompagnement sur-mesure pour chaque joueur.
        </motion.p>
      </div>

      {/* SECTION JEUNES */}
      <section id="jeunes" className="py-24 bg-white border-t border-gray-100 scroll-mt-24">
        <div className="container mx-auto px-6 max-w-6xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeIn} className="text-center mb-16">
            <h2 className="font-heading font-black text-4xl md:text-6xl uppercase tracking-tighter text-black mb-4">Programme Jeunes</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto font-light">
              De la découverte motrice aux tournois de haut niveau, notre équipe pédagogique accompagne votre enfant à chaque étape de sa progression.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            
            {/* Baby & Mini Tennis */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="flex flex-col h-full">
              <motion.div variants={fadeIn} className="w-full mb-8">
                <ImageSlideshow
                  heightClass="h-64"
                  interval={4000}
                  dark={false}
                  images={[
                    { src: "/images/hero.jpg", alt: "Baby et Mini Tennis 1" },
                    { src: "/images/terrain_exter_1.jpg", alt: "Baby et Mini Tennis 2" },
                    { src: "/images/terrain_exter_2.jpg", alt: "Baby et Mini Tennis 3" },
                  ]}
                />
              </motion.div>
              <motion.div variants={fadeIn} className="flex-1">
                <h3 className="font-heading font-black text-3xl uppercase tracking-tight text-black mb-2">Baby & Mini Tennis</h3>
                <p className="text-sm font-bold text-[#DF6436] mb-4 uppercase tracking-wider">3 à 6 ans • 1H / semaine</p>
                <p className="text-gray-600 font-light text-lg mb-6 leading-relaxed">
                  Une approche ludique axée sur la motricité, la coordination et la découverte de la balle. Le matériel (petits filets, balles mousses) est totalement adapté à leur morphologie.
                </p>
                <ul className="text-gray-500 font-light space-y-3">
                  <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-[#DF6436] rounded-full"></div> Ateliers ludiques & sportifs</li>
                  <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-[#DF6436] rounded-full"></div> Balles mousses et balles rouges</li>
                  {/* <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-[#DF6436] rounded-full"></div> Max 6 enfants par terrain</li> */}
                </ul>
              </motion.div>
            </motion.div>

            {/* École de Tennis */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="flex flex-col h-full">
              <motion.div variants={fadeIn} className="w-full mb-8">
                <ImageSlideshow
                  heightClass="h-64"
                  interval={4000}
                  dark={false}
                  images={[
                    { src: "/images/hero.jpg", alt: "École de Tennis 1" },
                    { src: "/images/terrain_exter_1.jpg", alt: "École de Tennis 2" },
                    { src: "/images/terrain_exter_2.jpg", alt: "École de Tennis 3" },
                  ]}
                />
              </motion.div>
              <motion.div variants={fadeIn} className="flex-1">
                <h3 className="font-heading font-black text-3xl uppercase tracking-tight text-black mb-2">École de Tennis</h3>
                <p className="text-sm font-bold text-[#DF6436] mb-4 uppercase tracking-wider">7 à 18 ans • 1H à 2H / semaine</p>
                <p className="text-gray-600 font-light text-lg mb-6 leading-relaxed">
                  Le cœur de la formation. Apprentissage technique, tactique et matchs encadrés. Les groupes sont formés par âge et par niveau (balles oranges, vertes, dures).
                </p>
                <ul className="text-gray-500 font-light space-y-3">
                  <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-[#DF6436] rounded-full"></div> Groupes homogènes de niveau</li>
                  <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-[#DF6436] rounded-full"></div> Formules 1h, 1h30 ou 2h</li>
                  <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-[#DF6436] rounded-full"></div> Évaluation continue (Galaxie)</li>
                </ul>
              </motion.div>
            </motion.div>

            {/* Pôle Compétition */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="flex flex-col h-full">
              <motion.div variants={fadeIn} className="w-full mb-8">
                <ImageSlideshow
                  heightClass="h-64"
                  interval={4000}
                  dark={false}
                  images={[
                    { src: "/images/hero.jpg", alt: "Pôle Compétition 1" },
                    { src: "/images/terrain_exter_1.jpg", alt: "Pôle Compétition 2" },
                    { src: "/images/terrain_exter_2.jpg", alt: "Pôle Compétition 3" },
                  ]}
                />
              </motion.div>
              <motion.div variants={fadeIn} className="flex-1">
                <h3 className="font-heading font-black text-3xl uppercase tracking-tight text-black mb-2">Pôle Compétition</h3>
                <p className="text-sm font-bold text-[#DF6436] mb-4 uppercase tracking-wider">Sur sélection • 3H à 4H30 / semaine</p>
                <p className="text-gray-600 font-light text-lg mb-6 leading-relaxed">
                  Un programme intensif dédié aux jeunes compétiteurs. Entraînement tennistique poussé et préparation physique spécifique pour performer en tournois.
                </p>
                <ul className="text-gray-500 font-light space-y-3">
                  <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-[#DF6436] rounded-full"></div> Entraînements intensifs et physique</li>
                  <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-[#DF6436] rounded-full"></div> Suivi personnalisé en tournois</li>
                  {/* <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-[#DF6436] rounded-full"></div> Intégration aux équipes du club</li> */}
                </ul>
              </motion.div>
            </motion.div>

          </div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="mt-16 text-center">
            <Link 
              href="/inscription" 
              className="inline-block bg-black text-white font-bold uppercase tracking-widest text-sm px-12 py-5 hover:bg-[#DF6436] transition-all"
            >
              S'inscrire (Jeunes)
            </Link>
          </motion.div>
        </div>
      </section>


      {/* SECTION ADULTES */}
      <section id="adultes" className="py-24 bg-[#111] text-white scroll-mt-24">
        <div className="container mx-auto px-6 max-w-6xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeIn} className="text-center mb-16">
            <h2 className="font-heading font-black text-4xl md:text-6xl uppercase tracking-tighter text-white mb-4">Programme Adultes</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto font-light">
              Que vous souhaitiez débuter, reprendre une activité sportive ou défendre les couleurs du club en équipe, nous avons la formule adaptée.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            
            {/* Cours Collectifs */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="flex flex-col h-full">
              <motion.div variants={fadeIn} className="w-full mb-8">
                <ImageSlideshow
                  heightClass="h-64"
                  interval={5000}
                  dark={true}
                  images={[
                    { src: "/images/hero.jpg", alt: "Cours collectifs adultes 1" },
                    { src: "/images/terrains_couverts_1.jpg", alt: "Cours collectifs adultes 2" },
                    { src: "/images/terrains_couverts_2.jpg", alt: "Cours collectifs adultes 3" },
                  ]}
                />
              </motion.div>
              <motion.div variants={fadeIn} className="flex-1">
                <h3 className="font-heading font-black text-3xl uppercase tracking-tight mb-2">Cours Collectifs</h3>
                <p className="text-sm font-bold text-[#DF6436] mb-4 uppercase tracking-wider">Loisir & Perfectionnement • 1H à 2H / semaine</p>
                <p className="text-gray-400 font-light text-lg mb-6 leading-relaxed">
                  L'apprentissage dans la convivialité. Nos cours collectifs regroupent des joueurs de même niveau, du grand débutant au joueur confirmé. Parfait pour se dépenser après le travail et rencontrer de nouveaux partenaires !
                </p>
                <ul className="text-gray-400 font-light space-y-3">
                  <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-[#DF6436] rounded-full"></div> Créneaux en soirée (semaine) ou le samedi</li>
                  {/* <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-[#DF6436] rounded-full"></div> Groupes de 4 à 6 joueurs max</li> */}
                  <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-[#DF6436] rounded-full"></div> Axes techniques et situations de jeu tactiques</li>
                </ul>
              </motion.div>
            </motion.div>

            {/* Équipes */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="flex flex-col h-full">
              <motion.div variants={fadeIn} className="w-full mb-8">
                <ImageSlideshow
                  heightClass="h-64"
                  interval={5000}
                  dark={true}
                  images={[
                    { src: "/images/hero.jpg", alt: "Entraînements Équipes 1" },
                    { src: "/images/terrains_couverts_1.jpg", alt: "Entraînements Équipes 2" },
                    { src: "/images/terrains_couverts_2.jpg", alt: "Entraînements Équipes 3" },
                  ]}
                />
              </motion.div>
              <motion.div variants={fadeIn} className="flex-1">
                <h3 className="font-heading font-black text-3xl uppercase tracking-tight mb-2">Entraînements Équipe</h3>
                <p className="text-sm font-bold text-[#DF6436] mb-4 uppercase tracking-wider">Compétition • 1H30 / semaine</p>
                <p className="text-gray-400 font-light text-lg mb-6 leading-relaxed">
                  Représentez le club lors des championnats ! Ces entraînements sont dédiés aux joueurs classés engagés dans les équipes du TC Vernouillet. Exigence, tactique de match et esprit d'équipe sont au rendez-vous.
                </p>
                <ul className="text-gray-400 font-light space-y-3">
                  <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-[#DF6436] rounded-full"></div> Réservé aux joueurs compétiteurs</li>
                  <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-[#DF6436] rounded-full"></div> Travail spécifique (double, schémas de jeu)</li>
                  {/* <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-[#DF6436] rounded-full"></div> Cohésion de groupe avant les rencontres</li> */}
                </ul>
              </motion.div>
            </motion.div>

          </div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="mt-16 text-center">
            <Link 
              href="/inscription" 
              className="inline-block bg-[#DF6436] text-white font-bold uppercase tracking-widest text-sm px-12 py-5 hover:bg-white hover:text-black transition-all"
            >
              S'inscrire (Adultes)
            </Link>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
