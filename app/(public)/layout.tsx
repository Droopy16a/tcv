import { Header } from "../components/header";
import Footer from "../components/footer";
import { RegistrationAvailabilityProvider } from "../components/RegistrationAvailability";
import { areRegistrationsEnabled } from "@/lib/site-settings";

export default async function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const registrationsEnabled = await areRegistrationsEnabled();

  return (
    <RegistrationAvailabilityProvider enabled={registrationsEnabled}>
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
    </RegistrationAvailabilityProvider>
  );
}
