"use server";

import { createClient } from "@/utils/supabase/server";
import { getSupabaseAdminClient } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

const MAX_FILE_SIZE = 20 * 1024 * 1024;
const ALLOWED_FILE_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "application/pdf",
]);

async function isAuthenticatedAdmin() {
  const authClient = await createClient();
  const {
    data: { user },
    error,
  } = await authClient.auth.getUser();

  return !error && Boolean(user);
}

function getStorageErrorMessage(message: string) {
  const normalizedMessage = message.toLowerCase();

  if (normalizedMessage.includes("bucket not found")) {
    return "Le bucket Supabase « media » est introuvable.";
  }

  if (
    normalizedMessage.includes("payload too large") ||
    normalizedMessage.includes("maximum allowed size")
  ) {
    return "Le fichier dépasse la taille autorisée par Supabase.";
  }

  if (normalizedMessage.includes("mime type")) {
    return "Ce type de fichier n'est pas autorisé par le bucket Supabase.";
  }

  return `Supabase a refusé le fichier : ${message}`;
}

export async function uploadMedia(formData: FormData) {
  if (!(await isAuthenticatedAdmin())) {
    return { error: "Votre session administrateur a expiré." };
  }

  const fileEntry = formData.get("file");

  if (!(fileEntry instanceof File) || fileEntry.size === 0) {
    return { error: "Aucun fichier sélectionné." };
  }

  if (fileEntry.size > MAX_FILE_SIZE) {
    return { error: "Le fichier dépasse la taille maximale de 20 Mo." };
  }

  if (!ALLOWED_FILE_TYPES.has(fileEntry.type)) {
    return { error: "Seuls les fichiers JPG, PNG et PDF sont autorisés." };
  }

  const fileExtension = fileEntry.name.split(".").pop()?.toLowerCase();
  const fileName = `${crypto.randomUUID()}.${fileExtension}`;
  const supabase = getSupabaseAdminClient();

  const { error } = await supabase.storage
    .from("media")
    .upload(`uploads/${fileName}`, fileEntry, {
      cacheControl: "3600",
      contentType: fileEntry.type,
      upsert: false,
    });

  if (error) {
    console.error("[admin/media] Upload failed", {
      fileName: fileEntry.name,
      fileSize: fileEntry.size,
      fileType: fileEntry.type,
      error: error.message,
    });
    return { error: getStorageErrorMessage(error.message) };
  }

  revalidatePath("/admin/media");
  return { success: true };
}

export async function deleteMedia(path: string) {
  if (!(await isAuthenticatedAdmin())) {
    return { error: "Votre session administrateur a expiré." };
  }

  const supabase = getSupabaseAdminClient();

  const { error } = await supabase.storage
    .from("media")
    .remove([path]);

  if (error) {
    console.error("[admin/media] Delete failed", {
      path,
      error: error.message,
    });
    return { error: `Impossible de supprimer le fichier : ${error.message}` };
  }

  revalidatePath("/admin/media");
  return { success: true };
}
