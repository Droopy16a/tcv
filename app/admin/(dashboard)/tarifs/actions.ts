"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/utils/supabase/server";
import { getSupabaseAdminClient } from "@/lib/supabase";
import { isRegistrationPricing } from "@/lib/registration-pricing";

export async function saveRegistrationPricing(value: unknown) {
  try {
    const auth = await createClient();
    const { data: { user }, error: authError } = await auth.auth.getUser();
    if (authError || !user) return { success: false, error: "Session administrateur invalide." };
    if (!isRegistrationPricing(value)) {
      return { success: false, error: "Saisissez des montants entre 0 et 100 000 €, avec deux décimales maximum." };
    }
    const { error } = await getSupabaseAdminClient().from("registration_pricing").upsert({
      id: 1, prices: value.prices, discounts: value.discounts, updated_at: new Date().toISOString(),
    });
    if (error) throw error;
    revalidatePath("/inscription");
    revalidatePath("/admin/tarifs");
    return { success: true };
  } catch (error) {
    console.error("Unable to save registration pricing:", error);
    return { success: false, error: "Impossible d’enregistrer les tarifs. Veuillez réessayer." };
  }
}
