"use server";

import { getSupabaseAdminClient } from "@/lib/supabase";

type PayerInfo = {
  prenom: string;
  nom: string;
  email: string;
};

type EnfantData = {
  nom: string;
  prenom: string;
  sexe: string;
  dateNaissance?: string;
  adresse: string;
  codePostal: string;
  ville: string;
  telephoneMere?: string;
  emailMere?: string;
  telephonePere?: string;
  emailPere?: string;
  formule: string;
  creneauBabyMini?: string;
  niveau: string;
  galaxieCouleur?: string;
  classement?: string;
  anneesPratique?: string;
  disposJours: string[];
  positionFamille: string;
  autorisationMail: boolean;
  observations?: string;
};

type AdulteData = {
  nom: string;
  prenom: string;
  sexe: string;
  dateNaissance?: string;
  adresse: string;
  codePostal: string;
  ville: string;
  telephone?: string;
  email: string;
  estEtudiant: boolean;
  positionFamille: string;
  coursCollectifs: boolean;
  dureeCours: string;
  entrainementEquipe: boolean;
  niveau: string;
  classement?: string;
  anneesPratique?: string;
  selectedCourses: string[];
  autorisationMail: boolean;
  observations?: string;
};

type EnfantCheckoutData = Pick<EnfantData, "nom" | "prenom" | "emailMere" | "emailPere">;
type AdulteCheckoutData = Pick<AdulteData, "nom" | "prenom" | "email">;

type PendingInscription =
  | {
      kind: "enfant";
      data: EnfantData;
      cost: number;
      checkoutIntentId?: string | number | null;
    }
  | {
      kind: "adulte";
      data: AdulteData;
      cost: number;
      checkoutIntentId?: string | number | null;
    };

type InscriptionActionResult =
  | {
      success: true;
      checkoutUrl?: string;
      checkoutIntentId?: string;
    }
  | {
      success: false;
      error: string;
    };

function getHelloAssoApiUrl() {
  return (process.env.HELLO_ASSO_API_URL || "https://api.helloasso-sandbox.com")
    .replace(/\/$/, "")
    .replace(/\/v5$/, "");
}

function getHelloAssoOrgSlug() {
  return process.env.HELLO_ASSO_ORG_SLUG || "tc-vernouillet";
}

function lower(value: unknown) {
  return typeof value === "string" ? value.toLowerCase() : value;
}

function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : "Une erreur est survenue.";
}

function asRecord(value: unknown): Record<string, unknown> | null {
  return value && typeof value === "object" && !Array.isArray(value)
    ? value as Record<string, unknown>
    : null;
}

async function getHelloAssoToken() {
  const clientId = process.env.HELLO_ASSO_CLIENT;
  const clientSecret = process.env.HELLO_ASSO_CLIENT_SECRET;
  const apiUrl = getHelloAssoApiUrl();

  if (!clientId || !clientSecret) {
    throw new Error("Les identifiants HelloAsso ne sont pas configurés.");
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
    throw new Error("Impossible de s'authentifier auprès de HelloAsso.");
  }

  const data = await response.json();
  return data.access_token as string;
}

async function createCheckoutIntent(cost: number, payerInfo: PayerInfo, kind: "enfant" | "adulte") {
  const token = await getHelloAssoToken();
  const apiUrl = getHelloAssoApiUrl();
  const orgSlug = getHelloAssoOrgSlug();
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  const amount = Math.round(cost * 100);
  const payload = {
    totalAmount: amount,
    initialAmount: amount,
    itemName: "Inscription TC Vernouillet",
    backUrl: `${baseUrl}/inscription/error?reason=cancelled`,
    errorUrl: `${baseUrl}/inscription/error`,
    returnUrl: `${baseUrl}/inscription/success`,
    containsDonation: false,
    payer: {
      firstName: payerInfo.prenom,
      lastName: payerInfo.nom,
      email: payerInfo.email,
    },
    metadata: JSON.stringify({
      source: "tcv-inscription",
      kind,
    }),
  };

  const response = await fetch(`${apiUrl}/v5/organizations/${orgSlug}/checkout-intents`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("HelloAsso Checkout Error:", errorText);
    throw new Error("Impossible de créer le paiement HelloAsso.");
  }

  const data = await response.json();
  const checkoutIntentId = data.id ?? data.checkoutIntentId;

  if (!data.redirectUrl || !checkoutIntentId) {
    console.error("HelloAsso Checkout Unexpected Response:", data);
    throw new Error("La réponse HelloAsso ne contient pas les informations de paiement attendues.");
  }

  return {
    checkoutUrl: data.redirectUrl as string,
    checkoutIntentId: String(checkoutIntentId),
  };
}

