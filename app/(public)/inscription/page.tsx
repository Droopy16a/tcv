import SubscribeForm from "@/app/components/SubscribeForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Inscription au Club',
  description:
    'Inscrivez-vous au Tennis Club de Vernouillet (TC Vernouillet). Formulaire d’adhésion en ligne pour rejoindre le club de tennis à Vernouillet, Eure-et-Loir (28).',
  keywords: [
    'inscription tennis Vernouillet',
    'adhésion TC Vernouillet',
    'rejoindre club tennis Vernouillet',
    'cotisation tennis 28',
    's’inscrire tennis Vernouillet',
  ],
  alternates: {
    canonical: '/inscription',
  },
  openGraph: {
    title: 'Inscription au Club | TC Vernouillet',
    description:
      'Rejoignez le TC Vernouillet ! Remplissez le formulaire d’inscription en ligne pour adhérer au club de tennis à Vernouillet (28).',
    url: 'https://www.tcvernouillet.com/inscription',
  },
};

export default function InscriptionPage() {
  return (
    <section className="py-5 px-6">
      <div className="container mx-auto max-w-6xl">
        <SubscribeForm />
      </div>
    </section>
  );
}
