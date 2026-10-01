import { NextResponse } from "next/server";
import { getSupabaseAdminClient } from "@/lib/supabase";
import { areRegistrationsEnabled } from "@/lib/site-settings";

export async function POST(req: Request) {
  try {
    if (!(await areRegistrationsEnabled())) {
      return NextResponse.json(
        { error: "Les inscriptions en ligne sont actuellement fermées." },
        { status: 403 },
      );
    }

    const supabase = getSupabaseAdminClient();
    const body = await req.json();

    const { error } = await supabase
      .from("inscriptions")
      .insert({
        nom: body.nom,
        prenom: body.prenom,
        sexe: body.sexe,

        date_naissance: body.dateNaissance,

        adresse: body.adresse,
        code_postal: body.codePostal,
        ville: body.ville,

        telephone: body.telephone,
        email: body.email,

        cours_collectifs: body.coursCollectifs,

        niveau: body.niveau,
        classement: body.classement,
        annees_pratique: Number(body.anneesPratique || 0),

        cours_selectionnes: body.coursSelectionnes,

        observations: body.observations,

        autorisation_mail: body.autorisationMail,
        autorisation_image: body.autorisationImage,
      });

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Erreur serveur",
      },
      {
        status: 500,
      }
    );
  }
}