async function getCheckoutIntent(checkoutIntentId: string | number) {
  const token = await getHelloAssoToken();
  const apiUrl = getHelloAssoApiUrl();
  const orgSlug = getHelloAssoOrgSlug();

  const response = await fetch(`${apiUrl}/v5/organizations/${orgSlug}/checkout-intents/${checkoutIntentId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
    cache: "no-store",
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("HelloAsso Checkout Verification Error:", errorText);
    throw new Error("Le paiement n'a pas pu être vérifié auprès de HelloAsso.");
  }

  return response.json();
}

function isCheckoutPaid(checkoutIntent: unknown) {
  const intent = asRecord(checkoutIntent);
  const order = asRecord(intent?.order);

  if (order?.id) {
    return true;
  }

  const orderPayments = Array.isArray(order?.payments) ? order.payments : [];
  if (orderPayments.length > 0) {
    return true;
  }

  const status = String(intent?.status || intent?.state || intent?.result || "").toLowerCase();
  if (["authorized", "paid", "success", "succeeded", "validated"].includes(status)) {
    return true;
  }

  const payments = Array.isArray(intent?.payments) ? intent.payments : orderPayments;
  return payments.some((payment) => {
    const paymentRecord = asRecord(payment);
    return ["authorized", "paid", "success", "succeeded"].includes(String(paymentRecord?.state || paymentRecord?.status).toLowerCase());
  });
}

async function verifyPaidCheckout(checkoutIntentId: string | number | null | undefined): Promise<InscriptionActionResult> {
  if (!checkoutIntentId) {
    return { success: false, error: "Identifiant de paiement manquant." };
  }

  const checkoutIntent = await getCheckoutIntent(checkoutIntentId);

  if (!isCheckoutPaid(checkoutIntent)) {
    return {
      success: false,
      error: "Le paiement HelloAsso n'est pas validé. L'inscription n'a pas été enregistrée.",
    };
  }

  return { success: true };
}

async function insertEnfant(data: EnfantData, cost: number): Promise<InscriptionActionResult> {
  const supabase = getSupabaseAdminClient();
  const { error } = await supabase.from("inscriptions_enfants").insert({
    nom: lower(data.nom),
    prenom: lower(data.prenom),
    sexe: data.sexe,
    date_naissance: data.dateNaissance || null,
    adresse: lower(data.adresse),
    code_postal: data.codePostal,
    ville: lower(data.ville),
    telephone_mere: data.telephoneMere,
    email_mere: lower(data.emailMere),
    telephone_pere: data.telephonePere,
    email_pere: lower(data.emailPere),
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
}

async function insertAdulte(data: AdulteData, cost: number): Promise<InscriptionActionResult> {
  const supabase = getSupabaseAdminClient();
  const { error } = await supabase.from("inscriptions_adultes").insert({
    nom: lower(data.nom),
    prenom: lower(data.prenom),
    sexe: data.sexe,
    date_naissance: data.dateNaissance || null,
    adresse: lower(data.adresse),
    code_postal: data.codePostal,
    ville: lower(data.ville),
    telephone: data.telephone,
    email: lower(data.email),
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
}

export async function createEnfantCheckout(data: EnfantCheckoutData, cost: number): Promise<InscriptionActionResult> {
  try {
    if (cost <= 0) {
      return { success: false, error: "Aucun paiement HelloAsso n'est nécessaire pour ce tarif." };
    }

    const checkout = await createCheckoutIntent(cost, {
      prenom: data.prenom,
      nom: data.nom,
      email: data.emailMere || data.emailPere || "contact@tcvernouillet.fr",
    }, "enfant");

    return { success: true, ...checkout };
  } catch (err: unknown) {
    return { success: false, error: getErrorMessage(err) };
  }
}

export async function createAdulteCheckout(data: AdulteCheckoutData, cost: number): Promise<InscriptionActionResult> {
  try {
    if (cost <= 0) {
      return { success: false, error: "Aucun paiement HelloAsso n'est nécessaire pour ce tarif." };
    }

    const checkout = await createCheckoutIntent(cost, {
      prenom: data.prenom,
      nom: data.nom,
      email: data.email,
    }, "adulte");

    return { success: true, ...checkout };
  } catch (err: unknown) {
    return { success: false, error: getErrorMessage(err) };
  }
}

export async function finalizePendingInscription(pending: PendingInscription): Promise<InscriptionActionResult> {
  try {
    if (pending.cost > 0) {
      const verification = await verifyPaidCheckout(pending.checkoutIntentId);
      if (!verification.success) {
        return verification;
      }
    }

    if (pending.kind === "enfant") {
      return insertEnfant(pending.data, pending.cost);
    }

    return insertAdulte(pending.data, pending.cost);
  } catch (err: unknown) {
    return { success: false, error: getErrorMessage(err) };
  }
}
