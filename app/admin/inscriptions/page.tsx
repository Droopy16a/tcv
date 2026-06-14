import { supabase } from "@/lib/supabase";

export default async function InscriptionsPage() {
  const { data } = await supabase
    .from("inscriptions")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="p-8">
      <h1 className="mb-6 text-3xl font-bold">
        Inscriptions
      </h1>

      <table className="w-full border-collapse border">
        <thead>
          <tr>
            <th className="border p-2">Nom</th>
            <th className="border p-2">Prénom</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Téléphone</th>
            <th className="border p-2">Ville</th>
            <th className="border p-2">Date</th>
          </tr>
        </thead>

        <tbody>
          {data?.map((item) => (
            <tr key={item.id}>
              <td className="border p-2">{item.nom}</td>
              <td className="border p-2">{item.prenom}</td>
              <td className="border p-2">{item.email}</td>
              <td className="border p-2">{item.telephone}</td>
              <td className="border p-2">{item.ville}</td>
              <td className="border p-2">
                {new Date(
                  item.created_at
                ).toLocaleDateString("fr-FR")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}