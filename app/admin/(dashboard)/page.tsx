export default function AdminDashboard() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-heading font-bold text-gray-900">Tableau de bord</h1>
        <p className="mt-2 text-gray-600">Bienvenue dans l'interface d'administration du TC Vernouillet.</p>
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
