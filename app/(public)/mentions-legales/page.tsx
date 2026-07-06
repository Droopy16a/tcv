import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Mentions Légales',
  description: 'Mentions légales du site internet du Tennis Club de Vernouillet (TC Vernouillet).',
  robots: { index: false, follow: false },
};

export default function MentionsLegalesPage() {
  return (
    <div className="bg-white py-24 md:py-32">
      <div className="container mx-auto px-6 max-w-4xl">
        <h1 className="font-heading font-black text-4xl md:text-6xl uppercase tracking-tighter text-black mb-4">
          Mentions Légales
        </h1>
        <p className="text-gray-400 font-bold uppercase tracking-widest text-sm mb-16">
          Dernière mise à jour : juillet 2026
        </p>

        <div className="prose prose-lg max-w-none space-y-12">

          {/* Éditeur du site */}
          <section>
            <h2 className="font-heading font-black text-2xl md:text-3xl uppercase tracking-tight text-black mb-6 border-b border-gray-200 pb-4">
              1. Éditeur du site
            </h2>
            <div className="text-gray-600 font-light text-lg space-y-2">
              <p><strong className="text-black font-bold">Dénomination :</strong> Tennis Club de Vernouillet (TC Vernouillet)</p>
              <p><strong className="text-black font-bold">Forme juridique :</strong> Association loi 1901</p>
              <p><strong className="text-black font-bold">Siège social :</strong> Vernouillet, 78540, Yvelines, France</p>
              <p><strong className="text-black font-bold">Responsable de publication :</strong> <span className="text-orange-500">ESTEVES Jerome</span></p>
              <p><strong className="text-black font-bold">Contact :</strong> <a href="mailto:tcvernouillet@gmail.com" className="text-[#DF6436] hover:underline">tcvernouillet@gmail.com</a></p>
              <p><strong className="text-black font-bold">Site web :</strong> <a href="https://www.tcvernouillet.com" className="text-[#DF6436] hover:underline">www.tcvernouillet.com</a></p>
            </div>
          </section>

          {/* Hébergement */}
          <section>
            <h2 className="font-heading font-black text-2xl md:text-3xl uppercase tracking-tight text-black mb-6 border-b border-gray-200 pb-4">
              2. Hébergement
            </h2>
            <div className="text-gray-600 font-light text-lg space-y-2">
              <p><strong className="text-black font-bold">Hébergeur :</strong> Vercel Inc.</p>
              <p><strong className="text-black font-bold">Adresse :</strong> 340 Pine Street, Suite 701, San Francisco, CA 94104, États-Unis</p>
              <p><strong className="text-black font-bold">Site :</strong> <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-[#DF6436] hover:underline">vercel.com</a></p>
            </div>
          </section>

          {/* Propriété intellectuelle */}
          <section>
            <h2 className="font-heading font-black text-2xl md:text-3xl uppercase tracking-tight text-black mb-6 border-b border-gray-200 pb-4">
              3. Propriété intellectuelle
            </h2>
            <div className="text-gray-600 font-light text-lg space-y-4">
              <p>
                L&apos;ensemble du contenu de ce site (textes, images, logos, vidéos, structure) est la propriété exclusive du
                TC Vernouillet ou de ses partenaires, et est protégé par les lois françaises et internationales relatives
                au droit d&apos;auteur et à la propriété intellectuelle.
              </p>
              <p>
                Toute reproduction, représentation, modification, publication, adaptation ou exploitation de tout ou partie
                des éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite sans autorisation écrite préalable
                du TC Vernouillet.
              </p>
            </div>
          </section>

          {/* Données personnelles */}
          <section>
            <h2 className="font-heading font-black text-2xl md:text-3xl uppercase tracking-tight text-black mb-6 border-b border-gray-200 pb-4">
              4. Données personnelles
            </h2>
            <div className="text-gray-600 font-light text-lg space-y-4">
              <p>
                Le TC Vernouillet collecte des données personnelles dans le cadre des inscriptions au club.
                Pour en savoir plus sur la façon dont vos données sont traitées, consultez notre{' '}
                <Link href="/politique-de-confidentialite" className="text-[#DF6436] hover:underline font-medium">
                  Politique de Confidentialité
                </Link>.
              </p>
            </div>
          </section>

          {/* Cookies */}
          <section>
            <h2 className="font-heading font-black text-2xl md:text-3xl uppercase tracking-tight text-black mb-6 border-b border-gray-200 pb-4">
              5. Cookies
            </h2>
            <div className="text-gray-600 font-light text-lg space-y-4">
              <p>
                Ce site utilise des cookies techniques nécessaires à son bon fonctionnement (notamment pour la gestion
                des inscriptions en cours de paiement). Ces cookies ne collectent aucune donnée à des fins publicitaires
                ou de traçage.
              </p>
              <p>
                Aucun cookie tiers de suivi ou d&apos;analyse n&apos;est déposé sur votre navigateur sans votre consentement.
              </p>
            </div>
          </section>

          {/* Limitation de responsabilité */}
          <section>
            <h2 className="font-heading font-black text-2xl md:text-3xl uppercase tracking-tight text-black mb-6 border-b border-gray-200 pb-4">
              6. Limitation de responsabilité
            </h2>
            <div className="text-gray-600 font-light text-lg space-y-4">
              <p>
                Le TC Vernouillet s&apos;efforce de maintenir les informations publiées sur ce site à jour et exactes.
                Toutefois, il ne peut être tenu responsable d&apos;erreurs, d&apos;omissions ou de résultats qui pourraient être
                obtenus par un mauvais usage de ces informations.
              </p>
              <p>
                Le TC Vernouillet ne saurait être tenu responsable des dommages directs ou indirects résultant
                de l&apos;utilisation de ce site ou d&apos;une impossibilité d&apos;y accéder.
              </p>
            </div>
          </section>

          {/* Droit applicable */}
          <section>
            <h2 className="font-heading font-black text-2xl md:text-3xl uppercase tracking-tight text-black mb-6 border-b border-gray-200 pb-4">
              7. Droit applicable
            </h2>
            <div className="text-gray-600 font-light text-lg">
              <p>
                Les présentes mentions légales sont régies par le droit français. En cas de litige, et à défaut
                de résolution amiable, les tribunaux français seront compétents.
              </p>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
