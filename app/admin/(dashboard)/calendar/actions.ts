"use server";

import { getSupabaseAdminClient } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

export async function addEvent(formData: FormData) {
  const supabase = getSupabaseAdminClient();

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const type = formData.get("type") as string;
  const dateText = formData.get("date_text") as string;
  const sortDate = formData.get("sort_date") as string;

  const { error } = await supabase.from("events").insert({
    title,
    description,
    type,
    date_text: dateText,
    sort_date: sortDate ? new Date(sortDate).toISOString() : null,
  });

  if (error) return { error: "Erreur lors de l'ajout de l'événement." };

  revalidatePath("/admin/calendar");
  revalidatePath("/calendrier");
  return { success: true };
}

export async function updateEvent(id: string, formData: FormData) {
  const supabase = getSupabaseAdminClient();

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const type = formData.get("type") as string;
  const dateText = formData.get("date_text") as string;
  const sortDate = formData.get("sort_date") as string;

  const { error } = await supabase.from("events").update({
    title,
    description,
    type,
    date_text: dateText,
    sort_date: sortDate ? new Date(sortDate).toISOString() : null,
  }).eq("id", id);

  if (error) return { error: "Erreur lors de la modification de l'événement." };

  revalidatePath("/admin/calendar");
  return { success: true };
}

export async function deleteEvent(id: string) {
  const supabase = getSupabaseAdminClient();
  const { error } = await supabase.from("events").delete().eq("id", id);
  if (error) return { error: "Erreur lors de la suppression de l'événement." };
  
  revalidatePath("/admin/calendar");
  return { success: true };
}
