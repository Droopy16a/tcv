"use client";

import { useState } from "react";
import { motion, Variants } from "framer-motion";

type FormType = "enfants" | "adultes";
type FamilyPosition = "1" | "2-3" | "4-5" | "6-7" | "8";

const fadeIn: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

export default function SubscribeForm() {
  const [activeForm, setActiveForm] = useState<FormType>("enfants");

  return (
    <div className="bg-white py-24 md:py-32">
      <div className="container mx-auto px-6 max-w-5xl">
        {/* Sélecteur de formulaire */}
        <div className="flex flex-col items-center mb-16 text-center">
          <motion.h2 
            initial="hidden" animate="visible" variants={fadeIn}
            className="text-gray-400 font-bold uppercase tracking-widest text-sm mb-6"
          >
            Saison 2026 / 2027
          </motion.h2>
          <motion.h1 
            initial="hidden" animate="visible" variants={fadeIn} transition={{ delay: 0.1 }}
            className="font-heading font-black text-4xl md:text-6xl uppercase tracking-tighter text-black mb-12"
          >
            Formulaire d'inscription
          </motion.h1>
          
          <motion.div 
            initial="hidden" animate="visible" variants={fadeIn} transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center w-full sm:w-auto"
          >
            <button
              type="button"
              className={
                activeForm === "enfants"
                  ? "font-bold uppercase tracking-widest text-sm px-12 py-5 transition-all border w-full sm:w-auto bg-black text-white border-black"
                  : "font-bold uppercase tracking-widest text-sm px-12 py-5 transition-all border w-full sm:w-auto bg-transparent text-gray-500 border-gray-300 hover:border-[#DF6436] hover:text-[#DF6436]"
              }
              onClick={() => setActiveForm("enfants")}
            >
              Enfants (-18 ans)
            </button>
            <button
              type="button"
              className={
                activeForm === "adultes"
                  ? "font-bold uppercase tracking-widest text-sm px-12 py-5 transition-all border w-full sm:w-auto bg-black text-white border-black"
                  : "font-bold uppercase tracking-widest text-sm px-12 py-5 transition-all border w-full sm:w-auto bg-transparent text-gray-500 border-gray-300 hover:border-[#DF6436] hover:text-[#DF6436]"
              }
              onClick={() => setActiveForm("adultes")}
            >
              Adultes
            </button>
          </motion.div>

          <motion.div 
            initial="hidden" animate="visible" variants={fadeIn} transition={{ delay: 0.3 }}
            className="mt-12 bg-gray-50 border border-gray-200 p-8 text-left max-w-3xl mx-auto flex flex-col md:flex-row items-center gap-8"
          >
            <div className="flex-1">
              <h3 className="font-heading font-black text-2xl uppercase tracking-tight text-black mb-2">Inscription Papier</h3>
              <p className="font-light text-gray-600 text-lg">
                Si vous préférez compléter votre dossier manuellement, vous pouvez télécharger les formulaires d'inscription ainsi que notre grille tarifaire ci-dessous.
              </p>
            </div>
            <div className="flex flex-col gap-3 w-full md:w-auto shrink-0">
              <a href="/pdf/formulaire_enfants.pdf" target="_blank" rel="noopener noreferrer" className="text-xs font-bold uppercase tracking-widest px-6 py-3 border border-gray-300 hover:border-[#DF6436] hover:text-[#DF6436] transition-colors text-center bg-white flex items-center justify-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                Formulaire Enfants
              </a>
              <a href="/pdf/formulaire_adultes.pdf" target="_blank" rel="noopener noreferrer" className="text-xs font-bold uppercase tracking-widest px-6 py-3 border border-gray-300 hover:border-[#DF6436] hover:text-[#DF6436] transition-colors text-center bg-white flex items-center justify-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                Formulaire Adultes
              </a>
              <a href="/pdf/tarifs.pdf" target="_blank" rel="noopener noreferrer" className="text-xs font-bold uppercase tracking-widest px-6 py-3 border border-gray-300 hover:border-[#DF6436] hover:text-[#DF6436] transition-colors text-center bg-white flex items-center justify-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                Grille Tarifaire
              </a>
            </div>
          </motion.div>
        </div>

        <motion.div
          key={activeForm}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {activeForm === "enfants" ? <EnfantsForm /> : <AdultesForm />}
        </motion.div>
      </div>
    </div>
  );
}

