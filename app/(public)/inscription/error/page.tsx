import Link from "next/link";

export default function InscriptionErrorPage() {
  return (
    <section className="py-24 px-6 bg-white min-h-[70vh] flex flex-col items-center justify-center">
      <div className="container mx-auto max-w-3xl text-center space-y-8">
        <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-red-100 mb-6">
          <svg className="w-12 h-12 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </div>

        <h1 className="font-heading font-black text-4xl md:text-6xl uppercase tracking-tighter text-black">
          Paiement interrompu
        </h1>

        <p className="text-xl font-light text-gray-600">
          Votre paiement HelloAsso n a pas ete valide. Aucune inscription n a ete enregistree.
        </p>

        <div className="pt-8 flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/inscription" role="button" className="font-bold uppercase tracking-widest text-sm px-12 py-5 transition-all border inline-block bg-black text-white border-black hover:bg-[#DF6436] hover:border-[#DF6436]">
            Recommencer
          </Link>
          <Link href="/" role="button" className="font-bold uppercase tracking-widest text-sm px-12 py-5 transition-all border inline-block bg-white text-black border-black hover:border-[#DF6436] hover:text-[#DF6436]">
            Retour accueil
          </Link>
        </div>
      </div>
    </section>
  );
}
