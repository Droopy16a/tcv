"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { finalizeInscription } from "../../../actions";

export default function FinalizePayment({ checkoutIntentId }: { checkoutIntentId: string | null }) {
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [errorMessage, setErrorMessage] = useState("");
  const processed = useRef(false);

  useEffect(() => {
    if (processed.current) return;
    processed.current = true;

    async function process() {
      const res = await finalizeInscription(checkoutIntentId);
      if (res.success) {
        setStatus("success");
      } else {
        setStatus("error");
        setErrorMessage(res.error || "Une erreur inconnue est survenue.");
      }
    }

    process();
  }, [checkoutIntentId]);

  if (status === "loading") {
    return (
      <div className="flex flex-col items-center justify-center space-y-6">
        <div className="w-16 h-16 border-4 border-gray-200 border-t-[#DF6436] rounded-full animate-spin"></div>
        <h1 className="font-heading font-black text-2xl md:text-3xl uppercase tracking-tighter text-black">
          Validation du paiement...
        </h1>
        <p className="text-lg font-light text-gray-500">
          Veuillez patienter pendant que nous validons votre inscription.
        </p>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="flex flex-col items-center justify-center space-y-8">
        <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-red-100 mb-6">
          <svg className="w-12 h-12 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </div>
        <h1 className="font-heading font-black text-4xl md:text-6xl uppercase tracking-tighter text-black">
          Erreur de validation
        </h1>
        <p className="text-xl font-light text-gray-600 max-w-2xl">
          {errorMessage}
        </p>
        <div className="pt-8 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/inscription" role="button" className="font-bold uppercase tracking-widest text-sm px-12 py-5 transition-all border inline-block bg-black text-white border-black hover:bg-[#DF6436] hover:border-[#DF6436]">
            Retour à l'inscription
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center space-y-8">
      <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-green-100 mb-6">
        <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
        </svg>
      </div>
      <h1 className="font-heading font-black text-4xl md:text-6xl uppercase tracking-tighter text-black">
        Inscription Réussie !
      </h1>
      <p className="text-xl font-light text-gray-600 max-w-2xl">
        Merci ! Votre paiement a été confirmé et votre inscription est enregistrée avec succès. 
        Vous recevrez prochainement un email de confirmation.
      </p>
      <div className="pt-8">
        <Link href="/" role="button" className="font-bold uppercase tracking-widest text-sm px-12 py-5 transition-all border inline-block bg-black text-white border-black hover:bg-[#DF6436] hover:border-[#DF6436]">
          Retour à l'accueil
        </Link>
      </div>
    </div>
  );
}
