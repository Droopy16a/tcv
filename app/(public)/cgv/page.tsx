import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Conditions Générales de Vente',
  description: 'Conditions générales de vente et d\'adhésion du Tennis Club de Vernouillet (TC Vernouillet).',
  robots: { index: false, follow: false },
};

export default function CGVPage() {
  return (
    <div className="bg-white py-24 md:py-32">
      <div className="container mx-auto px-6 max-w-4xl">
        <h1 className="font-heading font-black text-4xl md:text-6xl uppercase tracking-tighter text-black mb-4">
          Conditions Générales de Vente
        </h1>
        <p className="text-gray-400 font-bold uppercase tracking-widest text-sm mb-16">
          Dernière mise à jour : juillet 2026 — Saison 2026/2027
        </p>

        <div className="space-y-12">

          {/* Intro */}
          <section className="bg-gray-50 border border-gray-200 p-8">
            <p className="text-gray-600 font-light text-lg">
              Les présentes Conditions Générales de Vente (CGV) régissent les conditions d&apos;adhésion
              et de paiement au Tennis Club de Vernouillet (ci-après &quot;le Club&quot;) pour la saison 2026/2027.
              Toute inscription au club implique l&apos;acceptation pleine et entière de ces CGV.
            </p>
          </section>

          {/* Article 1 - Objet */}
          <section>
            <h2 className="font-heading font-black text-2xl md:text-3xl uppercase tracking-tight text-black mb-6 border-b border-gray-200 pb-4">
              Article 1 — Objet
            </h2>
            <div className="text-gray-600 font-light text-lg space-y-4">
              <p>
                Les présentes CGV définissent les droits et obligations du Club et de l&apos;adhérent dans le cadre
                de l&apos;inscription et du paiement de la cotisation annuelle du TC Vernouillet pour la saison 2026/2027.
              </p>
              <p>
                L&apos;adhésion au club comprend : la cotisation au TC Vernouillet, la licence Fédérale FFT,
                et le cas échéant, les cours collectifs selon la formule choisie.
              </p>
            </div>
          </section>

          {/* Article 2 - Inscription */}
          <section>
            <h2 className="font-heading font-black text-2xl md:text-3xl uppercase tracking-tight text-black mb-6 border-b border-gray-200 pb-4">
              Article 2 — Conditions d&apos;inscription
            </h2>
            <div className="text-gray-600 font-light text-lg space-y-4">
              <p>L&apos;inscription peut être effectuée :</p>
              <ul className="space-y-2 list-disc list-inside">
                <li>En ligne via le formulaire disponible sur <strong className="text-black">www.tcvernouillet.com/inscription</strong></li>
                <li>En format papier, en déposant le dossier complété au club</li>
              </ul>
              <p>
                L&apos;inscription est considérée comme définitive uniquement après réception et validation
                du paiement intégral de la cotisation.
              </p>
              <p>
                Pour les inscriptions d&apos;enfants mineurs, l&apos;acceptation des présentes CGV vaut
                autorisation parentale ou du représentant légal.
              </p>
            </div>
          </section>

          {/* Article 3 - Tarifs */}
          <section>
            <h2 className="font-heading font-black text-2xl md:text-3xl uppercase tracking-tight text-black mb-6 border-b border-gray-200 pb-4">
              Article 3 — Tarifs et cotisations
            </h2>
            <div className="text-gray-600 font-light text-lg space-y-4">
              <p>
                Les tarifs applicables pour la saison 2026/2027 sont ceux affichés sur le formulaire d&apos;inscription
                en ligne et disponibles via la grille tarifaire téléchargeable. Les tarifs distinguent :
              </p>
              <ul className="space-y-2 list-disc list-inside">
                <li>Le tarif <strong className="text-black">résident</strong> : pour les personnes domiciliées à Vernouillet (28500)</li>
                <li>Le tarif <strong className="text-black">extérieur</strong> : pour les personnes résidant dans une autre commune</li>
              </ul>
              <p>
                Des réductions familiales sont appliquées à partir du 2e membre du même foyer inscrit au Club
                lors de la même saison, selon le barème affiché sur le formulaire.
              </p>
              <p>
                La licence FFT (Fédération Française de Tennis) est incluse dans la cotisation selon les tarifs
                en vigueur fixés par la FFT.
              </p>
            </div>
          </section>

          {/* Article 4 - Paiement */}
          <section>
            <h2 className="font-heading font-black text-2xl md:text-3xl uppercase tracking-tight text-black mb-6 border-b border-gray-200 pb-4">
              Article 4 — Modalités de paiement
            </h2>
            <div className="text-gray-600 font-light text-lg space-y-4">
              <p>Le règlement de la cotisation s&apos;effectue :</p>
              <ul className="space-y-2 list-disc list-inside">
                <li>
                  <strong className="text-black">En ligne</strong> : par carte bancaire sécurisée via la plateforme
                  HelloAsso (<a href="https://www.helloasso.com" target="_blank" rel="noopener noreferrer" className="text-[#DF6436] hover:underline">helloasso.com</a>).
                  Les données bancaires sont traitées exclusivement par HelloAsso et ne sont jamais stockées par le TC Vernouillet.
                </li>
                <li>
                  <strong className="text-black">En espèces ou chèque</strong> : directement au club lors du dépôt du dossier papier,
                  à l&apos;ordre de <em>&quot;TC Vernouillet&quot;</em>
                </li>
              </ul>
              <p>
                Le paiement doit être effectué en totalité au moment de l&apos;inscription.
              </p>
            </div>
          </section>

          {/* Article 5 - Remboursement */}
          <section>
            <h2 className="font-heading font-black text-2xl md:text-3xl uppercase tracking-tight text-black mb-6 border-b border-gray-200 pb-4">
              Article 5 — Politique d&apos;annulation et de remboursement
            </h2>
            <div className="text-gray-600 font-light text-lg space-y-4">
              <div className="bg-amber-50 border-l-4 border-amber-400 p-6">
                <p className="font-medium text-amber-800">
                  <strong>Droit de rétractation :</strong> Conformément à l&apos;article L221-28 du Code de la consommation,
                  le droit de rétractation de 14 jours ne s&apos;applique pas aux prestations de loisirs
                  (cours de sport) dont la date ou la période d&apos;exécution est déterminée à l&apos;avance.
                </p>
              </div>
              <p>
                Toutefois, le Club étudiera avec bienveillance toute demande de remboursement partiel
                dans les cas suivants :
              </p>
              <ul className="space-y-2 list-disc list-inside">
                <li>Blessure grave ou longue maladie empêchant la pratique (justificatif médical requis)</li>
                <li>Déménagement hors de la région (justificatif requis)</li>
                <li>Force majeure</li>
              </ul>
              <p>
                Dans ces cas, un remboursement proratisé au nombre de mois restants peut être accordé,
                déduction faite de la licence FFT déjà immatriculée (non remboursable).
              </p>
              <p>
                Toute demande doit être adressée par e-mail à{' '}
                <a href="mailto:tcvernouillet@gmail.com" className="text-[#DF6436] hover:underline">
                  tcvernouillet@gmail.com
                </a>.
              </p>
            </div>
          </section>

          {/* Article 6 - Obligations */}
          <section>
            <h2 className="font-heading font-black text-2xl md:text-3xl uppercase tracking-tight text-black mb-6 border-b border-gray-200 pb-4">
              Article 6 — Obligations de l&apos;adhérent
            </h2>
            <div className="text-gray-600 font-light text-lg space-y-4">
              <p>En adhérant au TC Vernouillet, l&apos;adhérent s&apos;engage à :</p>
              <ul className="space-y-2 list-disc list-inside">
                <li>Respecter le règlement intérieur du Club</li>
                <li>Respecter les autres membres, les enseignants et le personnel</li>
                <li>Utiliser les installations dans le respect des règles de sécurité</li>
                <li>Fournir des informations exactes lors de l&apos;inscription</li>
                <li>Signaler tout changement de situation (adresse, coordonnées)</li>
                <li>Être titulaire d&apos;une licence FFT valide pour jouer sur les courts du club</li>
              </ul>
            </div>
          </section>

          {/* Article 7 - Responsabilité */}
          <section>
            <h2 className="font-heading font-black text-2xl md:text-3xl uppercase tracking-tight text-black mb-6 border-b border-gray-200 pb-4">
              Article 7 — Responsabilité et assurances
            </h2>
            <div className="text-gray-600 font-light text-lg space-y-4">
              <p>
                La licence FFT incluse dans la cotisation comprend une assurance de base. L&apos;adhérent
                est responsable de vérifier l&apos;adéquation de cette couverture à sa situation personnelle
                et peut souscrire une assurance complémentaire si nécessaire.
              </p>
              <p>
                Le TC Vernouillet décline toute responsabilité en cas d&apos;accident résultant d&apos;une faute
                ou d&apos;une imprudence de l&apos;adhérent, ou en cas de vol ou dégradation de biens personnels
                dans les locaux du club.
              </p>
            </div>
          </section>

          {/* Article 8 - Données personnelles */}
          <section>
            <h2 className="font-heading font-black text-2xl md:text-3xl uppercase tracking-tight text-black mb-6 border-b border-gray-200 pb-4">
              Article 8 — Données personnelles
            </h2>
            <div className="text-gray-600 font-light text-lg">
              <p>
                Le traitement de vos données personnelles dans le cadre de votre adhésion est décrit dans notre{' '}
                <Link href="/politique-de-confidentialite" className="text-[#DF6436] hover:underline font-medium">
                  Politique de Confidentialité
                </Link>.
              </p>
            </div>
          </section>

          {/* Article 9 - Droit applicable */}
          <section>
            <h2 className="font-heading font-black text-2xl md:text-3xl uppercase tracking-tight text-black mb-6 border-b border-gray-200 pb-4">
              Article 9 — Droit applicable et litiges
            </h2>
            <div className="text-gray-600 font-light text-lg space-y-4">
              <p>
                Les présentes CGV sont soumises au droit français. En cas de litige, le Club et l&apos;adhérent
                s&apos;engagent à rechercher une solution amiable avant tout recours judiciaire.
              </p>
              <p>
                À défaut d&apos;accord amiable, tout litige relatif à l&apos;interprétation ou à l&apos;exécution
                des présentes CGV sera soumis aux tribunaux compétents du ressort du siège social du Club.
              </p>
            </div>
          </section>

          {/* Contact */}
          <section className="bg-black text-white p-8">
            <h2 className="font-heading font-black text-2xl uppercase tracking-tight mb-4">Contact</h2>
            <p className="font-light text-gray-300">
              Pour toute question relative aux présentes CGV, contactez-nous à :{' '}
              <a href="mailto:tcvernouillet@gmail.com" className="text-[#DF6436] hover:underline font-medium">
                tcvernouillet@gmail.com
              </a>
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}
