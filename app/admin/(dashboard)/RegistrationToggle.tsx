"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { setRegistrationsEnabled } from "./actions";

export default function RegistrationToggle({
  initialEnabled,
}: {
  initialEnabled: boolean;
}) {
  const [enabled, setEnabled] = useState(initialEnabled);
  const [isPending, startTransition] = useTransition();

  const toggleRegistrations = () => {
    const nextEnabled = !enabled;

    startTransition(async () => {
      const result = await setRegistrationsEnabled(nextEnabled);

      if (!result.success) {
        toast.error(result.error);
        return;
      }

      setEnabled(nextEnabled);
      toast.success(
        nextEnabled
          ? "Les inscriptions sont maintenant ouvertes."
          : "Les inscriptions sont maintenant fermées.",
      );
    });
  };

  return (
    <div className="flex items-center justify-between gap-6">
      <div>
        <p className="font-semibold text-gray-900">
          Inscriptions en ligne
        </p>
        <p className="mt-1 text-sm text-gray-500">
          {enabled
            ? "La bannière et les accès au formulaire sont visibles."
            : "La bannière et les accès au formulaire sont masqués."}
        </p>
      </div>

      <button
        type="button"
        role="switch"
        aria-checked={enabled}
        aria-label="Activer ou désactiver les inscriptions en ligne"
        disabled={isPending}
        onClick={toggleRegistrations}
        className={`relative inline-flex h-7 w-12 shrink-0 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DF6436] focus-visible:ring-offset-2 disabled:cursor-wait disabled:opacity-60 ${
          enabled ? "bg-[#DF6436]" : "bg-gray-300"
        }`}
      >
        <span
          className={`inline-block h-5 w-5 rounded-full bg-white shadow-sm transition-transform ${
            enabled ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </button>
    </div>
  );
}
