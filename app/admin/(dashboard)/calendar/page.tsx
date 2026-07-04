import { getSupabaseAdminClient } from "@/lib/supabase";
import CalendarClient from "./CalendarClient";

export const dynamic = "force-dynamic";

export default async function CalendarPage() {
  const supabase = getSupabaseAdminClient();
  const { data: events, error } = await supabase
    .from("events")
    .select("*")
    .order("sort_date", { ascending: true });

  if (error) {
    console.error("Erreur chargement calendrier admin", error.message);
    throw new Error("Impossible de charger les événements.");
  }

  return <CalendarClient initialEvents={events || []} />;
}
