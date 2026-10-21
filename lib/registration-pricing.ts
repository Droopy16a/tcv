export const priceLabels = {
  baby: "Baby tennis (3 et 4 ans) — 1H",
  mini: "Mini tennis (5 et 6 ans) — 1H",
  ecole_1h: "École de tennis — 1H",
  ecole_1h30: "École de tennis — 1H30",
  ecole_2h: "École de tennis — 2H",
  ecole_3h: "École de tennis compétition — 3H",
  ecole_4h30: "École de tennis élite — 4H30",
  adulte: "Cotisation adulte",
  etudiant: "Cotisation jeunes / étudiants",
  equipe: "Entraînement équipe — cotisation incluse",
  cours_1h: "Cours collectifs adultes — supplément 1H",
  cours_2h: "Cours collectifs adultes — supplément 2H",
} as const;

export const familyLabels = {
  "1": "1ère personne",
  "2-3": "2ème et 3ème personne",
  "4-5": "4ème et 5ème personne",
  "6-7": "6ème et 7ème personne",
  "8": "8ème personne",
} as const;

export type PriceKey = keyof typeof priceLabels;
export type FamilyPosition = keyof typeof familyLabels;
export type RegistrationPricing = {
  prices: Record<PriceKey, { resident: number; exterior: number }>;
  discounts: Record<FamilyPosition, number>;
};

export const priceKeys = Object.keys(priceLabels) as PriceKey[];
export const familyPositions: FamilyPosition[] = ["1", "2-3", "4-5", "6-7", "8"];

function isAmount(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value) && value >= 0 &&
    value <= 100000 && Math.abs(value * 100 - Math.round(value * 100)) < 0.000001;
}

export function isRegistrationPricing(value: unknown): value is RegistrationPricing {
  if (!value || typeof value !== "object") return false;
  const { prices, discounts } = value as Partial<RegistrationPricing>;
  return !!prices && !!discounts && priceKeys.every((key) =>
    isAmount(prices[key]?.resident) && isAmount(prices[key]?.exterior)
  ) && familyPositions.every((key) => isAmount(discounts[key])) && discounts["1"] === 0;
}

type RegistrationSelection = {
  ville: string;
  positionFamille: FamilyPosition;
  formule?: string;
  estEtudiant?: boolean;
  entrainementEquipe?: boolean;
  coursCollectifs?: boolean;
  dureeCours?: string;
};

export function calculateRegistrationCost(
  pricing: RegistrationPricing,
  type: "enfant" | "adulte",
  selection: RegistrationSelection,
): number {
  const residence = selection.ville.trim().toLowerCase() === "vernouillet" ? "resident" : "exterior";
  const price = (key: PriceKey) => Math.round(pricing.prices[key][residence] * 100);
  if (!familyPositions.includes(selection.positionFamille)) throw new Error("Réduction famille invalide.");
  let total: number;
  if (type === "enfant") {
    const key = selection.formule;
    if (!key || !["baby", "mini", "ecole_1h", "ecole_1h30", "ecole_2h", "ecole_3h", "ecole_4h30"].includes(key)) {
      throw new Error("Formule enfant invalide.");
    }
    total = price(key as PriceKey);
  } else {
    total = price(selection.entrainementEquipe ? "equipe" : selection.estEtudiant ? "etudiant" : "adulte");
    if (selection.coursCollectifs && !selection.entrainementEquipe) {
      if (!["1H", "2H"].includes(selection.dureeCours ?? "")) throw new Error("Durée de cours invalide.");
      total += price(selection.dureeCours === "1H" ? "cours_1h" : "cours_2h");
    }
  }
  return Math.max(0, total - Math.round(pricing.discounts[selection.positionFamille] * 100)) / 100;
}
