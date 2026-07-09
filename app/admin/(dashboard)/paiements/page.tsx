import { getSupabaseAdminClient } from "@/lib/supabase";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Banknote } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminPaiementsPage() {
  const supabase = getSupabaseAdminClient();

  // Fetch paiements libres
  const { data: paiements, error } = await supabase
    .from("paiements_libres")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching paiements:", error);
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-heading font-black text-gray-900">Paiements Libres</h1>
          <p className="text-gray-500 mt-1">
            Suivi des paiements effectués depuis le formulaire générique.
          </p>
        </div>
        <div className="bg-orange-100 text-orange-800 p-3 rounded-full">
          <Banknote size={24} />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payeur</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Montant</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Motif</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bénéficiaires</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut HelloAsso</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paiements && paiements.length > 0 ? (
                paiements.map((p) => (
                  <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {format(new Date(p.created_at), "dd MMM yyyy, HH:mm", { locale: fr })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{p.prenom} {p.nom}</div>
                      <div className="text-sm text-gray-500">{p.email}</div>
                      {p.telephone && <div className="text-sm text-gray-500">{p.telephone}</div>}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        {p.montant} €
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 font-medium">{p.motif}</div>
                      {p.motif_details && <div className="text-sm text-gray-500 mt-1">{p.motif_details}</div>}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        {p.beneficiaires && Array.isArray(p.beneficiaires) && p.beneficiaires.length > 0 ? (
                          <ul className="list-disc list-inside">
                            {p.beneficiaires.map((b: any, idx: number) => (
                              <li key={idx}>{b.prenom} {b.nom}</li>
                            ))}
                          </ul>
                        ) : (
                          <span className="text-gray-400 italic">Aucun</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                        Initié (Checkout ID: {p.checkout_intent_id ? "Créé" : "Inconnu"})
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-10 text-center text-gray-500">
                    Aucun paiement libre n'a été enregistré pour le moment.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
