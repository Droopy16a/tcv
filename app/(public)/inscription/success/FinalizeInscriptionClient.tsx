"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { finalizePendingInscription } from "@/app/actions";

type Status =
  | { type: "loading"; message: string }
  | { type: "success"; message: string }
  | { type: "error"; message: string };

export default function FinalizeInscriptionClient() {
  const hasStarted = useRef(false);
  const [status, setStatus] = useState<Status>({
    type: "loading",
    message: "Verification du paiement en cours...",
  });

  useEffect(() => {
    if (hasStarted.current) {
      return;
    }

    hasStarted.current = true;

    async function finalize() {
      const result = new URLSearchParams(window.location.search).get("result");
      if (result && ["error", "failed", "cancelled", "canceled"].includes(result.toLowerCase())) {
        window.location.href = "/inscription/error";
        return;
      }

      const rawPending = window.sessionStorage.getItem("tcv_pending_inscription");
      if (!rawPending) {
        setStatus({
          type: "error",
          message: "Aucune inscription en attente n'a ete retrouvee pour finaliser le paiement.",
        });
        return;
      }

      let pending;
      try {
        pending = JSON.parse(rawPending);
      } catch {
        setStatus({
          type: "error",
          message: "Les informations d'inscription en attente sont illisibles. Merci de recommencer l'inscription.",
        });
        return;
      }

      if (!pending?.checkoutIntentId && pending?.cost > 0) {
        setStatus({
          type: "error",
          message: "La reference de paiement est manquante. L'inscription n'a pas ete enregistree.",
        });
        return;
      }

      const response = await finalizePendingInscription(pending);

      if (!response.success) {
        setStatus({
          type: "error",
          message: response.error || "Le paiement n'a pas pu etre valide. L'inscription n'a pas ete enregistree.",
        });
        return;
      }

      window.sessionStorage.removeItem("tcv_pending_inscription");
      setStatus({
        type: "success",
        message: "Merci ! Votre paiement a ete confirme et votre inscription est enregistree avec succes.",
      });
    }

    finalize().catch((error) => {
      setStatus({
        type: "error",
        message: error instanceof Error ? error.message : "Une erreur est survenue pendant la finalisation.",
      });
    });
  }, []);

  const isSuccess = status.type === "success";
  const isError = status.type === "error";

  return (
    <section className="py-24 px-6 bg-white min-h-[70vh] flex flex-col items-center justify-center">
      <div className="container mx-auto max-w-3xl text-center space-y-8">
        <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full mb-6 ${isSuccess ? "bg-green-100" : isError ? "bg-red-100" : "bg-gray-100"}`}>
          {isSuccess ? (
            <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          ) : isError ? (
            <svg className="w-12 h-12 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          ) : (
            <div className="h-12 w-12 border-4 border-gray-300 border-t-[#DF6436] rounded-full animate-spin" />
          )}
        </div>

        <h1 className="font-heading font-black text-4xl md:text-6xl uppercase tracking-tighter text-black">
          {isSuccess ? "Inscription Reussie !" : isError ? "Paiement non valide" : "Finalisation"}
        </h1>

        <p className="text-xl font-light text-gray-600">{status.message}</p>

        {(isSuccess || isError) && (
          <div className="pt-8 flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/" role="button" className="font-bold uppercase tracking-widest text-sm px-12 py-5 transition-all border inline-block bg-black text-white border-black hover:bg-[#DF6436] hover:border-[#DF6436]">
              Retour accueil
            </Link>
            {isError && (
              <Link href="/inscription" role="button" className="font-bold uppercase tracking-widest text-sm px-12 py-5 transition-all border inline-block bg-white text-black border-black hover:border-[#DF6436] hover:text-[#DF6436]">
                Recommencer
              </Link>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
