import { getSupabaseAdminClient } from "@/lib/supabase";
import InscriptionsClient from "./InscriptionsClient";

export const dynamic = "force-dynamic";

export default async function InscriptionsPage() {
  const supabase = getSupabaseAdminClient();

  const [
    { data: adultes, error: adultesError },
    { data: enfants, error: enfantsError },
  ] = await Promise.all([
    supabase
      .from("inscriptions_adultes")
      .select("*")
      .order("created_at", { ascending: false }),
    supabase
      .from("inscriptions_enfants")
      .select("*")
      .order("created_at", { ascending: false }),
  ]);

  if (adultesError || enfantsError) {
    console.error("Erreur chargement inscriptions", {
      adultes: adultesError?.message,
      enfants: enfantsError?.message,
    });
    throw new Error("Impossible de charger les inscriptions.");
  }

  return <InscriptionsClient adultes={adultes || []} enfants={enfants || []} />;
}
