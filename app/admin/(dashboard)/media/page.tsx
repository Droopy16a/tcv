import { getSupabaseAdminClient } from "@/lib/supabase";
import MediaClient from "./MediaClient";

export const dynamic = "force-dynamic";

export default async function MediaPage() {
  const supabase = getSupabaseAdminClient();
  
  // We list files from the 'uploads' folder within the 'media' bucket
  const { data, error } = await supabase.storage.from("media").list("uploads", {
    limit: 100,
    offset: 0,
    sortBy: { column: 'created_at', order: 'desc' },
  });

  const { data: publicUrlData } = supabase.storage.from("media").getPublicUrl("");

  return (
    <MediaClient
      initialFiles={data || []}
      publicUrlPrefix={publicUrlData.publicUrl}
      loadError={error?.message}
    />
  );
}
