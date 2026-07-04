import FinalizePayment from "./FinalizePayment";

export default async function InscriptionSuccessPage({ searchParams }: { searchParams: Promise<{ checkoutIntentId?: string }> }) {
  const { checkoutIntentId } = await searchParams;

  return (
    <section className="py-24 px-6 bg-white min-h-[70vh] flex flex-col items-center justify-center">
      <div className="container mx-auto max-w-3xl text-center">
        <FinalizePayment checkoutIntentId={checkoutIntentId || null} />
      </div>
    </section>
  );
}
