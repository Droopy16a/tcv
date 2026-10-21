import "server-only";
import { cache } from "react";
import { getSupabaseAdminClient } from "@/lib/supabase";
import { isRegistrationPricing, type RegistrationPricing } from "./registration-pricing";

export const getRegistrationPricing = cache(async (): Promise<RegistrationPricing | null> => {
  try {
    const { data, error } = await getSupabaseAdminClient()
      .from("registration_pricing").select("prices, discounts").eq("id", 1).maybeSingle();
    if (error || !isRegistrationPricing(data)) {
      console.error("Unable to load registration pricing:", error?.message ?? "Missing or invalid pricing");
      return null;
    }
    return data;
  } catch (error) {
    console.error("Unable to load registration pricing:", error);
    return null;
  }
});
