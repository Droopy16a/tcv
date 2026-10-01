"use server";

import { getSupabaseAdminClient } from "@/lib/supabase";
import { REGISTRATIONS_SETTING_KEY } from "@/lib/site-settings";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function setRegistrationsEnabled(enabled: boolean) {
  const authClient = await createClient();
  const {
    data: { user },
    error: authError,
  } = await authClient.auth.getUser();

  if (authError || !user) {
    return { success: false, error: "Session administrateur invalide." };
  }

  const supabase = getSupabaseAdminClient();
  const { error } = await supabase.from("site_settings").upsert(
    {
      key: REGISTRATIONS_SETTING_KEY,
      enabled,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "key" },
  );

  if (error) {
    console.error("Unable to update registration setting:", error.message);
    return {
      success: false,
      error: "Impossible de modifier l'état des inscriptions.",
    };
  }

  revalidatePath("/", "layout");
  revalidatePath("/inscription");
  revalidatePath("/ecole-de-tennis");
  revalidatePath("/admin");
  revalidatePath("/sitemap.xml");

  return { success: true, enabled };
}
