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
          Erreur de Paiement
        </h1>
        <p className="text-xl font-light text-gray-600">
          Le paiement a échoué ou a été annulé. Votre inscription n'a pas été validée.
          Veuillez réessayer ou nous contacter si le problème persiste.
        </p>
        <div className="pt-8 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/inscription" role="button" className="font-bold uppercase tracking-widest text-sm px-12 py-5 transition-all border inline-block bg-black text-white border-black hover:bg-[#DF6436] hover:border-[#DF6436]">
            Réessayer l'inscription
          </Link>
          <Link href="/" role="button" className="font-bold uppercase tracking-widest text-sm px-12 py-5 transition-all border inline-block bg-transparent text-gray-500 border-gray-300 hover:border-[#DF6436] hover:text-[#DF6436]">
            Retour à l'accueil
          </Link>
        </div>
      </div>
    </section>
  );
}
