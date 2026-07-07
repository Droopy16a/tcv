import { getSupabaseAdminClient } from "@/lib/supabase";
import CalendrierClient from "./CalendrierClient";
import { format, parseISO, getMonth, getYear } from "date-fns";
import { fr } from "date-fns/locale";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Calendrier & Événements',
  description:
    'Retrouvez le calendrier des tournois, événements et compétitions du Tennis Club de Vernouillet (TC Vernouillet). Restez informé des prochaines dates en Yvelines (78).',
  keywords: [
    'calendrier tennis Vernouillet',
    'tournoi tennis Vernouillet',
    'événements TC Vernouillet',
    'compétitions tennis 78',
    'planning tennis Vernouillet',
  ],
  alternates: {
    canonical: '/calendrier',
  },
  openGraph: {
    title: 'Calendrier & Événements | TC Vernouillet',
    description:
      'Tournois, événements et compétitions du TC Vernouillet à Vernouillet (78). Consultez le planning de la saison.',
    url: 'https://www.tcvernouillet.com/calendrier',
  },
};

export const dynamic = "force-dynamic";

export type PublicEvent = {
  id: string;
  title: string;
  dateString: string;
  category: string;
  description: string;
  sortOrder: number;
};

export default async function CalendrierPage() {
  const supabase = getSupabaseAdminClient();
  const { data: dbEvents } = await supabase
    .from("events")
    .select("*")
    .order("sort_date", { ascending: true, nullsFirst: false });

  const events: PublicEvent[] = (dbEvents || []).map((dbEvent) => {
    let sortOrder = 13; // Default to end of list if no sort_date
    if (dbEvent.sort_date) {
      const sortDate = parseISO(dbEvent.sort_date);
      const month = getMonth(sortDate); // 0-11
      sortOrder = month - 7; // Aug (7) -> 0, Sep (8) -> 1
      if (sortOrder <= 0) {
        sortOrder += 12; // Jan (0) -> 5
      }
    }

    return {
      id: dbEvent.id,
      title: dbEvent.title,
      dateString: dbEvent.date_text,
      category: dbEvent.type,
      description: dbEvent.description,
      sortOrder: sortOrder,
    };
  });

  return <CalendrierClient events={events} />;
}
