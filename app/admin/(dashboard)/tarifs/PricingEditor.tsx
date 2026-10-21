"use client";

import { useState, useTransition, type FormEvent } from "react";
import { toast } from "sonner";
import { familyLabels, familyPositions, priceKeys, priceLabels, type RegistrationPricing } from "@/lib/registration-pricing";
import { saveRegistrationPricing } from "./actions";

export default function PricingEditor({ initialPricing }: { initialPricing: RegistrationPricing }) {
  const [pending, startTransition] = useTransition();
  const [message, setMessage] = useState("");
  const inputClass = "w-32 rounded-md border border-gray-300 px-3 py-2 focus:border-[#DF6436] focus:outline-none focus:ring-1 focus:ring-[#DF6436]";

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const value: RegistrationPricing = {
      prices: Object.fromEntries(priceKeys.map((key) => [key, {
        resident: Number(data.get(`${key}.resident`)), exterior: Number(data.get(`${key}.exterior`)),
      }])) as RegistrationPricing["prices"],
      discounts: Object.fromEntries(familyPositions.map((key) => [key, key === "1" ? 0 : Number(data.get(`discount.${key}`))])) as RegistrationPricing["discounts"],
    };
    setMessage("");
    startTransition(async () => {
      const result = await saveRegistrationPricing(value);
      if (!result.success) {
        setMessage(result.error ?? "Impossible d’enregistrer les tarifs.");
        toast.error(result.error);
        return;
      }
      setMessage("Tarifs enregistrés. Le formulaire d’inscription est à jour.");
      toast.success("Tarifs enregistrés.");
    });
  }

  return (
    <form onSubmit={submit} className="space-y-6">
      <fieldset disabled={pending} className="space-y-6">
        <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white p-4 sm:p-6">
          <table className="w-full text-left text-sm">
            <caption className="mb-4 text-left text-lg font-bold">Tarifs des formules</caption>
            <thead><tr className="border-b"><th scope="col" className="p-3">Formule</th><th scope="col" className="p-3">Résident (€)</th><th scope="col" className="p-3">Extérieur (€)</th></tr></thead>
            <tbody>{priceKeys.map((key) => (
              <tr key={key} className="border-b border-gray-100">
                <th scope="row" className="p-3 font-medium">{priceLabels[key]}</th>
                {(["resident", "exterior"] as const).map((residence) => (
                  <td key={residence} className="p-3"><input aria-label={`${priceLabels[key]} — ${residence === "resident" ? "Résident" : "Extérieur"}`} className={inputClass} type="number" min="0" max="100000" step="0.01" required name={`${key}.${residence}`} defaultValue={initialPricing.prices[key][residence]} /></td>
                ))}
              </tr>
            ))}</tbody>
          </table>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-6">
          <h2 className="mb-4 text-lg font-bold">Réductions famille (même foyer)</h2>
          <div className="grid gap-4 sm:grid-cols-2">{familyPositions.filter((key) => key !== "1").map((key) => (
            <label key={key} className="flex items-center justify-between gap-4 text-sm">{familyLabels[key]} (€)
              <input className={inputClass} type="number" min="0" max="100000" step="0.01" required name={`discount.${key}`} defaultValue={initialPricing.discounts[key]} />
            </label>
          ))}</div>
        </div>
        <button type="submit" className="rounded-md bg-[#DF6436] px-6 py-3 font-semibold text-white disabled:opacity-60">{pending ? "Enregistrement…" : "Enregistrer les tarifs"}</button>
      </fieldset>
      <p role="status" aria-live="polite" className="text-sm text-gray-700">{message}</p>
    </form>
  );
}
