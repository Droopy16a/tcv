"use server";

import { getSupabaseAdminClient } from "../lib/supabase";
import { cookies } from "next/headers";

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
    backUrl: `${baseUrl}/inscription`,
    errorUrl: `${baseUrl}/inscription/error`,
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

export async function getHelloAssoCheckoutIntent(checkoutIntentId: string) {
  const token = await getHelloAssoToken();
  const apiUrl = process.env.HELLO_ASSO_API_URL || "https://api.helloasso-sandbox.com";
  const orgSlug = "tc-vernouillet";

  const response = await fetch(`${apiUrl}/v5/organizations/${orgSlug}/checkout-intents/${checkoutIntentId}`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch checkout intent");
  }

  return response.json();
}

export async function submitEnfant(data: any, cost: number) {
  try {
    if (cost > 0) {
      const checkoutUrl = await createCheckoutIntent(cost, {
        prenom: data.prenom,
        nom: data.nom,
        email: data.emailMere || data.emailPere || "contact@tcvernouillet.fr",
      });
      
      const cookieStore = await cookies();
      cookieStore.set("pending_inscription", JSON.stringify({ type: "enfant", data, cost }), { maxAge: 3600 });
      
      return { success: true, checkoutUrl };
    }

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

    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

export async function submitAdulte(data: any, cost: number) {
  try {
    if (cost > 0) {
      const checkoutUrl = await createCheckoutIntent(cost, {
        prenom: data.prenom,
        nom: data.nom,
        email: data.email,
      });
      
      const cookieStore = await cookies();
      cookieStore.set("pending_inscription", JSON.stringify({ type: "adulte", data, cost }), { maxAge: 3600 });
      
      return { success: true, checkoutUrl };
    }

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

    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

export async function finalizeInscription(checkoutIntentId: string | null) {
  try {
    const cookieStore = await cookies();
    const pendingDataStr = cookieStore.get("pending_inscription")?.value;
    
    if (!pendingDataStr) {
      return { success: false, error: "Aucune inscription en attente trouvée. Le délai a peut-être expiré." };
    }

    const pendingData = JSON.parse(pendingDataStr);
    
    if (checkoutIntentId) {
      try {
        const intent = await getHelloAssoCheckoutIntent(checkoutIntentId);
        if (!intent.order) {
          return { success: false, error: "Le paiement n'a pas encore été validé par HelloAsso." };
        }
      } catch (e: any) {
        console.error("Error verifying HelloAsso intent:", e);
        return { success: false, error: "Erreur lors de la vérification du paiement." };
      }
    } else if (pendingData.cost > 0) {
      return { success: false, error: "Paiement non vérifiable (ID manquant)." };
    }

    const supabase = getSupabaseAdminClient();
    const { type, data, cost } = pendingData;
    
    let result;
    if (type === "enfant") {
      result = await supabase.from("inscriptions_enfants").insert({
        nom: data.nom.toLowerCase(),
        prenom: data.prenom.toLowerCase(),
        sexe: data.sexe,
        date_naissance: data.dateNaissance || null,
        adresse: data.adresse.toLowerCase(),
        code_postal: data.codePostal,
        ville: data.ville.toLowerCase(),
        telephone_mere: data.telephoneMere,
        email_mere: data.emailMere?.toLowerCase() || "",
        telephone_pere: data.telephonePere,
        email_pere: data.emailPere?.toLowerCase() || "",
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
    } else {
      result = await supabase.from("inscriptions_adultes").insert({
        nom: data.nom.toLowerCase(),
        prenom: data.prenom.toLowerCase(),
        sexe: data.sexe,
        date_naissance: data.dateNaissance || null,
        adresse: data.adresse.toLowerCase(),
        code_postal: data.codePostal,
        ville: data.ville.toLowerCase(),
        telephone: data.telephone,
        email: data.email?.toLowerCase() || "",
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
    }

    if (result.error) {
      console.error("Supabase Error during finalize:", result.error);
      return { success: false, error: result.error.message };
    }

    cookieStore.delete("pending_inscription");
    return { success: true };
  } catch (err: any) {
    console.error("Finalize Error:", err);
    return { success: false, error: err.message };
  }
}
