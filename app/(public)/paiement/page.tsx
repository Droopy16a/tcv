import PaymentForm from "@/app/components/PaymentForm";
import { Suspense } from "react";

export const metadata = {
  title: "Paiement Libre | TC Vernouillet",
  description: "Réglez vos prestations ou cotisations librement via notre plateforme sécurisée HelloAsso.",
};

export default function PaiementPage() {
  return (
    <div className="bg-[#FAFAFA] min-h-screen pt-32 pb-24 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-96 bg-black transform -skew-y-3 origin-top-left -z-10"></div>
      
      <div className="container mx-auto px-6 mb-16 text-center text-white relative z-10">
        <h2 className="text-accent font-bold uppercase tracking-widest text-sm mb-4">
          TC Vernouillet
        </h2>
        <h1 className="font-heading font-black text-black text-4xl md:text-6xl uppercase tracking-tighter mb-6">
          Paiement Libre
        </h1>
        <p className="text-gray-300 font-light text-lg max-w-2xl mx-auto">
          Utilisez ce formulaire pour régler une prestation, un achat ou une cotisation spécifique. Le paiement est 100% sécurisé via HelloAsso.
        </p>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <Suspense fallback={<div className="text-center py-20 text-gray-500">Chargement du formulaire...</div>}>
          <PaymentForm />
        </Suspense>
      </div>
    </div>
  );
}