// ==========================================
// FORMULAIRE ENFANTS
// ==========================================
function EnfantsForm() {
  const [form, setForm] = useState({
    nom: "",
    prenom: "",
    sexe: "G", // Garçon / Fille
    dateNaissance: "",
    adresse: "",
    codePostal: "",
    ville: "",
    telephoneMere: "",
    emailMere: "",
    telephonePere: "",
    emailPere: "",
    
    formule: "ecole_1h", // baby, mini, ecole_1h, ecole_1h30, ecole_2h, ecole_3h, ecole_4h30
    creneauBabyMini: "", // Mercredi 10h-11h etc.
    
    // Pour l'école de tennis
    niveau: "debutant", // debutant, galaxie, classement
    galaxieCouleur: "",
    classement: "",
    anneesPratique: "",
    disposJours: [] as string[],

    positionFamille: "1" as FamilyPosition,
    autorisationMail: false,
    observations: "",
  });

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const inputClass = "w-full bg-gray-50 border border-gray-200 p-4 font-light text-lg focus:outline-none focus:border-[#DF6436] focus:ring-1 focus:ring-[#DF6436] transition-colors placeholder:text-gray-400";
  const selectClass = "w-full bg-gray-50 border border-gray-200 p-4 font-light text-lg focus:outline-none focus:border-[#DF6436] focus:ring-1 focus:ring-[#DF6436] transition-colors appearance-none cursor-pointer";

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");
    setSuccessMessage("");
    
    const { submitEnfant } = await import("../actions");
    const result = await submitEnfant(form, cost);
    
    setIsSubmitting(false);
    
    if (result.success) {
      if (result.checkoutUrl) {
        window.location.href = result.checkoutUrl;
      } else {
        setSuccessMessage("Votre inscription a bien été enregistrée !");
      }
    } else {
      setErrorMessage(result.error || "Une erreur s'est produite lors de l'inscription.");
    }
  };

  const toggleDispoJour = (jour: string) => {
    setForm((prev) => ({
      ...prev,
      disposJours: prev.disposJours.includes(jour)
        ? prev.disposJours.filter((j) => j !== jour)
        : [...prev.disposJours, jour]
    }));
  };

  const calculateCost = () => {
    const isVernouillet = form.ville.toLowerCase().trim() === "vernouillet";
    let base = 0;

    switch (form.formule) {
      case "baby":
      case "mini":
        base = isVernouillet ? 270 : 290;
        break;
      case "ecole_1h":
        base = isVernouillet ? 341 : 361;
        break;
      case "ecole_1h30":
        base = isVernouillet ? 408 : 428;
        break;
      case "ecole_2h":
        base = isVernouillet ? 469 : 489;
        break;
      case "ecole_3h":
        base = isVernouillet ? 581 : 601;
        break;
      case "ecole_4h30":
        base = isVernouillet ? 980 : 1000;
        break;
    }

    let discount = 0;
    if (form.positionFamille === "2-3") discount = 16;
    if (form.positionFamille === "4-5") discount = 21;
    if (form.positionFamille === "6-7") discount = 26;
    if (form.positionFamille === "8") discount = 31;

    return Math.max(0, base - discount);
  };

  const cost = calculateCost();

  return (
    <form onSubmit={handleSubmit} className="space-y-16">
      <section className="border-t border-gray-200 pt-12">
        <h2 className="font-heading font-black text-3xl md:text-4xl uppercase tracking-tight text-black mb-8">Informations de l'enfant</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <input name="nom" placeholder="Nom" value={form.nom} onChange={handleChange} required className={inputClass} />
          <input name="prenom" placeholder="Prénom" value={form.prenom} onChange={handleChange} required className={inputClass} />
          
          <div className="bg-gray-50 border border-gray-200 p-4 flex flex-col justify-center">
            <label className="text-gray-500 font-bold uppercase tracking-widest text-xs mb-3">Sexe</label>
            <div className="flex gap-8">
              <label className="flex items-center gap-3 cursor-pointer group">
                <div className={`w-5 h-5 border flex items-center justify-center transition-colors ${form.sexe === 'G' ? 'border-[#DF6436] bg-[#DF6436]' : 'border-gray-300 group-hover:border-[#DF6436]'}`}>
                   {form.sexe === 'G' && <div className="w-2 h-2 bg-white" />}
                </div>
                <input type="radio" name="sexe" value="G" checked={form.sexe === "G"} onChange={handleChange} className="sr-only" />
                <span className="font-light text-lg">Garçon (G)</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer group">
                <div className={`w-5 h-5 border flex items-center justify-center transition-colors ${form.sexe === 'F' ? 'border-[#DF6436] bg-[#DF6436]' : 'border-gray-300 group-hover:border-[#DF6436]'}`}>
                   {form.sexe === 'F' && <div className="w-2 h-2 bg-white" />}
                </div>
                <input type="radio" name="sexe" value="F" checked={form.sexe === "F"} onChange={handleChange} className="sr-only" />
                <span className="font-light text-lg">Fille (F)</span>
              </label>
            </div>
          </div>
          
          <input type="date" name="dateNaissance" value={form.dateNaissance} onChange={handleChange} className={inputClass} required />
          <input name="adresse" placeholder="Adresse" value={form.adresse} onChange={handleChange} className={`${inputClass} md:col-span-2`} />
          <input name="codePostal" placeholder="Code postal" value={form.codePostal} onChange={handleChange} className={inputClass} />
          <input name="ville" placeholder="Ville (Tapez Vernouillet pour le tarif résident)" value={form.ville} onChange={handleChange} required className={inputClass} />
        </div>

        <h3 className="font-heading font-black text-2xl uppercase tracking-tight text-black mt-12 mb-6">Contacts Parents</h3>
        <div className="grid gap-6 md:grid-cols-2">
          <input type="tel" name="telephoneMere" placeholder="Téléphone Mère" value={form.telephoneMere} onChange={handleChange} className={inputClass} />
          <input type="email" name="emailMere" placeholder="E-mail Mère" value={form.emailMere} onChange={handleChange} className={inputClass} />
          <input type="tel" name="telephonePere" placeholder="Téléphone Père" value={form.telephonePere} onChange={handleChange} className={inputClass} />
          <input type="email" name="emailPere" placeholder="E-mail Père" value={form.emailPere} onChange={handleChange} className={inputClass} />
        </div>
      </section>

      <section className="border-t border-gray-200 pt-12">
        <h2 className="font-heading font-black text-3xl md:text-4xl uppercase tracking-tight text-black mb-8">Catégorie et Formule</h2>
        
        <div className="relative mb-8">
          <select name="formule" value={form.formule} onChange={handleChange} className={selectClass}>
            <option value="baby">BABY TENNIS (3 et 4 ans) - 1H</option>
            <option value="mini">MINI TENNIS (5 et 6 ans) - 1H</option>
            <option value="ecole_1h">ÉCOLE DE TENNIS (7 à 18 ans) - Cours 1H</option>
            <option value="ecole_1h30">ÉCOLE DE TENNIS (7 à 18 ans) - Cours 1H30</option>
            <option value="ecole_2h">ÉCOLE DE TENNIS (7 à 18 ans) - Cours 2H (2x1H)</option>
            <option value="ecole_3h">ÉCOLE DE TENNIS - Compétition* 3H (2x1H30)</option>
            <option value="ecole_4h30">ÉCOLE DE TENNIS - Élite* 4H30 (3x1H30)</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
          </div>
        </div>

        {(form.formule === "ecole_3h" || form.formule === "ecole_4h30") && (
          <div className="bg-gray-50 border-l-4 border-[#DF6436] p-6 mb-8 animate-in fade-in slide-in-from-top-2 duration-300">
            <h4 className="font-bold uppercase tracking-widest text-sm mb-2 text-black">
              Spécifications {form.formule === "ecole_3h" ? "Compétition" : "Élite"}
            </h4>
            <p className="font-light text-gray-700 mb-2">
              {form.formule === "ecole_3h" 
                ? "2 à 3 tournois minimum obligatoire dans l'année"
                : "3 à 4 tournois minimum obligatoire dans l'année"}
            </p>
            <p className="text-sm font-medium italic text-gray-500">
              *Sur décision de la Directrice Sportive
            </p>
          </div>
        )}

        {(form.formule === "baby" || form.formule === "mini") ? (
          <div className="bg-gray-50 border border-gray-200 p-8">
            <h3 className="font-heading font-black text-2xl uppercase tracking-tight text-black mb-6">Choix du créneau unique</h3>
            <div className="flex flex-col sm:flex-row gap-6">
              <label className="flex items-center gap-3 cursor-pointer group">
                <div className={`w-5 h-5 border flex items-center justify-center transition-colors ${form.creneauBabyMini === 'Mercredi' ? 'border-[#DF6436] bg-[#DF6436]' : 'border-gray-300 group-hover:border-[#DF6436]'}`}>
                   {form.creneauBabyMini === 'Mercredi' && <div className="w-2 h-2 bg-white" />}
                </div>
                <input type="radio" name="creneauBabyMini" value="Mercredi" checked={form.creneauBabyMini === "Mercredi"} onChange={handleChange} className="sr-only" />
                <span className="font-light text-lg">{form.formule === "baby" ? "Mercredi 10h-11h" : "Mercredi 11h-12h"}</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer group">
                <div className={`w-5 h-5 border flex items-center justify-center transition-colors ${form.creneauBabyMini === 'Samedi' ? 'border-[#DF6436] bg-[#DF6436]' : 'border-gray-300 group-hover:border-[#DF6436]'}`}>
                   {form.creneauBabyMini === 'Samedi' && <div className="w-2 h-2 bg-white" />}
                </div>
                <input type="radio" name="creneauBabyMini" value="Samedi" checked={form.creneauBabyMini === "Samedi"} onChange={handleChange} className="sr-only" />
                <span className="font-light text-lg">{form.formule === "baby" ? "Samedi 10h-11h" : "Samedi 11h-12h"}</span>
              </label>
            </div>
          </div>
        ) : (
          <div className="space-y-12">
            <div className="bg-gray-50 border border-gray-200 p-8">
              <h3 className="font-heading font-black text-2xl uppercase tracking-tight text-black mb-6">Niveau de l'enfant (Nouvel adhérent)</h3>
              <div className="flex flex-col sm:flex-row flex-wrap gap-6 mb-8">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className={`w-5 h-5 border flex items-center justify-center transition-colors ${form.niveau === 'debutant' ? 'border-[#DF6436] bg-[#DF6436]' : 'border-gray-300 group-hover:border-[#DF6436]'}`}>
                     {form.niveau === 'debutant' && <div className="w-2 h-2 bg-white" />}
                  </div>
                  <input type="radio" name="niveau" value="debutant" checked={form.niveau === "debutant"} onChange={handleChange} className="sr-only" />
                  <span className="font-light text-lg">Débutant</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className={`w-5 h-5 border flex items-center justify-center transition-colors ${form.niveau === 'galaxie' ? 'border-[#DF6436] bg-[#DF6436]' : 'border-gray-300 group-hover:border-[#DF6436]'}`}>
                     {form.niveau === 'galaxie' && <div className="w-2 h-2 bg-white" />}
                  </div>
                  <input type="radio" name="niveau" value="galaxie" checked={form.niveau === "galaxie"} onChange={handleChange} className="sr-only" />
                  <span className="font-light text-lg">Galaxie Tennis</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className={`w-5 h-5 border flex items-center justify-center transition-colors ${form.niveau === 'classement' ? 'border-[#DF6436] bg-[#DF6436]' : 'border-gray-300 group-hover:border-[#DF6436]'}`}>
                     {form.niveau === 'classement' && <div className="w-2 h-2 bg-white" />}
                  </div>
                  <input type="radio" name="niveau" value="classement" checked={form.niveau === "classement"} onChange={handleChange} className="sr-only" />
                  <span className="font-light text-lg">Classement</span>
                </label>
              </div>
              
              <div className="grid gap-6 md:grid-cols-2">
                {form.niveau === "galaxie" && <input name="galaxieCouleur" placeholder="Couleur (Ex: Rouge, Orange...)" value={form.galaxieCouleur} onChange={handleChange} className={inputClass} />}
                {form.niveau === "classement" && <input name="classement" placeholder="Classement" value={form.classement} onChange={handleChange} className={inputClass} />}
                
                <input type="number" name="anneesPratique" placeholder="Nombre d'années de pratique" value={form.anneesPratique} onChange={handleChange} className={inputClass} />
              </div>
            </div>

            <div>
              <h3 className="font-heading font-black text-2xl uppercase tracking-tight text-black mb-2">Disponibilités (Jours souhaités)</h3>
              <p className="text-gray-500 font-light text-lg mb-6">Le soir en semaine à partir de 17h / Le mercredi et samedi en journée. Horaires définis avec les enseignants.</p>
              <div className="flex flex-wrap gap-4">
                {["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"].map(jour => (
                  <label key={jour} className={`border px-8 py-4 cursor-pointer text-center transition-all flex-grow sm:flex-grow-0 ${form.disposJours.includes(jour) ? 'bg-[#DF6436] text-white border-[#DF6436] font-bold uppercase tracking-widest text-sm' : 'bg-transparent border-gray-300 text-gray-500 hover:border-[#DF6436] hover:text-[#DF6436] font-bold uppercase tracking-widest text-sm'}`}>
                    <input type="checkbox" className="sr-only" checked={form.disposJours.includes(jour)} onChange={() => toggleDispoJour(jour)} />
                    {jour}
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}
      </section>

      <section className="border-t border-gray-200 pt-12">
        <h2 className="font-heading font-black text-3xl md:text-4xl uppercase tracking-tight text-black mb-8">Réduction et Autorisations</h2>
        
        <div className="mb-8">
          <label className="text-gray-500 font-bold uppercase tracking-widest text-xs mb-3 block">Réduction famille (même foyer) :</label>
          <div className="relative w-full md:w-1/2">
            <select name="positionFamille" value={form.positionFamille} onChange={handleChange} className={selectClass}>
              <option value="1">1ère personne inscrite (Aucune réduction)</option>
              <option value="2-3">2ème et 3ème personne (-16 €)</option>
              <option value="4-5">4ème et 5ème personne (-21 €)</option>
              <option value="6-7">6ème et 7ème personne (-26 €)</option>
              <option value="8">8ème personne (-31 €)</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
            </div>
          </div>
        </div>

        <textarea name="observations" placeholder="Observations éventuelles (optionnel)" rows={4} value={form.observations} onChange={handleChange} className={`${inputClass} mb-8`} />
        
        <label className="flex items-start gap-4 cursor-pointer group bg-gray-50 p-6 border border-gray-200">
          <div className="mt-1">
            <div className={`w-6 h-6 border flex items-center justify-center transition-colors ${form.autorisationMail ? 'bg-[#DF6436] border-[#DF6436] text-white' : 'border-gray-300 group-hover:border-[#DF6436] bg-white'}`}>
              {form.autorisationMail && <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M0 11l2-2 5 5L18 3l2 2L7 18z"/></svg>}
            </div>
          </div>
          <input type="checkbox" name="autorisationMail" checked={form.autorisationMail} onChange={handleChange} className="sr-only" />
          <span className="font-light text-lg text-gray-600">J'autorise le TC Vernouillet à utiliser mon adresse mail pour l'envoi d'informations et mon image sur les réseaux sociaux.</span>
        </label>
      </section>

      {successMessage && (
        <div className="bg-green-50 border-l-4 border-green-500 p-6 text-green-700">
          <p className="font-bold">{successMessage}</p>
        </div>
      )}
      {errorMessage && (
        <div className="bg-red-50 border-l-4 border-red-500 p-6 text-red-700">
          <p className="font-bold">{errorMessage}</p>
        </div>
      )}

      <div className="border-t border-black pt-12">
        <div className="bg-[#111] text-white p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h3 className="font-heading font-black text-3xl uppercase tracking-tight mb-2">Tarif final Enfant</h3>
            <p className="text-gray-400 font-light text-lg">Licence incluse (13€ ou 23€ selon âge) — {form.ville.toLowerCase().trim() === "vernouillet" ? "Résident" : "Extérieur"}</p>
          </div>
          <div className="text-right flex flex-col sm:flex-row items-center gap-8 w-full md:w-auto">
            <span className="font-heading font-black text-5xl md:text-6xl text-[#DF6436]">{cost} €</span>
            <button type="submit" disabled={isSubmitting} className={`button button--accent w-full sm:w-auto ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}>
              {isSubmitting ? "En cours..." : "Soumettre"}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

// ==========================================
// FORMULAIRE ADULTES
// ==========================================
function AdultesForm() {
  const [form, setForm] = useState({
    nom: "",
    prenom: "",
    sexe: "H", // H ou F
    dateNaissance: "",
    adresse: "",
    codePostal: "",
    ville: "",
    telephone: "",
    email: "",

    estEtudiant: false,
    positionFamille: "1" as FamilyPosition,

    coursCollectifs: false,
    dureeCours: "1H", // 1H ou 2H
    entrainementEquipe: false,

    niveau: "debutant",
    classement: "",
    anneesPratique: "",

    autorisationMail: false,
    observations: "",
  });

  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);

  const courseSlots = {
    Lundi: ["9h-10h", "10h-11h", "11h-12h", "12h-13h", "19h-20h", "20h-21h30", "21h30-22h30"],
    Mardi: ["9h-10h", "10h-11h", "11h-12h", "12h-13h", "19h-20h", "20h-21h", "21h-22h"],
    Mercredi: ["20h-21h30", "21h30-22h30"],
    Jeudi: ["9h-10h", "10h-11h", "11h-12h", "12h-13h", "19h-20h", "20h-21h30", "21h30-22h30"],
    Vendredi: ["20h-21h30", "21h30-22h"],
    Samedi: ["9h-10h", "10h-11h", "11h-12h", "12h-13h", "13h-14h"],
  };

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const inputClass = "w-full bg-gray-50 border border-gray-200 p-4 font-light text-lg focus:outline-none focus:border-[#DF6436] focus:ring-1 focus:ring-[#DF6436] transition-colors placeholder:text-gray-400";
  const selectClass = "w-full bg-gray-50 border border-gray-200 p-4 font-light text-lg focus:outline-none focus:border-[#DF6436] focus:ring-1 focus:ring-[#DF6436] transition-colors appearance-none cursor-pointer";

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");
    setSuccessMessage("");
    
    const { submitAdulte } = await import("../actions");
    const result = await submitAdulte({ ...form, selectedCourses }, cost);
    
    setIsSubmitting(false);
    
    if (result.success) {
      if (result.checkoutUrl) {
        window.location.href = result.checkoutUrl;
      } else {
        setSuccessMessage("Votre inscription a bien été enregistrée !");
      }
    } else {
      setErrorMessage(result.error || "Une erreur s'est produite lors de l'inscription.");
    }
  };

  const toggleCourse = (course: string) => {
    setSelectedCourses((prev) =>
      prev.includes(course) ? prev.filter((c) => c !== course) : [...prev, course]
    );
  };

  const calculateCost = () => {
    const isVernouillet = form.ville.toLowerCase().trim() === "vernouillet";
    let total = 0;

    if (form.entrainementEquipe) {
      total += isVernouillet ? 428 : 448; // Inclus la cotisation
    } else {
      total += form.estEtudiant ? (isVernouillet ? 209 : 229) : (isVernouillet ? 270 : 290);
    }

    if (form.coursCollectifs && !form.entrainementEquipe) {
      if (form.dureeCours === "1H") {
        total += isVernouillet ? 300 : 320;
      } else {
        total += isVernouillet ? 535 : 555;
      }
    }

    let discount = 0;
    if (form.positionFamille === "2-3") discount = 16;
    if (form.positionFamille === "4-5") discount = 21;
    if (form.positionFamille === "6-7") discount = 26;
    if (form.positionFamille === "8") discount = 31;

    return Math.max(0, total - discount);
  };

  const cost = calculateCost();

  return (
    <form onSubmit={handleSubmit} className="space-y-16">
      <section className="border-t border-gray-200 pt-12">
        <h2 className="font-heading font-black text-3xl md:text-4xl uppercase tracking-tight text-black mb-8">Informations personnelles</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <input name="nom" placeholder="Nom" value={form.nom} onChange={handleChange} required className={inputClass} />
          <input name="prenom" placeholder="Prénom" value={form.prenom} onChange={handleChange} required className={inputClass} />
          
          <div className="bg-gray-50 border border-gray-200 p-4 flex flex-col justify-center">
            <label className="text-gray-500 font-bold uppercase tracking-widest text-xs mb-3">Sexe</label>
            <div className="flex gap-8">
              <label className="flex items-center gap-3 cursor-pointer group">
                <div className={`w-5 h-5 border flex items-center justify-center transition-colors ${form.sexe === 'H' ? 'border-[#DF6436] bg-[#DF6436]' : 'border-gray-300 group-hover:border-[#DF6436]'}`}>
                   {form.sexe === 'H' && <div className="w-2 h-2 bg-white" />}
                </div>
                <input type="radio" name="sexe" value="H" checked={form.sexe === "H"} onChange={handleChange} className="sr-only" />
                <span className="font-light text-lg">Homme (H)</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer group">
                <div className={`w-5 h-5 border flex items-center justify-center transition-colors ${form.sexe === 'F' ? 'border-[#DF6436] bg-[#DF6436]' : 'border-gray-300 group-hover:border-[#DF6436]'}`}>
                   {form.sexe === 'F' && <div className="w-2 h-2 bg-white" />}
                </div>
                <input type="radio" name="sexe" value="F" checked={form.sexe === "F"} onChange={handleChange} className="sr-only" />
                <span className="font-light text-lg">Femme (F)</span>
              </label>
            </div>
          </div>
          
          <input type="date" name="dateNaissance" value={form.dateNaissance} onChange={handleChange} className={inputClass} required />
          <input name="adresse" placeholder="Adresse" value={form.adresse} onChange={handleChange} className={`${inputClass} md:col-span-2`} />
          <input name="codePostal" placeholder="Code postal" value={form.codePostal} onChange={handleChange} className={inputClass} />
          <input name="ville" placeholder="Ville (Tapez Vernouillet pour le tarif résident)" value={form.ville} onChange={handleChange} required className={inputClass} />
          <input type="tel" name="telephone" placeholder="Téléphone" value={form.telephone} onChange={handleChange} className={inputClass} />
          <input type="email" name="email" placeholder="E-mail" value={form.email} onChange={handleChange} className={inputClass} />
        </div>

        <div className="mt-8 bg-gray-50 border border-gray-200 p-8 space-y-8">
          <label className="flex items-center gap-4 cursor-pointer group">
            <div className={`w-6 h-6 border flex items-center justify-center transition-colors ${form.estEtudiant ? 'bg-[#DF6436] border-[#DF6436] text-white' : 'border-gray-300 group-hover:border-[#DF6436] bg-white'}`}>
              {form.estEtudiant && <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M0 11l2-2 5 5L18 3l2 2L7 18z"/></svg>}
            </div>
            <input type="checkbox" name="estEtudiant" checked={form.estEtudiant} onChange={handleChange} className="sr-only" />
            <span className="font-light text-lg">Cotisation Jeunes / Étudiants (Tarif réduit)</span>
          </label>
          
          <div>
            <label className="text-gray-500 font-bold uppercase tracking-widest text-xs mb-3 block">Réduction famille (même foyer) :</label>
            <div className="relative w-full md:w-1/2">
              <select name="positionFamille" value={form.positionFamille} onChange={handleChange} className={selectClass}>
                <option value="1">1ère personne (Aucune réduction)</option>
                <option value="2-3">2ème et 3ème personne (-16 €)</option>
                <option value="4-5">4ème et 5ème personne (-21 €)</option>
                <option value="6-7">6ème et 7ème personne (-26 €)</option>
                <option value="8">8ème personne (-31 €)</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-gray-200 pt-12">
        <h2 className="font-heading font-black text-3xl md:text-4xl uppercase tracking-tight text-black mb-8">Choix des activités</h2>

        <div className="space-y-6 mb-12">
          <label className="flex items-center gap-4 cursor-pointer group bg-gray-50 border border-gray-200 p-6">
            <div className={`w-6 h-6 border flex items-center justify-center transition-colors ${form.entrainementEquipe ? 'bg-[#DF6436] border-[#DF6436] text-white' : 'border-gray-300 group-hover:border-[#DF6436] bg-white'}`}>
              {form.entrainementEquipe && <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M0 11l2-2 5 5L18 3l2 2L7 18z"/></svg>}
            </div>
            <input type="checkbox" name="entrainementEquipe" checked={form.entrainementEquipe} onChange={handleChange} className="sr-only" />
            <span className="font-light text-lg">Entraînement Équipe 1H30 Senior/Senior+ <span className="text-gray-500 block text-sm mt-1">(Tarif global, cotisation incluse)</span></span>
          </label>

          <label className="flex items-center gap-4 cursor-pointer group bg-gray-50 border border-gray-200 p-6">
            <div className={`w-6 h-6 border flex items-center justify-center transition-colors ${form.coursCollectifs ? 'bg-[#DF6436] border-[#DF6436] text-white' : 'border-gray-300 group-hover:border-[#DF6436] bg-white'}`}>
              {form.coursCollectifs && <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M0 11l2-2 5 5L18 3l2 2L7 18z"/></svg>}
            </div>
            <input type="checkbox" name="coursCollectifs" checked={form.coursCollectifs} onChange={handleChange} className="sr-only" />
            <span className="font-light text-lg">Je souhaite participer aux cours collectifs <span className="text-gray-500 block text-sm mt-1">(S'ajoute à la cotisation)</span></span>
          </label>
        </div>

        {form.coursCollectifs && (
          <div className="border border-gray-200 p-8 space-y-12">
            
            <div>
              <h3 className="font-heading font-black text-2xl uppercase tracking-tight text-black mb-6">Volume horaire des cours</h3>
              <div className="flex flex-col sm:flex-row gap-8">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className={`w-5 h-5 border flex items-center justify-center transition-colors ${form.dureeCours === '1H' ? 'border-[#DF6436] bg-[#DF6436]' : 'border-gray-300 group-hover:border-[#DF6436]'}`}>
                     {form.dureeCours === '1H' && <div className="w-2 h-2 bg-white" />}
                  </div>
                  <input type="radio" name="dureeCours" value="1H" checked={form.dureeCours === "1H"} onChange={handleChange} className="sr-only" />
                  <span className="font-light text-lg">Cours 1H</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className={`w-5 h-5 border flex items-center justify-center transition-colors ${form.dureeCours === '2H' ? 'border-[#DF6436] bg-[#DF6436]' : 'border-gray-300 group-hover:border-[#DF6436]'}`}>
                     {form.dureeCours === '2H' && <div className="w-2 h-2 bg-white" />}
                  </div>
                  <input type="radio" name="dureeCours" value="2H" checked={form.dureeCours === "2H"} onChange={handleChange} className="sr-only" />
                  <span className="font-light text-lg">Cours 2H (2x1H)</span>
                </label>
              </div>
            </div>

            <div>
              <h3 className="font-heading font-black text-2xl uppercase tracking-tight text-black mb-6">Niveau (Si nouvel adhérent)</h3>
              <div className="flex flex-col sm:flex-row gap-8 mb-6">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className={`w-5 h-5 border flex items-center justify-center transition-colors ${form.niveau === 'debutant' ? 'border-[#DF6436] bg-[#DF6436]' : 'border-gray-300 group-hover:border-[#DF6436]'}`}>
                     {form.niveau === 'debutant' && <div className="w-2 h-2 bg-white" />}
                  </div>
                  <input type="radio" name="niveau" value="debutant" checked={form.niveau === "debutant"} onChange={handleChange} className="sr-only" />
                  <span className="font-light text-lg">Débutant</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className={`w-5 h-5 border flex items-center justify-center transition-colors ${form.niveau === 'classement' ? 'border-[#DF6436] bg-[#DF6436]' : 'border-gray-300 group-hover:border-[#DF6436]'}`}>
                     {form.niveau === 'classement' && <div className="w-2 h-2 bg-white" />}
                  </div>
                  <input type="radio" name="niveau" value="classement" checked={form.niveau === "classement"} onChange={handleChange} className="sr-only" />
                  <span className="font-light text-lg">Classé</span>
                </label>
              </div>
              
              <div className="grid gap-6 md:grid-cols-2">
                {form.niveau === "classement" && <input name="classement" placeholder="Classement" value={form.classement} onChange={handleChange} className={inputClass} />}
                <input type="number" name="anneesPratique" placeholder="Années de pratique" value={form.anneesPratique} onChange={handleChange} className={inputClass} />
              </div>
            </div>

            <div>
              <h3 className="font-heading font-black text-2xl uppercase tracking-tight text-black mb-6">Créneaux proposés (Entourez vos souhaits)</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {Object.entries(courseSlots).map(([day, slots]) => (
                  <div key={day}>
                    <h4 className="text-gray-500 font-bold uppercase tracking-widest text-xs mb-4">{day}</h4>
                    <div className="flex flex-wrap gap-3">
                      {slots.map((slot) => {
                        const value = `${day}-${slot}`;
                        return (
                          <label key={value} className={`border px-4 py-2 cursor-pointer transition-all ${selectedCourses.includes(value) ? "bg-[#DF6436] text-white border-[#DF6436] font-medium" : "bg-transparent border-gray-300 text-gray-600 hover:border-[#DF6436] hover:text-[#DF6436] font-light"}`}>
                            <input type="checkbox" checked={selectedCourses.includes(value)} onChange={() => toggleCourse(value)} className="sr-only" />
                            {slot}
                          </label>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </section>

      <section className="border-t border-gray-200 pt-12">
        <h2 className="font-heading font-black text-3xl md:text-4xl uppercase tracking-tight text-black mb-8">Observations & Autorisations</h2>
        <textarea name="observations" placeholder="Observations éventuelles (optionnel)" rows={4} value={form.observations} onChange={handleChange} className={`${inputClass} mb-8`} />
        
        <label className="flex items-start gap-4 cursor-pointer group bg-gray-50 p-6 border border-gray-200">
          <div className="mt-1">
            <div className={`w-6 h-6 border flex items-center justify-center transition-colors ${form.autorisationMail ? 'bg-[#DF6436] border-[#DF6436] text-white' : 'border-gray-300 group-hover:border-[#DF6436] bg-white'}`}>
              {form.autorisationMail && <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M0 11l2-2 5 5L18 3l2 2L7 18z"/></svg>}
            </div>
          </div>
          <input type="checkbox" name="autorisationMail" checked={form.autorisationMail} onChange={handleChange} className="sr-only" />
          <span className="font-light text-lg text-gray-600">J'autorise le TC Vernouillet à utiliser mon adresse mail pour l'envoi d'informations et mon image sur les réseaux sociaux.</span>
        </label>
      </section>

      {successMessage && (
        <div className="bg-green-50 border-l-4 border-green-500 p-6 text-green-700">
          <p className="font-bold">{successMessage}</p>
        </div>
      )}
      {errorMessage && (
        <div className="bg-red-50 border-l-4 border-red-500 p-6 text-red-700">
          <p className="font-bold">{errorMessage}</p>
        </div>
      )}

      <div className="border-t border-black pt-12">
        <div className="bg-[#111] text-white p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h3 className="font-heading font-black text-3xl uppercase tracking-tight mb-2">Tarif final Adulte</h3>
            <p className="text-gray-400 font-light text-lg">Licence 33€ incluse à la cotisation</p>
          </div>
          <div className="text-right flex flex-col sm:flex-row items-center gap-8 w-full md:w-auto">
            <span className="font-heading font-black text-5xl md:text-6xl text-[#DF6436]">{cost} €</span>
            <button type="submit" disabled={isSubmitting} className={`button button--accent w-full sm:w-auto ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}>
              {isSubmitting ? "En cours..." : "Soumettre"}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}