"use server";

import { supabase } from "../lib/supabase";

export async function submitEnfant(data: any, cost: number) {
  try {
    const { error } = await supabase.from("inscriptions_enfants").insert({
      nom: data.nom.toLowerCase(),
      prenom: data.prenom.toLowerCase(),
      sexe: data.sexe,
      date_naissance: data.dateNaissance || null,
      adresse: data.adresse.toLowerCase(),
      code_postal: data.codePostal,
      ville: data.ville.toLowerCase(),
      telephone_mere: data.telephoneMere,
      email_mere: data.emailMere.toLowerCase(),
      telephone_pere: data.telephonePere,
      email_pere: data.emailPere.toLowerCase(),
      formule: data.formule,
      creneau_baby_mini: data.creneauBabyMini,
      niveau: data.niveau,
      galaxie_couleur: data.galaxieCouleur,
      classement: data.classement,
      annees_pratique: data.anneesPratique,
      dispos_jours: data.disposJours,
      position_famille: data.positionFamille,
      autorisation_mail: data.autorisationMail,
      observations: data.observations,
      calculated_cost: cost,
    });

    if (error) {
      console.error("Supabase Error:", error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

export async function submitAdulte(data: any, cost: number) {
  try {
    const { error } = await supabase.from("inscriptions_adultes").insert({
      nom: data.nom.toLowerCase(),
      prenom: data.prenom.toLowerCase(),
      sexe: data.sexe,
      date_naissance: data.dateNaissance || null,
      adresse: data.adresse.toLowerCase(),
      code_postal: data.codePostal,
      ville: data.ville.toLowerCase(),
      telephone: data.telephone,
      email: data.email.toLowerCase(),
      est_etudiant: data.estEtudiant,
      position_famille: data.positionFamille,
      cours_collectifs: data.coursCollectifs,
      duree_cours: data.dureeCours,
      entrainement_equipe: data.entrainementEquipe,
      niveau: data.niveau,
      classement: data.classement,
      annees_pratique: data.anneesPratique,
      selected_courses: data.selectedCourses,
      autorisation_mail: data.autorisationMail,
      observations: data.observations,
      calculated_cost: cost,
    });

    if (error) {
      console.error("Supabase Error:", error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}
