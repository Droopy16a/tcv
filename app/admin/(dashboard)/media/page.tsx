import { createClient } from "@/utils/supabase/server";
import MediaClient from "./MediaClient";

export default async function MediaPage() {
  const supabase = await createClient();
  
  // We list files from the 'uploads' folder within the 'media' bucket
  const { data, error } = await supabase.storage.from("media").list("uploads", {
    limit: 100,
    offset: 0,
    sortBy: { column: 'created_at', order: 'desc' },
  });

  const { data: publicUrlData } = supabase.storage.from("media").getPublicUrl("");

  return <MediaClient initialFiles={data || []} publicUrlPrefix={publicUrlData.publicUrl} />;
}
