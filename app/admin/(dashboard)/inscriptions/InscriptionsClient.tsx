"use client";

import { useState } from "react";
import { Download, Printer, X } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import * as XLSX from "xlsx";

type Adulte = {
  id: string; created_at: string; nom: string; prenom: string; sexe: string; date_naissance: string; adresse: string; code_postal: string; ville: string; telephone: string; email: string; est_etudiant: boolean; position_famille: string; cours_collectifs: boolean; duree_cours: string; entrainement_equipe: boolean; niveau: string; classement: string; annees_pratique: string; selected_courses: any[]; autorisation_mail: boolean; observations: string; calculated_cost: string;
};

type Enfant = {
  id: string; created_at: string; nom: string; prenom: string; sexe: string; date_naissance: string; adresse: string; code_postal: string; ville: string; telephone_mere: string; email_mere: string; telephone_pere: string; email_pere: string; formule: string; creneau_baby_mini: string; niveau: string; galaxie_couleur: string; classement: string; annees_pratique: string; dispos_jours: any[]; position_famille: string; autorisation_mail: boolean; observations: string; calculated_cost: string;
};

export default function InscriptionsClient({ adultes, enfants }: { adultes: Adulte[], enfants: Enfant[] }) {
  
  const [activeTab, setActiveTab] = useState<"Adultes" | "Enfants">("Adultes");
  const [selectedAdulte, setSelectedAdulte] = useState<Adulte | null>(null);
  const [selectedEnfant, setSelectedEnfant] = useState<Enfant | null>(null);

  const printCurrentTable = () => {
    const isAdultTab = activeTab === "Adultes";
    const rows = isAdultTab
      ? adultes.map((item) => ({
          Date: item.created_at ? format(new Date(item.created_at), "dd/MM/yyyy") : "",
          Nom: item.nom,
          Prénom: item.prenom,
          Sexe: item.sexe,
          "Date de naissance": item.date_naissance ? format(new Date(item.date_naissance), "dd/MM/yyyy") : "",
          Adresse: item.adresse,
          "Code postal": item.code_postal,
          Ville: item.ville,
          Email: item.email,
          Téléphone: item.telephone,
          Étudiant: item.est_etudiant ? "Oui" : "Non",
          "Position famille": item.position_famille,
          "Cours collectifs": item.cours_collectifs ? "Oui" : "Non",
          "Durée cours": item.duree_cours,
          "Entraînement équipe": item.entrainement_equipe ? "Oui" : "Non",
          Niveau: item.niveau,
          Classement: item.classement,
          "Années de pratique": item.annees_pratique,
          Formule: item.cours_collectifs ? `Cours ${item.duree_cours}` : "Adhésion seule",
          Observations: item.observations || "",
          "Prix calculé": item.calculated_cost ? `${item.calculated_cost} €` : "",
        }))
      : enfants.map((item) => ({
          Date: item.created_at ? format(new Date(item.created_at), "dd/MM/yyyy") : "",
          Nom: item.nom,
          Prénom: item.prenom,
          Sexe: item.sexe,
          "Date de naissance": item.date_naissance ? format(new Date(item.date_naissance), "dd/MM/yyyy") : "",
          Adresse: item.adresse,
          "Code postal": item.code_postal,
          Ville: item.ville,
          "Email mère": item.email_mere,
          "Téléphone mère": item.telephone_mere,
          "Email père": item.email_pere,
          "Téléphone père": item.telephone_pere,
          "Position famille": item.position_famille,
          Formule: item.formule,
          "Créneau Baby/Mini": item.creneau_baby_mini,
          Niveau: item.niveau,
          "Galaxie / Couleur": item.galaxie_couleur,
          Classement: item.classement,
          "Années de pratique": item.annees_pratique,
          "Disponibilités": (item.dispos_jours || []).join(", "),
          Observations: item.observations || "",
          "Prix calculé": item.calculated_cost ? `${item.calculated_cost} €` : "",
        }));

    const headers = Object.keys(rows[0] || {});
    const printWindow = window.open("", "_blank", "width=1200,height=900");

    if (!printWindow) {
      window.print();
      return;
    }

    printWindow.document.write(`
      <html>
        <head>
          <title>Inscriptions ${activeTab}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 24px; color: #111827; }
            h1 { margin-bottom: 20px; font-size: 24px; }
            table { width: 100%; border-collapse: collapse; font-size: 11px; }
            th, td { border: 1px solid #d1d5db; padding: 6px 8px; text-align: left; vertical-align: top; }
            th { background: #f3f4f6; font-weight: 700; }
            tr:nth-child(even) td { background: #fafafa; }
          </style>
        </head>
        <body>
          <h1>Inscriptions ${activeTab}</h1>
          <table>
            <thead>
              <tr>
                ${headers.map((header) => `<th>${header}</th>`).join("")}
              </tr>
            </thead>
            <tbody>
              ${rows
                .map(
                  (row) =>
                    `<tr>${headers
                      .map((header) => `<td>${String(row[header as keyof typeof row] ?? "")}</td>`)
                      .join("")}</tr>`
                )
                .join("")}
            </tbody>
          </table>
        </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  };

  const exportCurrentTable = () => {
    const headers =
      activeTab === "Adultes"
        ? [
            "Date",
            "Joueur",
            "Sexe",
            "Date de naissance",
            "Email",
            "Téléphone",
            "Formule",
            "Entraînement équipe",
            "Niveau",
            "Classement",
            "Prix",
            "Position famille",
            "Observations",
          ]
        : [
            "Date",
            "Enfant",
            "Sexe",
            "Date de naissance",
            "Email mère",
            "Téléphone mère",
            "Email père",
            "Téléphone père",
            "Formule",
            "Créneau Baby/Mini",
            "Niveau",
            "Galaxie",
            "Prix",
            "Position famille",
            "Observations",
          ];

    const rows =
      activeTab === "Adultes"
        ? adultes.map((item) => [
            item.created_at ? format(new Date(item.created_at), "dd/MM/yyyy") : "",
            `${item.nom} ${item.prenom}`,
            item.sexe,
            item.date_naissance ? format(new Date(item.date_naissance), "dd/MM/yyyy") : "",
            item.email,
            item.telephone,
            item.cours_collectifs ? `Cours ${item.duree_cours}` : "Adhésion seule",
            item.entrainement_equipe ? "Oui" : "Non",
            item.niveau,
            item.classement,
            item.calculated_cost,
            item.position_famille,
            item.observations,
          ])
        : enfants.map((item) => [
            item.created_at ? format(new Date(item.created_at), "dd/MM/yyyy") : "",
            `${item.nom} ${item.prenom}`,
            item.sexe,
            item.date_naissance ? format(new Date(item.date_naissance), "dd/MM/yyyy") : "",
            item.email_mere,
            item.telephone_mere,
            item.email_pere,
            item.telephone_pere,
            item.formule,
            item.creneau_baby_mini,
            item.niveau,
            item.galaxie_couleur,
            item.calculated_cost,
            item.position_famille,
            item.observations,
          ]);

    const worksheet = XLSX.utils.aoa_to_sheet([headers, ...rows]);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, activeTab);
    XLSX.writeFile(workbook, `inscriptions-${activeTab.toLowerCase()}.xlsx`);
  };

  return (
    <div>
      <div className="mb-6 flex justify-between items-center gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold text-gray-900">Inscriptions</h1>
          <p className="mt-1 text-sm text-gray-500">Gérez les inscriptions adultes et enfants.</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={exportCurrentTable}
            className="inline-flex items-center gap-2 rounded-lg border border-[#DF6436] bg-[#DF6436] px-3 py-2 text-xs font-bold uppercase tracking-widest text-white transition hover:bg-[#c95328]"
          >
            <Download size={15} />
            Télécharger XLSX
          </button>
          <button
            type="button"
            onClick={printCurrentTable}
            className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2 text-xs font-bold uppercase tracking-widest text-gray-700 transition hover:bg-gray-50"
          >
            <Printer size={15} />
            Imprimer
          </button>
        </div>
      </div>

      <div className="mb-6 flex gap-4 border-b border-gray-200">
        <button
          className={`pb-2 px-1 font-bold text-sm uppercase tracking-widest transition-colors border-b-2 ${activeTab === "Adultes" ? "border-[#DF6436] text-[#DF6436]" : "border-transparent text-gray-500 hover:text-gray-700"}`}
          onClick={() => setActiveTab("Adultes")}
        >
          Adultes ({adultes.length})
        </button>
        <button
          className={`pb-2 px-1 font-bold text-sm uppercase tracking-widest transition-colors border-b-2 ${activeTab === "Enfants" ? "border-[#DF6436] text-[#DF6436]" : "border-transparent text-gray-500 hover:text-gray-700"}`}
          onClick={() => setActiveTab("Enfants")}
        >
          Enfants ({enfants.length})
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {activeTab === "Adultes" && (
          <div className="overflow-x-auto">
            <table id="adultes-table" className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Joueur</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Contact</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Formule</th>
                  <th className="px-6 py-3 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Prix</th>
                  <th className="px-6 py-3"></th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {adultes.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {format(new Date(item.created_at), "dd MMM yyyy", { locale: fr })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-bold text-gray-900 uppercase">{item.nom} <span className="capitalize">{item.prenom}</span></div>
                      <div className="text-xs text-gray-500">{item.sexe} - {item.date_naissance ? format(new Date(item.date_naissance), "dd/MM/yyyy") : ""}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{item.email}</div>
                      <div className="text-sm text-gray-500">{item.telephone}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{item.cours_collectifs ? `Cours ${item.duree_cours}` : "Adhésion seule"}</div>
                      {item.entrainement_equipe && <div className="text-xs font-medium text-[#DF6436]">Équipe</div>}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-bold text-gray-900">
                      {item.calculated_cost} €
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button onClick={() => setSelectedAdulte(item)} className="text-[#DF6436] hover:text-[#c95328] font-bold text-xs uppercase tracking-widest">
                        Détails
                      </button>
                    </td>
                  </tr>
                ))}
                {adultes.length === 0 && (
                  <tr><td colSpan={6} className="px-6 py-8 text-center text-gray-500">Aucune inscription.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === "Enfants" && (
          <div className="overflow-x-auto">
            <table id="enfants-table" className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Enfant</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Parents</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Formule</th>
                  <th className="px-6 py-3 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Prix</th>
                  <th className="px-6 py-3"></th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {enfants.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {format(new Date(item.created_at), "dd MMM yyyy", { locale: fr })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-bold text-gray-900 uppercase">{item.nom} <span className="capitalize">{item.prenom}</span></div>
                      <div className="text-xs text-gray-500">{item.sexe} - {item.date_naissance ? format(new Date(item.date_naissance), "dd/MM/yyyy") : ""}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-xs font-medium text-gray-900">Mère: {item.telephone_mere}</div>
                      <div className="text-xs text-gray-500">Père: {item.telephone_pere}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 font-medium">{item.formule}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-bold text-gray-900">
                      {item.calculated_cost} €
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button onClick={() => setSelectedEnfant(item)} className="text-[#DF6436] hover:text-[#c95328] font-bold text-xs uppercase tracking-widest">
                        Détails
                      </button>
                    </td>
                  </tr>
                ))}
                {enfants.length === 0 && (
                  <tr><td colSpan={6} className="px-6 py-8 text-center text-gray-500">Aucune inscription.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal Adulte */}
      {selectedAdulte && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black bg-opacity-50">
          <div className="bg-white w-full max-w-md h-full shadow-2xl overflow-y-auto animate-in slide-in-from-right duration-300">
            <div className="sticky top-0 bg-white border-b border-gray-100 p-6 flex justify-between items-center z-10">
              <h2 className="text-xl font-heading font-black">Fiche Inscription</h2>
              <button onClick={() => setSelectedAdulte(null)} className="p-2 hover:bg-gray-100 rounded-full"><X size={20}/></button>
            </div>
            <div className="p-6 space-y-6">
              <Section title="Joueur">
                <Field label="Nom" value={selectedAdulte.nom.toUpperCase()} />
                <Field label="Prénom" value={selectedAdulte.prenom} />
                <Field label="Sexe" value={selectedAdulte.sexe} />
                <Field label="Né(e) le" value={selectedAdulte.date_naissance ? format(new Date(selectedAdulte.date_naissance), "dd/MM/yyyy") : ""} />
                <Field label="Étudiant" value={selectedAdulte.est_etudiant ? "Oui" : "Non"} />
              </Section>
              
              <Section title="Coordonnées">
                <Field label="Email" value={selectedAdulte.email} />
                <Field label="Téléphone" value={selectedAdulte.telephone} />
                <Field label="Adresse" value={`${selectedAdulte.adresse}, ${selectedAdulte.code_postal} ${selectedAdulte.ville}`} />
              </Section>

              <Section title="Tennis">
                <Field label="Niveau" value={selectedAdulte.niveau} />
                <Field label="Classement" value={selectedAdulte.classement} />
                <Field label="Années de pratique" value={selectedAdulte.annees_pratique} />
              </Section>

              <Section title="Choix Formule">
                <Field label="Cours collectifs" value={selectedAdulte.cours_collectifs ? `Oui (${selectedAdulte.duree_cours})` : "Non"} />
                <Field label="Entraînement Équipe" value={selectedAdulte.entrainement_equipe ? "Oui" : "Non"} />
              </Section>
              
              <Section title="Autre">
                <Field label="Position famille" value={selectedAdulte.position_famille} />
                <Field label="Tarif calculé" value={`${selectedAdulte.calculated_cost} €`} />
                <Field label="Observations" value={selectedAdulte.observations || "-"} />
              </Section>
            </div>
          </div>
        </div>
      )}

      {/* Modal Enfant */}
      {selectedEnfant && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black bg-opacity-50">
          <div className="bg-white w-full max-w-md h-full shadow-2xl overflow-y-auto animate-in slide-in-from-right duration-300">
            <div className="sticky top-0 bg-white border-b border-gray-100 p-6 flex justify-between items-center z-10">
              <h2 className="text-xl font-heading font-black">Fiche Enfant</h2>
              <button onClick={() => setSelectedEnfant(null)} className="p-2 hover:bg-gray-100 rounded-full"><X size={20}/></button>
            </div>
            <div className="p-6 space-y-6">
              <Section title="Enfant">
                <Field label="Nom" value={selectedEnfant.nom.toUpperCase()} />
                <Field label="Prénom" value={selectedEnfant.prenom} />
                <Field label="Sexe" value={selectedEnfant.sexe} />
                <Field label="Né(e) le" value={selectedEnfant.date_naissance ? format(new Date(selectedEnfant.date_naissance), "dd/MM/yyyy") : ""} />
              </Section>
              
              <Section title="Parents / Contact">
                <Field label="Email Mère" value={selectedEnfant.email_mere} />
                <Field label="Tél Mère" value={selectedEnfant.telephone_mere} />
                <Field label="Email Père" value={selectedEnfant.email_pere} />
                <Field label="Tél Père" value={selectedEnfant.telephone_pere} />
                <Field label="Adresse" value={`${selectedEnfant.adresse}, ${selectedEnfant.code_postal} ${selectedEnfant.ville}`} />
              </Section>

              <Section title="Tennis">
                <Field label="Niveau" value={selectedEnfant.niveau} />
                <Field label="Galaxie (Couleur)" value={selectedEnfant.galaxie_couleur} />
                <Field label="Classement" value={selectedEnfant.classement} />
                <Field label="Années de pratique" value={selectedEnfant.annees_pratique} />
              </Section>

              <Section title="Choix Formule">
                <Field label="Formule" value={selectedEnfant.formule} />
                <Field label="Créneau Baby/Mini" value={selectedEnfant.creneau_baby_mini} />
                <Field label="Disponibilités" value={(selectedEnfant.dispos_jours || []).join(", ")} />
              </Section>
              
              <Section title="Autre">
                <Field label="Position famille" value={selectedEnfant.position_famille} />
                <Field label="Tarif calculé" value={`${selectedEnfant.calculated_cost} €`} />
                <Field label="Observations" value={selectedEnfant.observations || "-"} />
              </Section>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Section({ title, children }: { title: string, children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 border-b border-gray-100 pb-2 mb-3">{title}</h3>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function Field({ label, value }: { label: string, value: React.ReactNode }) {
  if (!value) return null;
  return (
    <div>
      <div className="text-xs text-gray-500">{label}</div>
      <div className="text-sm font-medium text-gray-900">{value}</div>
    </div>
  );
}
