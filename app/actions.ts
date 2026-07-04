"use server";

import { getSupabaseAdminClient } from "../lib/supabase";

async function getHelloAssoToken() {
  const clientId = process.env.HELLO_ASSO_CLIENT;
  const clientSecret = process.env.HELLO_ASSO_CLIENT_SECRET;
  const apiUrl = process.env.HELLO_ASSO_API_URL || "https://api.helloasso-sandbox.com";

  if (!clientId || !clientSecret) {
    throw new Error("HelloAsso credentials are not configured.");
  }

  const params = new URLSearchParams();
  params.append("grant_type", "client_credentials");
  params.append("client_id", clientId);
  params.append("client_secret", clientSecret);

  const response = await fetch(`${apiUrl}/oauth2/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params.toString(),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("HelloAsso OAuth Error:", errorText);
    throw new Error("Failed to authenticate with HelloAsso.");
  }

  const data = await response.json();
  return data.access_token;
}

async function createCheckoutIntent(cost: number, payerInfo: any) {
  const token = await getHelloAssoToken();
  const apiUrl = process.env.HELLO_ASSO_API_URL || "https://api.helloasso-sandbox.com";
  const orgSlug = "tc-vernouillet";
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  const payload = {
    totalAmount: cost * 100, // Amount in cents
    initialAmount: cost * 100,
    itemName: "Inscription TC Vernouillet",
    backUrl: `${baseUrl}/inscription/success`,
    errorUrl: `${baseUrl}/inscription`,
    returnUrl: `${baseUrl}/inscription/success`,
    containsDonation: false,
    payer: {
      firstName: payerInfo.prenom,
      lastName: payerInfo.nom,
      email: payerInfo.email,
    },
  };

  const response = await fetch(`${apiUrl}/v5/organizations/${orgSlug}/checkout-intents`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("HelloAsso Checkout Error:", errorText);
    throw new Error("Failed to create HelloAsso checkout.");
  }

  const data = await response.json();
  return data.redirectUrl;
}

export async function submitEnfant(data: any, cost: number) {
  try {
    const supabase = getSupabaseAdminClient();

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

    if (cost > 0) {
      const checkoutUrl = await createCheckoutIntent(cost, {
        prenom: data.prenom,
        nom: data.nom,
        email: data.emailMere || data.emailPere || "contact@tcvernouillet.fr",
      });
      return { success: true, checkoutUrl };
    }

    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

export async function submitAdulte(data: any, cost: number) {
  try {
    const supabase = getSupabaseAdminClient();

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

    if (cost > 0) {
      const checkoutUrl = await createCheckoutIntent(cost, {
        prenom: data.prenom,
        nom: data.nom,
        email: data.email,
      });
      return { success: true, checkoutUrl };
    }

    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}
