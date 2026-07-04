"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function uploadMedia(formData: FormData) {
  const supabase = await createClient();
  const file = formData.get("file") as File;

  if (!file || file.size === 0) {
    return { error: "Aucun fichier sélectionné." };
  }

  const fileExt = file.name.split('.').pop();
  const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
  
  const { data, error } = await supabase.storage
    .from("media")
    .upload(`uploads/${fileName}`, file);

  if (error) {
    console.error(error);
    return { error: "Erreur lors de l'upload du fichier." };
  }

  revalidatePath("/admin/media");
  return { success: true };
}

export async function deleteMedia(path: string) {
  const supabase = await createClient();
  
  const { error } = await supabase.storage
    .from("media")
    .remove([path]);

  if (error) {
    console.error(error);
    return { error: "Erreur lors de la suppression du fichier." };
  }

  revalidatePath("/admin/media");
  return { success: true };
}
