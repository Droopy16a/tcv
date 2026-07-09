"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, ArrowRight, Loader2, XCircle } from "lucide-react";
import Link from "next/link";
import { finalizePaiementLibre } from "@/app/actions";

export default function FinalizePaiementLibre({ checkoutIntentId }: { checkoutIntentId: string | null }) {
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    async function handleFinalize() {
      if (!checkoutIntentId) {
        setStatus("error");
        setErrorMessage("Identifiant de paiement manquant.");
        return;
      }

      const result = await finalizePaiementLibre(checkoutIntentId);
      
      if (result.success) {
        setStatus("success");
      } else {
        setStatus("error");
        setErrorMessage(result.error || "Une erreur est survenue lors de la validation du paiement.");
      }
    }

    handleFinalize();
  }, [checkoutIntentId]);

  if (status === "loading") {
    return (
      <div className="bg-white p-12 rounded-3xl shadow-xl border border-gray-100 flex flex-col items-center">
        <Loader2 size={48} className="text-accent animate-spin mb-8" />
        <h1 className="font-heading font-black text-3xl uppercase tracking-tighter text-black mb-4">
          Validation en cours...
        </h1>
        <p className="text-gray-500 font-light text-center">
          Nous vérifions votre paiement auprès de HelloAsso. Ne fermez pas cette page.
        </p>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="bg-white p-12 rounded-3xl shadow-xl border border-gray-100 flex flex-col items-center">
        <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mb-8">
          <XCircle size={48} className="text-red-500" />
        </div>
        <h1 className="font-heading font-black text-3xl uppercase tracking-tighter text-black mb-4">
          Échec de la validation
        </h1>
        <p className="text-gray-500 font-light text-center mb-8">
          {errorMessage}
        </p>
        <Link 
          href="/paiement"
          className="inline-flex items-center bg-black text-white font-bold uppercase tracking-widest text-sm px-8 py-4 rounded-xl hover:bg-accent transition-all"
        >
          Réessayer <ArrowRight size={16} className="ml-2" />
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white p-12 rounded-3xl shadow-xl border border-gray-100 flex flex-col items-center text-center">
      <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mb-8">
        <CheckCircle2 size={48} className="text-green-500" />
      </div>
      
      <h1 className="font-heading font-black text-3xl md:text-5xl uppercase tracking-tighter text-black mb-6">
        Paiement Validé
      </h1>
      
      <p className="text-gray-500 font-light text-lg mb-10">
        Votre paiement a été traité avec succès par HelloAsso et enregistré dans notre système. Un e-mail de confirmation avec votre reçu vous a été envoyé. 
        <br/><br/>
        Toute l'équipe du TC Vernouillet vous remercie !
      </p>
      
      <Link 
        href="/"
        className="inline-flex items-center bg-black text-white font-bold uppercase tracking-widest text-sm px-10 py-4 rounded-xl hover:bg-accent transition-all"
      >
        Retour à l'accueil <ArrowRight size={16} className="ml-2" />
      </Link>
    </div>
  );
}
