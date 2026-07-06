import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Politique de Confidentialité',
  description: 'Politique de confidentialité et protection des données personnelles du TC Vernouillet, conformément au RGPD.',
  robots: { index: false, follow: false },
};

export default function PolitiqueConfidentialitePage() {
  return (
    <div className="bg-white py-24 md:py-32">
      <div className="container mx-auto px-6 max-w-4xl">
        <h1 className="font-heading font-black text-4xl md:text-6xl uppercase tracking-tighter text-black mb-4">
          Politique de Confidentialité
        </h1>
        <p className="text-gray-400 font-bold uppercase tracking-widest text-sm mb-16">
          Dernière mise à jour : juillet 2026
        </p>

        <div className="space-y-12">

          {/* Intro */}
          <section className="bg-gray-50 border border-gray-200 p-8">
            <p className="text-gray-600 font-light text-lg">
              Le TC Vernouillet s&apos;engage à protéger la vie privée des personnes dont il collecte les données personnelles.
              La présente politique décrit comment nous collectons, utilisons et protégeons vos données,
              conformément au <strong className="text-black">Règlement Général sur la Protection des Données (RGPD — UE 2016/679)</strong> et
              à la loi française Informatique et Libertés.
            </p>
          </section>

          {/* Responsable du traitement */}
          <section>
            <h2 className="font-heading font-black text-2xl md:text-3xl uppercase tracking-tight text-black mb-6 border-b border-gray-200 pb-4">
              1. Responsable du traitement
            </h2>
            <div className="text-gray-600 font-light text-lg space-y-2">
              <p><strong className="text-black font-bold">Organisme :</strong> Tennis Club de Vernouillet (TC Vernouillet)</p>
              <p><strong className="text-black font-bold">Représentant légal :</strong> <span className="text-orange-500">ESTEVES Jerome</span></p>
              <p><strong className="text-black font-bold">Adresse :</strong> Vernouillet, 78540, Yvelines, France</p>
              <p><strong className="text-black font-bold">Contact :</strong>{' '}
                <a href="mailto:tcvernouillet@gmail.com" className="text-[#DF6436] hover:underline">
                  tcvernouillet@gmail.com
                </a>
              </p>
            </div>
          </section>

          {/* Données collectées */}
          <section>
            <h2 className="font-heading font-black text-2xl md:text-3xl uppercase tracking-tight text-black mb-6 border-b border-gray-200 pb-4">
              2. Données personnelles collectées
            </h2>
            <div className="text-gray-600 font-light text-lg space-y-6">
              <p>Lors de votre inscription au club via notre formulaire en ligne, nous collectons les informations suivantes :</p>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="bg-gray-50 border border-gray-200 p-6">
                  <h3 className="font-bold uppercase tracking-widest text-xs text-[#DF6436] mb-4">Données d&apos;identité</h3>
                  <ul className="space-y-1 text-base">
                    <li>Nom et prénom</li>
                    <li>Date de naissance</li>
                    <li>Sexe</li>
                  </ul>
                </div>
                <div className="bg-gray-50 border border-gray-200 p-6">
                  <h3 className="font-bold uppercase tracking-widest text-xs text-[#DF6436] mb-4">Données de contact</h3>
                  <ul className="space-y-1 text-base">
                    <li>Adresse postale</li>
                    <li>Adresse e-mail</li>
                    <li>Numéro de téléphone</li>
                  </ul>
                </div>
                <div className="bg-gray-50 border border-gray-200 p-6">
                  <h3 className="font-bold uppercase tracking-widest text-xs text-[#DF6436] mb-4">Données sportives</h3>
                  <ul className="space-y-1 text-base">
                    <li>Niveau de jeu / classement</li>
                    <li>Formule et créneaux choisis</li>
                    <li>Années de pratique</li>
                  </ul>
                </div>
                <div className="bg-gray-50 border border-gray-200 p-6">
                  <h3 className="font-bold uppercase tracking-widest text-xs text-[#DF6436] mb-4">Données financières</h3>
                  <ul className="space-y-1 text-base">
                    <li>Montant de la cotisation</li>
                    <li>Paiement via HelloAsso<br/><span className="text-xs text-gray-400">(données bancaires non stockées par nous)</span></li>
                  </ul>
                </div>
              </div>

              <div className="bg-amber-50 border-l-4 border-amber-400 p-6">
                <p className="font-medium text-amber-800">
                  <strong>Données de mineurs :</strong> Lors des inscriptions enfants, nous collectons également les coordonnées
                  des parents ou représentants légaux (téléphone et e-mail du père et de la mère). Ces données
                  sont traitées avec un niveau de protection renforcé.
                </p>
              </div>
            </div>
          </section>

          {/* Finalités */}
          <section>
            <h2 className="font-heading font-black text-2xl md:text-3xl uppercase tracking-tight text-black mb-6 border-b border-gray-200 pb-4">
              3. Finalités et bases légales du traitement
            </h2>
            <div className="text-gray-600 font-light text-lg">
              <table className="w-full border-collapse text-base">
                <thead>
                  <tr className="bg-black text-white">
                    <th className="text-left p-4 font-bold uppercase tracking-widest text-xs">Finalité</th>
                    <th className="text-left p-4 font-bold uppercase tracking-widest text-xs">Base légale</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr className="bg-gray-50">
                    <td className="p-4">Gestion des inscriptions au club</td>
                    <td className="p-4">Exécution du contrat</td>
                  </tr>
                  <tr>
                    <td className="p-4">Traitement du paiement de la cotisation</td>
                    <td className="p-4">Exécution du contrat</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="p-4">Affiliation à la Fédération Française de Tennis (FFT)</td>
                    <td className="p-4">Obligation légale</td>
                  </tr>
                  <tr>
                    <td className="p-4">Organisation des cours et créneaux</td>
                    <td className="p-4">Intérêt légitime</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Durée de conservation */}
          <section>
            <h2 className="font-heading font-black text-2xl md:text-3xl uppercase tracking-tight text-black mb-6 border-b border-gray-200 pb-4">
              4. Durée de conservation
            </h2>
            <div className="text-gray-600 font-light text-lg space-y-4">
              <p>Vos données sont conservées :</p>
              <ul className="space-y-2 list-disc list-inside">
                <li><strong className="text-black">Données d&apos;inscription actives :</strong> pendant toute la durée de votre adhésion au club.</li>
                <li><strong className="text-black">Données des anciens membres :</strong> 3 ans après la fin de la dernière adhésion (prescription civile), puis suppression ou anonymisation.</li>
                <li><strong className="text-black">Données de paiement :</strong> 10 ans (obligations comptables légales).</li>
                <li><strong className="text-black">Consentement marketing :</strong> jusqu&apos;à retrait du consentement ou 3 ans d&apos;inactivité.</li>
              </ul>
            </div>
          </section>

          {/* Destinataires */}
          <section>
            <h2 className="font-heading font-black text-2xl md:text-3xl uppercase tracking-tight text-black mb-6 border-b border-gray-200 pb-4">
              5. Destinataires des données
            </h2>
            <div className="text-gray-600 font-light text-lg space-y-4">
              <p>Vos données peuvent être partagées avec :</p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-[#DF6436] rounded-full mt-3 shrink-0"></span>
                  <span><strong className="text-black">Supabase</strong> (hébergeur de base de données) — stockage sécurisé des inscriptions</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-[#DF6436] rounded-full mt-3 shrink-0"></span>
                  <span><strong className="text-black">HelloAsso</strong> (prestataire de paiement) — traitement du règlement de la cotisation</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-[#DF6436] rounded-full mt-3 shrink-0"></span>
                  <span><strong className="text-black">Fédération Française de Tennis (FFT)</strong> — dans le cadre de l&apos;affiliation et de la prise de licence</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-[#DF6436] rounded-full mt-3 shrink-0"></span>
                  <span><strong className="text-black">Encadrants du club</strong> (enseignants) — dans la stricte limite nécessaire à l&apos;organisation des cours</span>
                </li>
              </ul>
              <p>Vos données ne sont jamais vendues à des tiers à des fins commerciales.</p>
            </div>
          </section>

          {/* Droits */}
          <section>
            <h2 className="font-heading font-black text-2xl md:text-3xl uppercase tracking-tight text-black mb-6 border-b border-gray-200 pb-4">
              6. Vos droits
            </h2>
            <div className="text-gray-600 font-light text-lg space-y-4">
              <p>Conformément au RGPD, vous disposez des droits suivants sur vos données personnelles :</p>
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  { titre: 'Droit d\'accès', desc: 'Obtenir une copie de vos données que nous détenons.' },
                  { titre: 'Droit de rectification', desc: 'Corriger des données inexactes ou incomplètes.' },
                  { titre: 'Droit à l\'effacement', desc: 'Demander la suppression de vos données sous conditions.' },
                  { titre: 'Droit à la limitation', desc: 'Restreindre le traitement de vos données dans certains cas.' },
                  { titre: 'Droit d\'opposition', desc: 'Vous opposer au traitement fondé sur l\'intérêt légitime.' },
                  { titre: 'Droit de retrait du consentement', desc: 'Retirer à tout moment votre consentement marketing.' },
                ].map((droit) => (
                  <div key={droit.titre} className="bg-gray-50 border border-gray-200 p-5">
                    <h3 className="font-bold text-black text-base mb-1">{droit.titre}</h3>
                    <p className="text-gray-500 text-base">{droit.desc}</p>
                  </div>
                ))}
              </div>
              <div className="bg-black text-white p-6 mt-4">
                <p className="font-light">
                  Pour exercer ces droits, contactez-nous à :{' '}
                  <a href="mailto:tcvernouillet@gmail.com" className="text-[#DF6436] hover:underline font-medium">
                    tcvernouillet@gmail.com
                  </a>
                  <br />
                  Vous pouvez également introduire une réclamation auprès de la{' '}
                  <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="text-[#DF6436] hover:underline">
                    CNIL
                  </a>{' '}
                  (Commission Nationale de l&apos;Informatique et des Libertés).
                </p>
              </div>
            </div>
          </section>

          {/* Sécurité */}
          <section>
            <h2 className="font-heading font-black text-2xl md:text-3xl uppercase tracking-tight text-black mb-6 border-b border-gray-200 pb-4">
              7. Sécurité des données
            </h2>
            <div className="text-gray-600 font-light text-lg space-y-4">
              <p>
                Le TC Vernouillet met en œuvre des mesures techniques et organisationnelles appropriées pour protéger
                vos données contre tout accès non autorisé, perte, altération ou divulgation. Le site est hébergé
                sur Vercel avec connexion chiffrée HTTPS. Les données d&apos;inscription sont stockées dans une base de
                données sécurisée (Supabase) avec contrôle d&apos;accès strict.
              </p>
            </div>
          </section>

          {/* Modifications */}
          <section>
            <h2 className="font-heading font-black text-2xl md:text-3xl uppercase tracking-tight text-black mb-6 border-b border-gray-200 pb-4">
              8. Modifications de cette politique
            </h2>
            <div className="text-gray-600 font-light text-lg">
              <p>
                Cette politique peut être mise à jour à tout moment. La date de dernière modification est indiquée
                en haut de ce document. Nous vous encourageons à la consulter régulièrement.
              </p>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
