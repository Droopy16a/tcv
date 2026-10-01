import { areRegistrationsEnabled } from "@/lib/site-settings";
import RegistrationToggle from "./RegistrationToggle";

export default async function AdminDashboard() {
  const registrationsEnabled = await areRegistrationsEnabled();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-heading font-bold text-gray-900">Tableau de bord</h1>
        <p className="mt-2 text-gray-600">Bienvenue dans l&apos;interface d&apos;administration du TC Vernouillet.</p>
      </div>

      <div className="mb-6 rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-bold text-gray-900">Réglages du site</h2>
        <div className="mt-4 border-t border-gray-100 pt-4">
          <RegistrationToggle initialEnabled={registrationsEnabled} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-gray-900">Raccourcis</h3>
          <div className="mt-4 space-y-2">
            <a href="/admin/inscriptions" className="block text-sm text-[#DF6436] hover:underline">Gérer les inscriptions</a>
            <a href="/admin/calendar" className="block text-sm text-[#DF6436] hover:underline">Ajouter un événement</a>
            <a href="/admin/news" className="block text-sm text-[#DF6436] hover:underline">Publier une actualité</a>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-gray-900">Statut</h3>
          <div className="mt-4">
            <p className="text-sm text-gray-600">Le site fonctionne correctement.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
