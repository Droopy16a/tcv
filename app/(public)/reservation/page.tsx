"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export default function ReservationPage() {
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
    <div className="bg-[#FAFAFA] min-h-screen pt-32 pb-24">
      {/* Hero Section */}
      <div className="container mx-auto px-6 max-w-6xl text-center mb-24">
        <motion.h2 
          initial="hidden" animate="visible" variants={fadeIn}
          className="text-[#DF6436] font-bold uppercase tracking-widest text-sm mb-4"
        >
          Guide Pratique
        </motion.h2>
        <motion.h1 
          initial="hidden" animate="visible" variants={fadeIn} transition={{ delay: 0.1 }}
          className="font-heading font-black text-5xl md:text-7xl uppercase tracking-tighter text-black"
        >
          Comment Réserver
        </motion.h1>
        <motion.p 
          initial="hidden" animate="visible" variants={fadeIn} transition={{ delay: 0.2 }}
          className="mt-6 text-xl font-light text-gray-500 max-w-2xl mx-auto"
        >
          La réservation de nos courts s'effectue facilement en ligne via l'application officielle Ten'Up de la Fédération Française de Tennis. Suivez le guide !
        </motion.p>
      </div>

      {/* Guide Étapes */}
      <section className="container mx-auto px-6 max-w-5xl">
        <div className="space-y-24">
          
          {/* Etape 1 */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer} className="flex flex-col md:flex-row gap-12 items-center">
            <motion.div variants={fadeIn} className="w-full md:w-1/2">
              <div className="text-accent font-black text-6xl mb-4 opacity-50">01</div>
              <h3 className="font-heading font-black text-3xl uppercase tracking-tight text-black mb-4">
                Se Connecter à Ten'Up
              </h3>
              <p className="text-gray-600 font-light text-lg mb-6 leading-relaxed">
                Connectez-vous à votre compte Ten'Up (ou créez-en un si vous n'en avez pas encore). Cette plateforme sécurisée vous permet de gérer toutes vos réservations.
              </p>
              <Link href="https://tenup.fft.fr/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-accent font-bold uppercase tracking-widest text-sm hover:text-black transition-colors">
                Accéder à Ten'Up <ArrowRight size={16} className="ml-2" />
              </Link>
            </motion.div>
            <motion.div variants={fadeIn} className="w-full md:w-1/2 relative h-[300px] bg-gray-200 rounded-2xl overflow-hidden border border-gray-300 shadow-sm flex items-center justify-center">
              {/* REMPLACEZ l'image ci-dessous par votre capture d'écran */}
              <Image 
                src="/images/tenup_login.png"
                alt="Capture d'écran : Page de connexion Ten'Up"
                width={1920}
                height={1080}
                className="w-full h-full object-cover"
              />
            </motion.div>
          </motion.div>

          {/* Etape 2 */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer} className="flex flex-col md:flex-row-reverse gap-12 items-center">
            <motion.div variants={fadeIn} className="w-full md:w-1/2">
              <div className="text-accent font-black text-6xl mb-4 opacity-50">02</div>
              <h3 className="font-heading font-black text-3xl uppercase tracking-tight text-black mb-4">
                Accéder aux Offres du Club
              </h3>
              <p className="text-gray-600 font-light text-lg mb-6 leading-relaxed">
                Recherchez le <strong>Tennis Club Vernouillet</strong> dans la barre de recherche ou cliquez directement sur le lien ci-dessous pour accéder à notre page club, puis allez dans la rubrique <strong>"Offres et Tarifs"</strong>.
              </p>
              <Link href="https://tenup.fft.fr/club/57780425" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-accent font-bold uppercase tracking-widest text-sm hover:text-black transition-colors">
                Voir la page du club <ArrowRight size={16} className="ml-2" />
              </Link>
            </motion.div>
            <motion.div variants={fadeIn} className="w-full md:w-1/2 relative h-[300px] bg-gray-200 rounded-2xl overflow-hidden border border-gray-300 shadow-sm flex items-center justify-center">
               <Image 
                src="/images/tenup_main.png"
                alt="Capture d'écran : Page principale du club sur Ten'Up"
                width={1920}
                height={1080}
                className="w-full h-full object-cover"
              />
            </motion.div>
          </motion.div>

          {/* Etape 3 */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer} className="flex flex-col md:flex-row gap-12 items-center">
            <motion.div variants={fadeIn} className="w-full md:w-1/2">
              <div className="text-accent font-black text-6xl mb-4 opacity-50">03</div>
              <h3 className="font-heading font-black text-3xl uppercase tracking-tight text-black mb-4">
                Choisir sa Formule
              </h3>
              <p className="text-gray-600 font-light text-lg mb-6 leading-relaxed">
                Sélectionnez l'offre qui vous correspond le mieux. Nous proposons deux solutions flexibles :
              </p>
              <ul className="space-y-4 mb-6">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="text-accent shrink-0 mt-1" size={20} />
                  <div>
                    <strong className="text-black block">La Location Horaire</strong>
                    <span className="text-gray-500 font-light text-sm">Pour 2 joueurs non adhérents.</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="text-accent shrink-0 mt-1" size={20} />
                  <div>
                    <strong className="text-black block">Le Carnet de Tickets</strong>
                    <span className="text-gray-500 font-light text-sm">Si vous êtes adhérent pour pouvoir jouer avec un non adhérent.</span>
                  </div>
                </li>
              </ul>
            </motion.div>
            <motion.div variants={fadeIn} className="w-full md:w-1/2 relative h-[300px] bg-gray-200 rounded-2xl overflow-hidden border border-gray-300 shadow-sm flex items-center justify-center">
               <Image 
                src="/images/tenup_offres.png"
                alt="Capture d'écran : Page principale du club sur Ten'Up"
                width={1920}
                height={1080}
                className="w-full h-full object-cover"
              />
            </motion.div>
          </motion.div>

          {/* Etape 4 */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer} className="flex flex-col md:flex-row-reverse gap-12 items-center">
            <motion.div variants={fadeIn} className="w-full md:w-1/2">
              <div className="text-accent font-black text-6xl mb-4 opacity-50">04</div>
              <h3 className="font-heading font-black text-3xl uppercase tracking-tight text-black mb-4">
                Réserver sur le Planning
              </h3>
              <p className="text-gray-600 font-light text-lg mb-6 leading-relaxed">
                Si vous avez choisie les tickets, rendez-vous sur le planning interactif pour sélectionner le jour, l'heure et le terrain de votre choix. Cliquez sur "ajouter un joueur externe au club" et confirmez votre réservation. Le tour est joué !
              </p>
              <Link href="https://tenup.fft.fr/club/57780425" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-accent font-bold uppercase tracking-widest text-sm hover:text-black transition-colors">
                Aller sur Ten'Up <ArrowRight size={16} className="ml-2" />
              </Link>
            </motion.div>
            <motion.div variants={fadeIn} className="w-full md:w-1/2 relative h-[300px] bg-gray-200 rounded-2xl overflow-hidden border border-gray-300 shadow-sm flex items-center justify-center">
              <Image 
                src="/images/tenup_tickets.png"
                alt="Capture d'écran : Page principale du club sur Ten'Up"
                width={1920}
                height={1080}
                className="w-full h-full object-cover"
              />
            </motion.div>
          </motion.div>

        </div>
      </section>
      
      {/* CTA Final */}
      <section className="mt-32">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="bg-[#111] p-16 rounded-3xl shadow-xl">
            <h2 className="font-heading font-black text-3xl md:text-5xl uppercase tracking-tighter text-white mb-6">
              Prêt à jouer ?
            </h2>
            <p className="text-gray-400 font-light text-lg mb-10 max-w-xl mx-auto">
              Réservez votre créneau dès maintenant sur Ten'Up et rejoignez-nous sur les courts.
            </p>
            <Link 
              href="https://tenup.fft.fr/club/57780425" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block bg-accent text-white font-bold uppercase tracking-widest text-sm px-12 py-5 hover:bg-white hover:text-black transition-all"
            >
              Lancer la réservation
            </Link>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
