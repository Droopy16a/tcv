import FinalizePaiementLibre from "./FinalizePaiementLibre";

export const metadata = {
  title: "Validation du Paiement | TC Vernouillet",
};

export default async function PaiementSuccessPage({ searchParams }: { searchParams: Promise<{ checkoutIntentId?: string }> }) {
  const { checkoutIntentId } = await searchParams;

  return (
    <div className="bg-[#FAFAFA] min-h-[80vh] pt-32 pb-24 flex items-center justify-center">
      <div className="container mx-auto px-6 max-w-2xl text-center">
        <FinalizePaiementLibre checkoutIntentId={checkoutIntentId || null} />
      </div>
    </div>
  );
}
