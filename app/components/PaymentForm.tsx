"use client";

import { useState } from "react";
import { Plus, Trash2, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { createPaymentCheckout } from "../actions";

export default function PaymentForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // State
  const [montant, setMontant] = useState<number | "">("");
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");

  const [motif, setMotif] = useState("TMC");
  const [motifDetails, setMotifDetails] = useState("");

  const [beneficiaires, setBeneficiaires] = useState<{ nom: string; prenom: string }[]>([]);

  const addBeneficiaire = () => {
    setBeneficiaires([...beneficiaires, { nom: "", prenom: "" }]);
  };

  const removeBeneficiaire = (index: number) => {
    const newB = [...beneficiaires];
    newB.splice(index, 1);
    setBeneficiaires(newB);
  };

  const updateBeneficiaire = (index: number, field: "nom" | "prenom", value: string) => {
    const newB = [...beneficiaires];
    newB[index][field] = value;
    setBeneficiaires(newB);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!montant || typeof montant !== "number" || montant <= 0) {
      setError("Veuillez saisir un montant valide supérieur à 0.");
      return;
    }

    setLoading(true);

    try {
      const result = await createPaymentCheckout({
        montant,
        nom,
        prenom,
        email,
        telephone,
        motif,
        motifDetails: motif === "Autre" ? motifDetails : "",
        beneficiaires: beneficiaires.filter((b) => b.nom.trim() !== "" || b.prenom.trim() !== ""),
      });

      if (result.success && result.redirectUrl) {
        window.location.href = result.redirectUrl;
      } else {
        setError(result.error || "Une erreur est survenue lors de la création du paiement.");
        setLoading(false);
      }
    } catch (err) {
      setError("Une erreur est survenue.");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 md:p-12 shadow-2xl rounded-3xl border border-gray-100 max-w-3xl mx-auto">
      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-8 border border-red-100">
          {error}
        </div>
      )}

      {/* Montant Section */}
      <div className="mb-12">
        <h3 className="font-heading font-black text-2xl uppercase tracking-tighter text-black mb-6 border-b border-gray-200 pb-2">
          1. Montant
        </h3>
        <div>
          <label className="block text-sm font-bold text-gray-700 uppercase tracking-widest mb-2">Montant à régler (€) *</label>
          <input
            type="number"
            min="1"
            step="0.01"
            required
            value={montant}
            onChange={(e) => setMontant(e.target.value ? Number(e.target.value) : "")}
            className="w-full text-2xl font-bold bg-gray-50 border border-gray-200 px-6 py-4 rounded-xl focus:ring-2 focus:ring-accent focus:outline-none transition-all"
            placeholder="Ex: 50.00"
          />
        </div>
      </div>

      {/* Informations personnelles */}
      <div className="mb-12">
        <h3 className="font-heading font-black text-2xl uppercase tracking-tighter text-black mb-6 border-b border-gray-200 pb-2">
          2. Vos Informations (Payeur)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 uppercase tracking-widest mb-2">Prénom *</label>
            <input
              type="text"
              required
              value={prenom}
              onChange={(e) => setPrenom(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 px-4 py-3 rounded-lg focus:ring-2 focus:ring-accent focus:outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 uppercase tracking-widest mb-2">Nom *</label>
            <input
              type="text"
              required
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 px-4 py-3 rounded-lg focus:ring-2 focus:ring-accent focus:outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 uppercase tracking-widest mb-2">Email *</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 px-4 py-3 rounded-lg focus:ring-2 focus:ring-accent focus:outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 uppercase tracking-widest mb-2">Téléphone</label>
            <input
              type="tel"
              value={telephone}
              onChange={(e) => setTelephone(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 px-4 py-3 rounded-lg focus:ring-2 focus:ring-accent focus:outline-none transition-all"
            />
          </div>
        </div>
      </div>

      {/* Motif du paiement */}
      <div className="mb-12">
        <h3 className="font-heading font-black text-2xl uppercase tracking-tighter text-black mb-6 border-b border-gray-200 pb-2">
          3. Motif du Paiement
        </h3>
        <div className="grid grid-cols-1 gap-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 uppercase tracking-widest mb-2">Pour quoi payez-vous ? *</label>
            <select
              value={motif}
              onChange={(e) => setMotif(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 px-4 py-3 rounded-lg focus:ring-2 focus:ring-accent focus:outline-none transition-all"
            >
              <option value="TMC">TMC</option>
              <option value="Tournoi">Tournoi</option>
              <option value="Stage">Stage</option>
              <option value="Tournée de Tournois">Tournée de Tournois</option>
              <option value="Autre">Autre (préciser)</option>
            </select>
          </div>
          
          {motif === "Autre" && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="overflow-hidden">
              <label className="block text-sm font-bold text-gray-700 uppercase tracking-widest mb-2">Précisez le motif *</label>
              <input
                type="text"
                required
                value={motifDetails}
                onChange={(e) => setMotifDetails(e.target.value)}
                placeholder="Ex: Achat bar club, Inscription évènement..."
                className="w-full bg-gray-50 border border-gray-200 px-4 py-3 rounded-lg focus:ring-2 focus:ring-accent focus:outline-none transition-all"
              />
            </motion.div>
          )}
        </div>
      </div>

      {/* Je paye pour... */}
      <div className="mb-12">
        <div className="flex items-center justify-between border-b border-gray-200 pb-2 mb-6">
          <h3 className="font-heading font-black text-2xl uppercase tracking-tighter text-black">
            4. Je paye pour... (Optionnel)
          </h3>
        </div>
        <p className="text-gray-500 text-sm mb-6">
          Si ce paiement concerne d'autres personnes (ex: inscription pour vos enfants, achat pour un tiers), ajoutez-les ci-dessous.
        </p>

        {beneficiaires.map((ben, index) => (
          <div key={index} className="flex flex-col md:flex-row gap-4 mb-4 items-end bg-gray-50 p-4 rounded-xl border border-gray-100">
            <div className="w-full md:flex-1">
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-widest mb-2">Prénom bénéficiaire</label>
              <input
                type="text"
                value={ben.prenom}
                onChange={(e) => updateBeneficiaire(index, "prenom", e.target.value)}
                className="w-full bg-white border border-gray-200 px-4 py-2 rounded-lg focus:ring-2 focus:ring-accent focus:outline-none"
              />
            </div>
            <div className="w-full md:flex-1">
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-widest mb-2">Nom bénéficiaire</label>
              <input
                type="text"
                value={ben.nom}
                onChange={(e) => updateBeneficiaire(index, "nom", e.target.value)}
                className="w-full bg-white border border-gray-200 px-4 py-2 rounded-lg focus:ring-2 focus:ring-accent focus:outline-none"
              />
            </div>
            <button
              type="button"
              onClick={() => removeBeneficiaire(index)}
              className="p-3 text-red-500 hover:bg-red-50 rounded-lg transition-colors border border-transparent hover:border-red-100 flex-shrink-0"
              title="Supprimer"
            >
              <Trash2 size={20} />
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={addBeneficiaire}
          className="flex items-center gap-2 text-sm font-bold text-accent uppercase tracking-widest hover:text-black transition-colors"
        >
          <Plus size={16} /> Ajouter une personne
        </button>
      </div>

      <div className="pt-8 border-t border-gray-200">
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white font-bold uppercase tracking-widest text-lg px-8 py-5 rounded-xl hover:bg-black transition-all flex items-center justify-center gap-3 disabled:opacity-50"
        >
          {loading ? "Redirection..." : "Payer via HelloAsso"}
          {!loading && <ArrowRight size={20} />}
        </button>
        <p className="text-center text-xs text-gray-400 mt-4">
          Vous serez redirigé vers l'interface sécurisée de HelloAsso pour procéder au règlement par carte bancaire.
        </p>
      </div>
    </form>
  );
}
