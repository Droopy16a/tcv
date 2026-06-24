import Link from "next/link";

export default function InscriptionSuccessPage() {
  return (
    <section className="py-24 px-6 bg-white min-h-[70vh] flex flex-col items-center justify-center">
      <div className="container mx-auto max-w-3xl text-center space-y-8">
        <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-green-100 mb-6">
          <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        <h1 className="font-heading font-black text-4xl md:text-6xl uppercase tracking-tighter text-black">
          Inscription Réussie !
        </h1>
        <p className="text-xl font-light text-gray-600">
          Merci ! Votre paiement a été confirmé et votre inscription est enregistrée avec succès. 
          Vous recevrez prochainement un email de confirmation.
        </p>
        <div className="pt-8">
          <Link href="/" className="font-bold uppercase tracking-widest text-sm px-12 py-5 transition-all border inline-block bg-black text-white border-black hover:bg-[#DF6436] hover:border-[#DF6436]">
            Retour à l'accueil
          </Link>
        </div>
      </div>
    </section>
  );
}
