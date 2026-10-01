"use client";

import { createContext, useContext } from "react";

const RegistrationAvailabilityContext = createContext(true);

export function RegistrationAvailabilityProvider({
  enabled,
  children,
}: {
  enabled: boolean;
  children: React.ReactNode;
}) {
  return (
    <RegistrationAvailabilityContext.Provider value={enabled}>
      {children}
    </RegistrationAvailabilityContext.Provider>
  );
}

export function useRegistrationAvailability() {
  return useContext(RegistrationAvailabilityContext);
}
