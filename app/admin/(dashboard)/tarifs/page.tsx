import { getRegistrationPricing } from "@/lib/registration-pricing-server";
import PricingEditor from "./PricingEditor";

export const dynamic = "force-dynamic";

export default async function PricingPage() {
  const pricing = await getRegistrationPricing();
  return (
    <div>
      <h1 className="text-3xl font-heading font-bold text-gray-900">Frais d’inscription</h1>
      <p className="mt-2 mb-8 text-gray-600">Modifiez les tarifs appliqués au formulaire d’inscription et aux nouveaux paiements. Les montants sont en euros, licence incluse. Les cours adultes s’ajoutent à la cotisation, sauf pour l’entraînement équipe.</p>
      {pricing ? <PricingEditor initialPricing={pricing} /> : (
        <p role="alert" className="rounded-xl border border-red-200 bg-red-50 p-6 text-red-800">Impossible de charger les tarifs. Vérifiez la connexion à la base et l’application de la migration des tarifs.</p>
      )}
    </div>
  );
}
