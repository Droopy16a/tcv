import "server-only";

import { getSupabaseAdminClient } from "@/lib/supabase";
import { cache } from "react";

export const REGISTRATIONS_SETTING_KEY = "registrations_enabled";

export const areRegistrationsEnabled = cache(async (): Promise<boolean> => {
  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.SUPABASE_SERVICE_ROLE_KEY
  ) {
    return true;
  }

  try {
    const supabase = getSupabaseAdminClient();
    const { data, error } = await supabase
      .from("site_settings")
      .select("enabled")
      .eq("key", REGISTRATIONS_SETTING_KEY)
      .maybeSingle();

    if (error) {
      console.error("Unable to load registration setting:", error.message);
      return true;
    }

    return data?.enabled ?? true;
  } catch (error) {
    console.error("Unable to initialize registration setting:", error);
    return true;
  }
});
